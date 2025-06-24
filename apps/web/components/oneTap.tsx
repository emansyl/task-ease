"use client";

import Script from "next/script";
import { createClient } from "@/utils/supabase/client";
import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useState } from "react";

// It's good practice to keep the global declaration
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: (notification: any) => void) => void; // Add notification callback for debugging
        };
      };
    };
  }
}

const OneTapComponent = () => {
  const supabase = createClient();
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleCredentialResponse = async (response: CredentialResponse) => {
    // Generate a new nonce for each sign-in attempt for security (Replay Attack Prevention)
    // Note: The original nonce logic was complex. A simpler, effective nonce can be generated.
    // However, for Supabase, the nonce verification is handled internally when you provide it.
    // The key is to generate it, pass it to Google, and then pass the *same* one to Supabase.
    // We will simplify this by generating it right before we need it.
    const nonce = crypto.randomUUID();

    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
        nonce, // Supabase will use this to verify the ID token's nonce claim.
      });

      if (error) {
        console.error("Error signing in with ID token", error);
        return;
      }

      console.log("Successfully logged in with Google One Tap", data);
      router.push("/");
    } catch (error) {
      console.error("Catastrophic error in credential response handler", error);
    }
  };

  const initializeGoogleOneTap = async () => {
    // Ensure this doesn't run if a session already exists.
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("Active session found, skipping One Tap.");
      return;
    }

    if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      console.error("Google script not loaded or client ID missing.");
      return;
    }

    // A nonce for Supabase to verify against the ID token
    const nonce = crypto.randomUUID();

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      nonce: nonce, // The nonce to be embedded in the ID token
      use_fedcm_for_prompt: true,
      // You can also add context to explain why you are signing in
      context: "signin",
    });

    // The prompt function can accept a callback to let you know about UI status
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.warn(
          `Google One Tap prompt was not displayed: ${notification.getNotDisplayedReason()}`
        );
      } else if (notification.isSkippedMoment()) {
        console.log(
          `Google One Tap prompt was skipped: ${notification.getSkippedReason()}`
        );
      } else if (notification.isDismissedMoment()) {
        console.log(
          `Google One Tap prompt was dismissed: ${notification.getDismissedReason()}`
        );
      }
    });
  };

  return (
    <>
      {/* The `id` is not necessary for One Tap rendering itself */}
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          // This ensures `initializeGoogleOneTap` is called only after the script is loaded.
          initializeGoogleOneTap();
        }}
      />
    </>
  );
};

export default OneTapComponent;
