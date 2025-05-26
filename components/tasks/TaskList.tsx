// components/tasks/TaskListClient.tsx (New File)
"use client";

import { useState, useEffect, useMemo } from "react";
import { Task as UITask } from "@/lib/types";
import TaskItem from "@/components/email-digest/TaskItem"; // Your existing TaskItem
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListChecks, Filter, AlertTriangle, Search } from "lucide-react";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  parseISO,
  isBefore,
  isAfter,
  isEqual,
} from "date-fns";
import { Urgency } from "@/app/generated/prisma";
import { TaskStatus } from "@/app/generated/prisma";

interface TaskListProps {
  initialTasks: UITask[];
}

type StatusFilter = "all" | TaskStatus;
type UrgencyFilter = "all" | Urgency;
type DueDateRangeFilter =
  | "all"
  | "today"
  | "this_week"
  | "overdue"
  | "upcoming"
  | "no_due_date";

export default function TaskList({ initialTasks }: TaskListProps) {
  const [allTasks, setAllTasks] = useState<UITask[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<UITask[]>(initialTasks);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("all");
  const [dueDateFilter, setDueDateFilter] = useState<DueDateRangeFilter>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter options
  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All Statuses" },
    ...Object.values(TaskStatus).map((s) => ({
      value: s,
      label: s.replace("_", " ").toUpperCase(),
    })),
  ];
  const urgencyOptions: { value: UrgencyFilter; label: string }[] = [
    { value: "all", label: "All Urgencies" },
    ...Object.values(Urgency).map((u) => ({
      value: u,
      label: u.toUpperCase(),
    })),
  ];
  const dueDateOptions: { value: DueDateRangeFilter; label: string }[] = [
    { value: "all", label: "All Due Dates" },
    { value: "today", label: "Today" },
    { value: "this_week", label: "This Week" },
    { value: "overdue", label: "Overdue" },
    { value: "upcoming", label: "Upcoming" }, // Tasks due after this week
    { value: "no_due_date", label: "No Due Date" },
  ];

  useEffect(() => {
    let tempTasks = [...allTasks]; // Start with all tasks

    // Apply search term filter (title or description)
    if (searchTerm) {
      tempTasks = tempTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.status === statusFilter);
    }

    // Apply urgency filter
    if (urgencyFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.urgency === urgencyFilter);
    }

    // Apply due date filter
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    if (dueDateFilter !== "all") {
      tempTasks = tempTasks.filter((task) => {
        if (!task.due_date && dueDateFilter === "no_due_date") return true;
        if (!task.due_date) return false;

        const dueDate = parseISO(task.due_date);
        switch (dueDateFilter) {
          case "today":
            return isEqual(startOfDay(dueDate), todayStart);
          case "this_week":
            return !isBefore(dueDate, weekStart) && !isAfter(dueDate, weekEnd);
          case "overdue":
            return (
              isBefore(dueDate, todayStart) &&
              task.status !== TaskStatus.complete
            );
          case "upcoming":
            return isAfter(dueDate, weekEnd);
          default:
            return true;
        }
      });
    }
    setFilteredTasks(tempTasks);
  }, [allTasks, statusFilter, urgencyFilter, dueDateFilter, searchTerm]);

  // Update allTasks if initialTasks prop changes (e.g., due to server revalidation)
  useEffect(() => {
    setAllTasks(initialTasks);
  }, [initialTasks]);

  // Client-side pagination (basic example)
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasksToDisplay = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <>
      {/* Filter Controls */}
      <div className="mb-6 p-4 border rounded-lg bg-muted/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={urgencyFilter}
            onValueChange={(value) => setUrgencyFilter(value as UrgencyFilter)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Urgency" />
            </SelectTrigger>
            <SelectContent>
              {urgencyOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={dueDateFilter}
            onValueChange={(value) =>
              setDueDateFilter(value as DueDateRangeFilter)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Due Date" />
            </SelectTrigger>
            <SelectContent>
              {dueDateOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Add SortBy Select if desired - would modify a sortState and apply in useMemo or useEffect */}
        </div>
      </div>

      {/* Task List */}
      {currentTasksToDisplay.length === 0 ? (
        <div className="text-center py-10">
          <AlertTriangle
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <h3 className="text-xl font-semibold">No Tasks Found</h3>
          <p className="text-muted-foreground">
            {initialTasks.length > 0
              ? "No tasks match your current filters."
              : "You don't have any tasks yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentTasksToDisplay.map((task) => (
            <TaskItem key={task.id} task={task} initialStatus={task.status} />
          ))}
        </div>
      )}

      {/* Client-side Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-6 mt-6 border-t">
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
