import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
  Linking,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import { useUser } from "../hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";

export default function Onboarding() {
  const [session, setSession] = useState<Session | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const { data: user, isLoading: userLoading } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCopyForwardingEmail = async () => {
    try {
      const forwardingEmail =
        user?.forwardingemail || `${session?.user?.id}@taskease.ai`;
      await Clipboard.setString(forwardingEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch (error) {
      console.error("Failed to copy email address:", error);
    }
  };

  const handleOpenGuide = () => {
    const guideUrl = "https://docs.taskease.ai/forwarding-guide";
    Linking.openURL(guideUrl).catch(() => {
      // If external link fails, show in-app guide
      setShowGuide(true);
    });
  };

  const handleContinueToDashboard = () => {
    router.replace("/dashboard");
  };

  const forwardingEmail =
    user?.forwardingemail || `${session?.user?.id}@taskease.ai`;

  if (userLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Setting up your account...</Text>
      </View>
    );
  }

  if (showGuide) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowGuide(false)}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Email Forwarding Guide</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.guideContent}>
          <View style={styles.guideSection}>
            <Text style={styles.guideSectionTitle}>📧 Gmail Instructions</Text>
            <Text style={styles.guideStep}>
              1. Open Gmail and click the gear icon → &quot;See all
              settings&quot;
            </Text>
            <Text style={styles.guideStep}>
              2. Go to &quot;Forwarding and POP/IMAP&quot; tab
            </Text>
            <Text style={styles.guideStep}>
              3. Click &quot;Add a forwarding address&quot;
            </Text>
            <Text style={styles.guideStep}>4. Enter: {forwardingEmail}</Text>
            <Text style={styles.guideStep}>
              5. Click &quot;Next&quot; and follow verification steps
            </Text>
            <Text style={styles.guideStep}>
              6. Select &quot;Forward a copy of incoming mail to&quot; and
              choose your TaskEase address
            </Text>
          </View>

          <View style={styles.guideSection}>
            <Text style={styles.guideSectionTitle}>
              📱 iPhone Mail Instructions
            </Text>
            <Text style={styles.guideStep}>
              1. Open Settings → Mail → Rules
            </Text>
            <Text style={styles.guideStep}>2. Tap &quot;Add Rule&quot;</Text>
            <Text style={styles.guideStep}>
              3. Set conditions for emails you want to forward
            </Text>
            <Text style={styles.guideStep}>
              4. Choose &quot;Forward Message&quot;
            </Text>
            <Text style={styles.guideStep}>5. Enter: {forwardingEmail}</Text>
          </View>

          <View style={styles.guideSection}>
            <Text style={styles.guideSectionTitle}>🔄 What Happens Next?</Text>
            <Text style={styles.guideStep}>
              • TaskEase AI will analyze your forwarded emails
            </Text>
            <Text style={styles.guideStep}>
              • Tasks and events are automatically extracted
            </Text>
            <Text style={styles.guideStep}>
              • You&apos;ll get notifications to review new items
            </Text>
            <Text style={styles.guideStep}>
              • Everything appears in your Dashboard
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinueToDashboard}
          >
            <Text style={styles.primaryButtonText}>
              Got it! Continue to Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail" size={80} color="#007AFF" />
        </View>

        <Text style={styles.welcomeTitle}>Welcome to TaskEase!</Text>
        <Text style={styles.welcomeSubtitle}>
          Let&apos;s set up your AI-powered email assistant
        </Text>

        <View style={styles.emailSection}>
          <Text style={styles.sectionTitle}>Your Unique Forwarding Email</Text>
          <Text style={styles.sectionDescription}>
            Forward emails to this address and TaskEase will automatically
            extract tasks and events for you.
          </Text>

          <View style={styles.emailContainer}>
            <View style={styles.emailBox}>
              <Text style={styles.emailText} numberOfLines={1}>
                {forwardingEmail}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.copyButton, copiedEmail && styles.copiedButton]}
              onPress={handleCopyForwardingEmail}
            >
              <Ionicons
                name={copiedEmail ? "checkmark" : "copy"}
                size={20}
                color="white"
              />
              <Text style={styles.copyButtonText}>
                {copiedEmail ? "Copied!" : "Copy Address"}
              </Text>
            </TouchableOpacity>
          </View>

          {copiedEmail && (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.successText}>
                Email address copied to clipboard!
              </Text>
            </View>
          )}
        </View>

        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>How it works</Text>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Forward Emails</Text>
              <Text style={styles.stepDescription}>
                Set up email forwarding to your TaskEase address
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>AI Analyzes</Text>
              <Text style={styles.stepDescription}>
                Our AI extracts tasks, events, and important information
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Stay Organized</Text>
              <Text style={styles.stepDescription}>
                Review and manage everything in your Dashboard
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleOpenGuide}
        >
          <Ionicons name="book-outline" size={20} color="#007AFF" />
          <Text style={styles.secondaryButtonText}>How-to Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleContinueToDashboard}
        >
          <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    width: 24,
  },
  welcomeContent: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 26,
  },
  emailSection: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 24,
  },
  emailContainer: {
    marginBottom: 16,
  },
  emailBox: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailText: {
    fontSize: 18,
    fontFamily: "monospace",
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  copyButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  copiedButton: {
    backgroundColor: "#34C759",
  },
  copyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },
  successText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "500",
  },
  stepsSection: {
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  actionsContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  guideContent: {
    padding: 24,
  },
  guideSection: {
    marginBottom: 32,
  },
  guideSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  guideStep: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
});
