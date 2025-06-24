import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";
import { useIntegrations } from "@/hooks/useApi";
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "@/lib/api";

export function GmailConnectCard({ style }: { style?: any }) {
  const { session } = useAuth();
  const { data: integrations, isLoading, refetch } = useIntegrations();

  // Auto-refresh when user returns to screen
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const gmailIntegration = integrations?.find(
    (integration) => integration.provider === "gmail" && integration.isActive
  );

  const handleConnect = async () => {
    if (!session?.access_token) return;

    try {
      const url = `${API_BASE_URL}/settings?token=${session.access_token}`;
      await Linking.openURL(url);
    } catch (err) {
      console.error("Failed to open Gmail connect URL:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, style, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Gmail Integration</Text>

      {gmailIntegration ? (
        <View style={styles.content}>
          <View style={styles.connectedHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#34D399" />
            <Text style={styles.connectedTitle}>Connected</Text>
          </View>
          <Text style={styles.connectedEmail}>{gmailIntegration.email}</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Ionicons name="mail-outline" size={32} color="#EA4335" />
          <Text style={styles.description}>
            Connect your Gmail to automatically process emails into tasks and
            events
          </Text>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
          >
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text style={styles.connectButtonText}>Connect Gmail</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1F2937",
  },
  content: {
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 16,
  },
  connectButton: {
    backgroundColor: "#EA4335",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  connectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  connectedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  connectedEmail: {
    fontSize: 14,
    color: "#6B7280",
  },
});
