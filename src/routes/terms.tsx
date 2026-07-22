import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Using Fitora"
      title="Terms & Conditions"
      intro="These terms apply when you browse the Fitora website, create an account, or submit an order request."
      sections={[
        {
          title: "Products and orders",
          content: (
            <p>
              Website listings are invitations to order. Prices, weights, availability, delivery
              charges, and timing are subject to confirmation. We may decline or correct an order
              before acceptance if information is inaccurate or stock is unavailable.
            </p>
          ),
        },
        {
          title: "Accounts",
          content: (
            <p>
              You are responsible for keeping your sign-in method secure and for activity under your
              account. Do not attempt to access administrative features, other customer data, or
              website systems without authorization.
            </p>
          ),
        },
        {
          title: "Product information",
          content: (
            <p>
              We aim to keep images and descriptions accurate, but natural foods vary in color,
              shape, and size. Review ingredient and allergen information provided with the product
              and contact us before ordering if you have dietary concerns.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          content: (
            <p>
              Do not disrupt the website, submit fraudulent orders, copy protected branding, scrape
              personal data, or use the service unlawfully. We may restrict access where misuse or
              security risk is suspected.
            </p>
          ),
        },
        {
          title: "Changes",
          content: (
            <p>
              We may update these terms and related policies as the service changes. The latest
              version and update date will be available on this website.
            </p>
          ),
        },
      ]}
    />
  );
}
