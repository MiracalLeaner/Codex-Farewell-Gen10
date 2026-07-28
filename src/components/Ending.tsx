"use client";

import { motion } from "framer-motion";
import DustField from "./DustField";
import type { GenerationData } from "@/lib/types";

export default function Ending({ generation }: { generation: GenerationData }) {
  return (
    <section className="wood-texture relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
      <DustField count={20} />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(224,172,83,0.5), transparent 70%)" }}
      />

      {/* the book, closing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -35 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="page-shadow relative h-32 w-44 rounded-sm sm:h-40 sm:w-56"
        style={{
          background: "linear-gradient(135deg, var(--color-wood-light), var(--color-wood))",
          border: "1px solid rgba(224,172,83,0.3)",
        }}
      >
        <div className="absolute inset-3 rounded-sm border border-[var(--color-gold)]/30 sm:inset-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl text-[var(--color-gold-pale)]/80 sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Codex
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative mt-12 max-w-lg"
      >
        <p
          className="text-3xl text-[var(--color-gold-pale)] sm:text-4xl"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          {generation.ending.line1}
        </p>
        <p
          className="mt-3 text-3xl text-[var(--color-gold-pale)] sm:text-4xl"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          {generation.ending.line2}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="ink-label relative mt-16 text-[10px] text-[var(--color-gold-pale)]"
      >
        CODEX · Generation 10
      </motion.p>

      <motion.button
        onClick={() => window.location.reload()}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.2 }}
        whileHover={{ opacity: 0.9 }}
        className="ink-label relative mt-6 text-[10px] text-[var(--color-gold-pale)] underline-offset-4 hover:underline"
      >
        Begin again
      </motion.button>
    </section>
  );
}
