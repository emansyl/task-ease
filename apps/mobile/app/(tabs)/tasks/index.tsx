import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import {
  useTasks,
  useCompleteTask,
  useDeleteTask,
} from "../../../hooks/useApi";
import { Task } from "../../../lib/api";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export default function Tasks() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useTasks({
    status: statusFilter === "all" ? undefined : statusFilter,
    urgency: urgencyFilter === "all" ? undefined : urgencyFilter,
  });

  const completeTaskMutation = useCompleteTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const formatTaskDue = (dueDate: string) => {
    try {
      const due = parseISO(dueDate);

      if (isToday(due)) {
        return "Due: Today";
      } else if (isTomorrow(due)) {
        return "Due: Tomorrow";
      } else {
        return `Due: ${format(due, "MMM d, yyyy")}`;
      }
    } catch {
      return `Due: ${dueDate}`;
    }
  };

  const filteredTasks =
    tasks?.filter((task) => {
      if (!showCompleted && task.status === "complete") {
        return false;
      }
      return true;
    }) || [];

  const getTaskCounts = () => {
    if (!tasks) return { todo: 0, in_progress: 0, complete: 0 };

    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { todo: 0, in_progress: 0, complete: 0 } as Record<string, number>
    );
  };

  const taskCounts = getTaskCounts();

  const statusOptions: FilterOption[] = [
    { label: "All", value: "all" },
    {
      label: `To Do (${taskCounts.todo})`,
      value: "todo",
      count: taskCounts.todo,
    },
    {
      label: `In Progress (${taskCounts.in_progress})`,
      value: "in_progress",
      count: taskCounts.in_progress,
    },
    {
      label: `Completed (${taskCounts.complete})`,
      value: "complete",
      count: taskCounts.complete,
    },
  ];

  const urgencyOptions: FilterOption[] = [
    { label: "All Priorities", value: "all" },
    { label: "High Priority", value: "high" },
    { label: "Medium Priority", value: "medium" },
    { label: "Low Priority", value: "low" },
  ];

  const renderTaskItem = (task: Task) => (
    <View key={task.id} style={styles.taskItem}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          task.status === "complete" && styles.checkboxCompleted,
        ]}
        onPress={() => handleCompleteTask(task.id)}
        disabled={completeTaskMutation.isPending}
      >
        {completeTaskMutation.isPending &&
        completeTaskMutation.variables === task.id ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : task.status === "complete" ? (
          <Ionicons name="checkmark" size={16} color="white" />
        ) : null}
      </TouchableOpacity>

      <Link
        href={`/tasks/${task.id}`}
        style={styles.taskContent}
        asChild
        prefetch
      >
        <TouchableOpacity>
          <Text
            style={[
              styles.taskTitle,
              task.status === "complete" && styles.taskTitleCompleted,
            ]}
          >
            {task.title}
          </Text>

          {task.description && (
            <Text style={styles.taskDescription} numberOfLines={2}>
              {task.description}
            </Text>
          )}

          <View style={styles.taskMeta}>
            {task.dueDate && (
              <Text
                style={[
                  styles.taskDue,
                  task.status === "complete" && styles.taskMetaCompleted,
                ]}
              >
                {formatTaskDue(task.dueDate)}
              </Text>
            )}

            <View style={styles.taskBadges}>
              <View
                style={[
                  styles.statusBadge,
                  task.status === "todo"
                    ? styles.todoStatus
                    : task.status === "in_progress"
                      ? styles.inProgressStatus
                      : styles.completeStatus,
                ]}
              >
                <Text style={styles.statusText}>
                  {task.status === "todo"
                    ? "TO DO"
                    : task.status === "in_progress"
                      ? "IN PROGRESS"
                      : "COMPLETE"}
                </Text>
              </View>

              <View
                style={[
                  styles.urgencyBadge,
                  task.urgency === "high"
                    ? styles.highUrgency
                    : task.urgency === "medium"
                      ? styles.mediumUrgency
                      : styles.lowUrgency,
                ]}
              >
                <Text style={styles.urgencyText}>
                  {task.urgency.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(task.id)}
        disabled={deleteTaskMutation.isPending}
      >
        {deleteTaskMutation.isPending &&
        deleteTaskMutation.variables === task.id ? (
          <ActivityIndicator size="small" color="#FF3B30" />
        ) : (
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        )}
      </TouchableOpacity>

      <Link href={`/tasks/${task.id}`} asChild prefetch>
        <TouchableOpacity style={styles.chevron}>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </Link>
    </View>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter Tasks</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Status</Text>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.filterOption,
                  statusFilter === option.value && styles.filterOptionSelected,
                ]}
                onPress={() => setStatusFilter(option.value)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    statusFilter === option.value &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {statusFilter === option.value && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Priority</Text>
            {urgencyOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.filterOption,
                  urgencyFilter === option.value && styles.filterOptionSelected,
                ]}
                onPress={() => setUrgencyFilter(option.value)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    urgencyFilter === option.value &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {urgencyFilter === option.value && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterSection}>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => setShowCompleted(!showCompleted)}
            >
              <Text style={styles.toggleOptionText}>Show Completed Tasks</Text>
              <View
                style={[styles.toggle, showCompleted && styles.toggleActive]}
              >
                {showCompleted && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={() => {
              setStatusFilter("all");
              setUrgencyFilter("all");
              setShowCompleted(false);
            }}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyFiltersButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyFiltersText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load tasks</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
        </Text>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        <View style={styles.quickFilters}>
          <TouchableOpacity
            style={[
              styles.quickFilter,
              !showCompleted && styles.quickFilterActive,
            ]}
            onPress={() => setShowCompleted(false)}
          >
            <Text
              style={[
                styles.quickFilterText,
                !showCompleted && styles.quickFilterTextActive,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickFilter,
              showCompleted && styles.quickFilterActive,
            ]}
            onPress={() => setShowCompleted(true)}
          >
            <Text
              style={[
                styles.quickFilterText,
                showCompleted && styles.quickFilterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <LoadingSkeleton itemCount={6} itemHeight={120} />
      ) : (
        <ScrollView
          style={styles.tasksList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={80}
                color="#ccc"
              />
              <Text style={styles.emptyTitle}>No tasks found</Text>
              <Text style={styles.emptySubtitle}>
                {showCompleted
                  ? "No tasks match your current filters"
                  : "All tasks completed!"}
              </Text>
            </View>
          ) : (
            filteredTasks.map(renderTaskItem)
          )}
        </ScrollView>
      )}

      {renderFilterModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
  },
  filterButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  quickFilters: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 2,
  },
  quickFilter: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
  },
  quickFilterActive: {
    backgroundColor: "#007AFF",
  },
  quickFilterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  quickFilterTextActive: {
    color: "white",
  },
  tasksList: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: "#34C759",
    borderColor: "#34C759",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    lineHeight: 22,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  taskDue: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  taskMetaCompleted: {
    color: "#999",
  },
  taskBadges: {
    flexDirection: "row",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  todoStatus: {
    backgroundColor: "#E3F2FD",
  },
  inProgressStatus: {
    backgroundColor: "#FFF3E0",
  },
  completeStatus: {
    backgroundColor: "#E8F5E8",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  highUrgency: {
    backgroundColor: "#FF3B30",
  },
  mediumUrgency: {
    backgroundColor: "#FF9500",
  },
  lowUrgency: {
    backgroundColor: "#34C759",
  },
  urgencyText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
    marginTop: 2,
  },
  chevron: {
    padding: 4,
    marginLeft: 8,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 32,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: "#f0f8ff",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
  },
  filterOptionTextSelected: {
    color: "#007AFF",
    fontWeight: "600",
  },
  toggleOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toggleOptionText: {
    fontSize: 16,
    color: "#333",
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    gap: 12,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
  },
  clearFiltersText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  applyFiltersText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
