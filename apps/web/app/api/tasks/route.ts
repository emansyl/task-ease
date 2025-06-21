import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const urgency = searchParams.get("urgency");

    const whereClause: any = {
      userId: userId,
    };

    if (status) {
      whereClause.status = status;
    }

    if (urgency) {
      whereClause.urgency = urgency;
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        email: {
          select: {
            id: true,
            originalSubject: true,
            fromEmail: true,
          },
        },
      },
      orderBy: [{ urgency: "desc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    });

    const transformedTasks = tasks.map((task) => ({
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
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, dueDate, description, urgency, emailId } = body;

    // Validate required fields
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

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

    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
        description,
        urgency: urgency || "medium",
        emailId,
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
      id: newTask.id,
      emailId: newTask.emailId,
      userId: newTask.userId,
      title: newTask.title,
      dueDate: newTask.dueDate?.toISOString() || null,
      description: newTask.description,
      urgency: newTask.urgency,
      status: newTask.status,
      createdAt: newTask.createdAt.toISOString(),
      completedAt: newTask.completedAt?.toISOString() || null,
    };

    return NextResponse.json(transformedTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
