// app/actions/eventActions.ts (or add to an existing actions file)
"use server";

import * as ics from "ics"; // Import the library
import { EventAttributes } from "ics"; // Type for event attributes
import { getUserIdFromAuth } from "@/lib/auth";

interface GenerateIcsResult {
  success: boolean;
  icsContent?: string;
  filename?: string;
  message?: string;
  error?: string;
}

interface EventForIcs {
  id: string;
  title: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
  location: string | null;
  description: string;
}

export async function generateEventIcs(
  eventData: EventForIcs
): Promise<GenerateIcsResult> {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    return { success: false, error: "User not authenticated." };
  }

  if (!eventData) {
    return { success: false, error: "Event data is required." };
  }

  try {
    const start = new Date(eventData.start_time);
    const end = new Date(eventData.end_time);

    // Convert dates to array format [year, month, day, hour, minute] for ics library
    // Note: ics library months are 1-12
    const startArray: [number, number, number, number, number] = [
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
    ];
    const endArray: [number, number, number, number, number] = [
      end.getUTCFullYear(),
      end.getUTCMonth() + 1,
      end.getUTCDate(),
      end.getUTCHours(),
      end.getUTCMinutes(),
    ];

    const eventAttributes: EventAttributes = {
      title: eventData.title,
      start: startArray,
      end: endArray,
      // startOutputType: 'utc', // Specify that the times are UTC if they are
      // endOutputType: 'utc',
      description: eventData.description,
      location: eventData.location || undefined,
      // organizer: { name: 'Your App Name', email: 'organizer@example.com' }, // Optional
      // attendees: [
      //   { name: 'User', email: 'user@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
      // ], // Optional
      uid: eventData.id, // Use event ID as UID for uniqueness
    };

    const { error, value } = ics.createEvent(eventAttributes);

    if (error) {
      console.error("Error creating ICS:", error);
      return { success: false, error: "Failed to generate iCalendar event." };
    }

    const filename = `${eventData.title.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}_${start.toISOString().split("T")[0]}.ics`;

    return { success: true, icsContent: value, filename };
  } catch (e: any) {
    console.error("Exception in generateEventIcs:", e);
    return {
      success: false,
      error: e.message || "An unexpected error occurred.",
    };
  }
}
