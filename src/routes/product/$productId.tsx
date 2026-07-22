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
import { useEffect, useState } from "react";

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
  const [selectedWeight, setSelectedWeight] = useState("");
  const product = products?.find((p) => p.id === productId);

  useEffect(() => {
    setSelectedWeight(product?.weightOptions?.[0]?.weight || "");
  }, [product?.id, product?.weightOptions]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center font-bold text-[var(--maroon)]">
        Loading product...
      </div>
    );
  }

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

  const selectedOption = product.weightOptions?.find((option) => option.weight === selectedWeight);
  const activePrice = selectedOption?.price ?? product.price;
  const activeOriginalPrice = selectedOption?.originalPrice ?? product.originalPrice;
  const isOutOfStock = product.stockQuantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(
      selectedOption
        ? {
            ...product,
            price: selectedOption.price,
            originalPrice: selectedOption.originalPrice,
            selectedWeight: selectedOption.weight,
          }
        : product,
      quantity,
    );
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
                ₹{activePrice.toFixed(2)}
              </p>
              {activeOriginalPrice && (
                <p className="text-lg text-[var(--ink)]/40 line-through font-bold">
                  ₹{activeOriginalPrice.toFixed(2)}
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

            {product.weightOptions && product.weightOptions.length > 0 && (
              <div className="mb-7">
                <div className="text-xs font-bold text-[var(--ink)]/55 uppercase tracking-wider mb-3">
                  Select pack size
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((option) => (
                    <button
                      key={option.weight}
                      type="button"
                      onClick={() => setSelectedWeight(option.weight)}
                      className={`min-w-24 rounded-xl border-2 px-4 py-2.5 text-left transition ${selectedWeight === option.weight ? "border-[var(--crimson)] bg-white shadow-sm" : "border-[var(--ink)]/10 bg-white/50 hover:border-[var(--amber)]"}`}
                    >
                      <span className="block text-sm font-bold text-[var(--maroon)]">
                        {option.weight}
                      </span>
                      <span className="block text-xs font-semibold text-[var(--ink)]/60 mt-0.5">
                        ₹{option.price.toFixed(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                  className="w-12 h-12 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition disabled:opacity-30"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 min-w-[180px] flex items-center justify-center gap-2 h-12 rounded-full font-bold text-base sm:text-lg transition shadow-xl ${
                  isOutOfStock
                    ? "bg-[var(--ink)]/20 text-[var(--ink)]/50 cursor-not-allowed shadow-none"
                    : justAdded
                      ? "bg-green-600 text-white scale-[1.03]"
                      : "bg-[var(--crimson)] text-[var(--cream)] hover:scale-[1.03]"
                }`}
              >
                {isOutOfStock ? (
                  <>Sold out</>
                ) : justAdded ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart — ₹
                    {(activePrice * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {!isOutOfStock && (
              <p className="-mt-6 mb-8 text-xs font-semibold text-[var(--ink)]/55">
                {product.stockQuantity <= product.lowStockThreshold
                  ? `Only ${product.stockQuantity} left in stock`
                  : `${product.stockQuantity} units available`}
              </p>
            )}

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
