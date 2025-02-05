import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import twilio from "twilio";
import { getAIResponse } from "../../../lib/openai";
// Twilio Client Setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

async function sendWhatsAppMessage(to: string, message: string) {
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_WHATSAPP_NUMBER!,
    to: `whatsapp:${to}`,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const phoneNumber = formData.get("From")?.toString().split("+")[1];
    const message = formData.get("Body")?.toString();
    if (!phoneNumber || !message) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    console.log(`📩 Received WhatsApp message from ${phoneNumber}: ${message}`);

    // Store message in database
    const user = await prisma.user.upsert({
      where: { phoneNumber: phoneNumber },
      update: {},
      create: { phoneNumber: phoneNumber },
    });

    await prisma.message.create({
      data: { userId: user.id, text: message },
    });

    // Send user message to OpenAI
    const aiResponse = await getAIResponse(message, user.id);
    console.log("🤖 OpenAI Response:", aiResponse);

    // Save AI response in database
    await prisma.message.create({
      data: { userId: user.id, text: aiResponse, isBot: true },
    });

    // Send OpenAI response back to user
    await sendWhatsAppMessage(phoneNumber, aiResponse);

    return NextResponse.json({ message: "AI response sent to user" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
