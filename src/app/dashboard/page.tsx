"use client";

import { useState } from "react";
import { useTodoLists, useCreateTodoList } from "@/hooks/use-todo-lists";
import {
  useTodos,
  useCreateTodo,
  useToggleTodoStatus,
} from "@/hooks/use-todos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, List, CheckSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Priority, Todo } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);

  const { data: lists, isLoading: listsLoading } = useTodoLists();
  const { todos: todos = [], isLoading: todosLoading } = useTodos(
    selectedListId || undefined
  );
  const createList = useCreateTodoList();
  const createTodo = useCreateTodo();
  const toggleStatus = useToggleTodoStatus();

  if (listsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const TodoLists = () => (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Lists</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNewListForm(!showNewListForm)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {showNewListForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            await createList.mutateAsync({
              name: formData.get("name") as string,
            });
            form.reset();
            setShowNewListForm(false);
          }}
          className="space-y-2"
        >
          <Input
            name="name"
            placeholder="List name"
            required
            autoFocus
            className="h-8"
          />
          <div className="flex space-x-2">
            <Button type="submit" size="sm" disabled={createList.isPending}>
              {createList.isPending && (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              )}
              Create
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowNewListForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <nav className="space-y-1">
        <button
          onClick={() => setSelectedListId(null)}
          className={cn(
            "flex items-center w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted",
            !selectedListId && "bg-muted"
          )}
        >
          <List className="mr-2 h-4 w-4" />
          All Todos
        </button>
        {lists?.map((list) => (
          <button
            key={list.id}
            onClick={() => setSelectedListId(list.id)}
            className={cn(
              "flex items-center w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted",
              selectedListId === list.id && "bg-muted"
            )}
          >
            <List className="mr-2 h-4 w-4" />
            {list.name}
          </button>
        ))}
        {lists?.length === 0 && !showNewListForm && (
          <div className="text-center p-4 text-muted-foreground">
            <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No lists yet</p>
            <p className="text-xs">Click the + button to create one</p>
          </div>
        )}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r bg-muted/30 p-4 space-y-4">
        <TodoLists />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between mt-8 lg:mt-0">
            <h1 className="hidden lg:block text-xl lg:text-2xl font-bold">
              {selectedListId
                ? lists?.find((l) => l.id === selectedListId)?.name
                : "All Todos"}
            </h1>
            {/* Replace Mobile Menu Button with Dropdown */}
            <div className="lg:hidden top-4 left-4 z-50">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Menu className="h-4 w-4 mr-2" />
                    {selectedListId
                      ? lists?.find((l) => l.id === selectedListId)?.name
                      : "All Todos"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedListId(null)}>
                    <List className="mr-2 h-4 w-4" />
                    All Todos
                  </DropdownMenuItem>
                  {lists?.map((list) => (
                    <DropdownMenuItem
                      key={list.id}
                      onClick={() => setSelectedListId(list.id)}
                    >
                      <List className="mr-2 h-4 w-4" />
                      {list.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={() => setShowNewListForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={() => setShowNewTodoForm(!showNewTodoForm)}
              className="whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </div>

          {showNewTodoForm && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                await createTodo.mutateAsync({
                  title: formData.get("title") as string,
                  listId: selectedListId,
                  priority: formData.get("priority") as Priority,
                });
                form.reset();
                setShowNewTodoForm(false);
              }}
              className="space-y-4 p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <Input
                  name="title"
                  placeholder="Todo title"
                  required
                  autoFocus
                />
                <select
                  name="priority"
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  defaultValue="MEDIUM"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={createTodo.isPending}>
                  {createTodo.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowNewTodoForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {todosLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {todos.length > 0 ? (
                todos.map((todo: Todo) => (
                  <div
                    key={todo.id}
                    className={cn(
                      "flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors",
                      todo.status === "COMPLETED" && "bg-muted"
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() =>
                        toggleStatus.mutate({
                          todoId: todo.id,
                          currentStatus: todo.status,
                        })
                      }
                    >
                      <CheckSquare
                        className={cn(
                          "h-5 w-5",
                          todo.status === "COMPLETED"
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "truncate",
                          todo.status === "COMPLETED" &&
                            "line-through text-muted-foreground"
                        )}
                      >
                        {todo.title}
                      </p>
                    </div>
                    <div
                      className={cn("px-2 py-1 text-xs rounded-full ml-2", {
                        "bg-red-100 text-red-700": todo.priority === "URGENT",
                        "bg-orange-100 text-orange-700":
                          todo.priority === "HIGH",
                        "bg-blue-100 text-blue-700": todo.priority === "MEDIUM",
                        "bg-gray-100 text-gray-700": todo.priority === "LOW",
                      })}
                    >
                      {todo.priority.charAt(0) +
                        todo.priority.slice(1).toLowerCase()}
                    </div>
                  </div>
                ))
              ) : !showNewTodoForm ? (
                <div className="text-center p-8 border rounded-lg bg-muted/30">
                  <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">No todos yet</p>
                  <Button
                    onClick={() => setShowNewTodoForm(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add your first todo
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
