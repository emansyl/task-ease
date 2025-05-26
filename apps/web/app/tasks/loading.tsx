// app/tasks/loading.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ListChecks, Filter } from "lucide-react"; // Replaced Table with just list items

export default function TasksLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ListChecks size={30} /> <Skeleton className="h-9 w-32" />{" "}
          {/* My Tasks */}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filter Form Skeleton */}
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
              <Skeleton className="h-9 w-full rounded-lg" /> {/* Search */}
              <Skeleton className="h-9 w-full rounded-lg" />{" "}
              {/* Status select */}
              <Skeleton className="h-9 w-full rounded-lg" />{" "}
              {/* Urgency select */}
              <Skeleton className="h-9 w-full rounded-lg" />{" "}
              {/* DueDate select */}
            </div>
          </div>

          {/* Task List Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-accent/50 p-4">
                {" "}
                {/* Mimic TaskItem Card */}
                <div className="flex items-start gap-3">
                  <Skeleton className="h-6 w-6 rounded mt-1" /> {/* Checkbox */}
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-1.5" /> {/* Title */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <Skeleton className="h-4 w-28" /> {/* Due Date */}
                      <Skeleton className="h-4 w-20" /> {/* Urgency */}
                      <Skeleton className="h-4 w-24" /> {/* Course */}
                    </div>
                  </div>
                  <Skeleton className="h-4 w-4 rounded-full animate-spin" />{" "}
                  {/* Pending indicator */}
                </div>
                {/* No Accordion Trigger/Content shown in loading skeleton for simplicity */}
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
