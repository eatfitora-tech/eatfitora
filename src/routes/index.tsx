import { createFileRoute } from "@tanstack/react-router";
import { Star, Truck, Leaf, ShieldCheck, ArrowRight, Heart } from "lucide-react";
import heroBowl from "@/assets/hero-bowl.webp";
import featureBowl from "@/assets/feature-bowl.webp";
import imgCashews from "@/assets/product-cashews.webp";
import imgAlmonds from "@/assets/product-almonds.webp";
import imgPistachios from "@/assets/product-pistachios.webp";
import imgDates from "@/assets/product-dates.webp";
import imgWalnuts from "@/assets/product-walnuts.webp";
import imgApricots from "@/assets/product-apricots.webp";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fitora — Premium Nuts & Dry Fruits, Cracked Fresh" },
      {
        name: "description",
        content:
          "Hand-picked nuts and dry fruits — cashews, almonds, pistachios, dates and more. Roasted in small batches and delivered to your door.",
      },
      { property: "og:title", content: "Fitora — Premium Nuts & Dry Fruits" },
      {
        property: "og:description",
        content: "Hand-picked, small-batch roasted nuts and dry fruits delivered fresh.",
      },
      { property: "og:image", content: heroBowl },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";

function Index() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <Products />
      <Marquee />
      <Highlights />
      <Story />
      <BigBowl />
    </div>
  );
}

function Wave({ color, position }: { color: string; position: "top" | "bottom" }) {
  const flip = position === "top" ? "rotate-180" : "";
  return (
    <div className={`relative w-full ${flip}`} aria-hidden>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-12 md:h-20">
        <path
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function Marquee() {
  const items = ["Dry Fruits", "Dried Berries", "Healthy Seeds", "Cereals", "Makhana"];
  const row = [...items, ...items];
  return (
    <div className="bg-[var(--cream)] py-6 overflow-hidden border-y border-[var(--ink)]/10">
      <div className="flex gap-12 marquee whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-2xl sm:text-4xl md:text-5xl text-[var(--maroon)]/80 inline-flex items-center gap-6 sm:gap-12"
          >
            {t} <span className="text-[var(--amber)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Highlights() {
  const tiles = [
    { title: "Premium Ingredients", text: "Only the finest handpicked ingredients make the cut." },
    { title: "Quality Assured", text: "Every batch is carefully inspected for excellence." },
    {
      title: "Sealed for Freshness",
      text: "Advanced packaging keeps every bite crisp and delicious.",
    },
  ];
  return (
    <section id="story" className="bg-[var(--cream)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[featureBowl, heroBowl, featureBowl].map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] shadow-[var(--shadow-card)] ${i === 1 ? "translate-y-4 sm:translate-y-6" : ""}`}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon)]/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[var(--crimson)] grid place-items-center shadow-md">
            <Leaf className="w-6 h-6 text-[var(--amber)]" />
          </div>
          <h2 className="mt-4 sm:mt-5 font-display text-3xl sm:text-5xl md:text-6xl text-[var(--crimson)] leading-[0.95]">
            Harvested Fresh.
            <br />
            Crafted for Wellness.
          </h2>
          <p className="mt-4 sm:mt-5 text-[var(--ink)]/75 max-w-md text-base sm:text-lg">
            Every FITORA product is thoughtfully sourced, quality-checked, and packed with care to
            bring you the finest natural nutrition for your everyday lifestyle.
          </p>
          <div className="mt-8 space-y-4">
            {tiles.map((t) => (
              <div key={t.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--amber)]/30 text-[var(--crimson)] grid place-items-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl text-[var(--maroon)]">
                    {t.title}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--ink)]/70">{t.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BigBowl() {
  return (
    <section className="relative bg-[var(--cream)]">
      <Wave color="var(--maroon)" position="top" />
      <div className="bg-[var(--maroon)] text-[var(--cream)] py-20 md:py-28 -mt-px">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-[var(--amber)] uppercase tracking-[0.2em]">
              Our Products
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mt-2 sm:mt-3 text-[var(--amber)] leading-[0.9]">
              Fresh choices
              <br />
              for every day.
            </h2>
            <p className="mt-4 sm:mt-5 text-white/75 max-w-md text-base sm:text-lg">
              Browse premium nuts, naturally sweet dry fruits, and wholesome snack mixes. Every
              product is carefully selected and freshness-packed for everyday snacking, sharing, and
              gifting.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
              {["Premium Nuts", "Dry Fruits", "Healthy Mixes"].map((category) => (
                <div
                  key={category}
                  className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 px-2 sm:px-3 py-3 sm:py-4 text-center"
                >
                  <div className="text-xs sm:text-sm font-bold text-[var(--cream)]">{category}</div>
                </div>
              ))}
            </div>
            <a
              href="#shop"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.03] transition shadow-xl text-sm sm:text-base"
            >
              Browse products <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="relative aspect-square max-w-lg mx-auto w-full">
            <div
              className="absolute inset-6 rounded-full blur-3xl opacity-50"
              style={{ background: "radial-gradient(circle, #ffb05a 0%, transparent 65%)" }}
            />
            <img
              src={featureBowl}
              alt="A patterned bowl filled with mixed nuts and dried fruits"
              loading="lazy"
              width={1280}
              height={1280}
              className="relative w-full h-full object-contain float-slow drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="bg-[var(--cream)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[var(--amber)] grid place-items-center shadow-md">
            <Heart className="w-6 h-6 text-[var(--maroon)]" />
          </div>
          <h3 className="mt-4 sm:mt-5 font-display text-3xl sm:text-5xl text-[var(--crimson)]">
            Crafted with Care.
          </h3>
          <p className="mt-3 sm:mt-4 text-[var(--ink)]/75 text-base sm:text-lg">
            Every FITORA product is carefully prepared using premium ingredients and modern quality
            standards to preserve natural taste, crunch, and nutrition in every bite.
          </p>
        </div>
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[var(--maroon)] grid place-items-center shadow-md">
            <Star className="w-6 h-6 text-[var(--amber)]" />
          </div>
          <h3 className="mt-4 sm:mt-5 font-display text-3xl sm:text-5xl text-[var(--crimson)]">
            Cracked for the senses.
          </h3>
          <p className="mt-3 sm:mt-4 text-[var(--ink)]/75 text-base sm:text-lg">
            Buttery walnuts, perfumed pistachios, dates that taste like caramel — sourced for
            character, not commodity grade. Snacking the way it should be.
          </p>
          <a
            href="#shop"
            className="mt-6 inline-flex items-center gap-2 px-5 h-11 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold hover:scale-[1.03] transition shadow-lg"
          >
            Order now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { data: products, isLoading } = useProducts();
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(products?.map((product) => product.category) || [])),
  ];
  const visibleProducts =
    category === "All" ? products : products?.filter((product) => product.category === category);

  return (
    <section id="shop" className="bg-[var(--cream)] pt-24 sm:pt-32 pb-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4 flex-wrap">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-[var(--crimson)] uppercase tracking-[0.2em]">
              The Harvest
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl mt-1.5 sm:mt-2 text-[var(--maroon)]">
              Today's freshest crackers.
            </h2>
          </div>
          <div className="flex gap-2 text-xs sm:text-sm overflow-x-auto pb-1 -mx-1 px-1 w-full sm:w-auto">
            {categories.map((t) => (
              <button
                key={t}
                onClick={() => setCategory(t)}
                className={`px-3 sm:px-4 h-8 sm:h-10 rounded-full border font-bold transition whitespace-nowrap ${category === t ? "bg-[var(--crimson)] text-[var(--cream)] border-[var(--crimson)]" : "bg-white border-[var(--ink)]/10 hover:bg-[var(--sand)]"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center font-bold text-[var(--maroon)]">Loading harvest...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {visibleProducts?.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
