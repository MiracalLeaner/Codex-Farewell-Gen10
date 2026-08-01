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

        {/* Mobile & tablet — a horizontally swipeable memory strip.
            Photographs keep their natural aspect ratio (object-contain,
            no cropping) so faces are never cut off. Desktop (xl and up)
            is untouched — see the masonry grid below. */}
        <div
          className="snap-strip -mx-6 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:-mx-16 sm:gap-6 sm:px-16 xl:hidden"
          style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
        >
          {items.map((item, i) => (
            <button
              key={item.image}
              onClick={() => setActive(i)}
              aria-label={item.caption}
              className="touch-feedback focus-ring page-shadow relative block w-[82vw] shrink-0 snap-center overflow-hidden rounded-sm bg-[var(--color-cream)] p-2 sm:h-[58vh] sm:max-h-[26rem] sm:min-h-[15rem] sm:w-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[65vh] w-full rounded-[1px] object-contain sm:h-full sm:max-h-none sm:w-auto"
              />
            </button>
          ))}
          {/* trailing spacer so the last card can rest away from the edge */}
          <div className="w-2 shrink-0" aria-hidden="true" />
        </div>

        {/* Desktop (approved, unchanged) — editorial masonry grid */}
        <div className="mt-16 hidden columns-2 gap-4 sm:columns-3 sm:gap-5 xl:block">
          {items.map((item, i) => (
            <ScrollReveal key={item.image} delay={i * 0.06} y={26} className="mb-4 break-inside-avoid sm:mb-5">
              <motion.button
                onClick={() => setActive(i)}
                className={`page-shadow focus-ring relative block w-full overflow-hidden rounded-sm bg-[var(--color-cream)] p-1.5 ${heights[i % heights.length]}`}
                whileHover={{
                  scale: 1.03,
                  rotate: i % 2 === 0 ? -0.6 : 0.6,
                  boxShadow: "0 1px 0 rgba(74,53,36,0.25), 0 40px 70px -20px rgba(0,0,0,0.6), 0 10px 22px -8px rgba(0,0,0,0.45)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="30vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-6 py-10"
            style={{
              paddingTop: "calc(2.5rem + var(--safe-t))",
              paddingBottom: "calc(2.5rem + var(--safe-b))",
              paddingLeft: "calc(1.5rem + var(--safe-l))",
              paddingRight: "calc(1.5rem + var(--safe-r))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="page-shadow relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-sm bg-[var(--color-cream)] p-3"
              initial={{ scale: 0.92, opacity: 0, y: 12, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile/tablet: full photo, no cropping. Desktop (xl+): original 4:3 crop, unchanged. */}
              <div className="relative flex max-h-[64vh] w-full items-center justify-center overflow-hidden bg-[var(--color-paper-dark)] xl:aspect-[4/3] xl:max-h-none">
                <Image
                  src={items[active].image}
                  alt={items[active].caption}
                  fill
                  sizes="90vw"
                  className="object-contain xl:object-cover"
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
