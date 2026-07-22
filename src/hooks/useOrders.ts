import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { CartItem, Address } from "@/store/useStore";

export type OrderStatus =
  "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderItem = {
  id: string;
  productId: string | null;
  productName: string;
  productImage: string | null;
  sku: string;
  selectedWeight: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  address: Address;
  subtotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  whatsappOpenedAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

// Supabase rows are intentionally mapped at this boundary so the UI stays camelCase.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id,
    address: row.address_snapshot as Address,
    subtotal: Number(row.subtotal),
    delivery: Number(row.delivery),
    total: Number(row.total),
    status: row.status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    whatsappOpenedAt: row.whatsapp_opened_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: (row.order_items || []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      productImage: item.product_image,
      sku: item.sku,
      selectedWeight: item.selected_weight,
      unitPrice: Number(item.unit_price),
      quantity: item.quantity,
      lineTotal: Number(item.line_total),
    })),
  };
}

const ORDER_SELECT = "*, order_items(*)";

async function fetchOrder(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("id", orderId)
    .single();
  if (error) throw error;
  return mapOrder(data);
}

export function useOrders() {
  const { session } = useAuth();
  const userId = session?.user?.id;
  return useQuery({
    queryKey: ["orders", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map(mapOrder);
    },
  });
}

export function useOrder(orderId: string | null) {
  const { session } = useAuth();
  return useQuery({
    queryKey: ["order", orderId],
    enabled: Boolean(session?.user?.id && orderId),
    queryFn: () => fetchOrder(orderId!),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  return useMutation({
    mutationFn: async ({ addressId, cart }: { addressId: string; cart: CartItem[] }) => {
      if (!session?.user?.id) throw new Error("You must be signed in to place an order.");

      const items = cart.map((item) => ({
        product_id: item.product.id,
        selected_weight: item.product.selectedWeight || null,
        quantity: item.quantity,
      }));
      const { data, error } = await supabase.rpc("create_order", {
        p_address_id: addressId,
        p_items: items,
      });
      if (error) throw error;
      const result = data as { id: string };
      return fetchOrder(result.id);
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.setQueryData(["order", order.id], order);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useMarkWhatsAppOpened() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase.rpc("mark_order_whatsapp_opened", {
        p_order_id: orderId,
      });
      if (error) throw error;
    },
    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map(mapOrder);
    },
  });
}

export function useAdminUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
      paymentStatus,
    }: {
      orderId: string;
      status: OrderStatus;
      paymentStatus: PaymentStatus;
    }) => {
      const { error } = await supabase.rpc("admin_update_order", {
        p_order_id: orderId,
        p_status: status,
        p_payment_status: paymentStatus,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
