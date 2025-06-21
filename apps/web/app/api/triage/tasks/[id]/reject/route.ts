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

    // NOTE: Current schema limitation - The schema doesn't have a specific "triage" status for tasks.
    // This implementation rejects a triage task by updating the associated email status to "error".
    // Consider adding a "triage" status to the TaskStatus enum or a separate triage table.

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
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

    // Update the email status to "error" to reject the triage task
    await prisma.email.update({
      where: {
        id: task.emailId!,
      },
      data: {
        status: "error",
      },
    });

    // Optionally delete the task as well (uncomment if you want to remove rejected tasks)
    // await prisma.task.delete({
    //   where: {
    //     id: params.id,
    //   },
    // });

    return NextResponse.json({ message: "Task rejected successfully" });
  } catch (error) {
    console.error("Error rejecting triage task:", error);
    return NextResponse.json(
      { error: "Failed to reject triage task" },
      { status: 500 }
    );
  }
}
