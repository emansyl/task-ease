// app/email/[emailId]/page.tsx
import {
  ExtractedEmailData,
  Task as ExtractedTask, // Rename to avoid conflict if Prisma types are also named Task
  Event as ExtractedEvent,
  KeyInformation as ExtractedKeyInfo,
  LinkOrAttachment as ExtractedLinkOrAttachment,
} from "@/lib/types"; // Adjust path to your types file
import EmailHeader from "@/components/email-digest/EmailHeader";
import EmailSummary from "@/components/email-digest/EmailSummary";
import TasksSection from "@/components/email-digest/TasksSection";
import EventsSection from "@/components/email-digest/EventsSection";
import KeyInformationSection from "@/components/email-digest/KeyInformationSection";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { notFound } from "next/navigation"; // For handling email not found
import { getUserIdFromAuth } from "@/lib/auth";

// --- ACTUAL DATA FETCHING ---
async function getProcessedEmailData(
  emailId: string,
  userId: string
): Promise<ExtractedEmailData | null> {
  if (!userId) {
    console.error("getProcessedEmailData called without userId");
    return null;
  }
  if (!emailId) {
    console.error("getProcessedEmailData called without emailId");
    return null;
  }

  try {
    const emailWithRelations = await prisma.email.findUnique({
      where: {
        id: emailId,
        userId: userId, // Ensure the email belongs to the user
      },
      include: {
        tasks: {
          include: { linksOrAttachments: true },
          orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }],
        },
        events: {
          include: { linksOrAttachments: true },
          orderBy: [{ startTime: "asc" }],
        },
        keyInformation: {
          include: { linksOrAttachments: true },
          orderBy: [{ createdAt: "asc" }],
        },
      },
    });

    if (!emailWithRelations) {
      return null; // Email not found or doesn't belong to the user
    }

    // Map Prisma types to your ExtractedEmailData types
    // This ensures consistency and decouples your UI types from Prisma's generated types slightly.
    const mappedTasks: ExtractedTask[] = emailWithRelations.tasks.map(
      (task) => ({
        id: task.id,
        title: task.title,
        due_date: task.dueDate?.toISOString() || null,
        urgency: task.urgency, // Prisma Urgency enum should match your type
        description: task.description || "",
        status: task.status,
        related_links_or_attachments: task.linksOrAttachments.map((loa) => ({
          type: loa.type as "link" | "attachment_mentioned", // Cast if necessary
          identifier: loa.identifier,
          description: loa.description,
        })),
      })
    );

    const mappedEvents: ExtractedEvent[] = emailWithRelations.events.map(
      (event) => ({
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
      })
    );

    const mappedKeyInformation: ExtractedKeyInfo[] =
      emailWithRelations.keyInformation.map((ki) => ({
        id: ki.id,
        info: ki.info,
        source_hint: ki.sourceHint || undefined,
        related_links_or_attachments: ki.linksOrAttachments.map((loa) => ({
          type: loa.type as "link" | "attachment_mentioned",
          identifier: loa.identifier,
          description: loa.description,
        })),
      }));

    const mappedData: ExtractedEmailData = {
      id: emailWithRelations.id,
      summary: emailWithRelations.summary || "No summary available.",
      category: emailWithRelations.category
        ? emailWithRelations.category.replace(/_/g, " ")
        : "Other",
      details: {
        subject: emailWithRelations.originalSubject,
        from: emailWithRelations.fromEmail,
        received_at: emailWithRelations.originalReceivedAt?.toISOString() || "",
      },
      processedAt: emailWithRelations.processedAt.toISOString(),
      tasks: mappedTasks,
      events: mappedEvents,
      key_information: mappedKeyInformation,
      // rawEmailBody: "Fetch separately if needed or include in query if stored directly on Email model",
    };
    return mappedData;
  } catch (error) {
    console.error(
      `Failed to fetch processed email data for emailId ${emailId}:`,
      error
    );
    return null;
  }
}
// --- END ACTUAL DATA FETCHING ---

export default async function EmailDigestPage({
  params,
}: {
  params: Promise<{ emailId: string }>;
}) {
  const { emailId } = await params;
  const userId = await getUserIdFromAuth();
  if (!userId) {
    return notFound();
  }
  console.log("userId", userId);

  const emailData = await getProcessedEmailData(emailId, userId);
  console.log("emailData", emailData);

  if (!emailData) {
    return notFound();
  }

  const rawEmailBodyPlaceholder =
    emailData.rawEmailBody || "Original email body not available in this view.";

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <EmailHeader
        subject={emailData.details.subject}
        from={emailData.details.from}
        receivedAt={emailData.details.received_at}
        category={emailData.category}
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <MailOpen size={16} /> View Original Email (Illustrative)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Original Email Content</DialogTitle>
            <DialogDescription>
              Raw text content of the processed email.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            {rawEmailBodyPlaceholder}
          </div>
        </DialogContent>
      </Dialog>

      <EmailSummary summary={emailData.summary} />

      <Separator />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <EventsSection events={emailData.events} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <TasksSection tasks={emailData.tasks} />
        </div>
      </div>

      <KeyInformationSection keyInformation={emailData.key_information} />
    </div>
  );
}
