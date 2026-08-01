"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DepartmentLetter } from "@/lib/types";

export default function FoldedLetter({ letter }: { letter: DepartmentLetter }) {
  const [unfolded, setUnfolded] = useState(false);
  const [typed, setTyped] = useState("");
  const full = letter.paragraphs.join("\n\n");

  useEffect(() => {
    if (!unfolded) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 4;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(id);
    }, 13);
    return () => window.clearInterval(id);
  }, [unfolded, full]);

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {!unfolded ? (
          <motion.button
            key="folded"
            onClick={() => setUnfolded(true)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            whileHover={{ y: -5, rotate: -0.6, boxShadow: "0 1px 0 rgba(74,53,36,0.25), 6px 34px 60px -18px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.97, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="page-shadow letter-crease focus-ring group relative mx-auto block h-56 w-full max-w-sm overflow-hidden rounded-sm bg-[var(--color-cream)] sm:h-64"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--color-cream) 49.3%, rgba(74,53,36,0.06) 49.3%, rgba(74,53,36,0.06) 50.7%, var(--color-cream) 50.7%)",
            }}
          >
            <div
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rotate-1 bg-[var(--color-gold-pale)]/60"
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            />
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center sm:px-8">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/50 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #8a2c22, #5c1712 70%)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
                }}
              />
              <p
                className="text-2xl text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {letter.heading}
              </p>
              <p className="ink-label text-[10px] text-[var(--color-ink-soft)]/60">Click to unfold</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="unfolded"
            initial={{ opacity: 0, y: 24, scale: 0.97, rotateX: -4, rotate: -0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.9 }}
            style={{ transformPerspective: 1000 }}
            className="page-shadow paper-texture relative min-h-[380px] bg-[var(--color-cream)] px-6 py-8 sm:min-h-[420px] sm:px-14 sm:py-14"
          >
            <div
              aria-hidden
              className="absolute -top-3 left-10 h-6 w-16 rotate-[-4deg] bg-[var(--color-gold-pale)]/60"
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            />
            <p
              className="text-2xl text-[var(--color-ink)] sm:text-3xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {letter.heading}
            </p>
            <div className="mt-8 h-px w-14 bg-[var(--color-gold)]/50" />
            <p
              className="mt-8 whitespace-pre-line text-lg leading-[1.85] text-[var(--color-ink-soft)] sm:text-[1.4rem] sm:leading-[1.9]"
              style={{ fontFamily: "var(--font-hand-vi)" }}
            >
              {typed}
              {typed.length < full.length && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
