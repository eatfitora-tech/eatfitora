import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowRight, User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin-login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.user?.app_metadata?.role !== "admin") {
        await signOut();
        throw new Error("This account does not have administrator access.");
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError((err as Error).message || "Unable to verify administrator access.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)] pt-20 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--amber)]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--amber)]/20 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-[var(--amber)] shadow-inner relative z-10">
          <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <h1 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-2 relative z-10">
          Admin Portal
        </h1>
        <p className="text-[var(--ink)]/60 text-xs sm:text-sm mb-6 sm:mb-8 font-medium relative z-10">
          Sign in to manage inventory and orders
        </p>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 text-left relative z-10">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1">
              Admin email
            </label>
            <div className="relative">
              <User className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" />
              <input
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border ${error ? "border-red-400 focus:ring-red-400/20" : "border-[var(--ink)]/10 focus:border-[var(--amber)] focus:ring-[var(--amber)]/10"} focus:outline-none focus:ring-4 font-medium transition-all text-sm sm:text-base`}
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" />
              <input
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border ${error ? "border-red-400 focus:ring-red-400/20" : "border-[var(--ink)]/10 focus:border-[var(--amber)] focus:ring-[var(--amber)]/10"} focus:outline-none focus:ring-4 font-medium transition-all text-sm sm:text-base`}
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold pl-1 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 sm:h-14 mt-3 sm:mt-4 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold text-base sm:text-lg hover:bg-[#e6a928] transition shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {isLoading ? "Verifying access…" : "Access Dashboard"}{" "}
            {!isLoading && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-sm font-medium text-[var(--ink)]/50 relative z-10 border-t border-[var(--ink)]/5 pt-5 sm:pt-6">
          <Link
            to="/login"
            className="text-[var(--ink)]/70 hover:text-[var(--maroon)] transition font-bold flex items-center justify-center gap-2"
          >
            Return to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}
