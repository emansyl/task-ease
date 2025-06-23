import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Task, Event, Email } from "../lib/api";

// Query Keys
export const queryKeys = {
  user: ["user"] as const,
  dashboard: ["dashboard"] as const,
  tasks: ["tasks"] as const,
  task: (id: string) => ["tasks", id] as const,
  events: ["events"] as const,
  event: (id: string) => ["events", id] as const,
  emails: ["emails"] as const,
  email: (id: string) => ["emails", id] as const,
  triage: ["triage"] as const,
} as const;

// User hooks
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: api.getProfile,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data);
    },
  });
}

// Dashboard hooks
export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: api.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Task hooks
export function useTasks(filter?: { status?: string; urgency?: string }) {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: () => api.getTasks(filter),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useTask(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.task(id),
    queryFn: () => api.getTask(id),
    enabled: !!id,
    initialData: () => {
      const tasks = queryClient.getQueryData<Task[]>(["tasks"]);
      return tasks?.find((task: Task) => task.id === id);
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      api.updateTask(id, updates),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(queryKeys.task(id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTask,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.task(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.completeTask,
    onSuccess: (data, id) => {
      queryClient.setQueryData(queryKeys.task(id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

// Event hooks
export function useEvents(filter?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: [queryKeys.events],
    queryFn: () => api.getEvents(filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEvent(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => api.getEvent(id),
    enabled: !!id,
    initialData: () => {
      const events = queryClient.getQueryData<Event[]>(["events"]);
      return events?.find((event: Event) => event.id === id);
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Event> }) =>
      api.updateEvent(id, updates),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(queryKeys.event(id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteEvent,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.event(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

// Email hooks
export function useEmails(limit?: number) {
  return useQuery({
    queryKey: [queryKeys.emails],
    queryFn: () => api.getEmails(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useEmail(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.email(id),
    queryFn: () => api.getEmail(id),
    enabled: !!id,
    initialData: () => {
      const emails = queryClient.getQueryData<Email[]>(["emails"]);
      return emails?.find((email: Email) => email.id === id);
    },
  });
}
