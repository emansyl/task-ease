// app/layout.tsx
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers"; // For client-side contexts
import Navigation from "@/components/navigation"; // Your navigation component
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TaskEase AI",
  description: "Automatically turn academic and admin emails into tasks.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  // variable: '--font-geist-sans' // Optional: if you want to use it as a CSS variable
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground flex flex-col min-h-screen">
        {/* Providers typically wrap ThemeProvider and other client contexts */}
        <Providers>
          {/* Navigation is part of the main app shell */}
          <Navigation user={user} />
          {/* Main content area that grows to fill space */}
          <main className="flex-grow container mx-auto px-4 py-8 pt-20 md:pt-24">
            {/* pt-20 or pt-24 to account for fixed navbar height */}
            {children}
          </main>
          {/* Optional: Footer can go here */}
          {/* <footer className="text-center p-4 border-t">© 2025 TaskEase AI</footer> */}
        </Providers>
      </body>
    </html>
  );
}
