export const queryKeys = {
  todos: {
    all: ["todos"] as const,
    lists: () => [...queryKeys.todos.all, "lists"] as const,
    list: (listId: string | null) => [...queryKeys.todos.all, listId] as const,
    detail: (todoId: string) => [...queryKeys.todos.all, todoId] as const,
  },
} as const;
