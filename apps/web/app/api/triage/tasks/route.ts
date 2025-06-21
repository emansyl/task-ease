import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // NOTE: Current schema limitation - The schema doesn't have a specific "triage" status for tasks.
    // This implementation assumes that tasks from emails with status "pending" need triage.
    // Consider adding a "triage" status to the TaskStatus enum or a separate triage table.

    const pendingTriageTasks = await prisma.task.findMany({
      where: {
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
      orderBy: [{ urgency: "desc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    });

    const transformedTasks = pendingTriageTasks.map((task) => ({
      id: task.id,
      emailId: task.emailId,
      userId: task.userId,
      title: task.title,
      dueDate: task.dueDate?.toISOString() || null,
      description: task.description,
      urgency: task.urgency,
      status: task.status,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt?.toISOString() || null,
    }));

    return NextResponse.json(transformedTasks);
  } catch (error) {
    console.error("Error fetching pending triage tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending triage tasks" },
      { status: 500 }
    );
  }
}
