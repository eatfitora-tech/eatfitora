import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Package, ShoppingBag } from "lucide-react";
import { useMarkWhatsAppOpened, useOrder } from "@/hooks/useOrders";
import { buildOrderWhatsAppUrl } from "@/lib/commerce";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: typeof search.orderId === "string" ? search.orderId : "",
    whatsappOpened: search.whatsappOpened === true || search.whatsappOpened === "true",
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderId, whatsappOpened } = Route.useSearch();
  const { data: order, isLoading, error } = useOrder(orderId || null);
  const markWhatsAppOpened = useMarkWhatsAppOpened();

  const openWhatsApp = () => {
    if (!order) return;
    window.open(buildOrderWhatsAppUrl(order), "_blank", "noopener,noreferrer");
    markWhatsAppOpened.mutate(order.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-32 text-center font-bold text-[var(--maroon)]">
        Loading your order…
      </div>
    );
  }

  if (!order || error) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-32 px-4 text-center">
        <h1 className="font-display text-4xl text-[var(--maroon)]">Order not found</h1>
        <p className="mt-3 text-sm text-[var(--ink)]/60">
          Sign in with the account that placed the order and check your order history.
        </p>
        <Link to="/profile" className="mt-6 inline-flex font-bold text-[var(--crimson)]">
          View my orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] pt-24 sm:pt-32 pb-16 px-4">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--ink)]/10 bg-white p-6 sm:p-10 text-center shadow-[var(--shadow-card)]">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)]/45">
          Order saved successfully
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-[var(--maroon)]">
          {order.orderNumber}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[var(--ink)]/65">
          Your order and stock reservation are safely stored. The final payment and delivery
          confirmation will happen with Fitora on WhatsApp.
        </p>

        <div className="my-7 grid grid-cols-2 gap-3 rounded-2xl bg-[var(--cream)] p-4 text-left">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/45">
              Status
            </div>
            <div className="mt-1 font-bold capitalize text-[var(--maroon)]">{order.status}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/45">
              Server total
            </div>
            <div className="mt-1 font-display text-2xl text-[var(--crimson)]">
              ₹{order.total.toFixed(2)}
            </div>
          </div>
        </div>

        {!whatsappOpened && (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            WhatsApp may have been blocked by your browser. Use the button below to continue.
          </div>
        )}

        <button
          type="button"
          onClick={openWhatsApp}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold text-white transition hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
        </button>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            to="/profile"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--ink)]/10 font-bold text-[var(--maroon)] hover:bg-[var(--cream)]"
          >
            <Package className="h-4 w-4" /> View order history
          </Link>
          <Link
            to="/shop"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--ink)]/10 font-bold text-[var(--maroon)] hover:bg-[var(--cream)]"
          >
            <ShoppingBag className="h-4 w-4" /> Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
