// app/(auth)/forgot-password/page.tsx
import { forgotPasswordAction } from "@/app/actions"; // Ensure path is correct
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message"; // Assuming SmtpMessage is in the same (auth) group directory
import { Separator } from "@/components/ui/separator";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>; // Assuming Message type is { message: string, type: 'success' | 'error' }
}) {
  const searchParams = await props.searchParams;

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="flex flex-col w-full gap-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-1"
            />
          </div>
          <SubmitButton
            formAction={forgotPasswordAction}
            pendingText="Sending Link..."
          >
            Send Reset Link
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
        <Separator />
        <p className="px-0 text-center text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary font-medium"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <SmtpMessage />
      </CardFooter>
    </Card>
  );
}
