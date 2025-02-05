"use client";

import { ArrowRight, Calendar, CheckSquare, Bell, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Boost Your Productivity with Ease
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A Simple & Powerful Productivity Tool for Staying Organized
            </p>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg">
              Managing tasks shouldn&apos;t be complicated. Our productivity
              tool helps you stay organized, track tasks, and get more done—
              effortlessly.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[42rem] items-center">
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <CheckSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg">Organize tasks in one place</p>
              </div>
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg">Track progress effortlessly</p>
              </div>
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <List className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg">Stay focused and in control</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/dashboard">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Get Started Today
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="container mx-auto px-4 space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 font-medium mb-4">
              Available Now
            </div>
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Smart To-Do List
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              A clutter-free task management system that helps you stay on top
              of what matters
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <FeatureCard
              icon={<CheckSquare className="h-8 w-8 text-primary" />}
              title="Task Management"
              description="Create, edit, and manage tasks with ease"
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Progress Tracking"
              description="Mark tasks as completed and track your progress"
            />
            <FeatureCard
              icon={<List className="h-8 w-8 text-primary" />}
              title="Stay Organized"
              description="Keep tasks organized with categories and filters"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-800 font-medium">
              Coming Soon
            </div>
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Powerful Integrations
            </h2>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-primary" />}
              title="WhatsApp Integration"
              description="Manage tasks directly from WhatsApp. Add tasks, get reminders, and stay productive."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Calendar & Notion Sync"
              description="Seamlessly sync tasks with Google Calendar, Notion, and other productivity tools."
            />
          </div>
        </section>

        <section className="container mx-auto px-4 space-y-6 py-8 md:py-12">
          <div className="mx-auto max-w-[58rem] space-y-4">
            <h2 className="font-heading text-2xl text-center leading-[1.1] sm:text-3xl">
              Get Started Today
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">1</h3>
                <p>Sign up & start organizing your tasks</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">2</h3>
                <p>Manage everything from your personalized dashboard</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">3</h3>
                <p>Stay productive with an easy-to-use interface</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <Link
                href="/"
                className="font-medium underline underline-offset-4"
              >
                TaskEase
              </Link>
              . The source code is available on{" "}
              <a href="#" className="font-medium underline underline-offset-4">
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="mt-6 space-y-2">
        <div className="flex items-center space-x-4">
          {icon}
          <h3 className="font-bold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
