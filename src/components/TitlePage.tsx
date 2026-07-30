"use client";

import { motion } from "framer-motion";
import DustField from "./DustField";
import type { GenerationData } from "@/lib/types";

export default function TitlePage({ generation }: { generation: GenerationData }) {
  return (
    <section className="paper-texture relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:py-24">
      <DustField count={10} />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="ink-label text-xs text-[var(--color-ink-soft)]"
      >
        {generation.club} · Archive Entry
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        className="mt-6 text-[4rem] leading-[0.95] text-[var(--color-ink)] sm:text-[6rem]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {generation.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-4 max-w-md text-lg italic text-[var(--color-ink-soft)] sm:text-xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {generation.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.3 }}
        className="my-10 h-px w-24 bg-[var(--color-gold)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="ink-label text-[11px] text-[var(--color-ink-soft)]/70">Written by</span>
        <span
          className="signature text-4xl text-[var(--color-ink)] sm:text-5xl"
          style={{ lineHeight: 1.2 }}
        >
          Generation 10
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-[var(--color-ink-soft)]"
      >
        <span>{generation.departments}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />
        <span>{generation.years}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.6, duration: 1 }, y: { delay: 3.2, duration: 2, repeat: Infinity } }}
        className="absolute bottom-10 ink-label text-[10px] text-[var(--color-ink-soft)]"
      >
        Scroll to turn the page
      </motion.div>
    </section>
  );
}
