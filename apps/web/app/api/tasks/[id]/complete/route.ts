import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const completedTask = await prisma.task.update({
      where: {
        id: params.id,
        userId: userId,
      },
      data: {
        status: "complete",
        completedAt: new Date(),
      },
      include: {
        email: {
          select: {
            id: true,
            originalSubject: true,
            fromEmail: true,
          },
        },
      },
    });

    const transformedTask = {
      id: completedTask.id,
      emailId: completedTask.emailId,
      userId: completedTask.userId,
      title: completedTask.title,
      dueDate: completedTask.dueDate?.toISOString() || null,
      description: completedTask.description,
      urgency: completedTask.urgency,
      status: completedTask.status,
      createdAt: completedTask.createdAt.toISOString(),
      completedAt: completedTask.completedAt?.toISOString() || null,
    };

    return NextResponse.json(transformedTask);
  } catch (error) {
    console.error("Error completing task:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to complete task" },
      { status: 500 }
    );
  }
}
