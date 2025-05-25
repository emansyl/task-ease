// app/events/loading.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarClock, Filter } from "lucide-react";

export default function EventsLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <CalendarClock size={30} /> <Skeleton className="h-9 w-32" />{" "}
          {/* My Events */}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filter Form Skeleton */}
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-end">
              <Skeleton className="h-9 w-full rounded-lg" />{" "}
              {/* DateRange select */}
              <Skeleton className="h-9 w-full rounded-lg" />{" "}
              {/* SortBy select */}
            </div>
          </div>

          {/* Event List Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-accent/50 p-4">
                {" "}
                {/* Mimic EventItem Card */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    <Skeleton className="h-5 w-3/4 mb-1.5" /> {/* Title */}
                    <div className="flex flex-col sm:flex-row gap-x-3 text-xs">
                      <Skeleton className="h-4 w-32 mb-1 sm:mb-0" />{" "}
                      {/* Date/Time */}
                      <Skeleton className="h-4 w-24" /> {/* Location */}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-full" />{" "}
                    {/* Icon Button 1 */}
                    <Skeleton className="h-8 w-8 rounded-full" />{" "}
                    {/* Icon Button 2 */}
                  </div>
                </div>
                {/* No Accordion Content shown in loading skeleton */}
              </Card>
            ))}
          </div>

          {/* Pagination Controls Skeleton */}
          <div className="flex items-center justify-center space-x-2 py-6 mt-6 border-t">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
