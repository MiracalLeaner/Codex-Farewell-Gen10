"use client";

import ScrollReveal from "./ScrollReveal";
import type { MilestoneEntry } from "@/lib/types";

export default function Milestones({ items }: { items: MilestoneEntry[] }) {
  return (
    <section className="paper-texture relative px-6 pb-20 pt-4 sm:px-16 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mx-auto mb-14 h-px w-16 bg-[var(--color-gold)]/40 sm:mb-16" />
          <p className="ink-label text-center text-xs text-[var(--color-gold)]">Shared Milestones</p>
        </ScrollReveal>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-[var(--color-gold)]/25 lg:block" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1} y={18}>
                <div className="relative pl-6 lg:pl-0 lg:pt-8 lg:text-center">
                  <span className="absolute left-0 top-[7px] h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] lg:left-1/2 lg:top-0 lg:-translate-x-1/2" />
                  <p className="ink-label text-[11px] text-[var(--color-gold)]">{m.year}</p>
                  <p
                    className="mt-2 text-base leading-snug text-[var(--color-ink-soft)] lg:mx-auto lg:max-w-[13rem]"
                    style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                  >
                    {m.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
