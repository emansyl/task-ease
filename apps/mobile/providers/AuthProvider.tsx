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

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
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
    if (loading) return;

    const onSignInPage =
      pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

    if (!session && !onSignInPage) {
      router.replace("/sign-in");
    } else if (session && onSignInPage) {
      router.replace("/");
    }
  }, [session, loading, pathname, router]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign-out error:", error.message);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
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
