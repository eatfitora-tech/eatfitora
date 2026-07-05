import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const cart = useStore((state) => state.cart);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, resetPassword } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email or username");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signIn(email, password);
      const currentUser = useStore.getState().user;
      if (currentUser?.role === "admin") {
        navigate({ to: "/admin" });
      } else if (cart.length > 0) {
        navigate({ to: "/checkout/address" });
      } else {
        navigate({ to: "/" });
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow → /auth-callback
    } catch (err: unknown) {
      setError((err as Error).message || "Google sign-in failed");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Enter your email above, then click Forgot Password");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-28 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md relative">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--amber)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[var(--crimson)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--crimson)] via-[var(--amber)] to-[var(--crimson)]" />

          {/* Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--crimson)] to-[var(--maroon)] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-white shadow-lg">
            <LogIn className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-2">
              Welcome Back
            </h1>
            <p className="text-[var(--ink)]/55 text-xs sm:text-sm font-medium">
              Sign in to your account to continue
            </p>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-white border-2 border-[var(--ink)]/10 hover:border-[var(--ink)]/20 hover:bg-[var(--cream)]/50 transition-all duration-200 font-semibold text-[var(--ink)]/80 flex items-center justify-center gap-3 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group text-sm sm:text-base"
          >
            {/* Google Icon SVG */}
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

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--ink)]/10" />
            <span className="text-xs font-bold text-[var(--ink)]/35 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-[var(--ink)]/10" />
          </div>

          {/* Reset Sent Success */}
          {resetSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              Password reset link sent! Check your email.
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or Username */}
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="login-email"
                  type="text"
                  placeholder="Email or username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setResetSent(false);
                  }}
                  className="w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] focus:ring-4 focus:ring-[var(--amber)]/10 font-medium transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-12 sm:pr-14 rounded-xl sm:rounded-2xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] focus:ring-4 focus:ring-[var(--amber)]/10 font-medium transition-all text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-[var(--crimson)] hover:text-[var(--maroon)] transition-colors hover:underline underline-offset-2"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl animate-in fade-in duration-200">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-[var(--crimson)]/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Create Account */}
          <div className="mt-8 pt-6 border-t border-[var(--ink)]/5 text-center">
            <p className="text-sm font-medium text-[var(--ink)]/50">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[var(--crimson)] hover:text-[var(--maroon)] font-bold transition-colors hover:underline underline-offset-2"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
