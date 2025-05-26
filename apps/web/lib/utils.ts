import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string | null | undefined,
  includeTime: boolean = true
): string {
  if (!dateString) return "N/A";
  try {
    const date = parseISO(dateString);
    if (includeTime) {
      return format(date, "MMM d, yyyy, h:mm a"); // e.g., May 25, 2025, 11:30 AM
    }
    return format(date, "MMM d, yyyy"); // e.g., May 25, 2025
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Fallback
  }
}

export function formatRelativeDate(
  dateString: string | null | undefined
): string {
  if (!dateString) return "";
  try {
    const date = parseISO(dateString);
    return formatDistanceToNowStrict(date, { addSuffix: true }); // e.g., "in 3 days", "2 hours ago"
  } catch (error) {
    return "";
  }
}

export function getUrgencyColor(
  urgency: "low" | "medium" | "high" | undefined
): string {
  switch (urgency) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-400";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}

export function getCategoryBadgeVariant(
  category: string
): "default" | "secondary" | "destructive" | "outline" {
  // Simple mapping, can be expanded
  if (category?.toLowerCase().includes("academic")) return "default";
  if (category?.toLowerCase().includes("career")) return "secondary";
  if (category?.toLowerCase().includes("urgent")) return "destructive"; // Example
  return "outline";
}

export function formatISOToGoogleCalendarUTC(
  isoString: string | null | undefined
): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString); // Parses ISO string, respects Z for UTC
    // Ensure all components are UTC
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  } catch (error) {
    console.error(
      "Error formatting date for Google Calendar:",
      isoString,
      error
    );
    return ""; // Fallback or handle error appropriately
  }
}
