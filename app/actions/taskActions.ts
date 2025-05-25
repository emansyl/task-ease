// app/actions/taskActions.ts (create this file and directory if it doesn't exist)
"use server"; // Marks all functions in this file as Server Actions

import prisma from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserIdFromAuth } from "@/lib/auth"; // Your auth function

interface ToggleTaskCompletionResult {
  success: boolean;
  message?: string;
  updatedTask?: { id: string; status: TaskStatus; completedAt: Date | null }; // Return updated task for potential UI update
}

export async function toggleTaskCompletion(
  taskId: string,
  currentStatus: TaskStatus
): Promise<ToggleTaskCompletionResult> {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    return { success: false, message: "User not authenticated." };
  }

  if (!taskId) {
    return { success: false, message: "Task ID is required." };
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId, userId: userId }, // Ensure user owns the task
    });

    if (!task) {
      return {
        success: false,
        message: "Task not found or user not authorized.",
      };
    }

    const newStatus =
      currentStatus === TaskStatus.complete
        ? TaskStatus.todo
        : TaskStatus.complete;
    const newCompletedAt =
      newStatus === TaskStatus.complete ? new Date() : null;

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        // No need for userId here again as we already verified ownership
      },
      data: {
        status: newStatus,
        completedAt: newCompletedAt,
      },
    });

    // Revalidate the paths where this task might be displayed
    // This will trigger a data refresh for Server Components on these pages.
    if (task.emailId) {
      revalidatePath(`/email/${task.emailId}`);
    }
    revalidatePath("/tasks"); // If you have a tasks hub page
    revalidatePath("/dashboard"); // If tasks are shown on the dashboard

    return {
      success: true,
      message: `Task marked as ${newStatus}.`,
      updatedTask: {
        id: updatedTask.id,
        status: updatedTask.status,
        completedAt: updatedTask.completedAt,
      },
    };
  } catch (error) {
    console.error("Error toggling task completion:", error);
    return { success: false, message: "Failed to update task." };
  }
}
