import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // NOTE: Current schema limitation - The schema doesn't have a specific "triage" status for tasks.
    // This implementation approves a triage task by updating the associated email status to "processed".
    // Consider adding a "triage" status to the TaskStatus enum or a separate triage table.

    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
        email: {
          status: "pending",
        },
      },
      include: {
        email: {
          select: {
            id: true,
            originalSubject: true,
            fromEmail: true,
            status: true,
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Triage task not found" },
        { status: 404 }
      );
    }

    // Update the email status to "processed" to approve the triage task
    await prisma.email.update({
      where: {
        id: task.emailId!,
      },
      data: {
        status: "processed",
      },
    });

    const approvedTask = await prisma.task.findUnique({
      where: {
        id: id,
      },
      include: {
        email: {
          select: {
            id: true,
            originalSubject: true,
            fromEmail: true,
            status: true,
          },
        },
      },
    });

    const transformedTask = {
      id: approvedTask!.id,
      emailId: approvedTask!.emailId,
      userId: approvedTask!.userId,
      title: approvedTask!.title,
      dueDate: approvedTask!.dueDate?.toISOString() || null,
      description: approvedTask!.description,
      urgency: approvedTask!.urgency,
      status: approvedTask!.status,
      createdAt: approvedTask!.createdAt.toISOString(),
      completedAt: approvedTask!.completedAt?.toISOString() || null,
    };

    return NextResponse.json(transformedTask);
  } catch (error) {
    console.error("Error approving triage task:", error);
    return NextResponse.json(
      { error: "Failed to approve triage task" },
      { status: 500 }
    );
  }
}
