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
import { useRouter } from "expo-router";
import { useEmails } from "../../../hooks/useApi";
import { Email } from "../../../lib/api";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { GmailButton } from "../../../components/GmailButton";

type StatusFilter = "all" | "processed" | "pending" | "error";

export default function Emails() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: emails, isLoading, error, refetch } = useEmails();

  const formatEmailDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);

      if (isToday(date)) {
        return `Today, ${format(date, "h:mm a")}`;
      } else if (isTomorrow(date)) {
        return `Tomorrow, ${format(date, "h:mm a")}`;
      } else {
        return format(date, "MMM d, yyyy h:mm a");
      }
    } catch {
      return dateString;
    }
  };

  const getStatusInfo = (email: Email) => {
    if (!email.status || email.status === "pending") {
      return {
        label: "Processing",
        color: "#FF9500",
        backgroundColor: "#FFF3E0",
        icon: "time-outline" as const,
      };
    }

    if (email.status === "processed") {
      return {
        label: "Processed",
        color: "#34C759",
        backgroundColor: "#E8F5E8",
        icon: "checkmark-circle-outline" as const,
      };
    }

    if (email.status === "error") {
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

  const filteredEmails =
    emails?.filter((email) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "processed") return email.status === "processed";
      if (statusFilter === "pending")
        return !email.status || email.status === "pending";
      if (statusFilter === "error") return email.status === "error";
      return true;
    }) || [];

  const getFilterCounts = () => {
    if (!emails) return { all: 0, processed: 0, pending: 0, error: 0 };

    return emails.reduce(
      (counts, email) => {
        counts.all++;
        if (email.status === "processed") counts.processed++;
        else if (email.status === "error") counts.error++;
        else counts.pending++;
        return counts;
      },
      { all: 0, processed: 0, pending: 0, error: 0 }
    );
  };

  const filterCounts = getFilterCounts();

  const renderEmailItem = (email: Email) => {
    const status = getStatusInfo(email);
    const tasksCount = email.tasks?.length || 0;
    const eventsCount = email.events?.length || 0;

    return (
      <TouchableOpacity
        key={email.id}
        style={styles.emailItem}
        onPress={() => router.push(`/emails/${email.id}`)}
      >
        <View style={styles.emailContent}>
          <View style={styles.emailHeader}>
            <Text style={styles.emailSubject} numberOfLines={1}>
              {email.originalSubject || "No Subject"}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: status.backgroundColor },
              ]}
            >
              <Ionicons name={status.icon} size={12} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          </View>

          <View style={styles.emailMeta}>
            <Text style={styles.emailFrom} numberOfLines={1}>
              From: {email.fromEmail || "Unknown"}
            </Text>
            <Text style={styles.emailDate}>
              {email.originalReceivedAt
                ? formatEmailDate(email.originalReceivedAt)
                : email.processedAt
                  ? formatEmailDate(email.processedAt)
                  : "Unknown date"}
            </Text>
          </View>

          {email.summary && (
            <Text style={styles.emailSummary} numberOfLines={2}>
              {email.summary}
            </Text>
          )}

          <View style={styles.extractionInfo}>
            {tasksCount > 0 && (
              <View style={styles.extractionItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={16}
                  color="#007AFF"
                />
                <Text style={styles.extractionText}>
                  {tasksCount} task{tasksCount !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
            {eventsCount > 0 && (
              <View style={styles.extractionItem}>
                <Ionicons name="calendar-outline" size={16} color="#007AFF" />
                <Text style={styles.extractionText}>
                  {eventsCount} event{eventsCount !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
            {tasksCount === 0 &&
              eventsCount === 0 &&
              email.status === "processed" && (
                <Text style={styles.noExtractionText}>No items extracted</Text>
              )}
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    );
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter Emails</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.filterSectionTitle}>Status</Text>

          {(
            [
              { key: "all", label: `All Emails (${filterCounts.all})` },
              {
                key: "processed",
                label: `Processed (${filterCounts.processed})`,
              },
              { key: "pending", label: `Processing (${filterCounts.pending})` },
              { key: "error", label: `Errors (${filterCounts.error})` },
            ] as const
          ).map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterOption,
                statusFilter === filter.key && styles.filterOptionSelected,
              ]}
              onPress={() => {
                setStatusFilter(filter.key);
                setShowFilters(false);
              }}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  statusFilter === filter.key &&
                    styles.filterOptionTextSelected,
                ]}
              >
                {filter.label}
              </Text>
              {statusFilter === filter.key && (
                <Ionicons name="checkmark" size={20} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading emails...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load emails</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Emails</Text>
            <Text style={styles.subtitle}>
              {filteredEmails.length}{" "}
              {filteredEmails.length === 1 ? "email" : "emails"}
            </Text>
          </View>
          <GmailButton />
        </View>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>
            {statusFilter === "all"
              ? "All"
              : statusFilter === "processed"
                ? "Processed"
                : statusFilter === "pending"
                  ? "Processing"
                  : "Errors"}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.emailsList}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {filteredEmails.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No emails found</Text>
            <Text style={styles.emptySubtitle}>
              {statusFilter === "all"
                ? "No emails have been received yet"
                : `No ${statusFilter === "processed" ? "processed" : statusFilter === "pending" ? "processing" : "error"} emails`}
            </Text>
          </View>
        ) : (
          filteredEmails.map(renderEmailItem)
        )}
      </ScrollView>

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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
    alignSelf: "flex-start",
  },
  filterButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  emailsList: {
    flex: 1,
    padding: 16,
  },
  emailItem: {
    flexDirection: "row",
    alignItems: "center",
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
  emailContent: {
    flex: 1,
  },
  emailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  emailSubject: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emailMeta: {
    marginBottom: 8,
  },
  emailFrom: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  emailDate: {
    fontSize: 14,
    color: "#666",
  },
  emailSummary: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  extractionInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  extractionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  extractionText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  noExtractionText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
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
});
