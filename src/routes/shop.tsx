import { createFileRoute } from "@tanstack/react-router";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

function ShopPage() {
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: dbCategories, isLoading: isCategoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
