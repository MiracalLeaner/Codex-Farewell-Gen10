"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function BookmarkRibbon() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[55] h-screen w-1.5 sm:w-2">
      <div className="absolute inset-0 bg-[var(--color-ink)]/10" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(180deg, #8a2c22, #6b1f18)",
            boxShadow: "-2px 0 6px rgba(0,0,0,0.35)",
          }}
        />
      </motion.div>
    </div>
  );
}
