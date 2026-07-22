import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { useAddresses } from "@/hooks/useAddresses";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { productCartKey } from "@/hooks/useProducts";
import { useCreateOrder, useMarkWhatsAppOpened } from "@/hooks/useOrders";
import { buildOrderWhatsAppUrl, estimatedDelivery } from "@/lib/commerce";
import { useState } from "react";

export const Route = createFileRoute("/checkout/summary")({
  component: SummaryPage,
});

function SummaryPage() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const addressId = searchParams.get("addressId");

  const { cart, clearCart } = useStore();
  const { addresses, isLoading } = useAddresses();
  const createOrder = useCreateOrder();
  const markWhatsAppOpened = useMarkWhatsAppOpened();
  const [submitError, setSubmitError] = useState("");
  const address = addresses.find((a) => a.id === addressId) || addresses[0];

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const delivery = estimatedDelivery(subtotal);
  const total = subtotal + delivery;

  if (isLoading) {
    return (
      <div className="bg-[var(--cream)] min-h-screen pt-32 pb-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!address || cart.length === 0) {
    return (
      <div className="bg-[var(--cream)] min-h-screen pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl text-[var(--maroon)]">Invalid Order State</h1>
        <button
          onClick={() => navigate({ to: "/cart" })}
          className="mt-6 font-bold text-[var(--crimson)] hover:underline"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setSubmitError("");
    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      const order = await createOrder.mutateAsync({ addressId: address.id, cart });
      const whatsappUrl = buildOrderWhatsAppUrl(order);
      clearCart();

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
        markWhatsAppOpened.mutate(order.id);
      }

      navigate({
        to: "/checkout/success",
        search: { orderId: order.id, whatsappOpened: Boolean(whatsappWindow) },
      });
    } catch (error) {
      whatsappWindow?.close();
      setSubmitError((error as Error).message || "We couldn't save your order. Please try again.");
    }
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate({ to: "/checkout/address" })}
          className="flex items-center gap-2 text-[var(--ink)]/60 hover:text-[var(--maroon)] font-bold text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Address
        </button>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--maroon)] mb-6 sm:mb-10">
          Review your bowl
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10">
              <h3 className="text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4">
                Delivery Details
              </h3>
              <div className="font-bold text-lg text-[var(--maroon)] mb-1">{address.fullName}</div>
              <p className="text-sm text-[var(--ink)]/70 leading-relaxed mb-2">
                {address.house}, {address.street}, {address.area}
                <br />
                {address.city}, {address.state} {address.pincode}
              </p>
              <p className="text-sm text-[var(--ink)]/70 font-medium">{address.phone}</p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10">
              <h3 className="text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4">
                Order Items ({cart.length})
              </h3>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={productCartKey(item.product)}
                    className="flex gap-4 border-b border-[var(--ink)]/5 pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-[var(--sand)] rounded-lg p-2"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-[var(--maroon)]">{item.product.name}</div>
                      <div className="text-xs text-[var(--ink)]/60 font-medium mb-1">
                        {item.product.category}
                        {item.product.selectedWeight ? ` · ${item.product.selectedWeight}` : ""}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-bold text-[var(--crimson)]">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-[var(--ink)]/10 sticky top-24 sm:top-32">
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6">
                Final Bill
              </h3>

              <div className="space-y-4 text-sm font-medium text-[var(--ink)]/80 mb-6 border-b border-[var(--ink)]/10 pb-6">
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
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg text-[var(--maroon)]">Total to pay</span>
                <span className="font-display text-3xl sm:text-5xl text-[var(--crimson)]">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={createOrder.isPending}
                className="flex items-center justify-center gap-3 w-full h-14 sm:h-16 rounded-full bg-[#25D366] text-white font-bold text-base sm:text-lg hover:bg-[#20bd5a] transition shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <MessageCircle className="w-6 h-6" />
                {createOrder.isPending ? "Saving order…" : "Save & continue on WhatsApp"}
              </button>

              {submitError && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {submitError}
                </p>
              )}

              <p className="text-center text-xs text-[var(--ink)]/50 mt-5 font-medium leading-relaxed">
                Your order is saved first. WhatsApp then opens with the confirmed order number and
                server-validated total.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
