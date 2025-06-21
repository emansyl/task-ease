import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Redirect, Stack } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
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
