import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createPageHead(
      "Privacy Policy | Fitora",
      "Learn how Fitora handles account, order, delivery, and website information.",
      "/privacy",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Your Data"
      title="Privacy Policy"
      intro="This policy explains what information Fitora uses to provide accounts, checkout, customer care, and website functionality."
      sections={[
        {
          title: "Information we collect",
          content: (
            <p>
              We may receive your name, email, phone number, delivery address, order contents,
              messages, and account identifiers. The website may also store cart, wishlist, and
              order information on your device.
            </p>
          ),
        },
        {
          title: "How we use it",
          content: (
            <p>
              We use information to authenticate accounts, prepare and deliver orders, provide
              support, prevent misuse, improve the website, and meet legal obligations. We do not
              sell personal information.
            </p>
          ),
        },
        {
          title: "Services we use",
          content: (
            <p>
              Account and database features use Supabase. Google may process information when you
              choose Google sign-in. WhatsApp processes information when you send an order or
              support message. Each service operates under its own privacy terms.
            </p>
          ),
        },
        {
          title: "Retention and choices",
          content: (
            <p>
              We retain information only as reasonably needed for the purposes above. You may
              request access, correction, or deletion through our contact page, subject to order,
              fraud-prevention, and legal record requirements.
            </p>
          ),
        },
        {
          title: "Security",
          content: (
            <p>
              We use access controls and authenticated services to protect information, but no
              online system is risk-free. Never send card PINs, passwords, or one-time codes through
              WhatsApp or Instagram.
            </p>
          ),
        },
      ]}
    />
  );
}
