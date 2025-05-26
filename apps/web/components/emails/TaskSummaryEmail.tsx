import * as React from "react";
import { Html, Head, Preview, Section, Text } from "@react-email/components";

export type TaskSummaryEmailProps = {
  summary: string;
  tasks: {
    title: string;
    due_date?: string | null;
    urgency?: string;
    description?: string;
  }[];
};

export function TaskSummaryEmail({ summary, tasks }: TaskSummaryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Here’s a summary of your tasks</Preview>
      <Section style={{ fontFamily: "sans-serif", padding: "24px" }}>
        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Summary</Text>
        <Text>{summary}</Text>

        <Text
          style={{ fontSize: "16px", fontWeight: "bold", marginTop: "24px" }}
        >
          Tasks
        </Text>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "16px" }}>
              <Text>
                <strong>{task.title}</strong>
              </Text>
              {task.description && <Text>{task.description}</Text>}
              <Text style={{ color: "#555" }}>
                {task.due_date ? `Due ${task.due_date}` : "No due date"} •{" "}
                {task.urgency} urgency
              </Text>
            </li>
          ))}
        </ul>
      </Section>
    </Html>
  );
}
