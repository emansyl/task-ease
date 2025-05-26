import sgMail from "@sendgrid/mail";

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
