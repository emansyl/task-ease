// app/tasks/page.tsx
import { getUserIdFromAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllTasksForUser } from "./getTask"; // Use the new function
import TaskList from "@/components/tasks/TaskList"; // Import the new Client Component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default async function TasksPage() {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { tasks } = await getAllTasksForUser(userId); // Fetch all tasks

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ListChecks size={30} /> My Tasks
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Your Tasks</CardTitle>
          <CardDescription>
            Filter, sort, and manage all tasks extracted from your emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList initialTasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
