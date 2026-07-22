import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow → /auth-callback
    } catch (err: unknown) {
      setError((err as Error).message || "Google sign-up failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-20 sm:pt-28 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-md relative">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[var(--crimson)]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[var(--amber)]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--amber)] via-[var(--crimson)] to-[var(--amber)]" />

          {/* Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--amber)] to-[var(--crimson)] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-white shadow-lg">
            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-2">
              Create Your Account
            </h1>
            <p className="text-[var(--ink)]/55 text-xs sm:text-sm font-medium leading-relaxed">
              Join FITORA for premium nutrition,
              <br />
              exclusive offers & faster checkout.
            </p>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-white border-2 border-[var(--ink)]/10 hover:border-[var(--ink)]/20 hover:bg-[var(--cream)]/50 transition-all duration-200 font-semibold text-[var(--ink)]/80 flex items-center justify-center gap-3 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group text-sm sm:text-base"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="shrink-0 group-hover:scale-110 transition-transform"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign In Link */}
          <div className="mt-8 pt-6 border-t border-[var(--ink)]/5 text-center">
            <p className="text-sm font-medium text-[var(--ink)]/50">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[var(--crimson)] hover:text-[var(--maroon)] font-bold transition-colors hover:underline underline-offset-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
