// lib/data-fetching.ts (modify getTasksForUser)
import prisma from "@/lib/prisma";

import { Task as UITask } from "@/lib/types"; // Your UI types

// We don't need TaskFilters for DB query anymore for this client-side approach
// but we might still use a similar structure for client-side state.

export interface GetAllTasksResult {
  tasks: UITask[];
}

export async function getAllTasksForUser(
  userId: string
): Promise<GetAllTasksResult> {
  if (!userId) {
    return { tasks: [] };
  }

  try {
    const tasksFromDb = await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
      include: { linksOrAttachments: true },
    });

    const uiTasks: UITask[] = tasksFromDb.map((task) => ({
      id: task.id,
      title: task.title,
      due_date: task.dueDate?.toISOString() || null,
      urgency: task.urgency,
      description: task.description || "",
      status: task.status,
      related_links_or_attachments: task.linksOrAttachments.map((loa) => ({
        type: loa.type as "link" | "attachment_mentioned",
        identifier: loa.identifier,
        description: loa.description,
      })),
    }));

    return {
      tasks: uiTasks,
    };
  } catch (error) {
    console.error("Failed to fetch all tasks:", error);
    return { tasks: [] };
  }
}
