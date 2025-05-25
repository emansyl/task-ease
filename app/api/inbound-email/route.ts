import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { extractInformationFromEmail, ExtractedEmailData } from "@/lib/ai";
import { EmailCategory, Urgency } from "@/app/generated/prisma";

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

function mapCategoryToEnum(categoryString?: string): EmailCategory {
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
    return EmailCategory.Other; // Default if mapping fails
  }
}

export async function POST(req: NextRequest) {
  let emailRecordId: string | null = null;
  let success = false;
  let errorMessage: string | null = null;
  let aiResponseData: Partial<ExtractedEmailData> = {};
  const receivedTimestamp = new Date();

  const formData = await req.formData();
  const textContent = formData.get("text")?.toString() || "";
  const htmlContent = formData.get("html")?.toString() || "";
  const emailBodyToProcess = textContent || htmlContent;

  try {
    const toHeader = formData.get("to")?.toString() || "";
    const subjectHeader = formData.get("subject")?.toString() || "(no subject)";

    const recipient = toHeader.toLowerCase().split(",")[0].trim();
    const forwardingEmailUsername = recipient.split("@")[0];

    if (!emailBodyToProcess) {
      console.warn("Webhook received empty email body.");
      // Optionally create a TaskLog entry for empty body
      return NextResponse.json({ error: "Empty email body" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { forwardingemail: forwardingEmailUsername },
    });

    if (!user) {
      console.warn(
        `No user found for forwarding email username: ${forwardingEmailUsername} (derived from ${recipient})`
      );
      // Optionally create a TaskLog entry for user not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Call the AI function (ensure its signature matches this)
    const extractedInfo = await extractInformationFromEmail(emailBodyToProcess);
    aiResponseData = extractedInfo; // Store for logging

    // --- Start Database Transaction ---
    await prisma.$transaction(
      async (tx) => {
        const emailCategory =
          mapCategoryToEnum(extractedInfo.category) || EmailCategory.Other;

        const createdEmail = await tx.email.create({
          data: {
            userId: user.id,
            fromEmail: extractedInfo.details.from || "Unknown Sender",
            originalSubject:
              extractedInfo.details.subject || "(no original subject)",
            summary: extractedInfo.summary,
            originalReceivedAt: extractedInfo.details.received_at
              ? new Date(extractedInfo.details.received_at)
              : receivedTimestamp, // Fallback to processed time
            category: emailCategory,
            processedAt: receivedTimestamp, // When your system processed it
            // tasks, events, keyInformation will be linked below
          },
        });
        emailRecordId = createdEmail.id; // Store for logging

        // Create Tasks
        if (extractedInfo.tasks && extractedInfo.tasks.length > 0) {
          for (const task of extractedInfo.tasks) {
            await tx.task.create({
              data: {
                userId: user.id,
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
                userId: user.id,
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
                userId: user.id,
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
    ); // --- End Database Transaction ---

    success = true;

    // Optional: Send summary email (if re-enabled)
    // if (success && emailRecordId) {
    //   await sendTaskSummaryEmail({
    //     to: user.email,
    //     subject: subjectHeader, // Or extractedInfo.details.subject
    //     summary: extractedInfo.summary,
    //     tasks: extractedInfo.tasks, // You might want to format this better for email
    //   });
    // }
  } catch (err: any) {
    console.error("Inbound email processing error:", err);
    errorMessage = err.message || "Internal server error";
    success = false; // Ensure success is false on error
  } finally {
    // Create TaskLog entry
    // Check if emailRecordId was set within a transaction that might have rolled back
    // For simplicity, we'll log based on initial parsing success or if an email ID was ever obtained.
    // A more robust logging might need to capture emailId outside transaction or handle rollbacks carefully.
    const finalEmailIdForLog =
      success && emailRecordId ? emailRecordId : undefined;
    if (finalEmailIdForLog) {
      await prisma.taskLog
        .create({
          data: {
            userId:
              (
                await prisma.user.findUnique({
                  where: {
                    forwardingemail: (formData.get("to")?.toString() || "")
                      .toLowerCase()
                      .split(",")[0]
                      .trim()
                      .split("@")[0],
                  },
                })
              )?.id || "unknown_user",
            emailId: finalEmailIdForLog, // This might be null if email creation failed or was rolled back
            prompt: emailBodyToProcess.substring(0, 2000), // Store a snippet or full body if your DB can handle it
            response: aiResponseData
              ? JSON.stringify(aiResponseData).substring(0, 5000)
              : null,
            success: success,
            error: errorMessage,
          },
        })
        .catch((logErr) => console.error("Failed to create TaskLog:", logErr));
    }
  }

  if (success) {
    return NextResponse.json({
      success: true,
      message: "Email processed successfully.",
      emailId: emailRecordId,
      data: aiResponseData,
    });
  } else {
    return NextResponse.json(
      { error: errorMessage || "Failed to process email" },
      { status: 500 }
    );
  }
}
