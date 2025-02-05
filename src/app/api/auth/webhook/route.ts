// app/api/auth/webhook/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { type, record } = await req.json();
  const { id, email } = record;

  if (type === "INSERT") {
    await prisma.user.create({
      data: {
        id,
        email,
      },
    });
  }

  return NextResponse.json({ success: true });
}
