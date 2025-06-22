import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

export type SampleEmailProps = {
  userName: string;
};

export function SampleEmail({ userName }: SampleEmailProps) {
  const previewText = `Project Update and Upcoming Deadlines - Action Required`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Email Header */}
          <Section style={header}>
            <Text style={fromText}>From: project.manager@company.com</Text>
            <Heading style={subject}>Project Update and Upcoming Deadlines - Action Required</Heading>
            <Text style={dateText}>Sent: {new Date().toLocaleDateString()}</Text>
          </Section>

          <Hr style={hr} />

          {/* Email Body */}
          <Section style={content}>
            <Text style={greeting}>Hi {userName},</Text>

            <Text style={paragraph}>
              Hope you're doing well! Quick update on the Johnson project and some important upcoming deadlines.
            </Text>

            <Text style={paragraph}>
              <strong>Urgent:</strong> We need to submit the final proposal by <strong>Thursday, {getThursday()}</strong> at <strong>5:00 PM</strong> - this is high priority and critical for our Q1 targets.
            </Text>

            <Text style={paragraph}>
              Also, don't forget about our team meeting <strong>tomorrow ({getTomorrow()}) at 2:00 PM</strong> in Conference Room B to discuss the quarterly review. We should prepare the presentation slides beforehand - please make sure yours are ready by tomorrow morning.
            </Text>

            <Text style={paragraph}>
              The annual company retreat is scheduled for <strong>Friday, {getNextFriday()}</strong> from <strong>9:00 AM to 5:00 PM</strong> at the downtown hotel. Please confirm your attendance by replying to this email.
            </Text>

            <Text style={paragraph}>
              Finally, a friendly reminder to submit your expense reports by <strong>next Monday ({getNextMonday()})</strong>. The finance team needs these processed before month-end.
            </Text>

            <Text style={paragraph}>
              One more thing - we have a client presentation scheduled for <strong>next Wednesday ({getNextWednesday()}) at 10:30 AM</strong>. This will be in the main conference room and should last about 2 hours.
            </Text>

            <Hr style={hr} />

            <Text style={signature}>
              Best regards,<br />
              Alex Johnson<br />
              Project Manager<br />
              TaskEase Demo Team<br />
              alex.johnson@company.com
            </Text>

            <Hr style={hr} />

            <Section style={footer}>
              <Text style={footerText}>
                🤖 <strong>This is a sample email from TaskEase</strong>
              </Text>
              <Text style={footerText}>
                Forward this email to your TaskEase address to see how our AI extracts tasks and events!
              </Text>
              <Text style={footerText}>
                Expected extractions: 3 tasks, 3 events
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Helper functions for dynamic dates
function getTomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
}

function getThursday(): string {
  const today = new Date();
  const thursday = new Date();
  const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7; // 4 = Thursday
  thursday.setDate(today.getDate() + daysUntilThursday);
  return thursday.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
}

function getNextFriday(): string {
  const today = new Date();
  const friday = new Date();
  const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7; // 5 = Friday
  friday.setDate(today.getDate() + daysUntilFriday);
  return friday.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
}

function getNextMonday(): string {
  const today = new Date();
  const monday = new Date();
  const daysUntilMonday = (1 - today.getDay() + 7) % 7 || 7; // 1 = Monday
  monday.setDate(today.getDate() + daysUntilMonday);
  return monday.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
}

function getNextWednesday(): string {
  const today = new Date();
  const wednesday = new Date();
  const daysUntilWednesday = (3 - today.getDay() + 7) % 7 || 7; // 3 = Wednesday
  wednesday.setDate(today.getDate() + daysUntilWednesday);
  return wednesday.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  border: "1px solid #e1e1e1",
  borderRadius: "8px",
};

const header = {
  marginBottom: "20px",
};

const content = {
  margin: "20px 0",
};

const fromText = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 0 8px",
  lineHeight: "1.4",
};

const subject = {
  color: "#333333",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 8px",
  lineHeight: "1.3",
};

const dateText = {
  color: "#666666",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.4",
};

const greeting = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const signature = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "20px 0",
};

const hr = {
  borderColor: "#e1e1e1",
  margin: "20px 0",
};

const footer = {
  backgroundColor: "#f8f9fa",
  borderRadius: "6px",
  padding: "16px",
  margin: "20px 0 0",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666666",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "4px 0",
  textAlign: "center" as const,
};