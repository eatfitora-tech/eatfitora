import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/returns")({ component: ReturnsPage });

function ReturnsPage() {
  return (
    <PolicyPage
      eyebrow="Customer Care"
      title="Returns & Refunds"
      intro="Because Fitora sells food products, we follow a safety-first returns process while making damaged or incorrect orders right."
      sections={[
        {
          title: "Eligible issues",
          content: (
            <p>
              Contact us within 48 hours of delivery if an item is damaged, unsealed, expired, or
              different from what we confirmed. Please keep the product, packaging, order details,
              and clear photos available for review.
            </p>
          ),
        },
        {
          title: "Food-safety limits",
          content: (
            <p>
              Opened or consumed food products cannot normally be returned for preference changes.
              We also cannot accept returns caused by incorrect address details, failed delivery
              availability, or storage after delivery.
            </p>
          ),
        },
        {
          title: "Resolution",
          content: (
            <p>
              After reviewing the issue, we may offer a replacement, store credit, or refund for the
              affected item. The available resolution depends on the evidence, product condition,
              and delivery circumstances.
            </p>
          ),
        },
        {
          title: "How to request help",
          content: (
            <p>
              Message us on WhatsApp with your name, phone number, order details, a short
              description, and photos. We will review the request and explain the next step.
            </p>
          ),
        },
      ]}
    />
  );
}
