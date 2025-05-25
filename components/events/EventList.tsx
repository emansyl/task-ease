// components/events/EventListClient.tsx (New File)
"use client";

import { useState, useEffect, useMemo } from "react";
import { Event as UIEvent } from "@/lib/types";
import EventItem from "@/components/email-digest/EventItem"; // Your existing EventItem
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarClock, Filter, AlertTriangle } from "lucide-react";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
  isAfter,
  isBefore,
  compareAsc,
  compareDesc,
} from "date-fns";

interface EventListClientProps {
  initialEvents: UIEvent[];
}

type DateRangeFilter =
  | "all"
  | "today"
  | "this_week"
  | "this_month"
  | "upcoming";
type SortByFilter = "startTime_asc" | "startTime_desc" | "title_asc";

export default function EventListClient({
  initialEvents,
}: EventListClientProps) {
  const [allEvents, setAllEvents] = useState<UIEvent[]>(initialEvents);
  const [displayedEvents, setDisplayedEvents] =
    useState<UIEvent[]>(initialEvents);

  // Filter states
  const [dateRangeFilter, setDateRangeFilter] =
    useState<DateRangeFilter>("upcoming");
  const [sortBy, setSortBy] = useState<SortByFilter>("startTime_asc");

  // Filter options
  const dateRangeOptions: { value: DateRangeFilter; label: string }[] = [
    { value: "all", label: "All Events" },
    { value: "today", label: "Today" },
    { value: "this_week", label: "This Week" },
    { value: "this_month", label: "This Month" },
    { value: "upcoming", label: "Upcoming (from tomorrow)" },
  ];
  const sortOptions: { value: SortByFilter; label: string }[] = [
    { value: "startTime_asc", label: "Date (Soonest First)" },
    { value: "startTime_desc", label: "Date (Latest First)" },
    { value: "title_asc", label: "Title (A-Z)" },
  ];

  useEffect(() => {
    let tempEvents = [...allEvents]; // Start with all events

    // Apply date range filter
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    if (dateRangeFilter !== "all") {
      tempEvents = tempEvents.filter((event) => {
        const eventStartDate = parseISO(event.start_time);
        const eventEndDate = parseISO(event.end_time); // Use this for multi-day event checks

        switch (dateRangeFilter) {
          case "today":
            return (
              isWithinInterval(eventStartDate, {
                start: todayStart,
                end: todayEnd,
              }) ||
              (isBefore(eventStartDate, todayStart) &&
                isAfter(eventEndDate, todayStart))
            ); // Catches events spanning into today
          case "this_week":
            return (
              isWithinInterval(eventStartDate, {
                start: weekStart,
                end: weekEnd,
              }) ||
              (isBefore(eventStartDate, weekStart) &&
                isAfter(eventEndDate, weekStart))
            );
          case "this_month":
            return (
              isWithinInterval(eventStartDate, {
                start: monthStart,
                end: monthEnd,
              }) ||
              (isBefore(eventStartDate, monthStart) &&
                isAfter(eventEndDate, monthStart))
            );
          case "upcoming":
            return isAfter(eventStartDate, todayEnd); // Starts after today ends
          default:
            return true;
        }
      });
    }

    // Apply sorting
    tempEvents.sort((a, b) => {
      const dateA = parseISO(a.start_time);
      const dateB = parseISO(b.start_time);
      switch (sortBy) {
        case "startTime_desc":
          return compareDesc(dateA, dateB);
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "startTime_asc":
        default:
          return compareAsc(dateA, dateB);
      }
    });

    setDisplayedEvents(tempEvents);
  }, [allEvents, dateRangeFilter, sortBy]);

  // Update allEvents if initialEvents prop changes (e.g., due to server revalidation)
  useEffect(() => {
    setAllEvents(initialEvents);
  }, [initialEvents]);

  // Client-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEventsToDisplay = displayedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(displayedEvents.length / eventsPerPage);

  return (
    <>
      {/* Filter Controls */}
      <div className="mb-6 p-4 border rounded-lg bg-muted/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-end">
          <Select
            value={dateRangeFilter}
            onValueChange={(value) => {
              setDateRangeFilter(value as DateRangeFilter);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Date Range" />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value as SortByFilter);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Event List */}
      {currentEventsToDisplay.length === 0 ? (
        <div className="text-center py-10">
          <AlertTriangle
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-xl font-semibold">No Events Found</h3>
          <p className="text-muted-foreground">
            {initialEvents.length > 0
              ? "No events match your current filters."
              : "You don't have any events scheduled yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentEventsToDisplay.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Client-side Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-6 mt-6 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
