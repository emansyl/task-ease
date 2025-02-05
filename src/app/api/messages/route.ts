import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const phoneNumber = searchParams.get("phoneNumber");

  if (!phoneNumber) {
    return NextResponse.json({ error: "Missing phoneNumber" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { phoneNumber },
    include: { messages: true },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user.messages);
}
