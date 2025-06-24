import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useIntegrationStatus, useRefreshGmailEmails } from "@/hooks/useApi";

interface GmailButtonProps {
  style?: any;
}

export function GmailButton({ style }: GmailButtonProps) {
  const router = useRouter();
  const { isActive: isGmailConnected, isLoading } = useIntegrationStatus("gmail");
  const refreshGmailMutation = useRefreshGmailEmails();

  const handlePress = () => {
    if (isGmailConnected) {
      // Refresh Gmail emails
      refreshGmailMutation.mutate();
    } else {
      // Navigate to settings to connect Gmail
      router.push("/(tabs)/settings");
    }
  };

  if (isLoading) {
    return (
      <TouchableOpacity style={[styles.button, styles.loadingButton, style]} disabled>
        <ActivityIndicator size="small" color="#666" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isGmailConnected ? styles.refreshButton : styles.connectButton,
        style,
      ]}
      onPress={handlePress}
      disabled={refreshGmailMutation.isPending}
    >
      {refreshGmailMutation.isPending ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          <Ionicons
            name={isGmailConnected ? "refresh" : "logo-google"}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isGmailConnected ? "Refresh Gmail" : "Connect Gmail"}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  connectButton: {
    backgroundColor: "#EA4335",
  },
  refreshButton: {
    backgroundColor: "#007AFF",
  },
  loadingButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});