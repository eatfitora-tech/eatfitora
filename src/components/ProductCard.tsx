import { Plus, Check, Minus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Product, productCartKey } from "@/hooks/useProducts";
import { useStore } from "@/store/useStore";
import { useState } from "react";

export function ProductCard({ p }: { p: Product }) {
  const { addToCart, updateQuantity, removeFromCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const defaultOption = p.weightOptions?.[0];
  const cartProduct = defaultOption
    ? {
        ...p,
        price: defaultOption.price,
        originalPrice: defaultOption.originalPrice,
        selectedWeight: defaultOption.weight,
      }
    : p;
  const cartKey = productCartKey(cartProduct);
  const cartItem = useStore((state) =>
    state.cart.find((item) => productCartKey(item.product) === cartKey),
  );
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = p.stockQuantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(cartProduct, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Link
      to="/product/$productId"
      params={{ productId: p.id }}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[var(--ink)]/8 hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-1 block"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--sand)] via-[#fce5b8] to-[var(--amber)]/40">
        {p.badge && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[var(--crimson)] text-[var(--cream)] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
            {p.badge}
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2.5 py-1 rounded-full bg-[var(--ink)] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
            Sold out
          </span>
        )}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 drop-shadow-2xl"
        />
      </div>
      <div className="p-3 sm:p-5">
        <div className="min-w-0">
          <div className="font-display text-lg sm:text-2xl leading-tight truncate text-[var(--maroon)]">
            {p.name}
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--ink)]/60 mt-0.5 truncate font-medium">
            {p.tagline}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <div className="flex flex-col items-end mr-0.5 sm:mr-1">
            {cartProduct.originalPrice && (
              <div className="text-[9px] sm:text-[10px] text-[var(--ink)]/40 line-through font-bold leading-none mb-0.5">
                ₹{cartProduct.originalPrice.toFixed(2)}
              </div>
            )}
            <div className="font-display text-lg sm:text-2xl text-[var(--crimson)] leading-none">
              ₹{cartProduct.price.toFixed(2)}
            </div>
            {defaultOption && (
              <div className="text-[9px] sm:text-[10px] text-[var(--ink)]/55 font-bold mt-1">
                {p.weightOptions && p.weightOptions.length > 1 ? "From " : ""}
                {defaultOption.weight}
              </div>
            )}
          </div>
          {quantity > 0 ? (
            <div className="flex items-center bg-white rounded-full border border-[var(--ink)]/10 shadow-sm h-10 px-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (quantity === 1) {
                    removeFromCart(cartKey);
                  } else {
                    updateQuantity(cartKey, quantity - 1);
                  }
                }}
                className="w-8 h-8 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[var(--ink)]">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(cartKey, quantity + 1);
                }}
                disabled={quantity >= p.stockQuantity}
                className="w-8 h-8 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition disabled:opacity-30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={`Add ${p.name} to cart`}
              className={`w-10 h-10 rounded-full grid place-items-center hover:scale-110 transition shadow-md shrink-0 ${
                justAdded
                  ? "bg-green-600 text-white"
                  : isOutOfStock
                    ? "bg-[var(--ink)]/20 text-[var(--ink)]/40 cursor-not-allowed"
                    : "bg-[var(--crimson)] text-[var(--cream)]"
              }`}
            >
              {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
