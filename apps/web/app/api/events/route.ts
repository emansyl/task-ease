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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const whereClause: any = {
      userId: userId,
    };

    if (startDate) {
      whereClause.startTime = {
        ...whereClause.startTime,
        gte: new Date(startDate),
      };
    }

    if (endDate) {
      whereClause.endTime = {
        ...whereClause.endTime,
        lte: new Date(endDate),
      };
    }

    const events = await prisma.event.findMany({
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
      orderBy: [{ startTime: "asc" }, { createdAt: "desc" }],
    });

    const transformedEvents = events.map((event) => ({
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
    }));

    return NextResponse.json(transformedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
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
    const {
      title,
      startTime,
      endTime,
      location,
      description,
      isRecurringHint,
      emailId,
    } = body;

    // Validate required fields
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    if (!startTime || isNaN(Date.parse(startTime))) {
      return NextResponse.json(
        { error: "Start time is required and must be a valid date" },
        { status: 400 }
      );
    }

    if (!endTime || isNaN(Date.parse(endTime))) {
      return NextResponse.json(
        { error: "End time is required and must be a valid date" },
        { status: 400 }
      );
    }

    // Validate that end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        userId,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        description,
        isRecurringHint: isRecurringHint || false,
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

    const transformedEvent = {
      id: newEvent.id,
      userId: newEvent.userId,
      emailId: newEvent.emailId,
      title: newEvent.title,
      startTime: newEvent.startTime.toISOString(),
      endTime: newEvent.endTime.toISOString(),
      location: newEvent.location,
      description: newEvent.description,
      isRecurringHint: newEvent.isRecurringHint,
      createdAt: newEvent.createdAt.toISOString(),
    };

    return NextResponse.json(transformedEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
