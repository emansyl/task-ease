import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";
import { sendSampleEmail } from "@/lib/sendgrid";
import { formatForwardingEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        forwardingemail: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Extract user name from email (before @)
    const userName = user.email.split("@")[0];
    const forwardingEmail = formatForwardingEmail(user.forwardingemail || user.id);

    // Send sample email
    const result = await sendSampleEmail({
      to: user.email,
      userName,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send sample email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sample email sent successfully",
      sentTo: user.email,
      forwardTo: forwardingEmail,
      instructions: `Check your email and forward the sample email to ${forwardingEmail} to test the extraction process.`,
    });
  } catch (error) {
    console.error("Error sending sample email:", error);
    return NextResponse.json(
      { error: "Failed to send sample email" },
      { status: 500 }
    );
  }
}