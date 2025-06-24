// app/settings/page.tsx
import { getUserIdFromAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // Direct import for this page's data fetching
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UserCircle,
  Mail,
  ArrowRight,
  Settings as SettingsIcon,
  LogOut,
  Info,
  Palette,
} from "lucide-react";
import CopyForwardingEmailButton from "@/components/dashboard/CopyForwardingEmailButton"; // Reuse this
import { signOutAction } from "@/app/actions";
import IntegrationsSection from "@/components/IntegrationsSection";

interface UserSettingsData {
  email: string | undefined;
  forwardingEmail: string | null;
}

async function getUserSettings(
  userId: string
): Promise<UserSettingsData | null> {
  // ... (data fetching function from Step 2)
  if (!userId) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, forwardingemail: true },
    });
    if (!user) return null;
    return { email: user.email, forwardingEmail: user.forwardingemail };
  } catch (error) {
    console.error("Failed to fetch user settings:", error);
    return null;
  }
}

export const metadata = {
  title: "Settings | TaskEase AI",
};

export default async function SettingsPage() {
  const userId = await getUserIdFromAuth();
  if (!userId) {
    redirect("/login");
  }

  const settings = await getUserSettings(userId);

  if (!settings) {
    return (
      <div className="container mx-auto p-4 text-center">
        Could not load your settings. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={32} />
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle size={20} /> Account Information
          </CardTitle>
          <CardDescription>Your basic account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Email Address
            </p>
            <p className="text-md">{settings.email || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Forwarding Email Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} /> Email Forwarding
          </CardTitle>
          <CardDescription>
            Configure how emails get into TaskEase AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Your Unique Forwarding Address
            </p>
            {settings.forwardingEmail ? (
              <CopyForwardingEmailButton email={settings.forwardingEmail} />
            ) : (
              <p className="text-sm text-destructive">
                Forwarding address not found.
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Link href="/guide/forwarding">
              <Info size={16} /> How to Set Up Email Forwarding Guide
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Theme Settings Card (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette size={20} /> Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Theme
          </p>
          <p className="text-xs text-muted-foreground">
            (Theme switcher usually in main navigation or layout provider)
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Sign Out */}
      <form action={signOutAction} className="w-full">
        <Button
          variant="outline"
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50 hover:border-destructive"
        >
          <LogOut size={16} /> Sign Out
        </Button>
      </form>
    </div>
  );
}
