"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface MembersListProps {
  members: string[];
  onSelect: (name: string) => void;
}

export default function MembersList({ members, onSelect }: MembersListProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mx-auto mb-2 h-px w-16 bg-[var(--color-gold)]/40" />
      <div className="grid grid-cols-1 gap-x-14 sm:grid-cols-2">
        {members.map((name, i) => (
          <ScrollReveal key={name} delay={i * 0.04} y={10}>
            <motion.button
              onClick={() => onSelect(name)}
              whileTap={{ opacity: 0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group focus-ring flex w-full items-baseline gap-4 border-b border-[var(--color-gold)]/15 py-4 text-left transition-colors duration-300 hover:border-[var(--color-gold-bright)]/50"
            >
              <span className="ink-label shrink-0 text-[10px] tabular-nums text-[var(--color-gold)]/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-lg text-[var(--color-gold-pale)] transition-colors duration-300 group-hover:text-[var(--color-gold-bright)] sm:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {name}
              </span>
              <span
                aria-hidden
                className="ml-auto shrink-0 -translate-x-1 text-sm text-[var(--color-gold-bright)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </motion.button>
          </ScrollReveal>
        ))}
      </div>
      <div className="mx-auto mt-2 h-px w-16 bg-[var(--color-gold)]/40" />
    </div>
  );
}
