import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import { useAddresses, type Address } from "@/hooks/useAddresses";
import {
  Package,
  MapPin,
  User,
  LogOut,
  ExternalLink,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useMarkWhatsAppOpened, useOrders } from "@/hooks/useOrders";
import { buildOrderWhatsAppUrl } from "@/lib/commerce";
import { resolveProductImage } from "@/hooks/useProducts";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useStore();
  const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useOrders();
  const markWhatsAppOpened = useMarkWhatsAppOpened();
  const { addresses, isLoading, addAddress, isAdding, deleteAddress, isDeleting } = useAddresses();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses">("orders");
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [formData, setFormData] = useState<Partial<Address>>({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddress({
        fullName: formData.fullName!,
        phone: formData.phone!,
        house: formData.house!,
        street: formData.street!,
        area: formData.area!,
        landmark: formData.landmark,
        city: formData.city!,
        state: formData.state!,
        pincode: formData.pincode!,
        notes: formData.notes,
      });
      setShowAddForm(false);
      setSaveError("");
      setFormData({
        fullName: "",
        phone: "",
        house: "",
        street: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        notes: "",
      });
    } catch (err: unknown) {
      console.error("Failed to add address", err);
      setSaveError((err as Error).message || "Failed to save address. Check console for details.");
    }
  };

  const inputClass =
    "w-full bg-[var(--cream)] border border-[var(--ink)]/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--amber)] focus:ring-2 focus:ring-[var(--amber)]/20 transition";

  const handleLogout = async () => {
    try {
      await signOut();
      // Ensure we immediately navigate away after signing out
      navigate({ to: "/" });
    } catch (err) {
      console.error("Logout failed", err);
      navigate({ to: "/" }); // Still navigate away on error
    }
  };

  const trackOrder = (order: (typeof orders)[number]) => {
    window.open(buildOrderWhatsAppUrl(order), "_blank", "noopener,noreferrer");
    markWhatsAppOpened.mutate(order.id);
  };

  // If we are checking auth state, we could show a loader. But we'll rely on user from Zustand.
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] mb-6 sm:mb-10">
          Your Profile
        </h1>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="space-y-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-[var(--ink)]/10 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--crimson)] text-white grid place-items-center font-display text-xl sm:text-2xl">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
              <h2 className="font-bold text-lg sm:text-xl text-[var(--maroon)]">
                {user?.name || "Happy Snacker"}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink)]/60 mb-3 sm:mb-4">
                Member since 2026
              </p>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]/50 hover:text-[var(--crimson)] transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold transition-all text-left text-sm sm:text-base ${activeTab === "orders" ? "bg-[var(--crimson)] text-[var(--cream)] shadow-md" : "bg-transparent text-[var(--ink)]/70 hover:bg-white"}`}
            >
              <Package className="w-5 h-5" /> My Orders
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold transition-all text-left text-sm sm:text-base ${activeTab === "addresses" ? "bg-[var(--crimson)] text-[var(--cream)] shadow-md" : "bg-transparent text-[var(--ink)]/70 hover:bg-white"}`}
            >
              <MapPin className="w-5 h-5" /> Saved Addresses
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-left text-sm sm:text-base"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6">
                  Order History
                </h2>
                {ordersLoading ? (
                  <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" />
                  </div>
                ) : ordersError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm font-semibold text-red-600">
                    We couldn't load your orders. Please refresh and try again.
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-sm border border-[var(--ink)]/10">
                    <Package className="w-12 h-12 text-[var(--ink)]/20 mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-[var(--maroon)] mb-2">No orders yet</h3>
                    <p className="text-[var(--ink)]/60 text-sm">
                      When you place an order, it will show up here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-[var(--ink)]/10"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-[var(--ink)]/10 pb-4 sm:pb-6">
                          <div>
                            <div className="text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1">
                              Order ID
                            </div>
                            <div className="font-bold text-[var(--maroon)]">
                              {order.orderNumber}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1">
                              Date
                            </div>
                            <div className="font-bold text-[var(--maroon)]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1">
                              Status
                            </div>
                            <div
                              className={`font-bold inline-flex px-3 py-1 rounded-full text-xs capitalize ${order.status === "pending" ? "bg-amber-100 text-amber-700" : order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                            >
                              {order.status}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1">
                              Total
                            </div>
                            <div className="font-bold text-[var(--crimson)]">
                              ₹{order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <img
                                src={resolveProductImage(item.productImage)}
                                alt={item.productName}
                                className="w-12 h-12 bg-[var(--sand)] rounded overflow-hidden p-1"
                              />
                              <div className="flex-1">
                                <div className="font-bold text-sm text-[var(--maroon)]">
                                  {item.productName}
                                </div>
                                <div className="text-xs text-[var(--ink)]/60">
                                  {item.selectedWeight ? `${item.selectedWeight} · ` : ""}
                                  Qty: {item.quantity}
                                </div>
                              </div>
                              <div className="font-bold text-sm">₹{item.lineTotal.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-[var(--ink)]/10 flex justify-end">
                          <button
                            type="button"
                            onClick={() => trackOrder(order)}
                            className="flex items-center gap-2 text-sm font-bold text-[var(--amber)] hover:text-[var(--maroon)] transition"
                          >
                            Track via WhatsApp <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl text-[var(--maroon)]">
                    Saved Addresses
                  </h2>
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--crimson)] text-white rounded-full font-bold text-sm hover:scale-[1.02] transition"
                    >
                      <Plus className="w-4 h-4" /> Add New
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex justify-center my-12">
                    <div className="w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" />
                  </div>
                ) : showAddForm ? (
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm border border-[var(--ink)]/10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-xl text-[var(--maroon)]">New Address</h3>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="text-sm font-bold text-[var(--ink)]/50 hover:text-[var(--crimson)] transition"
                      >
                        Cancel
                      </button>
                    </div>
                    <form onSubmit={handleSaveAddress} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Phone *
                          </label>
                          <input
                            required
                            type="tel"
                            className={inputClass}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            House / Flat No. *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.house}
                            onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Street *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.street}
                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Area *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            City *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Pincode *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            State *
                          </label>
                          <input
                            required
                            type="text"
                            className={inputClass}
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                            Landmark
                          </label>
                          <input
                            type="text"
                            className={inputClass}
                            value={formData.landmark}
                            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          />
                        </div>
                      </div>

                      {saveError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl">
                          {saveError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isAdding}
                        className="w-full h-12 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold flex items-center justify-center gap-2 mt-4 hover:bg-[var(--maroon)] transition disabled:opacity-50"
                      >
                        {isAdding ? "Saving..." : "Save Address"} <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-[var(--ink)]/10">
                    <MapPin className="w-12 h-12 text-[var(--ink)]/20 mx-auto mb-4" />
                    <h3 className="font-bold text-xl text-[var(--maroon)] mb-2">
                      No saved addresses
                    </h3>
                    <p className="text-[var(--ink)]/60 text-sm mb-6">
                      Add an address so you can checkout faster next time.
                    </p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="px-6 py-3 bg-[var(--amber)] text-white rounded-full font-bold inline-flex items-center gap-2 hover:bg-[var(--maroon)] transition"
                    >
                      <Plus className="w-4 h-4" /> Add Address
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--ink)]/10 relative group"
                      >
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          disabled={isDeleting}
                          className="absolute top-4 right-4 p-2 text-[var(--ink)]/30 hover:text-red-500 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100 disabled:opacity-50"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="font-bold text-lg text-[var(--maroon)] mb-1 pr-8">
                          {addr.fullName}
                        </div>
                        <p className="text-sm text-[var(--ink)]/70 leading-relaxed mb-4">
                          {addr.house}, {addr.street}
                          <br />
                          {addr.area}, {addr.city}
                          <br />
                          {addr.state} {addr.pincode}
                        </p>
                        <p className="text-sm text-[var(--ink)]/70 font-medium">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
