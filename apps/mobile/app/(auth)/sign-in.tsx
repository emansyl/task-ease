import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { supabase } from "../../lib/supabase";
import { Link } from "expo-router";
import { useAuthActions } from "../../hooks/useAuthActions";
import { signInWithGoogle } from "../../lib/googleAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { clearCacheAndRefetch } = useAuthActions();

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      Alert.alert("Sign In Error", error.message);
    } else {
      // Clear cache and refetch data on successful login
      await clearCacheAndRefetch();
      // Navigation will be handled by the auth state change listener in _layout.tsx
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();

    if (error) {
      Alert.alert("Google Sign In Error", error.message);
    } else {
      // Clear cache and refetch data on successful login
      await clearCacheAndRefetch();
      // Navigation will be handled by the auth state change listener in _layout.tsx
    }
    setGoogleLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to TaskEase</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!loading && !googleLoading}
            selectTextOnFocus={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            textContentType="password"
            editable={!loading && !googleLoading}
            selectTextOnFocus={true}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            (loading || googleLoading) && styles.disabledButton,
          ]}
          disabled={loading || googleLoading}
          onPress={signInWithEmail}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.googleButtonContainer}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
            disabled={loading || googleLoading}
          />
        </View>

        <View style={styles.linkContainer}>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>
                Don&apos;t have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#666",
    fontSize: 14,
  },
  googleButtonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  linkContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
