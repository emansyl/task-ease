"use client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  dueDate: Date | null;
  urgency: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "complete";
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [localTasks, setLocalTasks] = useState(tasks);

  const grouped = localTasks.reduce<Record<string, Task[]>>((acc, task) => {
    const key = task.dueDate
      ? format(new Date(task.dueDate), "eeee, MMMM d")
      : "No due date";
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  const handleComplete = (id: string) => {
    setLocalTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, status: "complete" } : t))
    );
  };

  const filtered = Object.entries(grouped).map(
    ([date, group]) =>
      [
        date,
        group.filter((task) =>
          showCompleted
            ? task.status === "complete"
            : task.status !== "complete"
        ),
      ] as [string, Task[]]
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowCompleted((v) => !v)}
        >
          {showCompleted ? "Hide" : "Show"} Completed
        </Button>
      </div>
      {filtered.every(([_, group]) => group.length === 0) ? (
        <p className="text-muted-foreground">
          No tasks{showCompleted ? " completed" : ""}.
        </p>
      ) : (
        filtered.map(
          ([date, group]) =>
            group.length > 0 && (
              <div key={date} className="mb-4">
                <h2 className="text-muted-foreground uppercase text-sm mb-1">
                  {date}
                </h2>
                <Separator />
                <div className="space-y-2 mt-2">
                  {group.map((task) => (
                    <Card
                      key={task.id}
                      className="p-4 flex items-start justify-between"
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {task.urgency} urgency
                        </p>
                        {task.description && (
                          <p className="text-sm mt-1 text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                      </div>
                      {task.status !== "complete" && (
                        <Checkbox
                          onCheckedChange={() => handleComplete(task.id)}
                        />
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )
        )
      )}
    </div>
  );
}
