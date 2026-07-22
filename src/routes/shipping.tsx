import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/shipping")({ component: ShippingPage });

function ShippingPage() {
  return (
    <PolicyPage
      eyebrow="Customer Care"
      title="Shipping Policy"
      intro="How Fitora confirms, prepares, and delivers your order. Final availability, timing, and delivery charges are confirmed with you before payment."
      sections={[
        {
          title: "Order confirmation",
          content: (
            <p>
              Checkout first saves your order and reserves the available stock, then opens a
              pre-filled WhatsApp message. The order remains pending until our team confirms the
              delivery location, payment, and expected timing with you.
            </p>
          ),
        },
        {
          title: "Dispatch and delivery",
          content: (
            <p>
              We pack confirmed orders with care and share the expected dispatch or delivery window
              during confirmation. Timing can vary by destination, weekends, public holidays,
              courier conditions, and product availability.
            </p>
          ),
        },
        {
          title: "Delivery charges",
          content: (
            <p>
              Any delivery charge shown at checkout is an estimate. The final charge, if applicable,
              is confirmed on WhatsApp before you complete payment.
            </p>
          ),
        },
        {
          title: "Receiving your order",
          content: (
            <p>
              Please provide a complete address and reachable phone number. Inspect the parcel when
              it arrives and contact us promptly if it is damaged, opened, or different from the
              confirmed order.
            </p>
          ),
        },
      ]}
    />
  );
}
