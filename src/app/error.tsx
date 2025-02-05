"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-2 text-destructive">
        <AlertCircle className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
      </div>
      <p className="text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
