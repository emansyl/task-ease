import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { google } from "googleapis";
import { decrypt, encrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { gmail_v1 } from "googleapis";

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
    if (plainTextPart && plainTextPart.body?.data) {
      return Buffer.from(plainTextPart.body.data, "base64url").toString("utf8");
    }

    // If no plain text, find the HTML part
    let htmlPart = parts.find((part) => part.mimeType === "text/html");
    if (htmlPart && htmlPart.body?.data) {
      // Here you might want to strip HTML tags for a plain text version
      const htmlContent = Buffer.from(htmlPart.body.data, "base64url").toString(
        "utf8"
      );
      return htmlContent; // For simplicity, returning raw HTML. In a real app, you'd sanitize or convert this.
    }
  }

  // If no parts, the body might be in the main payload
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64url").toString("utf8");
  }

  return ""; // Return empty string if no body is found
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // 1. Fetch the integration from Prisma
    const integration = await prisma.integration.findUnique({
      where: {
        userId_provider: {
          userId: user.id,
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
    const accessToken = decrypt(integration.accessToken);
    const refreshToken = decrypt(integration.refreshToken);
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    oauth2Client.on("tokens", async (tokens) => {
      console.log("Google tokens were refreshed for user:", user.id);

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
            userId: user.id,
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

    // STEP 1: List the most recent messages
    const listResponse = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    });

    const messages = listResponse.data.messages;
    if (!messages || messages.length === 0) {
      return NextResponse.json({ emails: [] });
    }

    // STEP 2: Get the full content of each message
    // We'll process multiple messages in parallel for efficiency
    const emailPromises = messages.map(async (message) => {
      if (!message.id) return null;

      const messageResponse = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      const { payload } = messageResponse.data;
      if (!payload || !payload.headers) return null;

      const headers = payload.headers;
      const subject = getHeader(headers, "Subject");
      const from = getHeader(headers, "From");
      const date = getHeader(headers, "Date");
      const body = getEmailBody(payload);

      return {
        id: message.id,
        subject,
        from,
        date,
        snippet: messageResponse.data.snippet,
        body,
      };
    });

    // Wait for all the individual email requests to complete
    const emails = (await Promise.all(emailPromises)).filter(
      (email) => email !== null
    );

    return NextResponse.json({ emails });
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
            userId: user.id,
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
