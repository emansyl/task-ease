import { supabase } from "./supabase";

// Base API configuration
const API_BASE_URL = "http://10.0.0.63:3000"; //process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Types based on your Prisma schema
export interface Task {
  id: string;
  emailId?: string;
  userId: string;
  title: string;
  dueDate?: string;
  description?: string;
  urgency: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "complete";
  createdAt: string;
  completedAt?: string;
}

export interface Event {
  id: string;
  userId: string;
  emailId?: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  isRecurringHint: boolean;
  createdAt: string;
}

export interface Email {
  id: string;
  userId: string;
  fromEmail?: string;
  originalSubject?: string;
  summary?: string;
  category?: string;
  status?: string;
  originalReceivedAt?: string;
  processedAt: string;
  tasks: Task[];
  events: Event[];
}

export interface User {
  id: string;
  email: string;
  forwardingemail: string;
  created_at?: string;
}

export interface DashboardData {
  upcomingEvents: Event[];
  tasksDueSoon: Task[];
  pendingTriageCount: number;
}

// Helper function to get auth headers
async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No authentication token available");
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// API functions for React Query
export const api = {
  // User
  getProfile: (): Promise<User> => apiCall<User>("/user/profile"),

  updateProfile: (data: Partial<User>): Promise<User> =>
    apiCall<User>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Dashboard
  getDashboardData: (): Promise<DashboardData> =>
    apiCall<DashboardData>("/dashboard"),

  // Tasks
  getTasks: (filter?: {
    status?: string;
    urgency?: string;
  }): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filter?.status) params.append("status", filter.status);
    if (filter?.urgency) params.append("urgency", filter.urgency);

    const query = params.toString() ? `?${params.toString()}` : "";
    return apiCall<Task[]>(`/tasks${query}`);
  },

  getTask: (id: string): Promise<Task> => apiCall<Task>(`/tasks/${id}`),

  createTask: (
    task: Omit<Task, "id" | "userId" | "createdAt">
  ): Promise<Task> =>
    apiCall<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  updateTask: (id: string, updates: Partial<Task>): Promise<Task> =>
    apiCall<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),

  deleteTask: (id: string): Promise<void> =>
    apiCall<void>(`/tasks/${id}`, {
      method: "DELETE",
    }),

  completeTask: (id: string): Promise<Task> =>
    apiCall<Task>(`/tasks/${id}/complete`, {
      method: "POST",
    }),

  // Events
  getEvents: (filter?: {
    startDate?: string;
    endDate?: string;
  }): Promise<Event[]> => {
    const params = new URLSearchParams();
    if (filter?.startDate) params.append("startDate", filter.startDate);
    if (filter?.endDate) params.append("endDate", filter.endDate);

    const query = params.toString() ? `?${params.toString()}` : "";
    return apiCall<Event[]>(`/events${query}`);
  },

  getEvent: (id: string): Promise<Event> => apiCall<Event>(`/events/${id}`),

  createEvent: (
    event: Omit<Event, "id" | "userId" | "createdAt">
  ): Promise<Event> =>
    apiCall<Event>("/events", {
      method: "POST",
      body: JSON.stringify(event),
    }),

  updateEvent: (id: string, updates: Partial<Event>): Promise<Event> =>
    apiCall<Event>(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),

  deleteEvent: (id: string): Promise<void> =>
    apiCall<void>(`/events/${id}`, {
      method: "DELETE",
    }),

  // Emails
  getEmails: (limit?: number): Promise<Email[]> => {
    const params = limit ? `?limit=${limit}` : "";
    return apiCall<Email[]>(`/emails${params}`);
  },

  getEmail: (id: string): Promise<Email> => apiCall<Email>(`/emails/${id}`),

  // Triage
  getPendingTasks: (): Promise<Task[]> => apiCall<Task[]>("/triage/tasks"),

  approveTask: (id: string): Promise<Task> =>
    apiCall<Task>(`/triage/tasks/${id}/approve`, {
      method: "POST",
    }),

  rejectTask: (id: string): Promise<void> =>
    apiCall<void>(`/triage/tasks/${id}/reject`, {
      method: "POST",
    }),

  approveAndCompleteTask: (id: string): Promise<Task> =>
    apiCall<Task>(`/triage/tasks/${id}/approve-complete`, {
      method: "POST",
    }),
};
