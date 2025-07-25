import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = await prisma.email.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        tasks: {
          select: {
            id: true,
            title: true,
            dueDate: true,
            description: true,
            urgency: true,
            status: true,
            createdAt: true,
            completedAt: true,
          },
        },
        events: {
          select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            location: true,
            description: true,
            isRecurringHint: true,
            createdAt: true,
          },
        },
      },
    });

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const transformedEmail = {
      id: email.id,
      userId: email.userId,
      fromEmail: email.fromEmail,
      originalSubject: email.originalSubject,
      summary: email.summary,
      category: email.category,
      status: email.status,
      originalReceivedAt: email.originalReceivedAt?.toISOString() || null,
      processedAt: email.processedAt.toISOString(),
      tasks: email.tasks.map((task) => ({
        id: task.id,
        emailId: email.id,
        userId: email.userId,
        title: task.title,
        dueDate: task.dueDate?.toISOString() || null,
        description: task.description,
        urgency: task.urgency,
        status: task.status,
        createdAt: task.createdAt.toISOString(),
        completedAt: task.completedAt?.toISOString() || null,
      })),
      events: email.events.map((event) => ({
        id: event.id,
        userId: email.userId,
        emailId: email.id,
        title: event.title,
        startTime: event.startTime.toISOString(),
        endTime: event.endTime.toISOString(),
        location: event.location,
        description: event.description,
        isRecurringHint: event.isRecurringHint,
        createdAt: event.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(transformedEmail);
  } catch (error) {
    console.error("Error fetching email:", error);
    return NextResponse.json(
      { error: "Failed to fetch email" },
      { status: 500 }
    );
  }
}
