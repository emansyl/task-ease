// app/settings/loading.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings as SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsLoading() {
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={32} />
        <Skeleton className="h-9 w-40" /> {/* Settings Title */}
      </div>
      {/* Account Information Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-xs" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Skeleton className="h-4 w-32 mb-1" /> {/* Label */}
            <Skeleton className="h-5 w-64" /> {/* Value */}
          </div>
        </CardContent>
      </Card>
      {/* Forwarding Email Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Skeleton className="h-4 w-56 mb-1" /> {/* Label */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-64 rounded" />{" "}
              {/* Email placeholder */}
              <Skeleton className="h-9 w-20 rounded" /> {/* Copy button */}
            </div>
          </div>
          <Skeleton className="h-9 w-full sm:w-64 rounded" />{" "}
          {/* How to forward button */}
        </CardContent>
      </Card>
      {/* Appearance Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-xs" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-20 mb-2" /> {/* Label */}
          <Skeleton className="h-9 w-32" /> {/* Theme switcher placeholder */}
        </CardContent>
      </Card>
      <Separator />
      <Skeleton className="h-10 w-full sm:w-32 rounded" />{" "}
      {/* Sign Out button */}
    </div>
  );
}
