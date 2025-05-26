// app/page.tsx
"use client"; // This page uses useEffect for smooth scroll, so it's a Client Component

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  BrainIcon,
  CalendarPlusIcon,
  CheckIcon,
  LayoutDashboardIcon, // Changed from CheckIcon for "How it Works"
  ListChecksIcon,
  RocketIcon,
  SendIcon,
  SparklesIcon,
} from "lucide-react";
// Head from next/head is not used in App Router for metadata in page components
import Link from "next/link";
import { useEffect } from "react"; // Removed useState as it wasn't used directly here

// Metadata is now handled by exporting a 'metadata' object (or generateMetadata function)
// This should be at the top level of the file, outside the component export.
// However, since this page is marked "use client", metadata export won't work directly here.
// For client components, metadata is typically inherited from the nearest server component layout.
// If this page MUST be a client component due to useEffect for smooth scroll,
// metadata should be set in the parent layout.tsx or a server component wrapping this.
// For now, I will remove the <Head> tags and assume metadata is set in layout.tsx.
// If smooth scrolling is only for landing page sections, it could potentially be
// handled without making the whole page client-side, or by abstracting scrolling logic.
// For this iteration, keeping "use client" as per original structure.

export default function LandingPage() {
  useEffect(() => {
    // Smooth scrolling for anchor links on this page
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash) {
        const elementToScroll = document.querySelector(target.hash);
        if (elementToScroll) {
          event.preventDefault();
          elementToScroll.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Apply to specific links if needed, or rely on Navigation component's logic
    // For this example, we assume Navigation handles its own scroll links.
    // If other anchor links are added to this page directly, this logic could be useful.
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //   anchor.addEventListener('click', handleAnchorClick as EventListener);
    // });

    // Global smooth scroll for the page (if preferred over link-specific)
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    // Base background/text colors are now expected to be handled by RootLayout's <body>
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
      {/* <DarkModeToggle /> */}
    </div>
  );
}

// Hero Section
const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Stop Drowning in Emails.{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Reclaim Your Study Time.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
            TaskEase AI: Your Personal Email Organizer
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            TaskEase AI intelligently summarizes your academic emails, extracts
            crucial tasks and deadlines, and helps you stay organized
            effortlessly. Forward an email, get clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              asChild // Use asChild to make Button behave like Link
              className="flex items-center gap-2"
            >
              <Link href="/sign-up">
                Get Started for Free
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToHowItWorks}>
              Learn More
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-500" />{" "}
            {/* Added color to check icon */}
            No credit card required for free trial
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <SendIcon className="w-7 h-7 text-white" />,
      title: "Forward Your Email",
      description:
        "Simply forward any academic or administrative email to your unique TaskEase AI address.",
    },
    {
      icon: <BrainIcon className="w-7 h-7 text-white" />,
      title: "AI Works Its Magic",
      description:
        "Our intelligent system reads, understands, summarizes, and extracts key tasks, events, and deadlines.",
    },
    {
      icon: <LayoutDashboardIcon className="w-7 h-7 text-white" />,
      title: "View Organized Insights",
      description:
        "Access a neatly organized summary, task list, and event schedule within your TaskEase AI dashboard.", // Updated description
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get Organized in 3 Simple Steps
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Start using TaskEase AI in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-4">
              {" "}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {" "}
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <SparklesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      ),
      title: "AI-Powered Summaries",
      description:
        "Get concise, intelligent summaries of lengthy academic emails, saving you time and mental energy.",
    },
    {
      icon: (
        <ListChecksIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      ),
      title: "Automatic Task Extraction",
      description:
        "Never miss a deadline again. Our AI automatically identifies and extracts tasks, assignments, and important dates.",
    },
    {
      icon: (
        <CalendarPlusIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      ),
      title: "Easy Calendar Integration",
      description:
        "Seamlessly add extracted events to Google Calendar or download an .ics file for any calendar app.", // Updated description
    },
  ];

  return (
    <section id="features" className="py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Focus on learning, not on managing your inbox.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {" "}
              {/* Added shadow */}
              <CardHeader className="pb-4">
                {" "}
                {/* Adjusted padding */}
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {" "}
                  {/* Adjusted text size and leading */}
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Conquer Your Inbox?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join students saving time and staying organized. Start your free trial
          today – no credit card required.
        </p>
        <Button
          asChild // Use asChild to make Button behave like Link
          size="lg"
          className="bg-white text-blue-600 hover:bg-slate-100 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200 border-white flex items-center gap-2 mx-auto shadow-md" // Added shadow
        >
          <Link href="/sign-up">
            Sign Up for Free
            <RocketIcon className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-100 dark:bg-slate-900 border-t dark:border-slate-800">
      {" "}
      {/* Added border */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <BrainIcon className="w-7 h-7 text-primary" />{" "}
            {/* Matched primary color */}
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              TaskEase AI
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
            {" "}
            {/* Adjusted gap */}
            <Link
              href="/privacy-policy" // Changed from #
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service" // Changed from #
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact" // Changed from #
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {currentYear} TaskEase AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
