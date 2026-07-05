import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAddresses, type Address } from "@/hooks/useAddresses";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/checkout/address")({
  component: AddressPage,
});

function AddressPage() {
  const navigate = useNavigate();
  const { addresses, addAddress, isAdding, isLoading } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Set default selection when addresses load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

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

  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Omit<Address, "id"> = {
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
    };

    try {
      const saved = await addAddress(newAddress);
      navigate({ to: "/checkout/summary", search: { addressId: saved.id } });
    } catch (error) {
      console.error("Failed to save address", error);
    }
  };

  const handleContinueWithSaved = () => {
    if (selectedAddressId) {
      navigate({ to: "/checkout/summary", search: { addressId: selectedAddressId } });
    }
  };

  const inputClass =
    "w-full bg-white border border-[var(--ink)]/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--amber)] focus:ring-2 focus:ring-[var(--amber)]/20 transition";

  return (
    <div className="bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate({ to: "/cart" })}
          className="flex items-center gap-2 text-[var(--ink)]/60 hover:text-[var(--maroon)] font-bold text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--maroon)] mb-6 sm:mb-10">
          Where to?
        </h1>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" />
          </div>
        ) : (
          addresses.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4">
                Saved Addresses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 transition-all ${selectedAddressId === addr.id ? "border-[var(--crimson)] bg-white shadow-md" : "border-[var(--ink)]/10 bg-white/50 hover:bg-white"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-[var(--maroon)]">{addr.fullName}</span>
                      {selectedAddressId === addr.id && (
                        <div className="w-5 h-5 rounded-full bg-[var(--crimson)] text-white grid place-items-center">
                          <MapPin className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-[var(--ink)]/70 leading-relaxed">
                      {addr.house}, {addr.street}
                      <br />
                      {addr.area}, {addr.city}
                      <br />
                      {addr.state} {addr.pincode}
                    </p>
                    <p className="text-sm text-[var(--ink)]/50 mt-2 font-medium">{addr.phone}</p>
                  </div>
                ))}
              </div>

              {selectedAddressId && (
                <button
                  onClick={handleContinueWithSaved}
                  className="mt-4 sm:mt-6 flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl"
                >
                  Deliver Here <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-[var(--ink)]/10" />
                <span className="text-xs font-bold text-[var(--ink)]/40 uppercase tracking-widest">
                  OR Add New
                </span>
                <div className="flex-1 h-px bg-[var(--ink)]/10" />
              </div>
            </div>
          )
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 shadow-sm border border-[var(--ink)]/10">
          <h2 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-6 sm:mb-8">
            New Delivery Address
          </h2>
          <form onSubmit={handleSaveAndContinue} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  House / Flat No. *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Street Name *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Area / Locality *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  City *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  State *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                  Pincode *
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2">
                Delivery Notes (Optional)
              </label>
              <textarea
                rows={3}
                className={inputClass}
                placeholder="e.g. Leave at the front door"
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl mt-4 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isAdding ? "Saving..." : "Save & Continue"} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
