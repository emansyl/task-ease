// app/dashboard/loading.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, CalendarDays, ListChecks } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-48 mb-2" /> {/* Dashboard Title */}
          <Skeleton className="h-5 w-64" /> {/* Welcome message */}
        </div>
      </div>

      {/* Forwarding Email Address Widget Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            <Skeleton className="h-6 w-64" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mt-1">
            <Skeleton className="h-8 w-64 rounded" />{" "}
            {/* Email address placeholder */}
            <Skeleton className="h-9 w-20 rounded" />{" "}
            {/* Copy button placeholder */}
          </div>
          <Skeleton className="h-4 w-48 mt-3" />{" "}
          {/* How to forward link placeholder */}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Upcoming Events Widget Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarDays size={22} /> <Skeleton className="h-6 w-40" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full max-w-xs" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3 rounded-md border">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks Due Soon Widget Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ListChecks size={22} /> <Skeleton className="h-6 w-36" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full max-w-xs" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3 rounded-md border">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-3/4 mb-1" />
                  <Skeleton className="h-5 w-16 rounded-full" />{" "}
                  {/* Urgency badge */}
                </div>
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recently Processed Emails Widget Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail size={22} /> <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-3 rounded-md border">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-5 w-24 rounded-full" />{" "}
                {/* Category badge */}
              </div>
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
