"use client";

import ScrollReveal from "./ScrollReveal";
import type { GenerationData } from "@/lib/types";

export default function Prologue({ generation }: { generation: GenerationData }) {
  const [firstPara, ...restParas] = generation.intro.body.split("\n\n");

  return (
    <section className="paper-texture relative px-6 py-16 sm:px-16 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="ink-label text-xs text-[var(--color-gold)]">{generation.intro.eyebrow}</p>
          <h2
            className="mt-3 whitespace-pre-line text-4xl text-[var(--color-ink)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {generation.intro.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-10 max-w-2xl">
          <p
            className="text-lg leading-relaxed text-[var(--color-ink-soft)] sm:text-xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span
              aria-hidden
              className="float-left mr-3 mt-1 text-[3.4rem] leading-[0.8] text-[var(--color-gold)] sm:text-[4.2rem]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {firstPara.charAt(0)}
            </span>
            {firstPara.slice(1)}
          </p>
          {restParas.map((para, i) => (
            <p
              key={i}
              className="mt-6 text-lg leading-relaxed text-[var(--color-ink-soft)] sm:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {para}
            </p>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
