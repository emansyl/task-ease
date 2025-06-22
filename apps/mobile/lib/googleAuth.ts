import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "./supabase";

// Configure Google Sign-In
GoogleSignin.configure({
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID, // You'll need to add this to your env
});

export const signInWithGoogle = async () => {
  try {
    // Check if device supports Google Play Services
    await GoogleSignin.hasPlayServices();

    // Sign in with Google
    const userInfo = await GoogleSignin.signIn();
    console.log("userInfo", userInfo);

    // Access the ID token from the response
    const idToken = userInfo.data?.idToken;

    console.log("idToken", idToken);

    if (idToken) {
      // Sign in to Supabase with the ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } else {
      throw new Error("No ID token present!");
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
      return { data: null, error: new Error("Sign in cancelled") };
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation is in progress already
      return { data: null, error: new Error("Sign in already in progress") };
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
      return {
        data: null,
        error: new Error("Google Play Services not available"),
      };
    } else {
      // Some other error happened
      return { data: null, error: error as Error };
    }
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error("Error signing out from Google:", error);
  }
};
