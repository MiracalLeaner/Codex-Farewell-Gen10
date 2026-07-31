"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MemberLetterModalProps {
  name: string | null;
  paragraphs: string[];
  onClose: () => void;
}

export default function MemberLetterModal({ name, paragraphs, onClose }: MemberLetterModalProps) {
  return (
    <AnimatePresence>
      {name && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm sm:px-6 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Letter for ${name}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0, y: 18, rotate: -1, rotateX: -3 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0, rotateX: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.9 }}
            style={{ transformPerspective: 1000 }}
            className="page-shadow paper-texture relative max-h-[85vh] w-full max-w-lg overflow-y-auto bg-[var(--color-cream)] px-6 py-10 sm:px-12 sm:py-12"
          >
            <button
              onClick={onClose}
              aria-label="Close letter"
              className="touch-feedback focus-ring absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-soft)]/60 transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)] sm:right-4 sm:top-4 sm:h-8 sm:w-8"
            >
              ✕
            </button>
            <div
              aria-hidden
              className="absolute -top-3 left-10 h-6 w-16 rotate-[-4deg] bg-[var(--color-gold-pale)]/60"
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
            />
            <p className="ink-label text-[11px] text-[var(--color-gold)]">To</p>
            <p
              className="mt-1 text-3xl text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {name}
            </p>
            <div className="mt-6 h-px w-12 bg-[var(--color-gold)]/50" />

            <div className="mt-8 space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-lg leading-[1.85] text-[var(--color-ink-soft)]"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
