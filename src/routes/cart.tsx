import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { cart, updateQuantity, removeFromCart, user } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const delivery = subtotal > 40 || cart.length === 0 ? 0 : 5.0;
  const total = subtotal + delivery;

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] mb-6 sm:mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-[var(--ink)]/10">
            <div className="w-20 h-20 bg-[var(--sand)] rounded-full grid place-items-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-[var(--amber)]" />
            </div>
            <h2 className="font-display text-3xl text-[var(--crimson)] mb-4">Your bowl is empty</h2>
            <p className="text-[var(--ink)]/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any premium nuts or dry fruits to your cart yet. Let's
              fix that!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.03] transition shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 md:gap-6 shadow-sm border border-[var(--ink)]/10"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--sand)] rounded-xl shrink-0 overflow-hidden relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="absolute inset-0 w-full h-full object-contain p-2 md:p-4 drop-shadow-md"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-[var(--maroon)]">
                          {item.product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-[var(--ink)]/60 font-medium">
                          {item.product.tagline}
                        </p>
                      </div>
                      <div className="font-display text-xl md:text-2xl text-[var(--crimson)]">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-[var(--cream)] rounded-full border border-[var(--ink)]/10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 md:w-10 md:h-10 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
                        >
                          <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        <span className="w-8 md:w-10 text-center font-bold text-sm md:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 md:w-10 md:h-10 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition"
                        >
                          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sm text-red-500 font-semibold flex items-center gap-1.5 hover:bg-red-50 px-3 py-1.5 rounded-full transition"
                      >
                        <Trash2 className="w-4 h-4" />{" "}
                        <span className="hidden md:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10 sticky top-24 sm:top-32">
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm font-medium text-[var(--ink)]/80 mb-6 border-b border-[var(--ink)]/10 pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>
                      {delivery === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${delivery.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <div className="text-xs text-[var(--crimson)] bg-[var(--crimson)]/10 px-3 py-2 rounded-lg mt-2">
                      Add ₹{(40 - subtotal).toFixed(2)} more for free delivery!
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-display text-3xl sm:text-4xl text-[var(--crimson)]">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <Link
                  to={user ? "/checkout/address" : "/login"}
                  className="flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-center text-xs text-[var(--ink)]/50 mt-4 font-medium">
                  Checkout is completed via WhatsApp.
                  <br />
                  No payment required now.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
