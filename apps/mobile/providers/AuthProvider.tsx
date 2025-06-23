import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "expo-router";
import { Platform } from "react-native";
import { storage } from "../lib/storage";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompletedState] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === "web") return;

      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    };

    init();
  }, []);

  // Handle redirect logic
  useEffect(() => {
    if (loading || isCheckingOnboarding) return;

    const onSignInPage =
      pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
    const onOnboardingPage = pathname?.startsWith("/onboarding");

    if (!session && !onSignInPage) {
      router.replace("/sign-in");
    } else if (session && onSignInPage) {
      router.replace("/");
    } else if (session && !onOnboardingPage && !onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [
    session,
    loading,
    isCheckingOnboarding,
    onboardingCompleted,
    pathname,
    router,
  ]);

  // Check onboarding status when auth is ready
  useEffect(() => {
    if (loading) return;

    const checkOnboarding = async () => {
      if (session) {
        const completed = await storage.getOnboardingCompleted();
        setOnboardingCompletedState(completed);
      }
      setIsCheckingOnboarding(false);
    };

    checkOnboarding();
  }, [session, loading]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign-out error:", error.message);
  };

  const setOnboardingCompleted = async (value: boolean) => {
    await storage.setOnboardingCompleted(value);
    setOnboardingCompletedState(value);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading: loading || isCheckingOnboarding,
        onboardingCompleted,
        setOnboardingCompleted,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
