import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useCategories,
  useAddCategory,
  useDeleteCategory,
  useImportStarterCatalog,
  resolveProductImage,
  type Product,
} from "@/hooks/useProducts";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Search,
  ChevronLeft,
  Upload,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import { UnauthorizedView } from "@/components/UnauthorizedView";
import { useAuth } from "@/hooks/useAuth";
import {
  useAdminOrders,
  useAdminUpdateOrder,
  type OrderStatus,
  type PaymentStatus,
} from "@/hooks/useOrders";

export const Route = createFileRoute("/admin")({
  component: AdminDashboardWrapper,
});

function AdminDashboardWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-32 text-center font-bold text-[var(--maroon)]">
        Verifying administrator access…
      </div>
    );
  }

  if (user?.app_metadata?.role !== "admin") {
    return <UnauthorizedView />;
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { data: products, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const importStarterCatalog = useImportStarterCatalog();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const { data: categories } = useCategories();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();
  const [newCategoryName, setNewCategoryName] = useState("");

  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<"inventory" | "orders">("inventory");
  const isEditorOpen = isAdding || Boolean(isEditing);

  useEffect(() => {
    if (!isEditorOpen) return;

    window.history.pushState(
      { ...window.history.state, fitoraAdminEditor: true },
      "",
      window.location.href,
    );

    const handleBrowserBack = () => {
      setIsAdding(false);
      setIsEditing(null);
    };

    window.addEventListener("popstate", handleBrowserBack);
    return () => window.removeEventListener("popstate", handleBrowserBack);
  }, [isEditorOpen]);

  const closeEditor = () => {
    if (window.history.state?.fitoraAdminEditor) {
      window.history.back();
      return;
    }
    setIsAdding(false);
    setIsEditing(null);
  };

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const isShowingFallbackCatalog = products?.some((product) => product.isFallback) ?? false;

  const handleDelete = async (id: string) => {
    const product = products?.find((item) => item.id === id);
    if (product?.isFallback) {
      alert("Import the starter catalog into Supabase before deleting products.");
      return;
    }
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct.mutateAsync(id);
      } catch (err) {
        alert((err as Error).message || "Failed to delete product");
      }
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await addCategory.mutateAsync(newCategoryName);
      setNewCategoryName("");
    } catch (err) {
      alert((err as Error).message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (category: string) => {
    if (confirm(`Are you sure you want to delete category "${category}"?`)) {
      try {
        await deleteCategory.mutateAsync(category);
      } catch (err) {
        alert((err as Error).message || "Failed to delete category");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] px-4 sm:px-6 py-20 sm:py-24 md:px-12 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (isEditorOpen) closeEditor();
                else navigate({ to: "/" });
              }}
              aria-label={isEditorOpen ? "Back to product list" : "Back to storefront"}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--ink)]/20 grid place-items-center hover:bg-[var(--ink)]/5 transition flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--maroon)]">
                Commerce Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink)]/60 font-semibold mt-0.5 sm:mt-1">
                Manage inventory, orders, and fulfilment
              </p>
            </div>
          </div>

          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/admin-login" });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--ink)]/10 text-sm font-bold hover:bg-[var(--ink)]/5 transition self-end sm:self-auto"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[var(--shadow-card)] border border-[var(--ink)]/10 overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar / Stats */}
          <div className="w-full md:w-64 bg-[var(--sand)] p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[var(--ink)]/10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--crimson)] text-white grid place-items-center shadow-md">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-bold text-base sm:text-lg text-[var(--maroon)]">
                Management
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveSection("inventory")}
                className={`h-10 rounded-xl px-3 text-sm font-bold flex items-center justify-center md:justify-start gap-2 transition ${activeSection === "inventory" ? "bg-[var(--crimson)] text-white" : "bg-white/70 text-[var(--maroon)]"}`}
              >
                <Package className="w-4 h-4" /> Inventory
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("orders")}
                className={`h-10 rounded-xl px-3 text-sm font-bold flex items-center justify-center md:justify-start gap-2 transition ${activeSection === "orders" ? "bg-[var(--crimson)] text-white" : "bg-white/70 text-[var(--maroon)]"}`}
              >
                <ClipboardList className="w-4 h-4" /> Orders
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[var(--ink)]/5">
                <div className="text-xs text-[var(--ink)]/60 font-bold uppercase tracking-wider">
                  Total Products
                </div>
                <div className="font-display text-3xl sm:text-4xl text-[var(--crimson)] mt-1">
                  {products?.length || 0}
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[var(--ink)]/5">
                <div className="text-xs text-[var(--ink)]/60 font-bold uppercase tracking-wider">
                  Low / No Stock
                </div>
                <div className="font-display text-3xl sm:text-4xl text-amber-600 mt-1">
                  {products?.filter((product) => product.stockQuantity <= product.lowStockThreshold)
                    .length || 0}
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveSection("inventory");
                  setIsAdding(true);
                }}
                className="w-full h-11 sm:h-12 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-md text-sm sm:text-base self-center"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add Product
              </button>

              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[var(--ink)]/5 col-span-2 md:col-span-1 mt-1 sm:mt-4">
                <div className="text-xs text-[var(--ink)]/60 font-bold uppercase tracking-wider mb-2">
                  Categories
                </div>
                <div className="flex flex-wrap gap-1.5 md:flex-col md:space-y-0 max-h-40 overflow-y-auto pr-1">
                  {categories?.map((cat) => (
                    <div
                      key={cat}
                      className="flex justify-between items-center bg-[var(--cream)] px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      <span>{cat}</span>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="text-red-500 hover:text-red-700 transition font-bold ml-2"
                        title="Delete Category"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddCategory} className="mt-3 flex gap-1">
                  <input
                    type="text"
                    placeholder="New category..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3 h-8 text-xs rounded-lg bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium w-full min-w-0"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-lg bg-[var(--crimson)] text-white font-bold text-sm hover:bg-[var(--maroon)] transition grid place-items-center shrink-0"
                  >
                    +
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col min-h-[400px] sm:min-h-[600px]">
            {isAdding || isEditing ? (
              <ProductForm
                initialData={isEditing || undefined}
                onSave={async (data) => {
                  try {
                    if (isEditing) {
                      await updateProduct.mutateAsync({ ...data, id: isEditing.id });
                    } else {
                      await addProduct.mutateAsync(data);
                    }
                    closeEditor();
                  } catch (err) {
                    alert((err as Error).message || "Unable to save this product");
                  }
                }}
                onCancel={closeEditor}
              />
            ) : activeSection === "orders" ? (
              <AdminOrdersPanel />
            ) : (
              <>
                {isShowingFallbackCatalog && (
                  <div className="mb-5 rounded-2xl border border-[var(--amber)]/40 bg-[var(--amber)]/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-[var(--maroon)]">Starter catalog preview</div>
                      <p className="text-xs text-[var(--ink)]/60 mt-1">
                        Import these products once so Supabase assigns valid UUIDs and they can be
                        edited safely.
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={importStarterCatalog.isPending}
                      onClick={async () => {
                        try {
                          await importStarterCatalog.mutateAsync();
                        } catch (err) {
                          alert((err as Error).message || "Unable to import the starter catalog");
                        }
                      }}
                      className="shrink-0 h-10 px-4 rounded-full bg-[var(--crimson)] text-white text-sm font-bold disabled:opacity-50"
                    >
                      {importStarterCatalog.isPending ? "Importing…" : "Import starter catalog"}
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="flex-1 overflow-auto rounded-xl sm:rounded-2xl border border-[var(--ink)]/10 hidden sm:block">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[var(--sand)] sticky top-0 z-10">
                      <tr>
                        <th className="p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10">
                          Product
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10">
                          Price
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10 hidden md:table-cell">
                          Stock
                        </th>
                        <th className="p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-8 text-center font-bold text-[var(--ink)]/50"
                          >
                            Loading inventory...
                          </td>
                        </tr>
                      ) : filteredProducts?.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-8 text-center font-bold text-[var(--ink)]/50"
                          >
                            No products found.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts?.map((p) => (
                          <tr
                            key={p.id}
                            className="border-b border-[var(--ink)]/5 hover:bg-[var(--sand)]/50 transition"
                          >
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--sand)] to-[#fce5b8] p-1 flex-shrink-0 border border-[var(--ink)]/5">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-contain drop-shadow-sm"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-[var(--maroon)] text-sm sm:text-base truncate">
                                    {p.name}
                                  </div>
                                  <div className="text-xs text-[var(--ink)]/60 mt-0.5 truncate">
                                    {p.tagline}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 font-display text-lg sm:text-xl text-[var(--crimson)]">
                              ₹{p.price.toFixed(2)}
                              {p.weightOptions && p.weightOptions.length > 0 && (
                                <div className="font-sans text-[10px] font-bold text-[var(--ink)]/45 mt-1">
                                  {p.weightOptions.length} pack size
                                  {p.weightOptions.length === 1 ? "" : "s"}
                                </div>
                              )}
                            </td>
                            <td className="p-3 sm:p-4 hidden md:table-cell">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${p.stockQuantity <= 0 ? "bg-red-100 text-red-700" : p.stockQuantity <= p.lowStockThreshold ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
                              >
                                {p.stockQuantity <= p.lowStockThreshold && (
                                  <AlertTriangle className="h-3 w-3" />
                                )}
                                {p.stockQuantity} · {p.sku}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    if (p.isFallback) {
                                      alert(
                                        "Import the starter catalog into Supabase before editing products.",
                                      );
                                      return;
                                    }
                                    setIsEditing(p);
                                  }}
                                  className="w-8 h-8 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 grid place-items-center hover:bg-[var(--amber)] text-[var(--ink)]/70 hover:text-[var(--maroon)] transition"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(p.id)}
                                  className="w-8 h-8 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 grid place-items-center hover:bg-red-50 text-[var(--ink)]/70 hover:text-red-500 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="flex-1 space-y-3 sm:hidden">
                  {isLoading ? (
                    <div className="p-8 text-center font-bold text-[var(--ink)]/50">
                      Loading inventory...
                    </div>
                  ) : filteredProducts?.length === 0 ? (
                    <div className="p-8 text-center font-bold text-[var(--ink)]/50">
                      No products found.
                    </div>
                  ) : (
                    filteredProducts?.map((p) => (
                      <div
                        key={p.id}
                        className="bg-[var(--cream)]/50 rounded-xl border border-[var(--ink)]/5 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--sand)] to-[#fce5b8] p-1 flex-shrink-0 border border-[var(--ink)]/5">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-contain drop-shadow-sm"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[var(--maroon)] text-sm truncate">
                              {p.name}
                            </div>
                            <div className="text-xs text-[var(--ink)]/60 truncate">{p.tagline}</div>
                          </div>
                          <div className="font-display text-lg text-[var(--crimson)] flex-shrink-0">
                            ₹{p.price.toFixed(2)}
                            {p.weightOptions && p.weightOptions.length > 0 && (
                              <div className="font-sans text-[9px] text-[var(--ink)]/45 text-right">
                                {p.weightOptions.length} sizes
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[var(--ink)]/5">
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${p.stockQuantity <= p.lowStockThreshold ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
                            >
                              {p.stockQuantity} in stock · {p.sku}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (p.isFallback) {
                                  alert(
                                    "Import the starter catalog into Supabase before editing products.",
                                  );
                                  return;
                                }
                                setIsEditing(p);
                              }}
                              className="w-8 h-8 rounded-full bg-white border border-[var(--ink)]/10 grid place-items-center hover:bg-[var(--amber)] text-[var(--ink)]/70 hover:text-[var(--maroon)] transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="w-8 h-8 rounded-full bg-white border border-[var(--ink)]/10 grid place-items-center hover:bg-red-50 text-[var(--ink)]/70 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["pending", "paid", "failed", "refunded"];

function AdminOrdersPanel() {
  const { data: orders = [], isLoading, error } = useAdminOrders();
  const updateOrder = useAdminUpdateOrder();

  const saveOrder = async (orderId: string, status: OrderStatus, paymentStatus: PaymentStatus) => {
    try {
      await updateOrder.mutateAsync({ orderId, status, paymentStatus });
    } catch (updateError) {
      alert((updateError as Error).message || "Unable to update this order");
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center font-bold text-[var(--ink)]/50">Loading orders…</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm font-semibold text-red-600">
        Orders could not be loaded. Confirm that the orders migration has been applied in Supabase.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <ClipboardList className="h-12 w-12 text-[var(--ink)]/20" />
        <h2 className="mt-4 font-display text-3xl text-[var(--maroon)]">No orders yet</h2>
        <p className="mt-2 text-sm text-[var(--ink)]/55">
          Saved checkout orders will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-[var(--maroon)]">Orders</h2>
          <p className="mt-1 text-xs font-semibold text-[var(--ink)]/50">
            {orders.length} saved order{orders.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)]/35 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--ink)]/10 pb-4">
            <div>
              <div className="font-display text-2xl text-[var(--maroon)]">{order.orderNumber}</div>
              <div className="mt-1 text-xs font-semibold text-[var(--ink)]/50">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl text-[var(--crimson)]">
                ₹{order.total.toFixed(2)}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/45">
                {order.paymentMethod}
              </div>
            </div>
          </div>

          <div className="grid gap-4 py-4 md:grid-cols-2">
            <div className="text-sm text-[var(--ink)]/70">
              <div className="font-bold text-[var(--maroon)]">{order.address.fullName}</div>
              <div>{order.address.phone}</div>
              <div className="mt-1 leading-relaxed">
                {order.address.house}, {order.address.street}, {order.address.area}
                <br />
                {order.address.city}, {order.address.state} {order.address.pincode}
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={resolveProductImage(item.productImage)}
                    alt=""
                    className="h-10 w-10 rounded-lg bg-[var(--sand)] object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-[var(--maroon)]">
                      {item.productName}
                    </div>
                    <div className="text-xs text-[var(--ink)]/50">
                      {item.sku}
                      {item.selectedWeight ? ` · ${item.selectedWeight}` : ""} · ×{item.quantity}
                    </div>
                  </div>
                  <div className="font-bold">₹{item.lineTotal.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 border-t border-[var(--ink)]/10 pt-4 sm:grid-cols-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/55">
              Fulfilment status
              <select
                value={order.status}
                disabled={updateOrder.isPending}
                onChange={(event) =>
                  saveOrder(order.id, event.target.value as OrderStatus, order.paymentStatus)
                }
                className="mt-1 h-10 w-full rounded-xl border border-[var(--ink)]/10 bg-white px-3 text-sm font-semibold capitalize outline-none focus:border-[var(--amber)] disabled:opacity-50"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/55">
              Payment status
              <select
                value={order.paymentStatus}
                disabled={updateOrder.isPending}
                onChange={(event) =>
                  saveOrder(order.id, order.status, event.target.value as PaymentStatus)
                }
                className="mt-1 h-10 w-full rounded-xl border border-[var(--ink)]/10 bg-white px-3 text-sm font-semibold capitalize outline-none focus:border-[var(--amber)] disabled:opacity-50"
              >
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProductForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: Product;
  onSave: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}) {
  const { data: categories } = useCategories();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    price: initialData?.price || 0,
    originalPrice: initialData?.originalPrice || "",
    image: initialData?.image || "/logo1.webp",
    badge: initialData?.badge || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    weightOptions: initialData?.weightOptions || [],
    sku: initialData?.sku || "",
    stockQuantity: initialData?.stockQuantity ?? 0,
    lowStockThreshold: initialData?.lowStockThreshold ?? 5,
    isActive: initialData?.isActive ?? true,
  });

  useEffect(() => {
    if (!formData.category && categories && categories.length > 0) {
      setFormData((prev) => ({ ...prev, category: categories[0] }));
    } else if (
      categories &&
      categories.length > 0 &&
      formData.category &&
      !categories.includes(formData.category)
    ) {
      setFormData((prev) => ({ ...prev, category: categories[0] }));
    }
  }, [categories, formData.category]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image or provide an image URL.");
      return;
    }
    const weightOptions = formData.weightOptions
      .filter((option) => option.weight.trim() && Number(option.price) > 0)
      .map((option) => ({
        weight: option.weight.trim(),
        price: Number(option.price),
        ...(option.originalPrice && Number(option.originalPrice) > 0
          ? { originalPrice: Number(option.originalPrice) }
          : {}),
      }));
    const dataToSave = {
      ...formData,
      weightOptions,
      price: weightOptions[0]?.price ?? Number(formData.price),
      rating: initialData?.rating ?? 5.0,
      reviewsCount: initialData?.reviewsCount ?? 0,
    } as Omit<Product, "id">;
    if (formData.originalPrice === "") delete dataToSave.originalPrice;
    else dataToSave.originalPrice = Number(formData.originalPrice);
    onSave(dataToSave);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl sm:text-3xl text-[var(--maroon)]">
          {initialData ? "Edit Product" : "New Product"}
        </h2>
        <button
          onClick={onCancel}
          className="text-sm font-bold text-[var(--ink)]/60 hover:text-[var(--ink)] transition"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
              Product Name
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
                Selling Price (₹)
              </label>
              <input
                required
                type="number"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
                Compare Price (₹)
              </label>
              <input
                type="number"
                step="1"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)]/45 p-4 sm:grid-cols-4 sm:p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 sm:col-span-2">
            SKU
            <input
              required
              type="text"
              placeholder="FIT-CAS-W240"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--ink)]/10 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none focus:border-[var(--amber)]"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70">
            Stock quantity
            <input
              required
              min="0"
              type="number"
              value={formData.stockQuantity}
              onChange={(e) =>
                setFormData({ ...formData, stockQuantity: Math.max(0, Number(e.target.value)) })
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--ink)]/10 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none focus:border-[var(--amber)]"
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70">
            Low-stock alert
            <input
              required
              min="0"
              type="number"
              value={formData.lowStockThreshold}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lowStockThreshold: Math.max(0, Number(e.target.value)),
                })
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--ink)]/10 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none focus:border-[var(--amber)]"
            />
          </label>
          <label className="flex items-center gap-3 text-sm font-bold text-[var(--maroon)] sm:col-span-4">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 accent-[var(--crimson)]"
            />
            Active and visible in the storefront
          </label>
        </div>

        <div className="rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)]/45 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-[var(--maroon)]">Weight & price options</h3>
              <p className="text-xs text-[var(--ink)]/55 mt-1">
                Add sizes such as 250 g, 500 g, or 1 kg and set a separate price for each.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  weightOptions: [
                    ...formData.weightOptions,
                    { weight: "", price: formData.price || 0 },
                  ],
                })
              }
              className="shrink-0 h-9 px-3 rounded-full bg-[var(--amber)] text-[var(--maroon)] text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add weight
            </button>
          </div>
          {formData.weightOptions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--ink)]/15 py-5 text-center text-xs text-[var(--ink)]/50">
              No weight options yet. The default selling price will be used.
            </div>
          ) : (
            <div className="space-y-3">
              {formData.weightOptions.map((option, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end"
                >
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/60">
                    Weight
                    <input
                      required
                      value={option.weight}
                      placeholder="500 g"
                      onChange={(e) => {
                        const next = [...formData.weightOptions];
                        next[index] = { ...option, weight: e.target.value };
                        setFormData({ ...formData, weightOptions: next });
                      }}
                      className="mt-1 w-full h-10 px-3 rounded-xl bg-white border border-[var(--ink)]/10 text-sm normal-case tracking-normal outline-none focus:border-[var(--amber)]"
                    />
                  </label>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/60">
                    Price ₹
                    <input
                      required
                      type="number"
                      min="1"
                      value={option.price}
                      onChange={(e) => {
                        const next = [...formData.weightOptions];
                        next[index] = { ...option, price: Number(e.target.value) };
                        setFormData({ ...formData, weightOptions: next });
                      }}
                      className="mt-1 w-full h-10 px-3 rounded-xl bg-white border border-[var(--ink)]/10 text-sm normal-case tracking-normal outline-none focus:border-[var(--amber)]"
                    />
                  </label>
                  <label className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/60">
                    Compare ₹
                    <input
                      type="number"
                      min="0"
                      value={option.originalPrice || ""}
                      onChange={(e) => {
                        const next = [...formData.weightOptions];
                        next[index] = {
                          ...option,
                          originalPrice: Number(e.target.value) || undefined,
                        };
                        setFormData({ ...formData, weightOptions: next });
                      }}
                      className="mt-1 w-full h-10 px-3 rounded-xl bg-white border border-[var(--ink)]/10 text-sm normal-case tracking-normal outline-none focus:border-[var(--amber)]"
                    />
                  </label>
                  <button
                    type="button"
                    aria-label={`Remove ${option.weight || "weight option"}`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        weightOptions: formData.weightOptions.filter(
                          (_, optionIndex) => optionIndex !== index,
                        ),
                      })
                    }
                    className="w-10 h-10 rounded-xl border border-red-200 text-red-500 bg-white grid place-items-center hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
            Tagline
          </label>
          <input
            required
            type="text"
            placeholder="e.g., Slow-roasted Californian"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
            Product Description
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe taste, quality, origin, and best uses..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
              Product Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-start">
              {/* Image Preview & Upload Zone */}
              <div className="md:col-span-2 border-2 border-dashed border-[var(--ink)]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-[var(--cream)]/30 hover:bg-[var(--cream)]/60 transition flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px] text-center relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {formData.image ? (
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-16 sm:h-24 object-contain rounded-lg drop-shadow-md"
                    />
                    <p className="text-xs text-[var(--ink)]/60 font-medium">
                      Click or drag new image to replace
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--ink)]/40" />
                    <p className="text-xs sm:text-sm font-semibold text-[var(--ink)]/70">
                      Upload Product Image
                    </p>
                    <p className="text-xs text-[var(--ink)]/40">
                      Drag & drop or click to choose file
                    </p>
                  </div>
                )}
              </div>

              {/* URL fallback / display */}
              <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider block">
                    Or Paste Image URL
                  </span>
                  <input
                    type="text"
                    placeholder="e.g., https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
                  />
                </div>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="w-full h-9 sm:h-10 rounded-full border border-[var(--ink)]/10 text-xs font-bold text-red-500 hover:bg-red-50 transition"
                  >
                    Clear Image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
            >
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider">
              Badge (optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Bestseller"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <button
            type="submit"
            className="h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-[var(--crimson)] text-white font-bold hover:scale-[1.02] transition shadow-md flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            {initialData ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
