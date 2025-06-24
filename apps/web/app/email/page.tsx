// app/emails/page.tsx
import { getUserIdFromAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllProcessedEmailsForUser } from "@/lib/data-fetching"; // Use the new function
import EmailListClient from "@/components/emails/EmailList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import GmailCheckButton from "@/components/GmailCheckButton";
import prisma from "@/lib/prisma";

export default async function EmailsPage() {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { emails } = await getAllProcessedEmailsForUser(userId); // Fetch all emails

  // Fetch Gmail integration last sync time
  const gmailIntegration = await prisma.integration.findUnique({
    where: {
      userId_provider: {
        userId,
        provider: "gmail",
      },
    },
    select: { lastSyncAt: true },
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Inbox size={30} /> Processed Emails
        </h1>
        {/* Placeholder for "Forward New Email" instructions or link */}
        {/* You might want to get user's forwarding email here and display it */}
        <Button variant="outline" disabled>
          How to Forward Emails
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Email Digest List</CardTitle>
              <CardDescription>
                Browse and filter emails that have been processed by your AI
                assistant. Click on an email to see a detailed breakdown.
              </CardDescription>
            </div>
            <GmailCheckButton lastSyncAt={gmailIntegration?.lastSyncAt || null} />
          </div>
        </CardHeader>
        <CardContent>
          <EmailListClient initialEmails={emails} />
        </CardContent>
      </Card>
    </div>
  );
}
