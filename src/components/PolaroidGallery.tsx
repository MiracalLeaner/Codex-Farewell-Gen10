"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import type { GalleryEntry } from "@/lib/types";

// Varied heights per column position give the grid an editorial,
// hand-curated feel instead of a uniform product-grid look.
const heights = [
  "h-44 sm:h-56",
  "h-56 sm:h-72",
  "h-52 sm:h-64",
  "h-60 sm:h-80",
  "h-48 sm:h-60",
  "h-56 sm:h-72",
];

interface PolaroidGalleryProps {
  eyebrow?: string;
  title?: string;
  items: GalleryEntry[];
  dark?: boolean;
}

export default function PolaroidGallery({ eyebrow, title, items, dark = false }: PolaroidGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const headingColor = dark ? "text-[var(--color-gold-pale)]" : "text-[var(--color-ink)]";
  const eyebrowColor = dark ? "text-[var(--color-gold-pale)]/70" : "text-[var(--color-gold)]";

  return (
    <section className={`relative px-6 py-16 sm:px-16 sm:py-28 ${dark ? "wood-texture" : "paper-texture"}`}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title) && (
          <ScrollReveal>
            {eyebrow && <p className={`ink-label text-xs ${eyebrowColor}`}>{eyebrow}</p>}
            {title && (
              <h2
                className={`mt-3 text-4xl sm:text-5xl ${headingColor}`}
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {title}
              </h2>
            )}
          </ScrollReveal>
        )}

        <div className="mt-16 columns-2 gap-4 sm:columns-3 sm:gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={item.image} delay={i * 0.06} y={26} className="mb-4 break-inside-avoid sm:mb-5">
              <motion.button
                onClick={() => setActive(i)}
                className={`page-shadow relative block w-full overflow-hidden rounded-sm ${heights[i % heights.length]}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="page-shadow relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-sm bg-[var(--color-cream)] p-3"
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-paper-dark)]">
                <Image
                  src={items[active].image}
                  alt={items[active].caption}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <p className="signature mt-3 text-center text-xl text-[var(--color-ink-soft)]">
                {items[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
