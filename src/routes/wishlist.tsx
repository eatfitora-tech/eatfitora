import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const { data: products, isLoading } = useProducts();

  const wishlistedProducts = products?.filter((p) => wishlist.includes(p.id)) || [];

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--crimson)] fill-[var(--crimson)]" />
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)]">
            Your Wishlist
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center font-bold text-[var(--maroon)] text-xl py-20">
            Loading wishlist...
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[var(--ink)]/10 max-w-2xl mx-auto">
            <Heart className="w-16 h-16 text-[var(--ink)]/20 mx-auto mb-6" />
            <h2 className="font-display text-3xl text-[var(--crimson)] mb-4">Nothing here yet</h2>
            <p className="text-[var(--ink)]/70 mb-8">
              Save your favorite nuts and dry fruits by clicking the heart icon on any product page.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.03] transition shadow-xl"
            >
              Explore the Harvest
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
