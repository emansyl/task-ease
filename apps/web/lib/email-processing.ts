import prisma from "@/lib/prisma";
import { extractInformationFromEmail, ExtractedEmailData } from "@/lib/ai";
import { EmailCategory, EmailStatus, Urgency } from "@/app/generated/prisma";

// Common interface for normalized email data
export interface NormalizedEmailData {
  fromEmail: string;
  subject: string;
  body: string;
  receivedAt?: Date;
}

// AI category mapping
const aiCategoryToPrismaEnumMap: { [key: string]: EmailCategory } = {
  "Academic/Classes": EmailCategory.Academic_Classes,
  "Clubs & Extracurriculars": EmailCategory.Clubs_Extracurriculars,
  "Recruiting & Career": EmailCategory.Recruiting_Career,
  "University Administration": EmailCategory.University_Administration,
  "Social Events": EmailCategory.Social_Events,
  "Work/Internship": EmailCategory.Work_Internship,
  "Personal Finance": EmailCategory.Personal_Finance,
  "General Announcement": EmailCategory.General_Announcement,
  Other: EmailCategory.Other,
};

export function mapCategoryToEnum(categoryString?: string): EmailCategory {
  if (!categoryString) {
    console.warn("Undefined category string received, defaulting to Other.");
    return EmailCategory.Other;
  }

  const prismaCategory = aiCategoryToPrismaEnumMap[categoryString];

  if (prismaCategory) {
    return prismaCategory;
  } else {
    const normalizedCategoryString = categoryString
      .replace(/\//g, "_")
      .replace(/\s&\s/g, "_");
    if (
      Object.values(EmailCategory).includes(
        normalizedCategoryString as EmailCategory
      )
    ) {
      console.warn(
        `Category string "${categoryString}" not in direct map, but matched after normalization to "${normalizedCategoryString}".`
      );
      return normalizedCategoryString as EmailCategory;
    }

    console.warn(
      `Unknown category string: "${categoryString}", not found in map or after normalization. Defaulting to Other.`
    );
    return EmailCategory.Other;
  }
}

export async function createTaskLog(
  userId: string,
  emailId: string | null,
  emailBody: string,
  aiResponseData: Partial<ExtractedEmailData>,
  success: boolean,
  errorMessage: string | null
) {
  try {
    await prisma.taskLog.create({
      data: {
        userId: userId,
        emailId: emailId || "",
        prompt: emailBody.substring(0, 2000),
        response: aiResponseData
          ? JSON.stringify(aiResponseData).substring(0, 5000)
          : null,
        success: success,
        error: errorMessage,
      },
    });
  } catch (logErr) {
    console.error("Failed to create TaskLog:", logErr);
  }
}

export async function processEmailWithAI(
  normalizedEmail: NormalizedEmailData,
  userId: string,
  receivedTimestamp: Date = new Date()
): Promise<{
  success: boolean;
  emailId: string | null;
  errorMessage: string | null;
  aiResponseData: Partial<ExtractedEmailData>;
}> {
  let emailRecordId: string | null = null;
  let success = false;
  let errorMessage: string | null = null;
  let aiResponseData: Partial<ExtractedEmailData> = {};

  try {
    if (!normalizedEmail.body) {
      throw new Error("Empty email body");
    }

    // Create email record with status "pending"
    const createdEmail = await prisma.email.create({
      data: {
        userId: userId,
        status: EmailStatus.pending,
      },
    });
    emailRecordId = createdEmail.id;

    // Call the AI function
    const extractedInfo = await extractInformationFromEmail(
      normalizedEmail.body
    );
    aiResponseData = extractedInfo;

    // Process extracted data in transaction
    await prisma.$transaction(
      async (tx) => {
        const emailCategory =
          mapCategoryToEnum(extractedInfo.category) || EmailCategory.Other;

        if (!emailRecordId) {
          throw new Error("Failed to create email record");
        }

        // Update email record with extracted information
        await tx.email.update({
          where: { id: emailRecordId },
          data: {
            userId: userId,
            fromEmail: normalizedEmail.fromEmail || "Unknown Sender",
            originalSubject: normalizedEmail.subject || "(no subject)",
            summary: extractedInfo.summary,
            originalReceivedAt: normalizedEmail.receivedAt || receivedTimestamp,
            category: emailCategory,
            processedAt: receivedTimestamp,
          },
        });

        // Create Tasks
        if (extractedInfo.tasks && extractedInfo.tasks.length > 0) {
          for (const task of extractedInfo.tasks) {
            await tx.task.create({
              data: {
                userId: userId,
                emailId: createdEmail.id,
                title: task.title,
                dueDate: task.due_date ? new Date(task.due_date) : null,
                description: task.description || null,
                urgency: task.urgency as Urgency,
                linksOrAttachments: {
                  create:
                    task.related_links_or_attachments?.map((loa) => ({
                      type: loa.type,
                      identifier: loa.identifier,
                      description: loa.description,
                    })) || [],
                },
              },
            });
          }
        }

        // Create Events
        if (extractedInfo.events && extractedInfo.events.length > 0) {
          for (const event of extractedInfo.events) {
            await tx.event.create({
              data: {
                userId: userId,
                emailId: createdEmail.id,
                title: event.title,
                startTime: new Date(event.start_time),
                endTime: new Date(event.end_time),
                location: event.location,
                description: event.description,
                isRecurringHint: event.is_recurring_hint,
                linksOrAttachments: {
                  create:
                    event.related_links_or_attachments?.map((loa) => ({
                      type: loa.type,
                      identifier: loa.identifier,
                      description: loa.description,
                    })) || [],
                },
              },
            });
          }
        }

        // Create Key Information
        if (
          extractedInfo.key_information &&
          extractedInfo.key_information.length > 0
        ) {
          for (const ki of extractedInfo.key_information) {
            await tx.keyInformation.create({
              data: {
                userId: userId,
                emailId: createdEmail.id,
                info: ki.info,
                sourceHint: ki.source_hint,
                linksOrAttachments: {
                  create:
                    ki.related_links_or_attachments?.map((loa) => ({
                      type: loa.type,
                      identifier: loa.identifier,
                      description: loa.description,
                    })) || [],
                },
              },
            });
          }
        }
      },
      {
        maxWait: 10000,
        timeout: 10000,
      }
    );

    success = true;
  } catch (err: any) {
    console.error("Email processing error:", err);
    errorMessage = err.message || "Internal server error";
    success = false;
  } finally {
    // Create task log
    await createTaskLog(
      userId,
      emailRecordId,
      normalizedEmail.body,
      aiResponseData,
      success,
      errorMessage
    );
  }

  return {
    success,
    emailId: emailRecordId,
    errorMessage,
    aiResponseData,
  };
}
