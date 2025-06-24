"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function ConnectGmailButton() {
  const supabase = createClient();

  const handleConnect = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("Google Client ID not configured");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Your web app's client ID from the Google Cloud Console
        queryParams: {
          client_id: clientId,
          // 1. Ask for offline access to get a refresh token
          access_type: "offline",
          // 2. Force the consent screen to be shown, ensuring the user re-consents to the new scope
          prompt: "consent",
        },
        // Tell Google what permissions you need
        scopes: "https://www.googleapis.com/auth/gmail.readonly",
        redirectTo: `${location.origin}/auth/callback`, // Or a specific page for after connection
      },
    });
  };

  return <Button onClick={handleConnect}>Connect Gmail Account</Button>;
}
