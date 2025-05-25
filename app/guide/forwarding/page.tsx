// app/guide/forwarding/page.tsx
import { getUserIdFromAuth } from "@/lib/auth"; // Assuming you have this
import prisma from "@/lib/prisma"; // Assuming you have this
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb, Mail, ExternalLink, Copy, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // For copy button if made client component

import CopyForwardingEmailDisplay from "@/components/dashboard/CopyForwardingEmailButton";

import React from "react";

export const metadata = {
  title: "How to Forward Emails | TaskEase AI",
  description:
    "Learn how to forward your emails to TaskEase AI for automatic processing.",
};

export default async function ForwardingGuidePage() {
  const userId = await getUserIdFromAuth();
  let userForwardingEmail: string | null = null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { forwardingemail: true },
    });
    userForwardingEmail = user?.forwardingemail || null;
  }

  const PlaceholderScreenshot = ({
    alt,
    src = "/placeholder-image.svg",
    caption,
  }: {
    alt: string;
    src?: string;
    caption?: string;
  }) => (
    <div className="my-4 p-2 border rounded-md bg-muted text-center">
      <img
        src={src}
        alt={alt}
        className="mx-auto max-w-full h-auto rounded sm:max-w-md"
      />
      {caption && (
        <p className="text-xs text-muted-foreground mt-1">{caption}</p>
      )}
      <p className="text-sm font-semibold mt-1">
        (Illustrative Screenshot for {alt})
      </p>
    </div>
  );

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          How to Forward Emails to TaskEase AI
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Unlock the power of automatic organization by sending your important
          emails to us!
        </p>
      </div>

      <CopyForwardingEmailDisplay email={userForwardingEmail || ""} />

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>General Forwarding Tips!</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-1 mt-1 text-sm">
            <li>
              Always use your email client's <strong>"Forward"</strong> option.
            </li>
            <li>
              If available, "Forward as attachment" or ensuring the original
              email is fully included is best. Standard forwarding usually works
              well.
            </li>
            <li>
              Forward emails containing tasks, deadlines, event details, and
              important announcements.
            </li>
            <li>
              We only process the content of the emails you forward. For more
              details, see our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Setting Up Automatic Forwarding (Recommended)</CardTitle>
          <CardDescription>
            For a hands-free experience, set up rules or filters in your email
            client to automatically forward relevant emails. This is more
            efficient than manually forwarding each one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2">
            The key is to create filters that identify emails you typically want
            TaskEase AI to process (e.g., from university domains, containing
            specific keywords like "assignment" or "meeting").
          </p>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Gmail Automatic Forwarding & Verification</AlertTitle>
            <AlertDescription>
              Gmail's automatic forwarding requires a verification step. When
              you add your TaskEase AI address, Gmail sends a confirmation
              email. For now, TaskEase AI doesn't have a built-in way to surface
              this verification code back to you easily. Consider using manual
              forwarding or Gmail's "Filter to Forward" feature which sometimes
              has a less stringent verification, or check back later as we
              improve this integration. Manually forwarding important emails or
              using detailed filters (described below) is highly reliable.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {/* Gmail Instructions */}
        <Card>
          <AccordionItem value="gmail" className="border-b-0">
            <CardHeader className="p-0">
              <AccordionTrigger className="flex items-center justify-between w-full p-6 hover:no-underline">
                <div className="text-left">
                  <CardTitle>Gmail (Desktop & Mobile)</CardTitle>
                  <CardDescription className="mt-1">
                    Manual and rule-based forwarding.
                  </CardDescription>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent className="p-6 pt-0">
              <h4 className="font-semibold mb-2">
                Automatic Forwarding with Filters (Desktop):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
                <li>
                  Open Gmail, click Settings (⚙️) &rarr; "See all settings".
                </li>
                <li>Go to the "Filters and Blocked Addresses" tab.</li>
                <li>Click "Create a new filter".</li>
                <li>
                  Set criteria (e.g., From: `professor@*.edu`, Has the words:
                  `syllabus OR assignment OR deadline`).
                </li>
                <li>Click "Create filter".</li>
                <li>
                  Check "Forward it to:" and add your TaskEase AI address:{" "}
                  <code className="text-xs bg-muted p-0.5 rounded">
                    {userForwardingEmail || "[Your TaskEase AI Address]"}
                  </code>
                  . You might need to add and verify it first under "Forwarding
                  and POP/IMAP" if this option isn't available directly.
                </li>
                <li>Click "Create filter".</li>
              </ol>
              <PlaceholderScreenshot
                alt="Gmail filter setup"
                caption="Example of Gmail filter creation screen."
              />

              <h4 className="font-semibold mb-2 mt-4">
                Manual Forwarding (Desktop):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
                <li>Open the email, click More (⋮) &rarr; "Forward".</li>
                <li>Enter your TaskEase AI address in the "To" field. Send.</li>
              </ol>

              <h4 className="font-semibold mb-2 mt-4">
                Manual Forwarding (Mobile App):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Open email, tap More (⋮), tap "Forward".</li>
                <li>Enter your TaskEase AI address. Send.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Card>

        {/* Outlook Instructions */}
        <Card>
          <AccordionItem value="outlook" className="border-b-0">
            <CardHeader className="p-0">
              <AccordionTrigger className="flex items-center justify-between w-full p-6 hover:no-underline">
                <div className="text-left">
                  <CardTitle>Outlook (Outlook.com & Desktop App)</CardTitle>
                  <CardDescription className="mt-1">
                    Using rules for automatic forwarding.
                  </CardDescription>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent className="p-6 pt-0">
              <h4 className="font-semibold mb-2">
                Automatic Forwarding with Rules (Outlook.com):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
                <li>
                  Go to Outlook.com, click Settings (⚙️) &rarr; "View all
                  Outlook settings".
                </li>
                <li>
                  Navigate to Mail &rarr; "Rules" &rarr; "+ Add new rule".
                </li>
                <li>Name your rule (e.g., "Forward to TaskEase").</li>
                <li>
                  Add conditions (e.g., From specific senders, keywords in
                  subject/body).
                </li>
                <li>
                  Add action: "Forward to" and enter{" "}
                  <code className="text-xs bg-muted p-0.5 rounded">
                    {userForwardingEmail || "[Your TaskEase AI Address]"}
                  </code>
                  .
                </li>
                <li>
                  Save the rule. Consider enabling "Stop processing more rules"
                  if applicable.
                </li>
              </ol>
              <PlaceholderScreenshot
                alt="Outlook.com rule setup"
                caption="Example of Outlook.com rule creation."
              />

              <h4 className="font-semibold mb-2 mt-4">
                Automatic Forwarding with Rules (Outlook Desktop App):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
                <li>
                  File &rarr; "Manage Rules & Alerts" &rarr; "New Rule...".
                </li>
                <li>Select "Apply rule on messages I receive".</li>
                <li>Set your conditions, click Next.</li>
                <li>
                  Check "forward it to people or public group". Click the
                  underlined part.
                </li>
                <li>
                  In the "To -&gt" field, enter{" "}
                  <code className="text-xs bg-muted p-0.5 rounded">
                    {userForwardingEmail || "[Your TaskEase AI Address]"}
                  </code>
                  . Click OK, Next.
                </li>
                <li>Complete the rule setup.</li>
              </ol>

              <h4 className="font-semibold mb-2 mt-4">Manual Forwarding:</h4>
              <p className="text-sm">
                Similar to Gmail, open the email, find the "Forward" option
                (often under "More actions" or a forward arrow icon), enter your
                TaskEase AI address, and send.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>

        {/* Apple Mail Instructions */}
        <Card>
          <AccordionItem value="apple-mail" className="border-b-0">
            <CardHeader className="p-0">
              <AccordionTrigger className="flex items-center justify-between w-full p-6 hover:no-underline">
                <div className="text-left">
                  <CardTitle>Apple Mail (macOS & iOS)</CardTitle>
                  <CardDescription className="mt-1">
                    Using rules on macOS for automatic forwarding.
                  </CardDescription>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <AccordionContent className="p-6 pt-0">
              <h4 className="font-semibold mb-2">
                Automatic Forwarding with Rules (macOS Mail App):
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
                <li>
                  Open Mail app, go to Mail &rarr; Settings (or Preferences).
                </li>
                <li>Click the "Rules" tab &rarr; "Add Rule".</li>
                <li>
                  Describe your rule. Set conditions (e.g., "From" "Contains"
                  `university.edu`).
                </li>
                <li>
                  Under "Perform the following actions:", select "Forward
                  Message".
                </li>
                <li>
                  Enter{" "}
                  <code className="text-xs bg-muted p-0.5 rounded">
                    {userForwardingEmail || "[Your TaskEase AI Address]"}
                  </code>{" "}
                  in the "To:" field. Click OK.
                </li>
              </ol>
              <PlaceholderScreenshot
                alt="Apple Mail rule setup on macOS"
                caption="Setting up a rule in Apple Mail."
              />

              <h4 className="font-semibold mb-2 mt-4">
                Manual Forwarding (macOS & iOS):
              </h4>
              <p className="text-sm">
                On macOS, select the email, then Message &rarr; Forward
                (Shift+Command+F). On iOS, open the email, tap the Reply arrow
                (↩️), then tap "Forward". Enter your TaskEase AI address and
                send.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>
      </Accordion>

      <Separator />

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Still Have Questions?</h3>
        <p className="text-sm text-muted-foreground">
          If you're having trouble or use a different email client, feel free to
          reach out to our support.
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact-support">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
