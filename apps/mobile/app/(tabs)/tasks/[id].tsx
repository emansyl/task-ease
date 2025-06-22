import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTask, useCompleteTask, useDeleteTask, useUpdateTask } from "../../../hooks/useApi";
import { Task } from "../../../lib/api";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: task, isLoading, error } = useTask(id as string);
  
  const completeTaskMutation = useCompleteTask();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const formatTaskDue = (dueDate: string) => {
    try {
      const due = parseISO(dueDate);
      
      if (isToday(due)) {
        return 'Due: Today';
      } else if (isTomorrow(due)) {
        return 'Due: Tomorrow';
      } else {
        return `Due: ${format(due, 'MMM d, yyyy')}`;
      }
    } catch {
      return `Due: ${dueDate}`;
    }
  };

  const handleCompleteTask = async () => {
    try {
      await completeTaskMutation.mutateAsync(task!.id);
    } catch (error) {
      Alert.alert("Error", "Failed to complete task");
    }
  };

  const handleDeleteTask = async () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTaskMutation.mutateAsync(task!.id);
              router.back();
            } catch (error) {
              Alert.alert("Error", "Failed to delete task");
            }
          },
        },
      ]
    );
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task!.id,
        updates: { status: newStatus }
      });
    } catch (error) {
      Alert.alert("Error", "Failed to update task status");
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return '#007AFF';
      case 'in_progress': return '#FF9500';
      case 'complete': return '#34C759';
      default: return '#666';
    }
  };

  const getUrgencyColor = (urgency: Task['urgency']) => {
    switch (urgency) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#666';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  if (error || !task) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load task</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.taskHeader}>
          <Text style={[
            styles.taskTitle,
            task.status === 'complete' && styles.taskTitleCompleted
          ]}>
            {task.title}
          </Text>
          
          <View style={styles.badgeRow}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(task.status) }
              ]}>
                {task.status === 'todo' ? 'TO DO' :
                 task.status === 'in_progress' ? 'IN PROGRESS' :
                 'COMPLETE'}
              </Text>
            </View>
            
            <View style={[
              styles.urgencyBadge,
              { backgroundColor: getUrgencyColor(task.urgency) }
            ]}>
              <Text style={styles.urgencyText}>
                {task.urgency.toUpperCase()} PRIORITY
              </Text>
            </View>
          </View>
        </View>

        {task.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{task.description}</Text>
          </View>
        )}

        {task.dueDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Due Date</Text>
            <View style={styles.dueDateRow}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.dueDateText}>
                {formatTaskDue(task.dueDate)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusButtons}>
            {(['todo', 'in_progress', 'complete'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  task.status === status && styles.statusButtonActive,
                  { borderColor: getStatusColor(status) }
                ]}
                onPress={() => handleStatusChange(status)}
                disabled={updateTaskMutation.isPending}
              >
                <Text style={[
                  styles.statusButtonText,
                  task.status === status && { color: getStatusColor(status) }
                ]}>
                  {status === 'todo' ? 'To Do' :
                   status === 'in_progress' ? 'In Progress' :
                   'Complete'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {task.status !== 'complete' && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteTask}
            disabled={completeTaskMutation.isPending}
          >
            {completeTaskMutation.isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.completeButtonText}>Mark Complete</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTask}
          disabled={deleteTaskMutation.isPending}
        >
          {deleteTaskMutation.isPending ? (
            <ActivityIndicator size="small" color="#FF3B30" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 20,
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
  content: {
    flex: 1,
    padding: 20,
  },
  taskHeader: {
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    lineHeight: 30,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  urgencyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  dueDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dueDateText: {
    fontSize: 16,
    color: "#333",
  },
  statusButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  statusButtonActive: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    gap: 12,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#34C759",
    gap: 8,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF3B30",
    gap: 8,
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});