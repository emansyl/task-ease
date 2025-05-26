import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { LogOut, Settings, LogIn, UserPlus } from "lucide-react";
import { SheetClose } from "./ui/sheet";

// Separated AuthButton for potentially different styling/layout in Desktop vs Mobile if needed
export const AuthButtonDesktop = ({ user }: { user: User | null }) => {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        {/* <span className="text-sm text-muted-foreground hidden lg:inline">Hey, {user.email?.split('@')[0]}!</span> */}
        {/* Simple User Profile Dropdown (shadcn: DropdownMenu) could go here */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              {/* Placeholder for Avatar */}
              <Avatar>
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 w-full">
                <Settings size={14} /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={signOutAction} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <LogOut size={14} /> Sign out
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="ghost">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
};

export const AuthButtonMobile = ({
  user,
  onSignOut,
}: {
  user: User | null;
  onSignOut?: () => void;
}) => {
  const handleSignOut = async () => {
    await signOutAction();
    if (onSignOut) onSignOut();
  };

  if (user) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="text-sm text-muted-foreground px-3">
          Signed in as {user.email}
        </p>
        <SheetClose asChild>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Settings size={20} /> Settings
          </Link>
        </SheetClose>
        <form action={handleSignOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start flex items-center gap-3 px-3 py-3 text-base font-medium text-destructive hover:text-destructive"
          >
            <LogOut size={20} /> Sign out
          </Button>
        </form>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-3">
      <SheetClose asChild>
        <Button asChild className="w-full justify-center">
          <Link href="/sign-in" className="flex items-center gap-2">
            <LogIn size={16} /> Sign in
          </Link>
        </Button>
      </SheetClose>
      <SheetClose asChild>
        <Button asChild variant="outline" className="w-full justify-center">
          <Link href="/sign-up" className="flex items-center gap-2">
            <UserPlus size={16} /> Get Started
          </Link>
        </Button>
      </SheetClose>
    </div>
  );
};
