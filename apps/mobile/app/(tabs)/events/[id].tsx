import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEvent } from "../../../hooks/useApi";
import {
  format,
  parseISO,
  isToday,
  isTomorrow,
} from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { Event } from "../../../lib/api";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const { data: event, isLoading, error } = useEvent(id as string);

  const formatEventDate = (startTime: string, endTime: string) => {
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

  const generateICSFile = (event: Event): string => {
    const startDate = parseISO(event.startTime);
    const endDate = parseISO(event.endTime);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TaskEase//TaskEase Mobile//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${event.title}`,
      ...(event.description ? [`DESCRIPTION:${event.description}`] : []),
      ...(event.location ? [`LOCATION:${event.location}`] : []),
      `UID:${event.id}@taskease.ai`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return icsContent;
  };

  const handleDownloadICS = (event: Event) => {
    try {
      const icsContent = generateICSFile(event);
      // For mobile, we'll create a Google Calendar link instead
      handleAddToGoogleCalendar(event);
    } catch (error) {
      Alert.alert("Error", "Failed to create calendar file");
    }
  };

  const handleAddToGoogleCalendar = (event: Event) => {
    try {
      const startDate = parseISO(event.startTime);
      const endDate = parseISO(event.endTime);

      const formatGoogleDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: event.title,
        dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
        ...(event.description && { details: event.description }),
        ...(event.location && { location: event.location }),
      });

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;

      Linking.openURL(googleCalendarUrl).catch(() => {
        Alert.alert("Error", "Could not open Google Calendar");
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create calendar link");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading event...</Text>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load event</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.eventTitle}>{event.title}</Text>

        <View style={styles.eventMeta}>
          <View style={styles.eventTime}>
            <Ionicons name="time-outline" size={20} color="#007AFF" />
            <Text style={styles.eventTimeText}>
              {formatEventDate(event.startTime, event.endTime)}
            </Text>
          </View>

          {event.location && (
            <View style={styles.eventLocation}>
              <Ionicons name="location-outline" size={20} color="#007AFF" />
              <Text style={styles.eventLocationText}>
                {event.location}
              </Text>
            </View>
          )}

          {event.isRecurringHint && (
            <View style={styles.eventRecurring}>
              <Ionicons name="repeat" size={20} color="#007AFF" />
              <Text style={styles.eventRecurringText}>
                This may be a recurring event
              </Text>
            </View>
          )}
        </View>

        {event.description && (
          <View style={styles.eventDescription}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>
              {event.description}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => handleDownloadICS(event)}
        >
          <Ionicons name="download-outline" size={20} color="#007AFF" />
          <Text style={styles.calendarButtonText}>Download .ics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleCalendarButton}
          onPress={() => handleAddToGoogleCalendar(event)}
        >
          <Ionicons name="calendar" size={20} color="white" />
          <Text style={styles.googleCalendarButtonText}>
            Add to Google Calendar
          </Text>
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    lineHeight: 30,
  },
  eventMeta: {
    marginBottom: 24,
  },
  eventTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTimeText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  eventLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventLocationText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  eventRecurring: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventRecurringText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  eventDescription: {
    marginBottom: 32,
  },
  descriptionLabel: {
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
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    gap: 12,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  calendarButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  googleCalendarButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  googleCalendarButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});