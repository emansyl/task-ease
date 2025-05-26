// app/guide/forwarding/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lightbulb } from "lucide-react";

export default function ForwardingGuideLoading() {
  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 space-y-8">
      <div className="text-center">
        <Skeleton className="h-9 w-3/4 mx-auto mb-2" /> {/* Title */}
        <Skeleton className="h-6 w-1/2 mx-auto" /> {/* Subtitle */}
      </div>

      {/* Forwarding Email Display Skeleton */}
      <div className="p-4 rounded-lg bg-muted/30 border">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="flex items-center gap-2 mt-2 ml-7">
          <Skeleton className="h-8 w-full max-w-xs rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>

      {/* General Tips Skeleton */}
      <div className="p-4 rounded-lg bg-muted/30 border">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <Separator />

      {/* Accordion Skeletons (for Gmail, Outlook, Apple Mail) */}
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="p-0">
            <div className="flex items-center justify-between w-full p-6">
              <div>
                <Skeleton className="h-6 w-40 mb-1" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Chevron */}
            </div>
          </CardHeader>
          {/* Not showing accordion content skeleton to keep it simpler */}
        </Card>
      ))}
    </div>
  );
}
