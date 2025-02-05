import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoListCreate } from "@/lib/validations/todo";
import { queryKeys } from "@/lib/query-keys";
import { TodoList } from "@prisma/client";

async function getTodoLists() {
  const res = await fetch("/api/todo-lists");
  if (!res.ok) throw new Error("Failed to fetch todo lists");
  return res.json() as Promise<TodoList[]>;
}

async function createTodoList(data: TodoListCreate) {
  const res = await fetch("/api/todo-lists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo list");
  return res.json() as Promise<TodoList>;
}

export function useTodoLists() {
  return useQuery({
    queryKey: queryKeys.todos.lists(),
    queryFn: getTodoLists,
  });
}

export function useCreateTodoList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoList,
    onSuccess: (newList) => {
      queryClient.setQueryData<TodoList[]>(
        queryKeys.todos.lists(),
        (old = []) => [newList, ...old]
      );
    },
  });
}
