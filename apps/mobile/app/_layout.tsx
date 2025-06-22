import "react-native-url-polyfill/auto";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { storage } from "../lib/storage";

export default function RootLayout() {
  const { session, loading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null);
  const router = useRouter();

  // Check onboarding completion status from local storage
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await storage.getOnboardingCompleted();
        setHasCompletedOnboarding(onboardingCompleted);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setHasCompletedOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  // Navigate based on auth state when session changes
  useEffect(() => {
    if (!loading && hasCompletedOnboarding !== null) {
      if (session) {
        if (hasCompletedOnboarding) {
          router.replace("/dashboard");
        } else {
          router.replace("/onboarding");
        }
      } else {
        router.replace("/sign-in");
      }
    }
  }, [session, loading, hasCompletedOnboarding, router]);

  if (loading || hasCompletedOnboarding === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
  },
});
