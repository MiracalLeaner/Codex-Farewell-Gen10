"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import type { GenerationData } from "@/lib/types";

export default function Chapter1({ generation }: { generation: GenerationData }) {
  const { chapter1 } = generation;
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <section className="paper-texture relative overflow-hidden px-6 py-16 sm:px-16 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="ink-label text-xs text-[var(--color-gold)]">
            {chapter1.label} · {chapter1.year}
          </p>
          <h2
            className="mt-3 text-4xl text-[var(--color-ink)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {chapter1.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-12">
          <div
            ref={imageRef}
            className="page-shadow relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[var(--color-paper-deep)]"
          >
            <motion.div className="absolute inset-0 -m-[6%]" style={{ y: parallaxY, scale }}>
              <Image
                src={chapter1.image}
                alt={chapter1.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mx-auto mt-14 max-w-xl text-left">
          {chapter1.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="mb-6 text-lg leading-relaxed text-[var(--color-ink-soft)] last:mb-0 sm:text-xl"
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
