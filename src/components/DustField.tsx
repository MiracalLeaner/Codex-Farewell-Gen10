"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DustFieldProps {
  count?: number;
  className?: string;
  /** Opt-in: lets this dust layer drift a hair slower than the page as it
   * scrolls past, so it reads as sitting slightly behind the content —
   * an almost-invisible depth cue. Only meaningful inside normal document
   * scroll flow (skip it for dust inside fixed/overlay scenes). */
  parallax?: boolean;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: string;
  delay: string;
  opacity: string;
  driftX: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.round(Math.random() * 100),
    top: Math.round(Math.random() * 100),
    size: Math.round(1 + Math.random() * 3),
    duration: (8 + Math.random() * 10).toFixed(1),
    delay: (Math.random() * 10).toFixed(1),
    opacity: (0.2 + Math.random() * 0.5).toFixed(2),
    driftX: Math.round(-30 + Math.random() * 60),
  }));
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

// Reads the live viewport width without ever disagreeing with the
// server-rendered markup: React uses getServerSnapshot for both the server
// render and the client's first hydration pass, then switches to the real
// getSnapshot afterwards — the sanctioned way to read window-derived state.
function useIsNarrowViewport() {
  return useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth < 640,
    () => false
  );
}

export default function DustField({ count = 18, className = "", parallax = false }: DustFieldProps) {
  // Lazy initializer runs exactly once on mount and must render identically
  // on the server and on the client's first pass — so it never reads
  // window here (that would produce a different particle count per
  // environment and trigger a hydration mismatch).
  const [particles] = useState<Particle[]>(() => generateParticles(count));
  const isNarrow = useIsNarrowViewport();
  const visibleCount = isNarrow ? Math.ceil(count * 0.55) : count;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // A few px of counter-drift — sits just behind the content as it passes.
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-3%", "3%"] : ["0%", "0%"]);

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={parallax ? { y } : undefined}
      aria-hidden="true"
    >
      {particles.slice(0, visibleCount).map((p) => (
        <span
          key={p.id}
          className="dust-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--dust-duration": `${p.duration}s`,
              "--dust-delay": `${p.delay}s`,
              "--dust-opacity": p.opacity,
              "--dust-x": `${p.driftX}px`,
              "--dust-y": `-160px`,
            } as React.CSSProperties
          }
        />
      ))}
    </motion.div>
  );
}
