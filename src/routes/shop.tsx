import { createFileRoute } from "@tanstack/react-router";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: dbCategories, isLoading: isCategoriesLoading } = useCategories();
  const { category: requestedCategory } = Route.useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>(requestedCategory || "All");

  useEffect(() => setSelectedCategory(requestedCategory || "All"), [requestedCategory]);

  const categories = ["All", ...(dbCategories || [])];
  const isLoading = isProductsLoading || isCategoriesLoading;

  const filteredProducts =
    products?.filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory,
    ) || [];

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)]">
            The Harvest
          </h1>
          <p className="mt-3 sm:mt-4 text-[var(--ink)]/75 max-w-2xl mx-auto text-sm sm:text-base">
            Browse our curated selection of premium dry fruits and wholesome snacks, carefully
            sourced and freshness-packed to deliver exceptional taste,crunch, and nutrition in every
            bite.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold transition-all shadow-sm text-xs sm:text-sm ${
                selectedCategory === cat
                  ? "bg-[var(--crimson)] text-[var(--cream)]"
                  : "bg-white text-[var(--ink)] border border-[var(--ink)]/10 hover:bg-[var(--sand)] hover:border-[var(--sand)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center font-bold text-[var(--maroon)] text-xl py-20">
            Loading harvest...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-[var(--ink)]/10 bg-white px-6 py-16 text-center">
            <PackageSearch className="w-12 h-12 text-[var(--ink)]/20 mx-auto mb-4" />
            <h2 className="font-display text-3xl text-[var(--maroon)]">No products here yet</h2>
            <p className="text-sm text-[var(--ink)]/60 mt-2 mb-5">
              Try another category or browse the complete harvest.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="h-10 px-5 rounded-full bg-[var(--crimson)] text-white text-sm font-bold"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
