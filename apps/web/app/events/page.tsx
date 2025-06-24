// app/events/page.tsx
import { getUserIdFromAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllEventsForUser } from "@/lib/data-fetching"; // Use the new function
import EventList from "@/components/events/EventList"; // Import the new Client Component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export default async function EventsPage() {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { events } = await getAllEventsForUser(userId); // Fetch all relevant events

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <CalendarClock size={30} /> My Events
        </h1>
        {/* Optional: Button to switch to a full calendar view later */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Schedule</CardTitle>
          <CardDescription>
            View and manage all events extracted from your emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventList initialEvents={events} />
        </CardContent>
      </Card>
    </div>
  );
}
