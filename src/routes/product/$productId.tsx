import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useProducts } from "@/hooks/useProducts";
import { useStore } from "@/store/useStore";
import {
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  Check,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$productId")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center font-bold text-[var(--maroon)]">
        Loading product...
      </div>
    );
  }

  const product = products?.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-[var(--cream)] min-h-screen pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl text-[var(--maroon)]">Product not found</h1>
        <button
          onClick={() => navigate({ to: "/shop" })}
          className="mt-6 font-bold text-[var(--crimson)] hover:underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--sand)] via-[#fce5b8] to-[var(--amber)]/40 flex items-center justify-center p-8 sm:p-12">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.4)]"
            />

            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full grid place-items-center shadow-lg hover:scale-110 transition"
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? "fill-[var(--crimson)] text-[var(--crimson)]" : "text-[var(--ink)]/40"}`}
              />
            </button>

            {product.badge && (
              <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[var(--crimson)] text-[var(--cream)] text-xs font-bold uppercase tracking-wider shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-[var(--ink)]/50 uppercase tracking-widest mb-3">
              {product.category}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] leading-[1.1] mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xl sm:text-2xl text-[var(--crimson)] font-bold">
                ₹{product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg text-[var(--ink)]/40 line-through font-bold">
                  ₹{product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-[var(--amber)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--ink)]/60">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <p className="text-[var(--ink)]/75 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="flex items-center bg-white rounded-full border border-[var(--ink)]/10 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 min-w-[180px] flex items-center justify-center gap-2 h-12 rounded-full font-bold text-base sm:text-lg transition shadow-xl ${
                  justAdded
                    ? "bg-green-600 text-white scale-[1.03]"
                    : "bg-[var(--crimson)] text-[var(--cream)] hover:scale-[1.03]"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart — ₹
                    {(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-b border-[var(--ink)]/10 py-4 sm:py-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--maroon)] grid place-items-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[var(--ink)]/80">48-hour delivery</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--maroon)] grid place-items-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[var(--ink)]/80">Quality guaranteed</div>
              </div>
            </div>

            {product.specifications && (
              <div>
                <h3 className="font-bold text-[var(--maroon)] text-lg mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm border-b border-[var(--ink)]/5 pb-2"
                    >
                      <span className="text-[var(--ink)]/60">{key}</span>
                      <span className="font-semibold text-[var(--ink)]/90">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
