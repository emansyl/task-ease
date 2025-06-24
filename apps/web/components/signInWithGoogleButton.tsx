"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button"; // Assuming you use a UI library like ShadCN

export default function SignInWithGoogleButton() {
  const supabase = createClient();
  const redirectTo = `${location.origin}/auth/callback`;
  console.log("redirectTo", redirectTo);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };

  return <Button onClick={handleSignIn}>Sign in with Google</Button>;
}
