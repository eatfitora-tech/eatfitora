import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export type PolicySection = {
  title: string;
  content: ReactNode;
};

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <div className="min-h-screen bg-[var(--cream)] pt-24 sm:pt-32 pb-16 sm:pb-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)]/60 hover:text-[var(--maroon)] transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fitora
        </Link>
        <header className="rounded-3xl bg-[var(--maroon)] text-[var(--cream)] p-6 sm:p-10 md:p-12 shadow-[var(--shadow-card)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--amber)]">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl mt-3">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-white/75">
            {intro}
          </p>
          <p className="mt-5 text-xs font-semibold text-white/45">Last updated: 22 July 2026</p>
        </header>

        <div className="mt-6 sm:mt-8 space-y-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl bg-white border border-[var(--ink)]/10 p-5 sm:p-7"
            >
              <h2 className="font-display text-2xl sm:text-3xl text-[var(--maroon)]">
                {section.title}
              </h2>
              <div className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink)]/70 policy-content">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
