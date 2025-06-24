import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const integrations = await prisma.integration.findMany({
      where: {
        userId: user.id,
      },
      // Only select the fields the client needs to know about
      select: {
        provider: true,
        isActive: true,
        email: true, // Useful for display, e.g., "Connected as user@example.com"
        connectedAt: true,
      },
    });

    return NextResponse.json(integrations);
  } catch (error) {
    console.error("Failed to fetch integration statuses:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching integration statuses." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
