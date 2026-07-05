import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Menu, ArrowRight, X, Home, ShoppingBag as ShopIcon, User } from "lucide-react";
import { useStore } from "@/store/useStore";

export function Nav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const onDark = tone === "dark";
  const cartCount = useStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-colors ${onDark ? "bg-[var(--crimson)]/95 text-[var(--cream)] border-b border-white/10" : "bg-[var(--cream)]/95 text-[var(--ink)] border-b border-[var(--ink)]/10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between">
          <Link to="/" className="block shrink-0">
            <img
              src="/logo1.webp"
              alt="Fitora Logo"
              className="h-10 sm:h-12 md:h-14 max-w-[200px] sm:max-w-[280px] object-contain drop-shadow-md"
            />
          </Link>
          {isSearchOpen ? (
            <form
              action="/search"
              className={`flex-1 max-w-xl mx-3 sm:mx-4 md:mx-8 flex items-center gap-2 sm:gap-3 rounded-full px-4 sm:px-5 py-2 border transition-all group ${onDark ? "bg-white/10 border-white/20 text-white focus-within:bg-white focus-within:text-[var(--ink)]" : "bg-black/5 border-black/10 text-[var(--ink)] focus-within:bg-white focus-within:border-[var(--amber)]"}`}
            >
              <Search className="w-4 h-4 opacity-60 shrink-0" />
              <input
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                type="text"
                placeholder="Search harvest..."
                className="flex-1 bg-transparent border-none outline-none placeholder-current opacity-80 focus:opacity-100 text-sm sm:text-base min-w-0"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="opacity-60 hover:opacity-100 p-1 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
              {[
                { label: "Home", to: "/" as const },
                { label: "Shop", to: "/shop" as const },
                { label: "Profile", to: "/profile" as const },
              ].map(({ label, to }) => (
                <Link key={label} to={to} className="opacity-80 hover:opacity-100 transition">
                  {label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center transition ${onDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
            <Link
              to="/cart"
              className="h-9 sm:h-11 pl-3 sm:pl-4 pr-4 sm:pr-5 rounded-full bg-[var(--amber)] text-[var(--maroon)] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 sm:gap-2 hover:scale-[1.03] transition shadow-lg shrink-0 relative"
            >
              Cart
              {cartCount > 0 && (
                <span className="min-w-4 sm:min-w-5 h-4 sm:h-5 px-1 sm:px-1.5 rounded-full bg-[var(--crimson)] text-white text-[10px] sm:text-[11px] font-bold grid place-items-center leading-none">
                  {cartCount}
                </span>
              )}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center ${onDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[var(--ink)]/10">
              <span className="font-display text-xl text-[var(--maroon)]">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[var(--ink)]/5 grid place-items-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {[
                { label: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
                { label: "Shop", to: "/shop", icon: <ShopIcon className="w-5 h-5" /> },
                { label: "Profile", to: "/profile", icon: <User className="w-5 h-5" /> },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-[var(--ink)]/80 hover:bg-[var(--sand)]/60 hover:text-[var(--maroon)] transition"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-[var(--ink)]/10">
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.02] transition shadow-md"
              >
                View Cart
                {cartCount > 0 && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[var(--crimson)] text-white text-[11px] font-bold grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
