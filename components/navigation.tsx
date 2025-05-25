// components/navigation.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  BrainIcon,
  MenuIcon,
  XIcon,
  LayoutDashboard,
  Inbox,
  ListChecks,
  CalendarDays,
} from "lucide-react"; // Added XIcon, app icons
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"; // For mobile drawer
import { Separator } from "@/components/ui/separator"; // For visual separation
import { AuthButtonDesktop, AuthButtonMobile } from "@/components/header-auth";

const appNavLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/email", label: "Emails", icon: Inbox },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/events", label: "Events", icon: CalendarDays },
];

const landingPageNavLinks = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it Works" },
  // { id: "pricing", label: "Pricing" }, // Example
];

export default function Navigation({ user }: { user: User | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after scroll
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const NavLink = ({
    href,
    children,
    icon: Icon,
  }: {
    href: string;
    children: React.ReactNode;
    icon?: React.ElementType;
  }) => {
    const isActive =
      pathname === href ||
      (href === "/dashboard" && pathname.startsWith("/email")); // Highlight Dashboard when in email digest too
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </Link>
    );
  };

  const MobileNavLink = ({
    href,
    children,
    icon: Icon,
  }: {
    href: string;
    children: React.ReactNode;
    icon?: React.ElementType;
  }) => {
    const isActive =
      pathname === href ||
      (href === "/dashboard" && pathname.startsWith("/email"));
    return (
      <SheetClose asChild>
        <Link
          href={href}
          className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors
                      ${
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </Link>
      </SheetClose>
    );
  };

  const LandingPageScrollLink = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </button>
  );

  const MobileLandingPageScrollLink = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <SheetClose asChild>
      <button
        onClick={() => scrollToSection(id)}
        className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {children}
      </button>
    </SheetClose>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BrainIcon className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-foreground">
              TaskEase AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user
              ? // Authenticated App Navigation
                appNavLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} icon={link.icon}>
                    {link.label}
                  </NavLink>
                ))
              : // Landing Page Navigation (only if on homepage)
                isHomePage &&
                landingPageNavLinks.map((link) => (
                  <LandingPageScrollLink key={link.id} id={link.id}>
                    {link.label}
                  </LandingPageScrollLink>
                ))}
            {/* AuthButton is always visible on desktop, or specific to landing */}
            {!user && isHomePage && (
              <div className="pl-4">
                <AuthButtonDesktop user={user} />
              </div>
            )}
            {user && (
              <div className="pl-4">
                <AuthButtonDesktop user={user} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[320px] p-6">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href={user ? "/dashboard" : "/"}
                      className="flex items-center space-x-2"
                    >
                      <BrainIcon className="w-7 h-7 text-primary" />
                      <span className="font-semibold text-lg text-foreground">
                        TaskEase AI
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <XIcon className="w-5 h-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-2 flex-grow">
                    {user
                      ? // Authenticated App Navigation
                        appNavLinks.map((link) => (
                          <MobileNavLink
                            key={link.href}
                            href={link.href}
                            icon={link.icon}
                          >
                            {link.label}
                          </MobileNavLink>
                        ))
                      : // Landing Page Navigation
                        isHomePage &&
                        landingPageNavLinks.map((link) => (
                          <MobileLandingPageScrollLink
                            key={link.id}
                            id={link.id}
                          >
                            {link.label}
                          </MobileLandingPageScrollLink>
                        ))}
                  </nav>

                  {/* Auth section at the bottom of mobile menu */}
                  <Separator className="my-4" />
                  <AuthButtonMobile
                    user={user}
                    onSignOut={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
