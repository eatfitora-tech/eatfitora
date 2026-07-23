import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { PolicyPage } from "@/components/PolicyPage";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    createPageHead(
      "Contact Fitora | Orders and Customer Support",
      "Contact Fitora for product questions, order assistance, delivery support, and returns through WhatsApp or Instagram.",
      "/contact",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PolicyPage
      eyebrow="We’re Here to Help"
      title="Contact Fitora"
      intro="Questions about products, an order, delivery, or a return? Contact us through an official Fitora channel below."
      sections={[
        {
          title: "WhatsApp support",
          content: (
            <>
              <p>For orders and time-sensitive support, message Fitora on WhatsApp.</p>
              <a
                href="https://wa.me/919440007093"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 font-bold"
              >
                <MessageCircle className="w-5 h-5" /> Message +91 94400 07093
              </a>
            </>
          ),
        },
        {
          title: "Instagram",
          content: (
            <>
              <p>
                Follow product updates and send general enquiries to our official Instagram profile.
              </p>
              <a
                href="https://www.instagram.com/eatfitora?igsh=MXJ6eGcxaW82dDdmMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--maroon)] text-white px-5 py-3 font-bold"
              >
                <Instagram className="w-5 h-5" /> @eatfitora
              </a>
            </>
          ),
        },
        {
          title: "Support safety",
          content: (
            <p>
              Fitora will never ask for your password, card PIN, or one-time verification code.
              Include your name and order details when requesting order support, but do not send
              sensitive financial credentials.
            </p>
          ),
        },
      ]}
    />
  );
}
