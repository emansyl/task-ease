import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { decrypt, encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { gmail_v1 } from "googleapis";
import {
  NormalizedEmailData,
  processEmailWithAI,
} from "@/lib/email-processing";
import { getUserIdFromRequest } from "@/lib/auth";

function parseGmailMessage(gmailMessage: GmailMessage): NormalizedEmailData {
  return {
    fromEmail: gmailMessage.from,
    subject: gmailMessage.subject,
    body: gmailMessage.body,
    receivedAt: gmailMessage.date ? new Date(gmailMessage.date) : undefined,
  };
}
// Gmail API message interface for type safety
interface GmailMessage {
  id: string;
  threadId: string | null | undefined;
  subject: string;
  from: string;
  date: string;
  snippet: string | null | undefined;
  body: string;
}

// Helper function to find a specific header value
function getHeader(
  headers: gmail_v1.Schema$MessagePartHeader[],
  name: string
): string {
  const header = headers.find(
    (h) => h.name?.toLowerCase() === name.toLowerCase()
  );
  return header?.value || "";
}

// Helper function to find the email body and decode it
function getEmailBody(
  payload: gmail_v1.Schema$MessagePart | undefined
): string {
  if (!payload) return "";

  // Look for parts, which is common in multipart emails
  const parts = payload.parts;
  if (parts) {
    // Find the plain text part first
    let plainTextPart = parts.find((part) => part.mimeType === "text/plain");
    if (plainTextPart && plainTextPart.body?.data && typeof plainTextPart.body.data === 'string') {
      return Buffer.from(plainTextPart.body.data, "base64url").toString("utf8");
    }

    // If no plain text, find the HTML part
    let htmlPart = parts.find((part) => part.mimeType === "text/html");
    if (htmlPart && htmlPart.body?.data && typeof htmlPart.body.data === 'string') {
      // Here you might want to strip HTML tags for a plain text version
      const htmlContent = Buffer.from(htmlPart.body.data, "base64url").toString(
        "utf8"
      );
      return htmlContent; // For simplicity, returning raw HTML. In a real app, you'd sanitize or convert this.
    }
  }

  // If no parts, the body might be in the main payload
  if (payload.body?.data && typeof payload.body.data === 'string') {
    return Buffer.from(payload.body.data, "base64url").toString("utf8");
  }

  return ""; // Return empty string if no body is found
}

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // 1. Fetch the integration from Prisma
    const integration = await prisma.integration.findUnique({
      where: {
        userId_provider: {
          userId: userId,
          provider: "gmail",
        },
      },
    });

    if (!integration || !integration.accessToken || !integration.refreshToken) {
      return NextResponse.json(
        { error: "Gmail integration not found or tokens missing." },
        { status: 404 }
      );
    }

    // 2. Set up the Google API client
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // 3. Decrypt and set the credentials on the client
    if (!integration.accessToken || !integration.refreshToken) {
      return NextResponse.json(
        { error: "Gmail access tokens are missing or invalid." },
        { status: 400 }
      );
    }
    
    const accessToken = decrypt(integration.accessToken);
    const refreshToken = decrypt(integration.refreshToken);
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    oauth2Client.on("tokens", async (tokens) => {
      console.log("Google tokens were refreshed for user:", userId);

      // Encrypt the new access token
      const newEncryptedAccessToken = encrypt(tokens.access_token!);
      const tokenUpdatePayload: {
        accessToken: string;
        tokenExpiresAt: Date;
        refreshToken?: string;
      } = {
        accessToken: newEncryptedAccessToken,
        tokenExpiresAt: new Date(tokens.expiry_date!),
      };

      // Google sometimes sends a new refresh token. If it does, we must store it.
      if (tokens.refresh_token) {
        console.log("A new refresh token was provided. Updating...");
        tokenUpdatePayload.refreshToken = encrypt(tokens.refresh_token);
      }

      // Update the tokens in your Prisma database
      await prisma.integration.update({
        where: {
          userId_provider: {
            userId: userId,
            provider: "gmail",
          },
        },
        data: tokenUpdatePayload,
      });
      console.log("Successfully updated tokens in the database.");
    });

    // 4. Make the API call
    // The library will now automatically handle the refresh behind the scenes.
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Dynamically get the historyId from the metadata field
    const lastHistoryId = (integration.metadata as any)?.historyId;
    let newMessages: gmail_v1.Schema$Message[] = [];
    let nextHistoryId: string | null | undefined;

    if (lastHistoryId) {
      // --- SUBSEQUENT SYNC LOGIC ---
      console.log(
        `Found existing historyId: ${lastHistoryId}. Performing history sync.`
      );
      const historyResponse = await gmail.users.history.list({
        userId: "me",
        startHistoryId: lastHistoryId,
        historyTypes: ["messageAdded"],
      });

      const historyRecords = historyResponse.data.history;
      if (historyRecords && historyRecords.length > 0) {
        const addedMessages = historyRecords
          .flatMap((record) => record.messagesAdded || [])
          .map((msg) => msg.message!);

        newMessages = addedMessages;
      }
      // The new historyId for the next sync
      nextHistoryId = historyResponse.data.historyId;
    } else {
      // --- FIRST SYNC LOGIC ---
      console.log(
        "No historyId found. Performing first-time sync for recent 20 emails."
      );
      const listResponse = await gmail.users.messages.list({
        userId: "me",
        maxResults: 20,
      });
      newMessages = listResponse.data.messages || [];

      // We MUST get the current historyId to bootstrap future syncs
      const profileResponse = await gmail.users.getProfile({ userId: "me" });
      nextHistoryId = profileResponse.data.historyId;
    }

    if (!nextHistoryId) {
      console.error(
        `Could not determine next historyId for user ${integration.userId}. Aborting sync.`
      );
      return NextResponse.json(
        { error: "Failed to establish sync history." },
        { status: 500 }
      );
    }

    if (newMessages.length > 0) {
      console.log(`Found ${newMessages.length} new message(s) to process.`);
      const emailContentPromises = newMessages.map(async (message) => {
        if (!message.id) return null;
        try {
          const messageResponse = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
          });

          const { payload } = messageResponse.data;
          if (!payload || !payload.headers) return null;

          return {
            id: message.id,
            threadId: message.threadId,
            subject: getHeader(payload.headers, "Subject"),
            from: getHeader(payload.headers, "From"),
            date: getHeader(payload.headers, "Date"),
            snippet: messageResponse.data.snippet,
            body: getEmailBody(payload),
          };
        } catch (error) {
          console.error("Error processing message:", error);
          return null;
        }
      });

      const emails = (await Promise.all(emailContentPromises)).filter(
        (email) => email !== null
      );

      // --- UPDATE DATABASE ---
      // Always update the historyId in the metadata field for the next run.
      await prisma.integration.update({
        where: { id: integration.id },
        data: {
          metadata: {
            ...(integration.metadata as any), // Preserve any other metadata
            historyId: nextHistoryId,
          },
          lastSyncAt: new Date(),
        },
      });

      console.log(
        `Sync complete for user: ${integration.userId}. Next historyId is ${nextHistoryId}.`
      );

      // Normalize Gmail message to common format
      const normalizedEmails = emails.map(parseGmailMessage);

      // Process email with shared AI processing logic
      const results = await Promise.all(
        normalizedEmails.map((email) => processEmailWithAI(email, userId))
      );

      if (results.every((result) => result.success)) {
        return NextResponse.json({
          success: true,
          message: "Gmail email processed successfully.",
          emailIds: results.map((result) => result.emailId),
          aiResponseData: results.map((result) => result.aiResponseData),
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to process some emails.",
          emailIds: results.map((result) => result.emailId),
          aiResponseData: results.map((result) => result.aiResponseData),
        });
      }
    }
  } catch (error: any) {
    // If the error is related to auth (e.g., refresh token revoked), handle it
    if (
      error.code === 401 ||
      (error.response && error.response.status === 401)
    ) {
      // You might want to mark the integration as inactive and prompt the user to reconnect
      await prisma.integration.update({
        where: {
          userId_provider: {
            userId: userId,
            provider: "gmail",
          },
        },
        data: { isActive: false },
      });
      return NextResponse.json(
        {
          error: "Authentication failed. Please reconnect your Gmail account.",
        },
        { status: 401 }
      );
    }

    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
