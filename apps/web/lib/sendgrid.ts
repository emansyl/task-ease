import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { WelcomeEmail } from "../components/emails/WelcomeEmail";
import { SampleEmail } from "../components/emails/SampleEmail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendTaskSummaryEmail({
  to,
  subject,
  summary,
  tasks,
}: {
  to: string;
  subject: string;
  summary: string;
  tasks: {
    title: string;
    due_date?: string;
    course?: string;
    urgency?: string;
  }[];
}) {
  const textBody = formatSummaryText(summary, tasks);
  const htmlBody = formatSummaryHTML(summary, tasks);

  try {
    await sgMail.send({
      to,
      from: "TaskEase AI <noreply@em7150.usetaskease.com>",
      subject: `RE: ${subject}`, // Consider if "RE:" is always appropriate
      text: textBody,
      html: htmlBody,
    });
    console.log("Task summary email sent successfully to:", to);
  } catch (error: any) {
    console.error("Failed to send task summary email:", error);
    // Depending on your application, you might want to throw the error,
    // return a status, or handle it in another way.
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

function formatSummaryText(summary: string, tasks: any[]) {
  let out = `Summary:\n${summary}\n\nTasks:\n`;
  for (const task of tasks) {
    out += `- ${task.title}`;
    if (task.due_date) out += ` (due ${task.due_date})`;
    if (task.course) out += ` [${task.course}]`;
    if (task.urgency) out += ` – ${task.urgency} urgency`;
    out += "\n";
  }
  return out || "No tasks found.";
}

function formatSummaryHTML(summary: string, tasks: any[]) {
  return `
    <div style="font-family: sans-serif;">
      <h2>Summary</h2>
      <p>${summary}</p>

      <h2>Tasks</h2>
      <ul>
        ${tasks
          .map((task) => {
            const due = task.due_date ? ` (due ${task.due_date})` : "";
            const course = task.course ? ` [${task.course}]` : "";
            const urgency = task.urgency ? ` – ${task.urgency}` : "";
            return `<li>${task.title}${due}${course}${urgency}</li>`;
          })
          .join("")}
      </ul>

      <p style="margin-top:20px; font-size: 0.9em; color: #999;">
        Sent by TaskEase • <a href="https://usetaskease.com/dashboard">View in dashboard</a>
      </p>
    </div>
  `;
}

export async function sendWelcomeEmail({
  to,
  userName,
  userEmail,
  forwardingEmail,
}: {
  to: string;
  userName: string;
  userEmail: string;
  forwardingEmail: string;
}) {
  try {
    const htmlBody = await render(
      WelcomeEmail({
        userName,
        userEmail,
        forwardingEmail,
      })
    );

    await sgMail.send({
      to,
      cc: forwardingEmail, // Automatically forward for AI processing
      from: "TaskEase AI <noreply@em7150.usetaskease.com>",
      subject: "🎉 Welcome to TaskEase - Your AI Assistant is Ready!",
      html: htmlBody,
    });

    console.log("Welcome email sent successfully to:", to);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send welcome email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { success: false, error: error.message };
  }
}

export async function sendSampleEmail({
  to,
  userName,
}: {
  to: string;
  userName: string;
}) {
  try {
    const htmlBody = render(
      SampleEmail({
        userName,
      })
    );

    await sgMail.send({
      to,
      from: "TaskEase Demo <demo@em7150.usetaskease.com>",
      subject: "Project Update and Upcoming Deadlines - Action Required",
      html: await htmlBody,
    });

    console.log("Sample email sent successfully to:", to);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send sample email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { success: false, error: error.message };
  }
}
