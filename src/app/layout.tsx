import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import { Providers } from "./_providers";
import { Toaster } from "@/components/ui/toaster";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskEase - Boost Your Productivity in WhatsApp",
  description: "Manage tasks, events, and priorities directly within WhatsApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <header className="border-b">
            <div className="container flex h-14 items-center max-w-screen-2xl mx-auto px-4">
              <Link href="/" className="flex items-center space-x-2">
                <CheckSquare className="h-6 w-6 text-primary" />
                <span className="font-semibold">TaskEase</span>
              </Link>
              <div className="flex flex-1 items-center justify-end space-x-2"></div>
            </div>
          </header>

          <main>{children}</main>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
