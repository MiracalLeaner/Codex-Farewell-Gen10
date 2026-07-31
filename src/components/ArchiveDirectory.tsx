"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import type { DepartmentData, DepartmentSlug, GenerationData } from "@/lib/types";

interface ArchiveDirectoryProps {
  generation: GenerationData;
  departments: Record<DepartmentSlug, DepartmentData>;
  onOpen: (slug: DepartmentSlug) => void;
}

const order: DepartmentSlug[] = ["fer", "hre", "media", "rnd"];

function ExhibitPanel({
  slug,
  dept,
  index,
  onOpen,
}: {
  slug: DepartmentSlug;
  dept: DepartmentData;
  index: number;
  onOpen: (slug: DepartmentSlug) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 170, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 170, damping: 22 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBackground = useTransform([glowX, glowY], ([x, y]) =>
    `radial-gradient(circle at ${x} ${y}, rgba(224,172,83,0.35), transparent 55%)`
  );
  // The shadow leans away from the tilt direction, as if the panel were
  // physically lifting off the wall toward the pointer.
  const shadowX = useSpring(useTransform(mx, [0, 1], [10, -10]), { stiffness: 170, damping: 24 });
  const shadowY = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 170, damping: 24 });
  const dynamicShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `0 1px 0 rgba(74,53,36,0.25), ${sx}px ${sy}px 60px -20px rgba(0,0,0,0.55), ${Number(sx) / 2}px ${Number(sy) / 2}px 20px -8px rgba(0,0,0,0.4)`
  );

  function handleMove(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <ScrollReveal delay={index * 0.12} y={44}>
      <motion.button
        ref={ref}
        onClick={() => onOpen(slug)}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`group relative block w-full text-left [perspective:1200px] focus-ring ${
          index % 2 === 1 ? "sm:mt-10" : ""
        }`}
      >
        <motion.div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-sm"
          style={{ rotateX, rotateY, boxShadow: dynamicShadow, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <motion.div layoutId={`dept-photo-${slug}`} className="absolute inset-0">
            <Image
              src={dept.heroImage}
              alt={dept.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1023px) 45vw, 22vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </motion.div>

          {/* base vignette for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

          {/* mouse-follow warm glow, museum-spotlight feel */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glowBackground }}
          />

          {/* glass frame edge */}
          <div className="pointer-events-none absolute inset-0 rounded-sm border border-[var(--color-gold)]/0 transition-colors duration-500 group-hover:border-[var(--color-gold-bright)]/50" />

          <div
            className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6"
            style={{ transform: "translateZ(30px)" }}
          >
            <p className="ink-label text-[10px] text-[var(--color-gold-pale)]/70">
              Exhibit {String(index + 1).padStart(2, "0")}
            </p>
            <h3
              className="text-4xl text-[var(--color-gold-pale)] sm:text-[2.75rem]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {dept.code}
            </h3>
            {dept.fullName && (
              <p className="text-xs leading-relaxed text-[var(--color-gold-pale)]/75">{dept.fullName}</p>
            )}
            <p className="ink-label mt-2 translate-y-0 text-[10px] text-[var(--color-gold-bright)] opacity-70 transition-all duration-400 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              Enter archive →
            </p>
          </div>
        </motion.div>
      </motion.button>
    </ScrollReveal>
  );
}

export default function ArchiveDirectory({ generation, departments, onOpen }: ArchiveDirectoryProps) {
  return (
    <section id="archive" className="leather-texture relative overflow-hidden px-6 py-20 sm:px-16 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[70vw] -translate-x-1/2 opacity-50"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(224,172,83,0.15), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <ScrollReveal>
          <p className="ink-label text-xs text-[var(--color-gold-pale)]/70">{generation.archive.eyebrow}</p>
          <h2
            className="mt-3 whitespace-pre-line text-4xl text-[var(--color-gold-pale)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {generation.archive.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-gold-pale)]/70">
            {generation.archive.body}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {order.map((slug, i) => (
            <ExhibitPanel key={slug} slug={slug} dept={departments[slug]} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
