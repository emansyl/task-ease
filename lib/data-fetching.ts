// lib/data-fetching.ts
// ... (existing imports: prisma, Prisma types, UI types, date-fns functions)
import { ProcessedEmailListItem, Event as UIEvent } from "@/lib/types"; // Your UI Event type
import prisma from "@/lib/prisma";
import { startOfDay, subMonths } from "date-fns";

export interface GetAllEventsResult {
  events: UIEvent[];
}

export async function getAllEventsForUser(
  userId: string
): Promise<GetAllEventsResult> {
  if (!userId) {
    return { events: [] };
  }

  try {
    const threeMonthsAgo = startOfDay(subMonths(new Date(), 3)); // Fetch events from last 3 months onwards

    const eventsFromDb = await prisma.event.findMany({
      where: {
        userId,
        // Fetch events starting from a reasonable past date to cover ongoing or recent past events
        // and all future events. Client-side will do finer-grained filtering.
        startTime: {
          gte: threeMonthsAgo, // Example: fetch events from the last 3 months onwards
        },
        // OR you might decide to fetch ALL events and let client handle everything,
        // but for very large datasets, some broad server-side windowing is good.
        // For MVP, fetching all future events and recent past might be:
        // startTime: { gte: subMonths(new Date(), 1) } // From 1 month ago
      },
      orderBy: [
        // Default sort for initial load
        { startTime: "asc" },
        { createdAt: "desc" },
      ],
      include: { linksOrAttachments: true },
    });

    const uiEvents: UIEvent[] = eventsFromDb.map((event) => ({
      id: event.id,
      title: event.title,
      start_time: event.startTime.toISOString(),
      end_time: event.endTime.toISOString(),
      location: event.location || null,
      description: event.description || "",
      is_recurring_hint: event.isRecurringHint,
      related_links_or_attachments: event.linksOrAttachments.map((loa) => ({
        type: loa.type as "link" | "attachment_mentioned",
        identifier: loa.identifier,
        description: loa.description,
      })),
    }));

    return {
      events: uiEvents,
    };
  } catch (error) {
    console.error("Failed to fetch all events:", error);
    return { events: [] };
  }
}

export interface GetAllProcessedEmailsResult {
  emails: ProcessedEmailListItem[];
}

export async function getAllProcessedEmailsForUser(
  userId: string
): Promise<GetAllProcessedEmailsResult> {
  if (!userId) {
    return { emails: [] };
  }

  try {
    const emailsFromDb = await prisma.email.findMany({
      where: { userId },
      select: {
        id: true,
        originalSubject: true,
        fromEmail: true,
        category: true,
        originalReceivedAt: true,
        processedAt: true,
        _count: { select: { tasks: true, events: true } },
      },
      orderBy: {
        processedAt: "desc", // Default sort
      },
    });

    const processedEmails: ProcessedEmailListItem[] = emailsFromDb.map(
      (email) => ({
        id: email.id,
        originalSubject: email.originalSubject,
        fromEmail: email.fromEmail,
        category: email.category ? email.category.replace(/_/g, " ") : "Other",
        originalReceivedAt: email.originalReceivedAt.toISOString(),
        processedAt: email.processedAt.toISOString(),
        taskCount: email._count.tasks,
        eventCount: email._count.events,
      })
    );

    return {
      emails: processedEmails,
    };
  } catch (error) {
    console.error("Failed to fetch all processed emails:", error);
    return { emails: [] };
  }
}
