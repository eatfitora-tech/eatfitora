import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/store/useStore";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const storeLogin = useStore((state) => state.login);
  const storeLogout = useStore((state) => state.logout);

  // Sync Supabase user → Zustand store
  const syncToStore = useCallback(
    (supaUser: User | null) => {
      if (supaUser) {
        const name =
          supaUser.user_metadata?.full_name ||
          supaUser.user_metadata?.username ||
          supaUser.user_metadata?.name ||
          supaUser.email?.split("@")[0] ||
          "User";
        const role = supaUser.app_metadata?.role === "admin" ? "admin" : "user";
        storeLogin(name, role);

        // Save username to email mapping locally
        if (supaUser.email) {
          const userAlias = (
            supaUser.user_metadata?.username || supaUser.email.split("@")[0]
          ).toLowerCase();
          const usernames = JSON.parse(localStorage.getItem("fitora_usernames") || "{}");
          usernames[userAlias] = supaUser.email;
          localStorage.setItem("fitora_usernames", JSON.stringify(usernames));
        }
      } else {
        storeLogout();
      }
    },
    [storeLogin, storeLogout],
  );

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      syncToStore(currentSession?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      syncToStore(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncToStore]);

  const signIn = async (emailOrUsername: string, password: string) => {
    let email = emailOrUsername.trim();
    const lowerEmail = email.toLowerCase();

    if (!email.includes("@")) {
      const usernames = JSON.parse(localStorage.getItem("fitora_usernames") || "{}");
      const mappedEmail = usernames[lowerEmail];
      if (mappedEmail) {
        email = mappedEmail;
      } else {
        throw new Error(`Username "${emailOrUsername}" not found. Please sign in with your email.`);
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: { fullName?: string; username?: string; phone?: string },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata?.fullName || "",
          username: metadata?.username || "",
          phone: metadata?.phone || "",
        },
      },
    });
    if (error) throw error;

    // Save mapping immediately on signup
    if (email) {
      const userAlias = (metadata?.username || email.split("@")[0]).toLowerCase();
      const usernames = JSON.parse(localStorage.getItem("fitora_usernames") || "{}");
      usernames[userAlias] = email.toLowerCase();
      localStorage.setItem("fitora_usernames", JSON.stringify(usernames));
    }

    return data;
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth-callback`,
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    storeLogout(); // Aggressively clear local store first
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("Supabase signOut error:", error);
    } catch (e) {
      console.error(e);
    }
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
    return data;
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  };
}
