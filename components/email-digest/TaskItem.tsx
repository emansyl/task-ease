// components/email-digest/TaskItem.tsx
"use client"; // This component now needs to be a client component

import { useState, useTransition } from "react";
import { Task as TaskType, LinkOrAttachment } from "@/lib/types"; // Your UI Task type
import { TaskStatus as PrismaTaskStatus } from "@prisma/client"; // Import Prisma enum
import { formatDate, formatRelativeDate, getUrgencyColor } from "@/lib/utils";
import { Card } from "@/components/ui/card"; // Keep Card as is or simplify visual
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  CalendarClock,
  AlertCircle,
  Paperclip,
  Link as LinkIcon,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toggleTaskCompletion } from "@/app/actions/taskActions"; // Import the Server Action

// Re-define renderLinkOrAttachment or import from a shared util if used elsewhere
function renderLinkOrAttachment(item: LinkOrAttachment) {
  return (
    <li key={item.identifier} className="text-xs flex items-center gap-1.5">
      {item.type === "link" ? <LinkIcon size={12} /> : <Paperclip size={12} />}
      <span className="font-medium">{item.description}:</span>
      {item.type === "link" ? (
        <a
          href={item.identifier}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate"
        >
          {item.identifier} <ExternalLink size={12} className="inline ml-1" />
        </a>
      ) : (
        <span className="truncate">{item.identifier}</span>
      )}
    </li>
  );
}

export default function TaskItem({
  task,
  initialStatus,
}: {
  task: TaskType;
  initialStatus?: PrismaTaskStatus;
}) {
  // Manage local status for immediate UI feedback, potentially synced with server
  const [isChecked, setIsChecked] = useState(
    initialStatus === PrismaTaskStatus.complete ||
      task.status === PrismaTaskStatus.complete
  ); // Assuming your TaskType might have status
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckedChange = async () => {
    // Optimistic update
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setError(null);

    startTransition(async () => {
      try {
        const currentPrismaStatus = newCheckedState
          ? PrismaTaskStatus.todo
          : PrismaTaskStatus.complete; // Status *before* toggle
        const result = await toggleTaskCompletion(task.id, currentPrismaStatus);

        if (!result.success) {
          console.error("Failed to update task:", result.message);
          setError(result.message || "Failed to update. Please try again.");
          // Revert optimistic update
          setIsChecked(!newCheckedState);
        } else {
          // Successfully updated, revalidation will handle refreshing data from server if needed
          // Optionally, update local state if server returns updated task, though revalidatePath should handle it.
          if (result.updatedTask) {
            setIsChecked(
              result.updatedTask.status === PrismaTaskStatus.complete
            );
          }
        }
      } catch (e) {
        console.error("Client-side error toggling task:", e);
        setError("An unexpected error occurred.");
        // Revert optimistic update
        setIsChecked(!newCheckedState);
      }
    });
  };

  return (
    <Card
      className={`bg-accent/50 transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`task-${task.id}`} className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline group">
            <div className="flex items-start gap-3 flex-1 text-left">
              <Checkbox
                id={`task-check-${task.id}`}
                checked={isChecked}
                onCheckedChange={handleCheckedChange}
                disabled={isPending}
                className="mt-1 border-gray-400 group-hover:border-primary data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                aria-label={`Mark task ${task.title} as ${isChecked ? "incomplete" : "complete"}`}
              />
              <div>
                <label
                  htmlFor={`task-check-${task.id}`}
                  className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isChecked ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </label>
                <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  {task.due_date && (
                    <span
                      className={`flex items-center gap-1 ${isChecked ? "line-through" : ""}`}
                    >
                      <CalendarClock size={12} /> Due:{" "}
                      {formatDate(task.due_date)} (
                      {formatRelativeDate(task.due_date)})
                    </span>
                  )}
                  {task.urgency && (
                    <span className="flex items-center gap-1">
                      <AlertCircle
                        size={12}
                        className={`${getUrgencyColor(task.urgency)}`}
                      />
                      Urgency:{" "}
                      <Badge
                        variant="outline"
                        className={`px-1.5 py-0.5 text-xs border-0 ${getUrgencyColor(task.urgency)}`}
                      >
                        {task.urgency}
                      </Badge>
                    </span>
                  )}
                  {/* {task.course && (
                    <Badge
                      variant="secondary"
                      className={`flex items-center gap-1 ${isChecked ? "line-through" : ""}`}
                    >
                      <BookOpen size={12} />
                      {task.course}
                    </Badge>
                  )} */}
                </div>
              </div>
            </div>
            {isPending && (
              <RefreshCw
                size={16}
                className="animate-spin text-muted-foreground mr-2"
              />
            )}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 pl-12">
            {" "}
            {/* Indent content */}
            <p
              className={`text-sm mb-2 ${isChecked ? "line-through text-muted-foreground" : ""}`}
            >
              {task.description}
            </p>
            {task.related_links_or_attachments &&
              task.related_links_or_attachments.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold mb-1 mt-2">
                    Links/Attachments:
                  </h4>
                  <ul className="space-y-1">
                    {task.related_links_or_attachments.map(
                      renderLinkOrAttachment
                    )}
                  </ul>
                </div>
              )}
            {error && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <XCircle size={12} /> {error}
              </p>
            )}
            {!error && isChecked && !isPending && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle size={12} /> Marked as complete.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
