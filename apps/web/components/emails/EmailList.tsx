// components/emails/EmailList.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ProcessedEmailListItem } from "@/lib/types";
import {
  formatDate,
  formatRelativeDate,
  getCategoryBadgeVariant,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ListFilter,
  Search,
  FileText,
  CalendarClock,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { EmailCategory } from "@/app/generated/prisma/client";

interface EmailListClientProps {
  initialEmails: ProcessedEmailListItem[];
}

type CategoryFilter = "All Categories" | string; // Allow specific category strings (display format)

export default function EmailListClient({
  initialEmails,
}: EmailListClientProps) {
  const [allEmails, setAllEmails] =
    useState<ProcessedEmailListItem[]>(initialEmails);
  const [displayedEmails, setDisplayedEmails] =
    useState<ProcessedEmailListItem[]>(initialEmails);

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("All Categories");

  // Derive category options from Prisma enum or a predefined list
  const categoryOptions: CategoryFilter[] = [
    "All Categories",
    ...Object.values(EmailCategory).map((cat) => cat.replace(/_/g, " ")),
  ];

  useEffect(() => {
    let tempEmails = [...allEmails];

    // Apply search term filter (subject or sender)
    if (searchTerm) {
      tempEmails = tempEmails.filter(
        (email) =>
          (email.originalSubject &&
            email.originalSubject
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (email.fromEmail &&
            email.fromEmail.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter !== "All Categories") {
      tempEmails = tempEmails.filter(
        (email) => email.category === categoryFilter
      );
    }

    // Add sorting here if needed (e.g., by date, by subject)
    // For now, using the server's default sort (processedAt: 'desc')

    setDisplayedEmails(tempEmails);
  }, [allEmails, searchTerm, categoryFilter]);

  // Update allEmails if initialEmails prop changes
  useEffect(() => {
    setAllEmails(initialEmails);
  }, [initialEmails]);

  // Client-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmailsToDisplay = displayedEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );
  const totalPages = Math.ceil(displayedEmails.length / emailsPerPage);

  return (
    <>
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by subject or sender..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            setCategoryFilter(value as CategoryFilter);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-9">
            <ListFilter className="h-3.5 w-3.5 mr-1.5 sm:mr-0" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              <SelectValue placeholder="Filter by Category" />
            </span>
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Email List Table */}
      {currentEmailsToDisplay.length === 0 ? (
        <div className="text-center py-10">
          <AlertTriangle
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-xl font-semibold">No Emails Found</h3>
          <p className="text-muted-foreground">
            {initialEmails.length > 0
              ? "No emails match your current filters."
              : "No emails processed yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">From</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden sm:table-cell">Received</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmailsToDisplay.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="font-medium max-w-[200px] sm:max-w-xs truncate">
                    <Link
                      href={`/email/${email.id}`}
                      className="hover:underline"
                    >
                      {email.originalSubject || "(No Subject)"}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                    {email.fromEmail || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(email.category)}>
                      {email.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formatDate(email.originalReceivedAt, false)}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    <div className="flex items-center justify-center gap-2">
                      {email.taskCount > 0 && (
                        <span
                          className="flex items-center gap-1"
                          title={`${email.taskCount} tasks`}
                        >
                          <ListChecks size={14} /> {email.taskCount}
                        </span>
                      )}
                      {email.eventCount > 0 && (
                        <span
                          className="flex items-center gap-1"
                          title={`${email.eventCount} events`}
                        >
                          <CalendarClock size={14} /> {email.eventCount}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/email/${email.id}`}>View Digest</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Client-side Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-6 mt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
