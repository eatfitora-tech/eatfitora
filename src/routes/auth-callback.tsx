import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const login = useStore((state) => state.login);

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase automatically exchanges the code from the URL hash
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const name =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "User";
        login(name, session.user.app_metadata?.role === "admin" ? "admin" : "user");

        // Redirect based on cart state
        if (cart.length > 0) {
          navigate({ to: "/checkout/address" });
        } else {
          navigate({ to: "/" });
        }
      } else {
        // If no session, redirect to login
        navigate({ to: "/login" });
      }
    };

    handleCallback();
  }, [navigate, cart, login]);

  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin mx-auto mb-6" />
        <h2 className="font-display text-2xl text-[var(--maroon)] mb-2">Signing you in...</h2>
        <p className="text-sm text-[var(--ink)]/50 font-medium">
          Just a moment while we verify your account.
        </p>
      </div>
    </div>
  );
}
