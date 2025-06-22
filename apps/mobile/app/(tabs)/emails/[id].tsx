import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEmail } from "../../../hooks/useApi";
import { Task, Event } from "../../../lib/api";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

export default function EmailDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: email, isLoading, error } = useEmail(id as string);

  const formatEmailDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

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

  const formatEventTime = (startTime: string, endTime: string) => {
    try {
      const start = parseISO(startTime);
      const end = parseISO(endTime);
      
      if (isToday(start)) {
        return `Today, ${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
      } else if (isTomorrow(start)) {
        return `Tomorrow, ${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
      } else {
        const isSameDay = start.toDateString() === end.toDateString();
        if (isSameDay) {
          return `${format(start, "MMM d, h:mm a")} - ${format(end, "h:mm a")}`;
        } else {
          return `${format(start, "MMM d, h:mm a")} - ${format(end, "MMM d, h:mm a")}`;
        }
      }
    } catch {
      return `${startTime} - ${endTime}`;
    }
  };

  const getStatusInfo = (status?: string) => {
    if (!status || status === "pending") {
      return {
        label: "Processing",
        color: "#FF9500",
        backgroundColor: "#FFF3E0",
        icon: "time-outline" as const,
      };
    }
    
    if (status === "processed") {
      return {
        label: "Processed",
        color: "#34C759",
        backgroundColor: "#E8F5E8",
        icon: "checkmark-circle-outline" as const,
      };
    }
    
    if (status === "error") {
      return {
        label: "Error",
        color: "#FF3B30",
        backgroundColor: "#FFE6E6",
        icon: "alert-circle-outline" as const,
      };
    }

    return {
      label: "Unknown",
      color: "#666",
      backgroundColor: "#f0f0f0",
      icon: "help-circle-outline" as const,
    };
  };

  const renderTaskItem = (task: Task) => (
    <TouchableOpacity
      key={task.id}
      style={styles.extractedItem}
      onPress={() => router.push(`/(tabs)/tasks/${task.id}`)}
    >
      <View style={styles.extractedContent}>
        <Text style={styles.extractedTitle}>{task.title}</Text>
        {task.description && (
          <Text style={styles.extractedDescription} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        <View style={styles.extractedMeta}>
          {task.dueDate && (
            <Text style={styles.extractedDue}>
              {formatTaskDue(task.dueDate)}
            </Text>
          )}
          <View style={[
            styles.urgencyBadge,
            task.urgency === 'high' ? styles.highUrgency :
            task.urgency === 'medium' ? styles.mediumUrgency :
            styles.lowUrgency
          ]}>
            <Text style={styles.urgencyText}>
              {task.urgency.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  const renderEventItem = (event: Event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.extractedItem}
      onPress={() => router.push(`/(tabs)/events/${event.id}`)}
    >
      <View style={styles.extractedContent}>
        <Text style={styles.extractedTitle}>{event.title}</Text>
        {event.description && (
          <Text style={styles.extractedDescription} numberOfLines={2}>
            {event.description}
          </Text>
        )}
        <View style={styles.extractedMeta}>
          <Text style={styles.extractedTime}>
            {formatEventTime(event.startTime, event.endTime)}
          </Text>
          {event.location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.extractedLocation} numberOfLines={1}>
                {event.location}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading email...</Text>
      </View>
    );
  }

  if (error || !email) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load email</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const status = getStatusInfo(email.status);
  const tasksCount = email.tasks?.length || 0;
  const eventsCount = email.events?.length || 0;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Email Header */}
        <View style={styles.emailHeader}>
          <Text style={styles.emailSubject}>
            {email.originalSubject || "No Subject"}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
            <Ionicons name={status.icon} size={16} color={status.color} />
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>

        {/* Email Meta Information */}
        <View style={styles.emailMeta}>
          <View style={styles.metaRow}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              {email.fromEmail || "Unknown sender"}
            </Text>
          </View>
          
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              {email.originalReceivedAt 
                ? formatEmailDate(email.originalReceivedAt)
                : email.processedAt 
                ? formatEmailDate(email.processedAt)
                : "Unknown date"
              }
            </Text>
          </View>

          {email.category && (
            <View style={styles.metaRow}>
              <Ionicons name="pricetag-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{email.category}</Text>
            </View>
          )}
        </View>

        {/* Email Summary */}
        {email.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{email.summary}</Text>
          </View>
        )}

        {/* Extraction Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extracted Items</Text>
          <View style={styles.extractionOverview}>
            <View style={styles.overviewItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.overviewText}>
                {tasksCount} Task{tasksCount !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.overviewItem}>
              <Ionicons name="calendar-outline" size={24} color="#007AFF" />
              <Text style={styles.overviewText}>
                {eventsCount} Event{eventsCount !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Extracted Tasks */}
        {tasksCount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks ({tasksCount})</Text>
            <View style={styles.extractedList}>
              {email.tasks.map(renderTaskItem)}
            </View>
          </View>
        )}

        {/* Extracted Events */}
        {eventsCount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events ({eventsCount})</Text>
            <View style={styles.extractedList}>
              {email.events.map(renderEventItem)}
            </View>
          </View>
        )}

        {/* No Items Message */}
        {tasksCount === 0 && eventsCount === 0 && email.status === "processed" && (
          <View style={styles.section}>
            <View style={styles.noItemsContainer}>
              <Ionicons name="information-circle-outline" size={48} color="#ccc" />
              <Text style={styles.noItemsTitle}>No Items Extracted</Text>
              <Text style={styles.noItemsText}>
                This email was processed but no tasks or events were found.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
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
  emailHeader: {
    marginBottom: 20,
  },
  emailSubject: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    lineHeight: 30,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emailMeta: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  metaText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  extractionOverview: {
    flexDirection: "row",
    gap: 24,
  },
  overviewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  overviewText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  extractedList: {
    gap: 12,
  },
  extractedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  extractedContent: {
    flex: 1,
  },
  extractedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  extractedDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  extractedMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  extractedDue: {
    fontSize: 14,
    color: "#666",
  },
  extractedTime: {
    fontSize: 14,
    color: "#007AFF",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  extractedLocation: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    fontSize: 12,
    fontWeight: "600",
  },
  noItemsContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noItemsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  noItemsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});