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
  Button,
  Hr,
  Row,
  Column,
} from "@react-email/components";

export type WelcomeEmailProps = {
  userName: string;
  userEmail: string;
  forwardingEmail: string;
};

export function WelcomeEmail({
  userName,
  userEmail,
  forwardingEmail,
}: WelcomeEmailProps) {
  const previewText = `Welcome to TaskEase! Your AI assistant is ready to help you stay organized.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>🎉 Welcome to TaskEase!</Heading>
            <Text style={subtitle}>
              Your AI-powered email assistant is ready to help you stay organized
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              Welcome to TaskEase! We're excited to help you transform your emails into actionable tasks and events automatically.
            </Text>

            {/* Auto-processing notification */}
            <Section style={autoProcessingNote}>
              <Text style={autoProcessingText}>
                🤖 <strong>This email is being automatically processed!</strong> Our AI is extracting the sample tasks and events below and adding them to your dashboard right now.
              </Text>
            </Section>

            {/* Forwarding Email Section */}
            <Section style={forwardingSection}>
              <Heading style={h2}>📧 Your Unique Forwarding Address</Heading>
              <Text style={paragraph}>
                Forward emails to this address and we'll extract tasks and events for you:
              </Text>
              <Section style={emailBox}>
                <Text style={forwardingEmailText}>{forwardingEmail}</Text>
              </Section>
              <Text style={smallText}>
                Copy this address and set up email forwarding in your email client.
              </Text>
            </Section>

            {/* Actual Content for AI Processing */}
            <Section style={contentSection}>
              <Heading style={h2}>📋 Getting Started with TaskEase</Heading>
              <Text style={paragraph}>
                To help you get started, here are some sample tasks and events that our AI will extract from this email:
              </Text>

              <Text style={paragraph}>
                <strong>Important Tasks:</strong>
              </Text>
              <Text style={paragraph}>
                • Please complete your TaskEase profile setup by tomorrow - this is high priority to ensure all features work correctly.
              </Text>
              <Text style={paragraph}>
                • Review the email forwarding guide by Friday to set up automatic processing for your important emails.
              </Text>
              <Text style={paragraph}>
                • Submit feedback about your TaskEase experience by next Monday to help us improve the platform.
              </Text>

              <Text style={paragraph}>
                <strong>Upcoming Events:</strong>
              </Text>
              <Text style={paragraph}>
                We've scheduled a TaskEase onboarding webinar for tomorrow at 2:00 PM - 3:00 PM. This optional session will walk you through advanced features and best practices.
              </Text>
              <Text style={paragraph}>
                There's also a TaskEase user community meetup next Friday from 10:00 AM to 12:00 PM where you can connect with other users and share tips.
              </Text>
              <Text style={paragraph}>
                Finally, we have a product feedback session scheduled for next Tuesday at 3:30 PM - 4:30 PM where you can share your thoughts directly with our team.
              </Text>
            </Section>

            {/* Preview Section */}
            <Section style={previewSection}>
              <Heading style={h2}>🤖 What Our AI Extracted</Heading>
              <Text style={paragraph}>
                From the content above, TaskEase AI will automatically extract and organize:
              </Text>

              {/* Sample Tasks */}
              <Section style={sampleSection}>
                <Heading style={h3}>📋 Tasks (3 extracted)</Heading>
                <Row style={taskRow}>
                  <Column style={taskItem}>
                    <Text style={taskTitle}>Complete TaskEase profile setup</Text>
                    <Text style={taskMeta}>Due: Tomorrow • High Priority</Text>
                  </Column>
                </Row>
                <Row style={taskRow}>
                  <Column style={taskItem}>
                    <Text style={taskTitle}>Review email forwarding guide</Text>
                    <Text style={taskMeta}>Due: Friday • Medium Priority</Text>
                  </Column>
                </Row>
                <Row style={taskRow}>
                  <Column style={taskItem}>
                    <Text style={taskTitle}>Submit TaskEase feedback</Text>
                    <Text style={taskMeta}>Due: Next Monday • Low Priority</Text>
                  </Column>
                </Row>
              </Section>

              {/* Sample Events */}
              <Section style={sampleSection}>
                <Heading style={h3}>📅 Events (3 extracted)</Heading>
                <Row style={eventRow}>
                  <Column style={eventItem}>
                    <Text style={eventTitle}>TaskEase Onboarding Webinar</Text>
                    <Text style={eventMeta}>Tomorrow, 2:00 PM - 3:00 PM</Text>
                  </Column>
                </Row>
                <Row style={eventRow}>
                  <Column style={eventItem}>
                    <Text style={eventTitle}>TaskEase User Community Meetup</Text>
                    <Text style={eventMeta}>Next Friday, 10:00 AM - 12:00 PM</Text>
                  </Column>
                </Row>
                <Row style={eventRow}>
                  <Column style={eventItem}>
                    <Text style={eventTitle}>Product Feedback Session</Text>
                    <Text style={eventMeta}>Next Tuesday, 3:30 PM - 4:30 PM</Text>
                  </Column>
                </Row>
              </Section>

              <Text style={paragraph} >
                <strong>✨ Check your dashboard to see these items appear automatically!</strong>
              </Text>
            </Section>

            {/* Quick Start Guide */}
            <Section style={guideSection}>
              <Heading style={h2}>🚀 Quick Start Guide</Heading>
              <Text style={stepText}>
                <strong>Step 1:</strong> Set up email forwarding to {forwardingEmail}
              </Text>
              <Text style={stepText}>
                <strong>Step 2:</strong> Forward or send emails to your TaskEase address
              </Text>
              <Text style={stepText}>
                <strong>Step 3:</strong> Check your dashboard for extracted tasks and events
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href="https://usetaskease.com/dashboard">
                Open Your Dashboard
              </Button>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                Need help setting up email forwarding? Check out our{" "}
                <a href="https://usetaskease.com/help" style={link}>
                  setup guide
                </a>
                .
              </Text>
              <Text style={footerText}>
                Have questions? Reply to this email and we'll help you get started.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#ffffff",
  borderRadius: "8px 8px 0 0",
  padding: "32px 32px 16px",
  textAlign: "center" as const,
};

const content = {
  backgroundColor: "#ffffff",
  borderRadius: "0 0 8px 8px",
  padding: "0 32px 32px",
};

const h1 = {
  color: "#333333",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px",
  lineHeight: "1.3",
};

const h2 = {
  color: "#333333",
  fontSize: "20px",
  fontWeight: "600",
  margin: "32px 0 16px",
  lineHeight: "1.3",
};

const h3 = {
  color: "#333333",
  fontSize: "16px",
  fontWeight: "600",
  margin: "24px 0 12px",
  lineHeight: "1.3",
};

const subtitle = {
  color: "#666666",
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.4",
};

const paragraph = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const forwardingSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const emailBox = {
  backgroundColor: "#ffffff",
  border: "2px solid #007AFF",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const forwardingEmailText = {
  color: "#007AFF",
  fontSize: "18px",
  fontWeight: "600",
  fontFamily: "monospace",
  margin: "0",
};

const autoProcessingNote = {
  backgroundColor: "#e6f7ff",
  border: "2px solid #40a9ff",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const autoProcessingText = {
  color: "#0050b3",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  lineHeight: "1.5",
};

const contentSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const previewSection = {
  margin: "32px 0",
};

const sampleSection = {
  margin: "24px 0",
};

const taskRow = {
  marginBottom: "12px",
};

const taskItem = {
  backgroundColor: "#f0f8ff",
  borderLeft: "4px solid #007AFF",
  padding: "12px 16px",
  borderRadius: "0 6px 6px 0",
};

const taskTitle = {
  color: "#333333",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
  lineHeight: "1.3",
};

const taskMeta = {
  color: "#666666",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.2",
};

const eventRow = {
  marginBottom: "12px",
};

const eventItem = {
  backgroundColor: "#f0fff4",
  borderLeft: "4px solid #34C759",
  padding: "12px 16px",
  borderRadius: "0 6px 6px 0",
};

const eventTitle = {
  color: "#333333",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
  lineHeight: "1.3",
};

const eventMeta = {
  color: "#666666",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.2",
};

const guideSection = {
  backgroundColor: "#fff8e1",
  borderRadius: "8px",
  padding: "24px",
  margin: "32px 0",
};

const stepText = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "8px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#007AFF",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const hr = {
  borderColor: "#e1e1e1",
  margin: "32px 0",
};

const footer = {
  margin: "32px 0 0",
};

const footerText = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "8px 0",
  textAlign: "center" as const,
};

const smallText = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "1.4",
  margin: "8px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#007AFF",
  textDecoration: "underline",
};