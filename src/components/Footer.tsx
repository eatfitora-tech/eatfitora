import { Link } from "@tanstack/react-router";
import { Instagram, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--maroon)] text-[var(--cream)]/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <div className="sm:col-span-2">
          <Link to="/" className="mb-4 sm:mb-6 block">
            <img
              src="/logo1.webp"
              alt="Fitora Logo"
              className="h-16 sm:h-24 max-w-[220px] sm:max-w-[300px] object-contain drop-shadow-md"
            />
          </Link>
          <p className="text-xs sm:text-sm max-w-sm">
            Premium nuts, dry fruits, and wholesome mixes, freshness-packed and delivered with care.
          </p>
          <address className="mt-5 flex items-start gap-2.5 text-xs sm:text-sm not-italic leading-relaxed">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--amber)]" aria-hidden="true" />
            <div>
              <div className="font-bold text-[var(--cream)]">M.V Enterprises</div>
              <div>H.No: 2-6-194</div>
              <div>Tower Circle, Jagtial</div>
              <div>Telangana – 505327</div>
            </div>
          </address>
          <a
            href="https://www.instagram.com/eatfitora?igsh=MXJ6eGcxaW82dDdmMQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Fitora on Instagram"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-[var(--cream)] hover:border-[var(--amber)] hover:bg-white/10 hover:text-[var(--amber)] transition"
          >
            <Instagram className="w-5 h-5" />
            @eatfitora
          </a>
        </div>
        {[{ h: "Shop", links: ["Nuts", "Dry Fruits", "Mixes", "Gift Boxes"] }].map((col) => (
          <div key={col.h}>
            <div className="font-display text-xl sm:text-2xl text-[var(--amber)] mb-2 sm:mb-3">
              {col.h}
            </div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to={`/shop`}
                    search={{ category: l }}
                    className="hover:text-[var(--amber)] transition"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="font-display text-xl sm:text-2xl text-[var(--amber)] mb-2 sm:mb-3">
            Help & policies
          </div>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            {[
              ["Shipping", "/shipping"],
              ["Returns & refunds", "/returns"],
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-[var(--amber)] transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-center sm:text-left">
          <span>© 2026 Fitora. All shells cracked respectfully.</span>
          <span>Made with warmth.</span>
        </div>
      </div>
    </footer>
  );
}
