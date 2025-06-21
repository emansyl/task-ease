import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        userId: userId,
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

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const transformedTask = {
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
    };

    return NextResponse.json(transformedTask);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, dueDate, description, urgency, status } = body;

    // Validate optional fields
    if (dueDate && isNaN(Date.parse(dueDate))) {
      return NextResponse.json(
        { error: "Invalid due date format" },
        { status: 400 }
      );
    }

    if (urgency && !["low", "medium", "high"].includes(urgency)) {
      return NextResponse.json(
        { error: "Urgency must be low, medium, or high" },
        { status: 400 }
      );
    }

    if (status && !["todo", "in_progress", "complete"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be todo, in_progress, or complete" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (dueDate !== undefined)
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (description !== undefined) updateData.description = description;
    if (urgency !== undefined) updateData.urgency = urgency;
    if (status !== undefined) updateData.status = status;

    const updatedTask = await prisma.task.update({
      where: {
        id: params.id,
        userId: userId,
      },
      data: updateData,
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
      id: updatedTask.id,
      emailId: updatedTask.emailId,
      userId: updatedTask.userId,
      title: updatedTask.title,
      dueDate: updatedTask.dueDate?.toISOString() || null,
      description: updatedTask.description,
      urgency: updatedTask.urgency,
      status: updatedTask.status,
      createdAt: updatedTask.createdAt.toISOString(),
      completedAt: updatedTask.completedAt?.toISOString() || null,
    };

    return NextResponse.json(transformedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.task.delete({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting task:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
