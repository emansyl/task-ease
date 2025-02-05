import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo, TodoStatus, Priority } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { queryKeys } from "@/lib/query-keys";
import { TodoUpdate } from "@/lib/validations/todo";

interface CreateTodoInput {
  title: string;
  listId: string | null;
  priority: Priority;
}

interface ToggleTodoInput {
  todoId: string;
  currentStatus: TodoStatus;
}

export function useTodos(listId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos", listId],
    queryFn: async () => {
      const response = await fetch(
        `/api/todos${listId ? `?listId=${listId}` : ""}`
      );
      const data = await response.json();
      return data as Todo[];
    },
  });

  const addTodo = useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Success",
        description: "Todo added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const updateTodo = useMutation<
    Todo,
    Error,
    { todoId: string; data: TodoUpdate }
  >({
    mutationFn: async ({ todoId, data }) => {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      return response.json();
    },
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(
        queryKeys.todos.list(updatedTodo.listId),
        (old = []) =>
          old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
  });

  const deleteTodo = useMutation<void, Error, string>({
    mutationFn: async (todoId) => {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos.all });
    },
  });

  const toggleTodoStatus = useMutation({
    mutationFn: async (input: ToggleTodoInput) => {
      const response = await fetch(`/api/todos/${input.todoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: input.currentStatus === "COMPLETED" ? "ACTIVE" : "COMPLETED",
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: todos || [],
    isLoading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
  };
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useToggleTodoStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ToggleTodoInput) => {
      console.log(input);
      const response = await fetch(`/api/todos/${input.todoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status:
            input.currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
        }),
      });
      console.log(response);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
