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

    const event = await prisma.event.findFirst({
      where: {
        id: id,
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

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const transformedEvent = {
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
    };

    return NextResponse.json(transformedEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    const { id } = await params;

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
    } = body;

    // Validate optional fields
    if (startTime && isNaN(Date.parse(startTime))) {
      return NextResponse.json(
        { error: "Invalid start time format" },
        { status: 400 }
      );
    }

    if (endTime && isNaN(Date.parse(endTime))) {
      return NextResponse.json(
        { error: "Invalid end time format" },
        { status: 400 }
      );
    }

    // Validate that end time is after start time if both are provided
    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (startTime !== undefined) updateData.startTime = new Date(startTime);
    if (endTime !== undefined) updateData.endTime = new Date(endTime);
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    if (isRecurringHint !== undefined)
      updateData.isRecurringHint = isRecurringHint;

    const updatedEvent = await prisma.event.update({
      where: {
        id: id,
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

    const transformedEvent = {
      id: updatedEvent.id,
      userId: updatedEvent.userId,
      emailId: updatedEvent.emailId,
      title: updatedEvent.title,
      startTime: updatedEvent.startTime.toISOString(),
      endTime: updatedEvent.endTime.toISOString(),
      location: updatedEvent.location,
      description: updatedEvent.description,
      isRecurringHint: updatedEvent.isRecurringHint,
      createdAt: updatedEvent.createdAt.toISOString(),
    };

    return NextResponse.json(transformedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.event.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting event:", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
