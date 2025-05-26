import { TaskStatus } from "@/app/generated/prisma";

// lib/types.ts
export interface LinkOrAttachment {
  type: "link" | "attachment_mentioned";
  identifier: string; // URL or filename
  description: string;
}

export interface Task {
  id: string; // From database
  title: string;
  due_date: string | null; // ISO string
  urgency: "low" | "medium" | "high";
  description: string;
  related_links_or_attachments?: LinkOrAttachment[];
  status?: TaskStatus;
  completed_at?: string | null;
}

export interface Event {
  id: string; // From database
  title: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
  location: string | null;
  description: string;
  is_recurring_hint: boolean;
  related_links_or_attachments?: LinkOrAttachment[];
}

export interface KeyInformation {
  id: string; // From database
  info: string;
  source_hint?: string;
  related_links_or_attachments?: LinkOrAttachment[];
}

export interface ExtractedEmailData {
  id: string; // ID of the Email record in your DB
  summary: string;
  category: string; // e.g., "Academic/Classes"
  details: {
    subject: string | null;
    from: string | null;
    received_at: string | null; // ISO string of original email
  };
  tasks: Task[];
  events: Event[];
  key_information: KeyInformation[];
  rawEmailBody?: string; // For the "View Original Email" feature
  processedAt?: string; // ISO string of when your system processed it
}

export interface ProcessedEmailListItem {
  id: string; // ID of the Email record in your DB
  originalSubject: string | null;
  fromEmail: string | null;
  category: string; // e.g., "Academic/Classes"
  originalReceivedAt: string | null; // ISO string
  processedAt: string; // ISO string
  taskCount: number;
  eventCount: number;
}
