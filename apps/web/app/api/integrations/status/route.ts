import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const integrations = await prisma.integration.findMany({
      where: {
        userId: userId,
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
