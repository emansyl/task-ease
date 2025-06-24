import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { processEmailWithAI, NormalizedEmailData } from "@/lib/email-processing";

function parseForwardedEmail(formData: FormData): NormalizedEmailData {
  const textContent = formData.get("text")?.toString() || "";
  const htmlContent = formData.get("html")?.toString() || "";
  const emailBodyToProcess = textContent || htmlContent;
  
  // Extract forwarded email details (this is simplified - you may need more complex parsing)
  const fromHeader = formData.get("from")?.toString() || "Unknown Sender";
  const subjectHeader = formData.get("subject")?.toString() || "(no subject)";
  
  return {
    fromEmail: fromHeader,
    subject: subjectHeader,
    body: emailBodyToProcess,
    receivedAt: new Date(),
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = (await req.formData()) as unknown as FormData;
    console.log("formData", formData);
    
    const toHeader = formData.get("to")?.toString() || "";
    const ccHeader = formData.get("cc")?.toString() || "";

    const forwardingEmailUsernameTo = toHeader.split("@")[0];
    const forwardingEmailUsernameCc = ccHeader.split("@")[0];

    // Parse forwarded email data
    const normalizedEmail = parseForwardedEmail(formData);

    if (!normalizedEmail.body) {
      console.warn("Webhook received empty email body.");
      return NextResponse.json({ error: "Empty email body" }, { status: 400 });
    }

    // Find user by forwarding email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { forwardingemail: forwardingEmailUsernameTo },
          { forwardingemail: forwardingEmailUsernameCc },
        ],
      },
    });

    if (!user) {
      console.warn(
        `No user found for forwarding email username: ${forwardingEmailUsernameTo} or ${forwardingEmailUsernameCc}`
      );
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Process email with shared AI processing logic
    const result = await processEmailWithAI(normalizedEmail, user.id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Email processed successfully.",
        emailId: result.emailId,
        data: result.aiResponseData,
      });
    } else {
      return NextResponse.json(
        { error: result.errorMessage || "Failed to process email" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Inbound email processing error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
