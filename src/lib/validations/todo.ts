import { z } from "zod";
import { TodoStatus, Priority } from "@prisma/client";

export const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.nativeEnum(TodoStatus).optional().default("PENDING"),
  priority: z.nativeEnum(Priority).optional().default("MEDIUM"),
  dueDate: z.string().datetime().optional(),
  listId: z.string().optional().nullable(),
});

export const todoUpdateSchema = todoCreateSchema.partial();

export const todoListCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const todoListUpdateSchema = todoListCreateSchema.partial();

export type TodoCreate = z.infer<typeof todoCreateSchema>;
export type TodoUpdate = z.infer<typeof todoUpdateSchema>;
export type TodoListCreate = z.infer<typeof todoListCreateSchema>;
export type TodoListUpdate = z.infer<typeof todoListUpdateSchema>;
