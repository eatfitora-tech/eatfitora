import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchProducts } from "@/lib/product-search";

// Using a custom hook or just any for search params since we don't have strict type definitions setup here for simplicity
export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const navigate = useNavigate();
  const { q: initialQuery } = Route.useSearch();

  const [query, setQuery] = useState(initialQuery);
  const { data: products, isLoading } = useProducts();

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: query } });
  };

  const activeQuery = query.trim();
  const results = searchProducts(products || [], activeQuery || initialQuery);

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10 sm:mb-16 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for nuts, dry fruits..."
            className="w-full h-12 sm:h-16 pl-11 sm:pl-14 pr-20 sm:pr-6 rounded-full border-2 border-[var(--ink)]/10 bg-white text-base sm:text-lg outline-none focus:border-[var(--amber)] shadow-sm transition"
          />
          <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[var(--ink)]/40" />
          <button
            type="submit"
            className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 px-4 sm:px-6 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-sm sm:text-base hover:scale-[1.03] transition"
          >
            Search
          </button>
        </form>

        {(activeQuery || initialQuery) && (
          <div className="mb-10">
            <h2 className="font-display text-3xl text-[var(--maroon)]">
              {results.length} matching product{results.length === 1 ? "" : "s"} for “
              {activeQuery || initialQuery}”
            </h2>
          </div>
        )}

        {isLoading ? (
          <div className="text-center font-bold text-[var(--maroon)] text-xl py-20">
            Searching...
          </div>
        ) : (activeQuery || initialQuery) && results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-[var(--ink)]/20 mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[var(--maroon)] mb-4">No harvest found</h3>
            <p className="text-[var(--ink)]/60">
              Try a product name, category, or even the first few matching letters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
