import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  MailCheck,
} from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [wantOffers, setWantOffers] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const cart = useStore((state) => state.cart);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!password.trim()) {
      setError("Please create a password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    setIsLoading(true);

    try {
      const data = await signUp(email, password, {
        fullName,
        username,
        phone: phone || undefined,
      });

      // If email confirmation is enabled, show confirmation message
      if (data.user && !data.session) {
        setSignupComplete(true);
      } else if (data.session) {
        // If auto-confirmed, redirect
        if (cart.length > 0) {
          navigate({ to: "/checkout/address" });
        } else {
          navigate({ to: "/" });
        }
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const inputBaseClass =
    "w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] focus:ring-4 focus:ring-[var(--amber)]/10 font-medium transition-all text-sm sm:text-base";

  // Email confirmation screen
  if (signupComplete) {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-28 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md relative">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[var(--crimson)]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400" />

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="font-display text-3xl text-[var(--maroon)] mb-3">Check Your Email</h1>
            <p className="text-[var(--ink)]/60 text-sm font-medium leading-relaxed mb-2">
              We've sent a confirmation link to
            </p>
            <p className="text-[var(--crimson)] font-bold text-lg mb-6">{email}</p>
            <p className="text-[var(--ink)]/50 text-sm font-medium leading-relaxed mb-8">
              Click the link in your email to verify your account, then come back and sign in.
            </p>

            <Link
              to="/login"
              className="w-full h-14 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[var(--crimson)]/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Go to Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-28 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md relative">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[var(--crimson)]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[var(--amber)]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden">
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

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="signup-name"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setError("");
                  }}
                  className={inputBaseClass}
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="signup-username"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  className={inputBaseClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={inputBaseClass}
                />
              </div>
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <label
                htmlFor="signup-phone"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Phone Number{" "}
                <span className="normal-case text-[var(--ink)]/40 tracking-normal font-medium">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputBaseClass}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`${inputBaseClass} !pr-14`}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="signup-confirm"
                className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" />
                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className={`${inputBaseClass} !pr-14`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 transition-colors p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password match indicator */}
              {confirmPassword && (
                <div
                  className={`flex items-center gap-1.5 pl-1 text-xs font-semibold ${password === confirmPassword ? "text-green-600" : "text-red-500"}`}
                >
                  {password === confirmPassword ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Passwords match
                    </>
                  ) : (
                    "Passwords don't match"
                  )}
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              {/* Terms */}
              <label htmlFor="agree-terms" className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      setError("");
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-[var(--ink)]/20 bg-[var(--cream)] peer-checked:bg-[var(--crimson)] peer-checked:border-[var(--crimson)] transition-all flex items-center justify-center group-hover:border-[var(--ink)]/40">
                    {agreeTerms && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-[var(--ink)]/70 font-medium leading-snug">
                  I agree to the{" "}
                  <span className="text-[var(--crimson)] font-semibold hover:underline underline-offset-2 cursor-pointer">
                    Terms & Conditions
                  </span>
                </span>
              </label>

              {/* Offers */}
              <label htmlFor="want-offers" className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    id="want-offers"
                    type="checkbox"
                    checked={wantOffers}
                    onChange={(e) => setWantOffers(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-[var(--ink)]/20 bg-[var(--cream)] peer-checked:bg-[var(--amber)] peer-checked:border-[var(--amber)] transition-all flex items-center justify-center group-hover:border-[var(--ink)]/40">
                    {wantOffers && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-[var(--ink)]/70 font-medium leading-snug">
                  Send me exclusive offers & updates{" "}
                  <span className="text-[var(--ink)]/40">(Optional)</span>
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl animate-in fade-in duration-200">
                {error}
              </div>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 sm:h-14 mt-2 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-[var(--crimson)]/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--ink)]/10" />
            <span className="text-xs font-bold text-[var(--ink)]/35 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-[var(--ink)]/10" />
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
