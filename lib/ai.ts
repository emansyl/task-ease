import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Ensure your OpenAI API key is set in your environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface LinkOrAttachment {
  type: "link" | "attachment_mentioned";
  identifier: string; // URL or filename
  description: string; // Brief context
}

interface Task {
  title: string;
  due_date: string | null;
  course: string | null;
  urgency: "low" | "medium" | "high";
  description: string;
  related_links_or_attachments?: LinkOrAttachment[];
}

interface Event {
  title: string;
  start_time: string;
  end_time: string;
  location: string | null;
  description: string;
  is_recurring_hint: boolean;
  related_links_or_attachments?: LinkOrAttachment[];
}

interface KeyInformation {
  info: string;
  source_hint?: string;
  related_links_or_attachments?: LinkOrAttachment[];
}

export interface ExtractedEmailData {
  summary: string;
  category: string;
  details: {
    subject: string | null;
    from: string | null;
    received_at: string | null;
  };
  tasks: Task[];
  events: Event[];
  key_information: KeyInformation[];
}

export async function extractInformationFromEmail(
  emailBody: string
): Promise<ExtractedEmailData> {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
You are an expert assistant for college students, designed to extract actionable information and key details from emails.
The current date is ${new Date().toISOString()}. Assume this date for interpreting relative deadlines (e.g., "next Friday", "tomorrow").
The email content provided may be a forwarded email. Your primary goal is to process the *original message content* within that forwarded body.

Your job is to extract the following information:

1.  **Categorize the Email**: Assign a primary category to the original email content. Choose one from: \`Academic/Classes\`, \`Clubs & Extracurriculars\`, \`Recruiting & Career\`, \`University Administration\`, \`Social Events\`, \`Work/Internship\`, \`Personal Finance\`, \`General Announcement\`, \`Other\`. It is very important that the category assigned is *exactly* one of the options provided.
2.  **Provide a Short Summary**: Briefly summarize the main content of the original email (1-2 sentences), focusing on its core purpose.
3.  **Extract Original Email Details**: Identify the sender, subject, and date of the *original email* from its embedded headers within the body.
    * \`subject\`: The subject line of the original email.
    * \`from\`: The sender (name and/or email) of the original email.
    * \`received_at\`: The date and time of the original email, converted to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
4.  **Extract Actionable Tasks**: Identify specific to-do items.
    * \`title\`: Concise task title.
    * \`due_date\`: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) or null. If a date is vague (e.g., "end of next week"), calculate the specific date based on \`${new Date().toISOString()}\`.
    * \`course\`: Associated course code/name (e.g., "CS101", "MS/MBA Program") or null.
    * \`urgency\`: "low" | "medium" | "high" based on proximity of \`due_date\` to \`${new Date().toISOString()}\`.
        * "high": Due within the next 3 full days.
        * "medium": Due within the next 7 full days (but not high).
        * "low": Due further than 7 days out, or no explicit due date.
    * \`description\`: What the user needs to do. Make this self-contained with key context.
    * \`related_links_or_attachments\`: (Optional Array) List any directly relevant URLs or mentioned attachment filenames. For each item, include \`type: "link" | "attachment_mentioned"\`, \`identifier: "URL or filename"\`, and \`description: "Brief context"\`.
**Extract Events for Calendar**: Identify distinct events. An event is something that happens at a specific time and often a specific place, which the student might attend or needs to be aware of for scheduling.
    * **This includes:** Scheduled meetings, lectures, exams, workshops, submission deadlines (if they are "hard" deadlines to note on a calendar), **and explicitly mentioned 'days off', program breaks, or holidays provided in the schedule.**
    * \`title\`: Concise event title. **For explicitly stated 'days off' or breaks, use a clear title like "Day Off - [Program Name/Context if available]" (e.g., "Day Off - MS/MBA Program"), "No Classes", or "Program Holiday". For the start of a program phase like "MBA START", use a title like "MBA START Begins".**
    * \`start_time\`: The start date and time in ISO 8601 format.
    * \`end_time\`: The end date and time in ISO 8601 format.
        * If an event is 'all-day' (like a designated 'day off' or the start day of a program phase) or only a date is provided, \`start_time\` is YYYY-MM-DDT00:00:00Z and \`end_time\` is YYYY-MM-DDT23:59:59Z for that date.
        * For multi-day events (e.g., a course spanning several days or weeks), reflect the start and end accurately, using the specified times for the first and last day if available (e.g., 9 AM on start date to 6 PM on end date for a course).
        * If a start time is given for a single-occurrence event (like a meeting) but no end time/duration, infer a reasonable duration (e.g., 1 hour for a meeting, 2-3 hours for a workshop).
    * \`location\`: Physical or virtual location (string or null).
    * \`description\`: Brief event details. Make this self-contained. For a day off, you can include the original phrasing like "Students have used this day to continue moving in or run administrative errands."
    * \`is_recurring_hint\`: (boolean) Set to \`true\` if the email suggests the event is recurring (e.g., "weekly," "every Monday"). Otherwise, set to \`false\`. Include the recurrence pattern in the \`description\` if found.
    * \`related_links_or_attachments\`: (Optional Array) As defined for Tasks.
6.  **Extract Key Information/Notes**: Capture important non-actionable pieces of information or announcements.
    * For each piece of key info, extract:
        * \`info\`: The piece of information itself.
        * \`source_hint\`: (Optional String) Brief context on where this info was found or its nature (e.g., "General announcement", "Policy change").
        * \`related_links_or_attachments\`: (Optional Array) As defined for Tasks.
7.  **Extract Mentioned Contacts**: Identify key individuals mentioned in the email.
    * For each contact, extract:
        * \`name\`: Full name of the person.
        * \`email\`: Their email address, if available.
        * \`role\`: Their role or affiliation, if mentioned (e.g., "Professor for CS101", "Club President").
8.  **Extract Questions for User**: Identify direct questions posed to the student in the email that likely require a response.
    * For each question, extract:
        * \`question_text\`: The text of the question.
        * \`context_hint\`: (Optional String) Brief context for the question.

Return a single JSON object with the following structure. If any array section (like tasks, events, etc.) has no items, return an empty array for it.
{
  "summary": "...",
  "category": "...",
  "details": { "subject": "...", "from": "...", "received_at": "..." },
  "tasks": [ { "title": "...", "due_date": "...", "course": "...", "urgency": "...", "description": "...", "related_links_or_attachments": [ { "type": "...", "identifier": "...", "description": "..." } ] } ],
  "events": [ { "title": "...", "start_time": "...", "end_time": "...", "location": "...", "description": "...", "is_recurring_hint": false, "related_links_or_attachments": [ { "type": "...", "identifier": "...", "description": "..." } ] } ],
  "key_information": [ { "info": "...", "source_hint": "...", "related_links_or_attachments": [ { "type": "...", "identifier": "...", "description": "..." } ] } ],
}`.trim(),
    },
    {
      role: "user",
      content: `Email body:\n\n${emailBody}`,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Or your preferred model like "gpt-4-turbo"
      temperature: 0.1, // Low temperature for more deterministic extraction
      response_format: { type: "json_object" },
      messages,
    });

    const content = completion.choices[0].message?.content || "{}";
    const parsedContent = JSON.parse(content) as Partial<ExtractedEmailData>; // Use Partial for initial parsing

    // Validate and provide defaults for the full structure
    const validatedData: ExtractedEmailData = {
      summary: parsedContent.summary || "Summary not extracted.",
      category: parsedContent.category || "Other",
      details: parsedContent.details || {
        subject: null,
        from: null,
        received_at: null,
      },
      tasks: parsedContent.tasks || [],
      events: parsedContent.events || [],
      key_information: parsedContent.key_information || [],
    };

    const allowedCategories = [
      "Academic/Classes",
      "Clubs & Extracurriculars",
      "Recruiting & Career",
      "University Administration",
      "Social Events",
      "Work/Internship",
      "Personal Finance",
      "General Announcement",
      "Other",
    ];
    if (!allowedCategories.includes(validatedData.category)) {
      console.warn(
        `LLM returned category '${validatedData.category}' not in allowed list. Defaulting to 'Other' (or it was already default).`
      );
      if (
        parsedContent.category &&
        !allowedCategories.includes(parsedContent.category)
      ) {
        validatedData.category = "Other";
      }
    }

    return validatedData;
  } catch (err) {
    console.error("Failed to call OpenAI API or parse response:", err);
    console.error(
      "Problematic email body (first 500 chars):",
      emailBody.substring(0, 500)
    );
    // Return a structured error response
    const errorResponse: ExtractedEmailData = {
      summary:
        "Error: Could not process email content or AI response was malformed.",
      category: "Other",
      details: {
        subject: "Unknown",
        from: "Unknown",
        received_at: null,
      },
      tasks: [],
      events: [],
      key_information: [],
    };
    return errorResponse;
  }
}
