import type { Address } from "@/store/useStore";

export const FREE_DELIVERY_THRESHOLD = 1500;
export const STANDARD_DELIVERY_FEE = 50;
export const BUSINESS_WHATSAPP_NUMBER = "919440007093";

export function estimatedDelivery(subtotal: number) {
  return subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
}

export type WhatsAppOrderItem = {
  productName: string;
  selectedWeight?: string | null;
  quantity: number;
  lineTotal: number;
};

export function buildOrderWhatsAppUrl(order: {
  orderNumber: string;
  address: Address;
  items: WhatsAppOrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
}) {
  const { address } = order;
  const lines = [
    `🛒 *FITORA ORDER ${order.orderNumber}*`,
    "",
    "*Customer Details*",
    `Name: ${address.fullName}`,
    `Phone: ${address.phone}`,
    "",
    "*Delivery Address*",
    `${address.house}, ${address.street}`,
    `${address.area}, ${address.city}, ${address.state} ${address.pincode}`,
  ];

  if (address.landmark) lines.push(`Landmark: ${address.landmark}`);
  if (address.notes) lines.push(`Notes: ${address.notes}`);

  lines.push("", "*Products*");
  order.items.forEach((item) => {
    const pack = item.selectedWeight ? ` (${item.selectedWeight})` : "";
    lines.push(`- ${item.productName}${pack} ×${item.quantity} - ₹${item.lineTotal.toFixed(2)}`);
  });

  lines.push(
    "",
    "*Billing*",
    `Subtotal: ₹${order.subtotal.toFixed(2)}`,
    `Delivery: ${order.delivery === 0 ? "Free" : `₹${order.delivery.toFixed(2)}`}`,
    `*Total: ₹${order.total.toFixed(2)}*`,
    "",
    "Please confirm payment and delivery details for this saved order.",
  );

  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
