import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        forwardingemail: true,
        created_at: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      forwardingemail: user.forwardingemail,
      created_at: user.created_at?.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, forwardingemail } = body;

    // Validate input
    if (email && typeof email !== "string") {
      return NextResponse.json(
        { error: "Email must be a string" },
        { status: 400 }
      );
    }

    if (forwardingemail && typeof forwardingemail !== "string") {
      return NextResponse.json(
        { error: "Forwarding email must be a string" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(email && { email }),
        ...(forwardingemail && { forwardingemail }),
      },
      select: {
        id: true,
        email: true,
        forwardingemail: true,
        created_at: true,
      },
    });

    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      forwardingemail: updatedUser.forwardingemail,
      created_at: updatedUser.created_at?.toISOString(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
