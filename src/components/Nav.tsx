import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Menu,
  ArrowRight,
  X,
  Home,
  ShoppingBag as ShopIcon,
  User,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useProducts } from "@/hooks/useProducts";
import { searchProducts } from "@/lib/product-search";

export function Nav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products = [] } = useProducts();
  const suggestions = searchQuery.trim() ? searchProducts(products, searchQuery).slice(0, 5) : [];
  const onDark = tone === "dark";
  const currentUser = useStore((state) => state.user);
  const isAdmin = currentUser?.role === "admin";
  const cartCount = useStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-colors ${onDark ? "bg-[var(--crimson)]/95 text-[var(--cream)] border-b border-white/10" : "bg-[var(--cream)]/95 text-[var(--ink)] border-b border-[var(--ink)]/10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between">
          <Link to="/" className={`${isSearchOpen ? "hidden sm:block" : "block"} shrink-0`}>
            <img
              src="/logo1.webp"
              alt="Fitora Logo"
              className="h-10 sm:h-12 md:h-14 max-w-[120px] sm:max-w-[280px] object-contain drop-shadow-md"
            />
          </Link>
          {isSearchOpen ? (
            <form
              action="/search"
              onSubmit={() => setIsSearchOpen(false)}
              className={`relative flex-1 max-w-xl mx-2 sm:mx-4 md:mx-8 flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-5 py-2 border transition-all group ${onDark ? "bg-white/10 border-white/20 text-white focus-within:bg-white focus-within:text-[var(--ink)]" : "bg-black/5 border-black/10 text-[var(--ink)] focus-within:bg-white focus-within:border-[var(--amber)]"}`}
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
              {searchQuery.trim() && (
                <div className="absolute top-[calc(100%+10px)] left-0 right-0 rounded-2xl bg-white text-[var(--ink)] border border-[var(--ink)]/10 shadow-2xl overflow-hidden p-2">
                  {suggestions.length ? (
                    <>
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/45">
                        Matching products
                      </div>
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          to="/product/$productId"
                          params={{ productId: product.id }}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[var(--sand)]/50 transition"
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="w-10 h-10 rounded-lg bg-[var(--sand)] object-contain p-1"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-[var(--maroon)] truncate">
                              {product.name}
                            </span>
                            <span className="block text-xs text-[var(--ink)]/55 truncate">
                              {product.category} · {product.tagline}
                            </span>
                          </span>
                          <span className="text-sm font-bold text-[var(--crimson)]">
                            ₹{(product.weightOptions?.[0]?.price ?? product.price).toFixed(0)}
                          </span>
                        </Link>
                      ))}
                      <button
                        type="submit"
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[var(--crimson)] text-white text-xs font-bold"
                      >
                        View all matches for “{searchQuery}”
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-5 text-sm text-center text-[var(--ink)]/60">
                      No matching products yet
                    </div>
                  )}
                </div>
              )}
            </form>
          ) : (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
              {[
                { label: "Home", to: "/" as const },
                { label: "Shop", to: "/shop" as const },
                ...(isAdmin ? [{ label: "Admin Dashboard", to: "/admin" as const }] : []),
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className={
                    label === "Admin Dashboard"
                      ? "rounded-full bg-[var(--crimson)] px-4 py-2 text-white shadow-sm hover:bg-[var(--maroon)] transition"
                      : "opacity-80 hover:opacity-100 transition"
                  }
                >
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
              className={`h-9 sm:h-11 pl-3 sm:pl-4 pr-3 sm:pr-5 rounded-full bg-[var(--amber)] text-[var(--maroon)] text-xs sm:text-sm font-bold items-center gap-1.5 sm:gap-2 hover:scale-[1.03] transition shadow-lg shrink-0 relative ${isSearchOpen ? "hidden sm:inline-flex" : "inline-flex"}`}
            >
              Cart
              {cartCount > 0 && (
                <span className="min-w-4 sm:min-w-5 h-4 sm:h-5 px-1 sm:px-1.5 rounded-full bg-[var(--crimson)] text-white text-[10px] sm:text-[11px] font-bold grid place-items-center leading-none">
                  {cartCount}
                </span>
              )}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <Link
              to="/profile"
              aria-label="Open profile"
              title="Profile"
              className={`hidden sm:grid w-9 h-9 sm:w-11 sm:h-11 rounded-full place-items-center border transition shrink-0 ${
                onDark
                  ? "border-white/20 hover:bg-white/10 text-white"
                  : "border-[var(--ink)]/15 hover:bg-[var(--sand)] text-[var(--maroon)]"
              }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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
                ...(isAdmin
                  ? [
                      {
                        label: "Admin Dashboard",
                        to: "/admin",
                        icon: <ShieldCheck className="w-5 h-5" />,
                      },
                    ]
                  : []),
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
