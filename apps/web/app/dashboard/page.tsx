// app/dashboard/page.tsx
import { getUserIdFromAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { getDashboardData, DashboardData } from "@/lib/data-fetching"; // Your data fetching function
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatRelativeDate,
  getUrgencyColor,
  getCategoryBadgeVariant,
} from "@/lib/utils";
import {
  Mail,
  CalendarDays,
  ListChecks,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
// Import the new Client Component
import CopyForwardingEmailButton from "@/components/dashboard/CopyForwardingEmailButton"; // Adjust path if needed

import prisma from "@/lib/prisma";

import {
  ProcessedEmailListItem,
  Task as UITask,
  Event as UIEvent,
} from "@/lib/types"; // Your UI types
import { addDays, startOfDay, endOfDay } from "date-fns";
import { TaskStatus, Urgency } from "../generated/prisma";

export interface DashboardData {
  userForwardingEmail: string | null;
  recentEmails: ProcessedEmailListItem[];
  upcomingEvents: UIEvent[];
  dueSoonTasks: UITask[];
}

async function getDashboardData(userId: string): Promise<DashboardData | null> {
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { forwardingemail: true },
    });

    if (!user) return null; // User not found

    const now = new Date();
    const sevenDaysFromNow = endOfDay(addDays(now, 7)); // End of day 7 days from now

    // Fetch Recent Emails (similar to your /emails page logic, but maybe fewer items)
    const recentEmailsFromDb = await prisma.email.findMany({
      where: { userId },
      select: {
        id: true,
        originalSubject: true,
        fromEmail: true,
        category: true,
        originalReceivedAt: true,
        processedAt: true,
        _count: { select: { tasks: true, events: true } },
      },
      orderBy: { processedAt: "desc" },
      take: 5, // Show latest 5
    });
    const recentEmails: ProcessedEmailListItem[] = recentEmailsFromDb.map(
      (email) => ({
        id: email.id,
        originalSubject: email.originalSubject,
        fromEmail: email.fromEmail,
        category: email.category ? email.category.replace(/_/g, " ") : "Other",
        originalReceivedAt: email.originalReceivedAt?.toISOString() || "",
        processedAt: email.processedAt.toISOString(),
        taskCount: email._count.tasks,
        eventCount: email._count.events,
      })
    );

    // Fetch Upcoming Events
    const upcomingEventsFromDb = await prisma.event.findMany({
      where: {
        userId,
        startTime: {
          gte: startOfDay(now), // From start of today
          lte: sevenDaysFromNow,
        },
      },
      include: { linksOrAttachments: true },
      orderBy: { startTime: "asc" },
      take: 5, // Show up to 5 upcoming events
    });
    const upcomingEvents: UIEvent[] = upcomingEventsFromDb.map((event) => ({
      id: event.id,
      title: event.title,
      start_time: event.startTime.toISOString(),
      end_time: event.endTime.toISOString(),
      location: event.location || null,
      description: event.description || "",
      is_recurring_hint: event.isRecurringHint,
      related_links_or_attachments: event.linksOrAttachments.map((loa) => ({
        type: loa.type as "link" | "attachment_mentioned",
        identifier: loa.identifier,
        description: loa.description,
      })),
    }));

    // Fetch Tasks Due Soon or High/Medium Urgency
    const dueSoonTasksFromDb = await prisma.task.findMany({
      where: {
        userId,
        status: { not: TaskStatus.complete }, // Only non-completed tasks
        OR: [
          {
            dueDate: {
              gte: startOfDay(now),
              lte: sevenDaysFromNow,
            },
          },
          {
            urgency: { in: [Urgency.high, Urgency.medium] },
            dueDate: { gte: startOfDay(now) }, // Also consider urgent tasks with future due dates
          },
          {
            // Urgent tasks with no due date
            urgency: { in: [Urgency.high, Urgency.medium] },
            dueDate: null,
          },
        ],
      },
      include: { linksOrAttachments: true },
      orderBy: [
        { dueDate: "asc" }, // Tasks with earlier due dates first
        { urgency: "desc" }, // Then by urgency (High > Medium > Low if Prisma maps enums like that)
      ],
      take: 5, // Show up to 5 tasks
    });
    const dueSoonTasks: UITask[] = dueSoonTasksFromDb.map((task) => ({
      id: task.id,
      title: task.title,
      due_date: task.dueDate?.toISOString() || null,
      urgency: task.urgency,
      description: task.description || "",
      related_links_or_attachments: task.linksOrAttachments.map((loa) => ({
        type: loa.type as "link" | "attachment_mentioned",
        identifier: loa.identifier,
        description: loa.description,
      })),
    }));

    return {
      userForwardingEmail: user.forwardingemail,
      recentEmails,
      upcomingEvents,
      dueSoonTasks,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Return a default structure or parts that succeeded if you prefer partial data
    return {
      userForwardingEmail: null,
      recentEmails: [],
      upcomingEvents: [],
      dueSoonTasks: [],
    };
  }
}

// This DashboardPageContent can remain a Server Component or be part of the main Page export
async function DashboardPageContent({ data }: { data: DashboardData }) {
  if (
    data.recentEmails.length === 0 &&
    data.upcomingEvents.length === 0 &&
    data.dueSoonTasks.length === 0
  ) {
    return (
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* ... (Display Forwarding Email Address Widget as before) ... */}
        <Card className="mt-8 text-center">
          <CardHeader>
            <CardTitle>Welcome to TaskEase AI!</CardTitle>
            <CardDescription>Ready to get organized?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              To start seeing your tasks and events here, forward your important
              student emails to your unique address shown above.
            </p>
            <Button asChild>
              <Link href="/guide/forwarding">
                <Lightbulb className="mr-2 h-4 w-4" /> Learn How to Forward
                Emails
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your quick overview.
          </p>
        </div>
      </div>

      {/* Forwarding Email Address Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Your Unique Forwarding Email
          </CardTitle>
          <CardDescription>
            Forward your important student emails to this address for
            processing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.userForwardingEmail ? (
            // Use the imported Client Component here
            <CopyForwardingEmailButton email={data.userForwardingEmail} />
          ) : (
            <p className="text-sm text-destructive">
              Could not load your forwarding email address.
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            <Link
              href="/guide/forwarding"
              className="underline hover:text-primary"
            >
              How to set up email forwarding?
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* ... rest of your dashboard widgets (Upcoming Events, Tasks Due Soon, Recent Emails) ... */}
      {/* These can remain as Server Component JSX */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Upcoming Events Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarDays size={22} /> Upcoming Events
            </CardTitle>
            <CardDescription>
              Events happening in the next 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.upcomingEvents.length > 0 ? (
              data.upcomingEvents.map((event: UIEvent) => (
                <Link
                  href={`/events/${event.id}`}
                  key={event.id}
                  className="block p-3 rounded-md hover:bg-accent transition-colors border"
                >
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.start_time)} -{" "}
                    {formatDate(
                      event.end_time,
                      !event.start_time.startsWith(
                        event.end_time.substring(0, 10)
                      )
                    )}
                  </p>
                  {event.location && (
                    <p className="text-xs text-muted-foreground">
                      📍 {event.location}
                    </p>
                  )}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming events in the next 7 days.
              </p>
            )}
          </CardContent>
          {data.upcomingEvents.length > 0 && (
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Tasks Due Soon Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ListChecks size={22} /> Tasks Due Soon
            </CardTitle>
            <CardDescription>
              Tasks due in the next 7 days or marked as high/medium urgency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.dueSoonTasks.length > 0 ? (
              data.dueSoonTasks.map((task: UITask) => (
                <Link
                  href={`/tasks/${task.id}`}
                  key={task.id}
                  className="block p-3 rounded-md hover:bg-accent transition-colors border"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm">{task.title}</h4>
                    <Badge
                      variant="outline"
                      className={`px-1.5 py-0.5 text-xs border-0 ${getUrgencyColor(task.urgency)} text-white`}
                    >
                      {task.urgency}
                    </Badge>
                  </div>
                  {task.due_date && (
                    <p className="text-xs text-muted-foreground">
                      Due: {formatDate(task.due_date)} (
                      {formatRelativeDate(task.due_date)})
                    </p>
                  )}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No urgent tasks or tasks due soon.
              </p>
            )}
          </CardContent>
          {data.dueSoonTasks.length > 0 && (
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tasks">View All Tasks</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      {/* Recently Processed Emails Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail size={22} /> Recently Processed Emails
          </CardTitle>
          <CardDescription>
            Your latest emails processed by the assistant.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.recentEmails.length > 0 ? (
            data.recentEmails.map((email: ProcessedEmailListItem) => (
              <Link
                href={`/email/${email.id}`}
                key={email.id}
                className="block p-3 rounded-md hover:bg-accent transition-colors border"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate max-w-[70%]">
                    {email.originalSubject || "(No Subject)"}
                  </h4>
                  <Badge
                    variant={getCategoryBadgeVariant(email.category)}
                    className="whitespace-nowrap"
                  >
                    {email.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  From: {email.fromEmail || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Received: {formatDate(email.originalReceivedAt, false)} |
                  Processed: {formatRelativeDate(email.processedAt)}
                </p>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  {email.taskCount > 0 && (
                    <span
                      className="flex items-center gap-1"
                      title={`${email.taskCount} tasks`}
                    >
                      <ListChecks size={14} /> {email.taskCount}
                    </span>
                  )}
                  {email.eventCount > 0 && (
                    <span
                      className="flex items-center gap-1"
                      title={`${email.eventCount} events`}
                    >
                      <CalendarDays size={14} /> {email.eventCount}{" "}
                      {/* Corrected Icon */}
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No emails processed yet.
            </p>
          )}
        </CardContent>
        {data.recentEmails.length > 0 && (
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/emails">View All Processed Emails</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

// Main page export remains a Server Component
export default async function Page() {
  const userId = await getUserIdFromAuth();

  if (!userId) {
    redirect("/login");
  }

  const dashboardData = await getDashboardData(userId);

  if (!dashboardData) {
    return (
      <div className="container mx-auto p-4 text-center flex flex-col items-center justify-center h-screen">
        <AlertTriangle size={48} className="text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Could Not Load Dashboard Data</h2>
        <p className="text-muted-foreground">
          There was an issue fetching your dashboard information. Please try
          again later.
        </p>
      </div>
    );
  }
  return <DashboardPageContent data={dashboardData} />;
}
