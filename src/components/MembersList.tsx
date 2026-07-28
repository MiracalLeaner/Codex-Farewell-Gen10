"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface MembersListProps {
  members: string[];
  onSelect: (name: string) => void;
}

export default function MembersList({ members, onSelect }: MembersListProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-4">
      {members.map((name, i) => (
        <ScrollReveal key={name} delay={i * 0.05} y={12}>
          <motion.button
            onClick={() => onSelect(name)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group relative rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-wood)]/50 px-5 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--color-gold-bright)] hover:bg-[var(--color-gold)]/15"
          >
            <span
              className="text-base text-[var(--color-gold-pale)] sm:text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </span>
          </motion.button>
        </ScrollReveal>
      ))}
    </div>
  );
}
