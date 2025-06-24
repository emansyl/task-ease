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
import { StatusBar } from "expo-status-bar";
import { GmailConnectCard } from "../components/GmailConnectCard";
// Types
type OnboardingStep = 1 | 2 | 3;
type OnboardingState = {
  currentStep: OnboardingStep;
  copiedEmail: boolean;
  isCompletingOnboarding: boolean;
  isSendingSampleEmail: boolean;
};

// Progress Indicator Component
const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: OnboardingStep;
  totalSteps: number;
}) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progressFill,
          { width: `${(currentStep / totalSteps) * 100}%` },
        ]}
      />
    </View>
    <Text style={styles.progressText}>
      Step {currentStep} of {totalSteps}
    </Text>
  </View>
);

// Step Navigation Component
const StepNavigation = ({
  currentStep,
  onNext,
  onBack,
  isNextDisabled,
  nextText = "Next",
}: {
  currentStep: OnboardingStep;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
  nextText?: string;
}) => (
  <View style={styles.navigationContainer}>
    {currentStep > 1 && (
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color="#007AFF" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
      onPress={onNext}
      disabled={isNextDisabled}
    >
      <Text style={styles.nextButtonText}>{nextText}</Text>
      <Ionicons name="arrow-forward" size={20} color="white" />
    </TouchableOpacity>
  </View>
);

// Step 1: What is TaskEase
const WelcomeStep = () => (
  <ScrollView style={styles.stepContainer}>
    <View style={styles.stepContent}>
      <View style={styles.iconContainer}>
        <Ionicons name="mail" size={64} color="#007AFF" />
      </View>

      <Text style={styles.stepTitle}>Welcome to TaskEase</Text>
      <Text style={styles.stepSubtitle}>
        Your AI-powered email assistant that transforms your inbox into
        organized tasks and events
      </Text>

      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Automatic Task Extraction</Text>
            <Text style={styles.featureDescription}>
              AI analyzes your emails and identifies actionable tasks
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Event Detection</Text>
            <Text style={styles.featureDescription}>
              Automatically finds and organizes calendar events
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Smart Organization</Text>
            <Text style={styles.featureDescription}>
              Everything organized in one dashboard for easy access
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.howItWorks}>
        <Text style={styles.howItWorksTitle}>How it works:</Text>
        <View style={styles.stepsList}>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Forward emails to your TaskEase address
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              AI analyzes and extracts tasks & events
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Review and manage everything in your dashboard
            </Text>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
);

// Step 2: Email Forwarding Setup
const EmailForwardingStep = ({
  forwardingEmail,
  copiedEmail,
  onCopy,
  isSendingSampleEmail,
  onSendSampleEmail,
}: {
  forwardingEmail: string;
  copiedEmail: boolean;
  onCopy: () => void;
  isSendingSampleEmail: boolean;
  onSendSampleEmail: () => void;
}) => (
  <ScrollView style={styles.stepContainer}>
    <View style={styles.stepContent}>
      <View style={styles.iconContainer}>
        <Ionicons name="mail" size={64} color="#007AFF" />
      </View>

      <Text style={styles.stepTitle}>Set Up Email Forwarding</Text>
      <Text style={styles.stepSubtitle}>
        Forward emails to your unique TaskEase address and let AI do the work
      </Text>

      <View style={styles.emailSection}>
        <Text style={styles.sectionTitle}>Your TaskEase Email Address</Text>
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
            {copiedEmail ? "Copied!" : "Copy Address"}
          </Text>
        </TouchableOpacity>

        {copiedEmail && (
          <View style={styles.successMessage}>
            <Ionicons name="checkmark-circle" size={16} color="#34C759" />
            <Text style={styles.successText}>
              Email address copied to clipboard!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>Test TaskEase Now</Text>
        <Text style={styles.sectionDescription}>
          Want to see how it works? Send yourself a sample email to test the AI
          extraction.
        </Text>

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
                Send Sample Email
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.emailHintText}>
          💡 Forward the sample email to your TaskEase address to see AI
          extraction in action
        </Text>
      </View>
    </View>
  </ScrollView>
);

// Step 3: Gmail Connection
const GmailConnectionStep = () => (
  <ScrollView style={styles.stepContainer}>
    <View style={styles.stepContent}>
      <View style={styles.iconContainer}>
        <Ionicons name="logo-google" size={64} color="#EA4335" />
      </View>

      <Text style={styles.stepTitle}>Connect Your Gmail</Text>
      <Text style={styles.stepSubtitle}>
        Connect your Gmail account to automatically sync and process your emails
        with TaskEase AI
      </Text>

      <GmailConnectCard showTitle={false} style={styles.gmailCard} />

      <View style={styles.alternativeMethod}>
        <Text style={styles.sectionTitle}>Alternative Method</Text>
        <Text style={styles.sectionDescription}>
          You can also manually forward emails to your TaskEase address. Both
          methods work perfectly with our AI processing!
        </Text>
      </View>
    </View>
  </ScrollView>
);

// Main Component
export default function Onboarding() {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    copiedEmail: false,
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

  const handleNextStep = () => {
    if (state.currentStep < 3) {
      updateState({ currentStep: (state.currentStep + 1) as OnboardingStep });
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleBackStep = () => {
    if (state.currentStep > 1) {
      updateState({ currentStep: (state.currentStep - 1) as OnboardingStep });
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      updateState({ isCompletingOnboarding: true });
      await setOnboardingCompleted(true);
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

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return (
          <EmailForwardingStep
            forwardingEmail={forwardingEmail}
            copiedEmail={state.copiedEmail}
            onCopy={handleCopyForwardingEmail}
            isSendingSampleEmail={state.isSendingSampleEmail}
            onSendSampleEmail={handleSendSampleEmail}
          />
        );
      case 3:
        return <GmailConnectionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  const getNextButtonText = () => {
    if (state.currentStep === 3) {
      return state.isCompletingOnboarding ? "Completing..." : "Complete Setup";
    }
    return "Next";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ProgressIndicator currentStep={state.currentStep} totalSteps={3} />

      {renderCurrentStep()}

      <StepNavigation
        currentStep={state.currentStep}
        onNext={handleNextStep}
        onBack={handleBackStep}
        isNextDisabled={state.isCompletingOnboarding}
        nextText={getNextButtonText()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50, // Add padding to account for status bar
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
  progressContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e1e1e1",
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  stepContainer: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresList: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  featureText: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  howItWorks: {
    marginBottom: 32,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
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
  stepText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  emailSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
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
    marginTop: 8,
  },
  successText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "500",
  },
  testSection: {
    marginBottom: 32,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 16,
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
  },
  gmailCard: {
    marginBottom: 32,
  },
  alternativeMethod: {
    marginBottom: 32,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
