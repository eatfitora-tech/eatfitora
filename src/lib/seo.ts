const SITE_URL = "https://eatfitora.in";

export function createPageHead(title: string, description: string, path: string) {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Fitora" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}

export const fitoraOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Fitora",
  alternateName: "Eat Fitora",
  url: SITE_URL,
  logo: `${SITE_URL}/logo1.webp`,
  description:
    "Fitora is an Indian online store for premium nuts, dry fruits, healthy mixes, and freshness-packed snacks.",
  telephone: "+91-94400-07093",
  sameAs: ["https://www.instagram.com/eatfitora/"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-94400-07093",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Telugu"],
  },
};
