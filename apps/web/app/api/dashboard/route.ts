import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch upcoming events (events starting within the next 7 days)
    const upcomingEvents = await prisma.event.findMany({
      where: {
        userId: userId,
        startTime: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
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
      orderBy: {
        startTime: "asc",
      },
      take: 10, // Limit to 10 upcoming events
    });

    // Fetch tasks due soon (due within the next 7 days and not completed)
    const tasksDueSoon = await prisma.task.findMany({
      where: {
        userId: userId,
        status: {
          not: "complete",
        },
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
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
      orderBy: [
        { urgency: "desc" }, // High urgency first
        { dueDate: "asc" }, // Then by due date
      ],
      take: 10, // Limit to 10 tasks
    });

    // Count pending triage emails (emails with status 'pending')
    const pendingTriageCount = await prisma.email.count({
      where: {
        userId: userId,
        status: "pending",
      },
    });

    // Transform the data to match the expected format
    const dashboardData = {
      upcomingEvents: upcomingEvents.map((event) => ({
        id: event.id,
        userId: event.userId,
        emailId: event.emailId,
        title: event.title,
        startTime: event.startTime.toISOString(),
        endTime: event.endTime.toISOString(),
        location: event.location,
        description: event.description,
        isRecurringHint: event.isRecurringHint,
        createdAt: event.createdAt.toISOString(),
      })),
      tasksDueSoon: tasksDueSoon.map((task) => ({
        id: task.id,
        emailId: task.emailId,
        userId: task.userId,
        title: task.title,
        dueDate: task.dueDate?.toISOString() || null,
        description: task.description,
        urgency: task.urgency,
        status: task.status,
        createdAt: task.createdAt.toISOString(),
      })),
      pendingTriageCount,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
