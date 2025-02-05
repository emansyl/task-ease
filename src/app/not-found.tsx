import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <FileQuestion className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Page not found</h2>
      </div>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
