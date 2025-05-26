// components/email-digest/EventItem.tsx
"use client";

import { useState, useTransition } from "react";
import { Event as EventType, LinkOrAttachment } from "@/lib/types";
import { formatDate, formatISOToGoogleCalendarUTC } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarPlus,
  Clock,
  MapPin,
  Repeat,
  Paperclip,
  Link as LinkIcon,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Share,
  ChevronDown,
  Download,
} from "lucide-react"; // Added ChevronDown
import { generateEventIcs } from "@/app/actions/eventActions";

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

export default function EventItem({ event }: { event: EventType }) {
  const [isIcsPending, startIcsTransition] = useTransition();
  const [icsError, setIcsError] = useState<string | null>(null);

  const handleDownloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling
    setIcsError(null);
    startIcsTransition(async () => {
      // ... (ICS generation logic remains the same)
      try {
        const eventForIcs = {
          id: event.id,
          title: event.title,
          start_time: event.start_time,
          end_time: event.end_time,
          location: event.location,
          description: event.description,
        };
        const result = await generateEventIcs(eventForIcs);
        if (result.success && result.icsContent && result.filename) {
          const blob = new Blob([result.icsContent], {
            type: "text/calendar;charset=utf-8;",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", result.filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        } else {
          setIcsError(result.error || "Could not generate calendar file.");
        }
      } catch (err) {
        setIcsError("An unexpected error occurred while generating ICS.");
      }
    });
  };

  const handleAddToGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling
    const googleStartTime = formatISOToGoogleCalendarUTC(event.start_time);
    const googleEndTime = formatISOToGoogleCalendarUTC(event.end_time);

    if (!googleStartTime || !googleEndTime) {
      // Consider using a toast for errors instead of alert for better UX
      alert("Error formatting event dates for Google Calendar.");
      return;
    }
    const baseUrl = "https://www.google.com/calendar/render";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${googleStartTime}/${googleEndTime}`,
      details: event.description || "",
      location: event.location || "",
      sprop: `name:${encodeURIComponent("TaskEase AI")}`,
    });
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      className={`bg-card border transition-opacity ${isIcsPending ? "opacity-75" : "opacity-100"}`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`event-${event.id}`} className="border-b-0">
          {/* Flex container for the trigger content and the action icons */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 group">
            <AccordionTrigger className="p-0 hover:no-underline flex-1 text-left group">
              {/* Main Event Info (Accordion Trigger Content) */}
              <div className="pr-2">
                {" "}
                {/* Add some padding to not overlap with action icons */}
                <h3 className="text-sm sm:text-md font-semibold group-hover:text-primary">
                  {event.title}
                </h3>
                <div className="text-xs text-muted-foreground flex flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {formatDate(event.start_time)} -{" "}
                    {formatDate(
                      event.end_time,
                      !event.start_time.startsWith(
                        event.end_time.substring(0, 10)
                      )
                    )}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1 truncate max-w-[150px] sm:max-w-xs">
                      <MapPin size={12} /> {event.location}
                    </span>
                  )}
                  {event.is_recurring_hint && (
                    <span className="flex items-center gap-1">
                      <Repeat size={12} /> Recurring
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>

            {/* Action Icons - Positioned to the right */}
            <div className="flex items-center gap-0.5 sm:gap-1 ml-2 shrink-0">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleAddToGoogleCalendar}
                      disabled={isIcsPending}
                      aria-label="Add to Google Calendar"
                    >
                      <CalendarPlus size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Google Calendar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDownloadIcs}
                      disabled={isIcsPending}
                      aria-label="Download .ics file"
                    >
                      {isIcsPending ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download .ics file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* ICS Error Display - Placed logically after the trigger area */}
          {icsError && (
            <div className="px-4 sm:px-6 pb-2 text-xs text-destructive flex items-center gap-1">
              <AlertCircle size={14} /> {icsError}
            </div>
          )}

          <AccordionContent className="px-4 sm:px-6 pb-4 pt-0 text-sm">
            {" "}
            {/* pt-0 to make content feel connected */}
            {event.description && <p className="mb-3">{event.description}</p>}
            {event.related_links_or_attachments &&
              event.related_links_or_attachments.length > 0 && (
                <div className="mb-2">
                  <h4 className="text-xs font-semibold mb-1 text-muted-foreground">
                    Links/Attachments:
                  </h4>
                  <ul className="space-y-1">
                    {event.related_links_or_attachments.map(
                      renderLinkOrAttachment
                    )}
                  </ul>
                </div>
              )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
