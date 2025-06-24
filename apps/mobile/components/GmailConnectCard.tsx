import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";

interface GmailConnectCardProps {
  onConnected?: () => void;
  showTitle?: boolean;
  style?: any;
}

export function GmailConnectCard({
  onConnected,
  showTitle = true,
  style,
}: GmailConnectCardProps) {
  const { session } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [gmailAccount, setGmailAccount] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGmailStatus = useCallback(async () => {
    if (!session?.access_token) return;

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/user/gmail-connection`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      const data = await res.json();
      if (data.isConnected) {
        setGmailAccount(data);
        setIsConnected(true);
      } else {
        setGmailAccount(null);
        setIsConnected(false);
      }
    } catch (err) {
      console.error("Failed to load Gmail connection", err);
    }
  }, [session?.access_token]);

  useEffect(() => {
    fetchGmailStatus();
  }, [fetchGmailStatus]);

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (url.includes("oauth-success") && url.includes("provider=gmail")) {
        fetchGmailStatus();
        onConnected?.();
        Alert.alert(
          "Success!",
          "Gmail account connected successfully. We can now help you manage your emails.",
          [{ text: "OK" }]
        );
      }
    };

    const sub = Linking.addEventListener("url", handleDeepLink);
    return () => sub.remove();
  }, [fetchGmailStatus, onConnected]);

  const handleConnect = async () => {
    if (!session?.user?.id) {
      Alert.alert("Login required", "Please log in to connect Gmail");
      return;
    }

    try {
      setIsConnecting(true);
      const url = `${process.env.EXPO_PUBLIC_API_URL}/oauth/gmail?user=${session.user.id}&from=mobile`;
      Linking.openURL(url);
    } catch (err: any) {
      console.error("Failed to open Gmail connect URL:", err);
      setError("Could not open browser for Gmail connection.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!session?.access_token) {
      Alert.alert(
        "Authentication required",
        "Please log in to disconnect Gmail"
      );
      return;
    }

    Alert.alert(
      "Disconnect Gmail",
      "Are you sure you want to disconnect your Gmail account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Disconnect",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/api/user/gmail-connection`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${session.access_token}`,
                  },
                }
              );
              setGmailAccount(null);
              setIsConnected(false);
              Alert.alert("Success", "Gmail account disconnected successfully");
            } catch (err) {
              console.error("Failed to disconnect Gmail", err);
              Alert.alert("Error", "Failed to disconnect Gmail.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, style]}>
      {showTitle && <Text style={styles.title}>Connect Your Gmail</Text>}

      {!isConnected ? (
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-outline" size={32} color="#EA4335" />
          </View>

          <Text style={styles.description}>
            Connect your Gmail account to automatically process and organize
            your emails into tasks and events.
          </Text>

          <TouchableOpacity
            style={[
              styles.connectButton,
              isConnecting && styles.connectButtonDisabled,
            ]}
            onPress={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={styles.connectButtonText}>Connect Gmail</Text>
              </>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.connectedHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#34D399" />
            <Text style={styles.connectedTitle}>Gmail Connected</Text>
          </View>

          <Text style={styles.connectedEmail}>{gmailAccount?.email}</Text>
          <Text style={styles.connectedDate}>
            Connected{" "}
            {new Date(gmailAccount?.connectedAt || "").toLocaleDateString()}
          </Text>

          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={handleDisconnect}
          >
            <Text style={styles.disconnectButtonText}>Disconnect</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1F2937",
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  connectButton: {
    backgroundColor: "#EA4335",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    minWidth: 140,
  },
  connectButtonDisabled: {
    opacity: 0.7,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  connectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  connectedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  connectedEmail: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 4,
  },
  connectedDate: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
  },
  disconnectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  disconnectButtonText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
