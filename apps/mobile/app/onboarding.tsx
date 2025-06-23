import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { router } from "expo-router";
import { useUser } from "../hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";
import { api } from "../lib/api";
import { formatForwardingEmail } from "../lib/email";

// Types
type OnboardingState = {
  copiedEmail: boolean;
  showGuide: boolean;
  isCompletingOnboarding: boolean;
  isSendingSampleEmail: boolean;
};

// Card Component
const Card = ({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.cardIcon}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {description && <Text style={styles.cardDescription}>{description}</Text>}
    {children}
  </View>
);

// Email Setup Card
const EmailSetupCard = ({
  forwardingEmail,
  copiedEmail,
  onCopy,
}: {
  forwardingEmail: string;
  copiedEmail: boolean;
  onCopy: () => void;
}) => (
  <Card
    icon="mail"
    title="Your Unique Forwarding Email"
    description="Forward emails to this address and TaskEase will automatically extract tasks and events for you."
  >
    <View style={styles.emailContainer}>
      <View style={styles.emailBox}>
        <Text style={styles.emailText} numberOfLines={1}>
          {forwardingEmail}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.copyButton, copiedEmail && styles.copiedButton]}
        onPress={onCopy}
      >
        <Ionicons
          name={copiedEmail ? "checkmark" : "copy"}
          size={16}
          color="white"
        />
        <Text style={styles.copyButtonText}>
          {copiedEmail ? "Copied!" : "Copy"}
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
  </Card>
);

// How It Works Card
const HowItWorksCard = () => {
  const steps = [
    {
      title: "Forward Emails",
      description: "Set up email forwarding to your TaskEase address",
    },
    {
      title: "AI Analyzes",
      description: "Our AI extracts tasks, events, and important information",
    },
    {
      title: "Stay Organized",
      description: "Review and manage everything in your Dashboard",
    },
  ];

  return (
    <Card icon="information-circle" title="How it works">
      <View style={styles.stepsList}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

// Test Email Card
const TestEmailCard = ({
  isSendingSampleEmail,
  onSendSampleEmail,
}: {
  isSendingSampleEmail: boolean;
  onSendSampleEmail: () => void;
}) => (
  <Card
    icon="mail-open"
    title="Test TaskEase Now"
    description="Want to see how TaskEase works before setting up email forwarding? Send yourself a sample email to test!"
  >
    <TouchableOpacity
      style={[
        styles.sampleEmailButton,
        isSendingSampleEmail && styles.emailButtonLoading,
      ]}
      onPress={onSendSampleEmail}
      disabled={isSendingSampleEmail}
    >
      {isSendingSampleEmail ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <>
          <Ionicons name="flask" size={20} color="#007AFF" />
          <Text style={styles.sampleEmailButtonText}>
            Send Sample Email to Test
          </Text>
        </>
      )}
    </TouchableOpacity>

    <Text style={styles.emailHintText}>
      💡 Forward the sample email to your TaskEase address to see AI extraction
      in action
    </Text>
  </Card>
);

// Guide Component
const EmailForwardingGuide = ({
  forwardingEmail,
  onBack,
  onContinue,
  isCompletingOnboarding,
}: {
  forwardingEmail: string;
  onBack: () => void;
  onContinue: () => void;
  isCompletingOnboarding: boolean;
}) => (
  <ScrollView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Email Forwarding Guide</Text>
      <View style={styles.headerRight} />
    </View>

    <View style={styles.guideContent}>
      <View style={styles.guideSection}>
        <Text style={styles.guideSectionTitle}>📧 Gmail Instructions</Text>
        <Text style={styles.guideStep}>
          1. Open Gmail and click the gear icon → &quot;See all settings&quot;
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
          6. Select &quot;Forward a copy of incoming mail to&quot; and choose
          your TaskEase address
        </Text>
      </View>

      <View style={styles.guideSection}>
        <Text style={styles.guideSectionTitle}>
          📱 iPhone Mail Instructions
        </Text>
        <Text style={styles.guideStep}>1. Open Settings → Mail → Rules</Text>
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
        style={[
          styles.primaryButton,
          isCompletingOnboarding && styles.disabledButton,
        ]}
        onPress={onContinue}
        disabled={isCompletingOnboarding}
      >
        {isCompletingOnboarding ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.primaryButtonText}>
            Got it! Continue to Dashboard
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </ScrollView>
);

// Main Component
export default function Onboarding() {
  const [state, setState] = useState<OnboardingState>({
    copiedEmail: false,
    showGuide: false,
    isCompletingOnboarding: false,
    isSendingSampleEmail: false,
  });

  const { data: user, isLoading: userLoading } = useUser();
  const { session, setOnboardingCompleted } = useAuth();

  const updateState = (updates: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleCopyForwardingEmail = async () => {
    try {
      const email = formatForwardingEmail(
        user?.forwardingemail || user?.id || ""
      );
      await Clipboard.setString(email);
      updateState({ copiedEmail: true });
      setTimeout(() => updateState({ copiedEmail: false }), 3000);
    } catch (error) {
      console.error("Failed to copy email address:", error);
    }
  };

  const handleSendSampleEmail = async () => {
    try {
      updateState({ isSendingSampleEmail: true });

      await api.sendSampleEmail();

      const forwardingEmail = formatForwardingEmail(
        user?.forwardingemail || user?.id || ""
      );

      Alert.alert(
        "Sample Email Sent! 🧪",
        `Check your email (${session?.user?.email}) and forward the sample email to your TaskEase address to test the extraction process.\n\nForward to: ${forwardingEmail}`,
        [{ text: "Got it!" }]
      );
    } catch (error) {
      console.error("Failed to send sample email:", error);
      Alert.alert("Error", "Failed to send sample email. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      updateState({ isSendingSampleEmail: false });
    }
  };

  const handleContinueToDashboard = async () => {
    try {
      updateState({ isCompletingOnboarding: true });
      setOnboardingCompleted(true);
      router.replace("/");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      router.replace("/");
    } finally {
      updateState({ isCompletingOnboarding: false });
    }
  };

  const forwardingEmail = formatForwardingEmail(
    user?.forwardingemail || user?.id || ""
  );

  if (userLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Setting up your account...</Text>
      </View>
    );
  }

  if (state.showGuide) {
    return (
      <EmailForwardingGuide
        forwardingEmail={forwardingEmail}
        onBack={() => updateState({ showGuide: false })}
        onContinue={handleContinueToDashboard}
        isCompletingOnboarding={state.isCompletingOnboarding}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to TaskEase!</Text>
        <Text style={styles.subtitle}>
          Let&apos;s set up your AI-powered email assistant
        </Text>
      </View>

      <EmailSetupCard
        forwardingEmail={forwardingEmail}
        copiedEmail={state.copiedEmail}
        onCopy={handleCopyForwardingEmail}
      />

      <HowItWorksCard />

      <TestEmailCard
        isSendingSampleEmail={state.isSendingSampleEmail}
        onSendSampleEmail={handleSendSampleEmail}
      />

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => updateState({ showGuide: true })}
        >
          <Ionicons name="book-outline" size={20} color="#007AFF" />
          <Text style={styles.secondaryButtonText}>How-to Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            state.isCompletingOnboarding && styles.disabledButton,
          ]}
          onPress={handleContinueToDashboard}
          disabled={state.isCompletingOnboarding}
        >
          {state.isCompletingOnboarding ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    width: 24,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 16,
  },
  emailContainer: {
    marginBottom: 12,
  },
  emailBox: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  emailText: {
    fontSize: 16,
    fontFamily: "monospace",
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  copyButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  copiedButton: {
    backgroundColor: "#34C759",
  },
  copyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  successText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "500",
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "white",
    fontSize: 14,
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
    padding: 16,
    paddingBottom: 40,
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
  guideContent: {
    padding: 16,
  },
  guideSection: {
    marginBottom: 24,
  },
  guideSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  guideStep: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
  sampleEmailButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  emailButtonLoading: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
  },
  sampleEmailButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  emailHintText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
    marginTop: 12,
  },
});
