// app/api/user/sync/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { id, email } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (existingUser) {
    return NextResponse.json({ status: "already exists" });
  }

  const baseAlias = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const aliasSuffix = id.slice(0, 4);
  const forwardingEmail = `${baseAlias}-${aliasSuffix}`;

  await prisma.user.create({
    data: {
      id,
      email,
      forwardingemail: forwardingEmail,
    },
  });

  return NextResponse.json({ status: "created" });
}
