"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import DustField from "./DustField";
import PolaroidGallery from "./PolaroidGallery";
import MembersList from "./MembersList";
import MemberLetterModal from "./MemberLetterModal";
import FoldedLetter from "./FoldedLetter";
import type { DepartmentData, DepartmentSlug } from "@/lib/types";

interface DepartmentViewProps {
  slug: DepartmentSlug;
  department: DepartmentData;
  onClose: () => void;
}

export default function DepartmentView({ slug, department, onClose }: DepartmentViewProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Lock body scroll behind the overlay for a focused, exhibition-room feel.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.015 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.9 }}
      className="fixed inset-0 z-[65] overflow-y-auto wood-texture"
    >
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="touch-feedback focus-ring ink-label fixed left-[calc(1rem+var(--safe-l))] top-[calc(1rem+var(--safe-t))] z-[70] flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-wood)]/80 px-4 py-3 text-[11px] text-[var(--color-gold-pale)] backdrop-blur transition-colors hover:border-[var(--color-gold-bright)] sm:left-[calc(1.5rem+var(--safe-l))] sm:top-[calc(1.5rem+var(--safe-t))] sm:py-2.5"
      >
        ← Archive
      </motion.button>

      {/* Hero — the photo morphs in from the Archive Directory tile */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:min-h-screen sm:py-28">
        <DustField count={12} />
        <motion.div layoutId={`dept-photo-${slug}`} className="absolute inset-0">
          <Image
            src={department.heroImage}
            alt={department.name}
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-wood)]/40 via-[var(--color-wood)]/75 to-[var(--color-wood)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="ink-label relative text-xs text-[var(--color-gold-pale)]/70"
        >
          Archive{department.fullName ? ` · ${department.fullName}` : ""}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative mt-5 text-[3.4rem] leading-[0.95] text-[var(--color-gold-pale)] sm:text-[5.5rem]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {department.code}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-4 max-w-md text-lg italic text-[var(--color-gold-pale)]/80"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {department.tagline}
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="paper-texture relative px-6 py-16 sm:px-16 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="ink-label text-xs text-[var(--color-gold)]">Our Story</p>
            <div className="mx-auto mt-5 h-px w-10 bg-[var(--color-gold)]/40" />
            <p
              className="mt-6 text-xl leading-relaxed text-[var(--color-ink-soft)] sm:text-2xl"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              {department.story}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <PolaroidGallery eyebrow="Gallery" title="Archival Photographs" items={department.gallery} />

      {/* Members */}
      <section className="wood-texture relative px-6 py-16 sm:px-16 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="ink-label text-xs text-[var(--color-gold-pale)]/70">Members</p>
            <h2
              className="mt-3 text-4xl text-[var(--color-gold-pale)] sm:text-5xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {department.name}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-gold-pale)]/70">
              Click a name to read the letter written for them.
            </p>
          </ScrollReveal>

          <div className="mt-14">
            <MembersList members={department.members} onSelect={setSelectedMember} />
          </div>
        </div>
      </section>

      {/* Department Letter */}
      <section className="paper-texture relative px-6 py-16 sm:px-16 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="ink-label text-xs text-[var(--color-gold)]">Department Letter</p>
            <h2
              className="mt-3 text-4xl text-[var(--color-ink)] sm:text-5xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              A Letter to {department.name}
            </h2>
          </ScrollReveal>
          <div className="mt-14">
            <FoldedLetter letter={department.departmentLetter} />
          </div>
        </div>
      </section>

      <div
        className="wood-texture flex justify-center px-6 pt-4"
        style={{ paddingBottom: "calc(5rem + var(--safe-b))" }}
      >
        <button
          onClick={onClose}
          className="touch-feedback focus-ring ink-label rounded-full border border-[var(--color-gold)]/50 px-7 py-3.5 text-[11px] text-[var(--color-gold-pale)] transition-colors hover:border-[var(--color-gold-bright)] hover:bg-[var(--color-gold)]/10"
        >
          ← Back to the Archive
        </button>
      </div>

      <MemberLetterModal
        name={selectedMember}
        paragraphs={selectedMember ? department.memberLetters[selectedMember] ?? [] : []}
        onClose={() => setSelectedMember(null)}
      />
    </motion.div>
  );
}
