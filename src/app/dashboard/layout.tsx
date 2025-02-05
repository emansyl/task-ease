import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard | TaskEase",
  description: "Manage your tasks and todo lists",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <main>{children}</main>
    </div>
  );
}
