"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmail, verifyOtp } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  async function handleRequestOtp(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    const result = await signInWithEmail(email);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
      return;
    }

    setOtpSent(true);
    toast({
      title: "Code sent!",
      description: "Please check your email for the verification code.",
    });
  }

  async function handleVerifyOtp(formData: FormData) {
    const otp = formData.get("otp") as string;
    const email = formData.get("email") as string;

    if (!otp) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter the verification code",
      });
      return;
    }

    const result = await verifyOtp(email, otp);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  }

  return (
    <div className="container max-w-md mx-auto py-16">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <div className="space-y-4">
          {!otpSent ? (
            <form action={handleRequestOtp} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  We&apos;ll send you a one time password to sign in
                </p>
              </div>
              <SubmitButton>Send One Time Password</SubmitButton>
            </form>
          ) : (
            <form action={handleVerifyOtp} className="space-y-4">
              <input type="hidden" name="email" value={email} />
              <div className="space-y-2">
                <Input
                  type="text"
                  name="otp"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </div>
              <SubmitButton>Verify Code</SubmitButton>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setOtpSent(false)}
              >
                Try different email
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
