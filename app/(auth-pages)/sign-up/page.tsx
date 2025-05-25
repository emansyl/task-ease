// app/(auth)/sign-up/page.tsx
import { signUpAction } from "@/app/actions"; // Ensure path is correct
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
import { Separator } from "@/components/ui/separator";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  // If there's a message (e.g., email confirmation sent, error on redirect), display it prominently.
  // This is one way to handle it; adjust as per your app's flow for confirmation messages.
  if (
    searchParams &&
    "message" in searchParams &&
    searchParams.message &&
    searchParams.type === "success"
  ) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <FormMessage message={searchParams} />
          <p className="mt-4 text-sm text-center text-muted-foreground">
            <Link
              href="/sign-in"
              className="underline hover:text-primary font-medium"
            >
              Go to Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Enter your email and password to get started.
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
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              minLength={6}
              required
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 6 characters.
            </p>
          </div>
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign Up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </CardContent>
      <CardFooter className="flex-col items-center">
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary font-medium"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
