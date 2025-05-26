// app/email/[emailId]/loading.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { MailOpen, CalendarClock, ListChecks, Info } from "lucide-react";

export default function EmailDigestLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      {/* Email Header Skeleton */}
      <div className="space-y-2 p-4 border rounded-lg bg-card">
        <Skeleton className="h-8 w-3/4" /> {/* Subject */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Skeleton className="h-5 w-48" /> {/* From */}
          <Skeleton className="h-5 w-40" /> {/* Received */}
          <Skeleton className="h-6 w-28 rounded-full" /> {/* Category Badge */}
        </div>
      </div>
      <Skeleton className="h-9 w-48" /> {/* View Original Email button */}
      {/* AI Summary Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <Separator />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Events Section Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarClock size={20} /> <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="bg-accent/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <Skeleton className="h-5 w-3/4 mb-1.5" /> {/* Title */}
                      <Skeleton className="h-4 w-full max-w-xs mb-1" />{" "}
                      {/* Date/Time */}
                      <Skeleton className="h-4 w-1/2" /> {/* Location */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
          {/* Tasks Section Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListChecks size={20} /> <Skeleton className="h-6 w-28" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="bg-accent/50 p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-6 w-6 rounded mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-full mb-1.5" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Key Information Section Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info size={20} /> <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(1)].map((_, i) => (
            <Card key={i} className="bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
