"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DustField from "./DustField";

interface BookGateProps {
  onOpened: () => void;
  onStart: () => void;
}

type Stage = "idle" | "breaking" | "opening" | "entering" | "done";

export default function BookGate({ onOpened, onStart }: BookGateProps) {
  const [stage, setStage] = useState<Stage>("idle");

  function handleOpen() {
    if (stage !== "idle") return;
    onStart();
    setStage("breaking");
    window.setTimeout(() => setStage("opening"), 900);
    window.setTimeout(() => setStage("entering"), 2500);
    window.setTimeout(() => {
      setStage("done");
      onOpened();
    }, 3400);
  }

  const entering = stage === "entering";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center wood-texture"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* cinematic vignette — darkens the edges so the eye is pulled to the centered book */}
          <div className="codex-vignette pointer-events-none absolute inset-0" />

          <DustField count={34} />

          {/* light beam from above — widened and intensified for a stronger spotlight */}
          <motion.div
            className="light-beam pointer-events-none absolute left-1/2 top-0 h-[76vh] w-[46vw] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgba(224,172,83,0.48) 0%, rgba(224,172,83,0.14) 55%, transparent 100%)",
              clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
            }}
            animate={entering ? { opacity: [1, 0.4] } : {}}
          />

          {/* tight warm spotlight pool directly on the book for extra cinematic focus */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, rgba(224,172,83,0.16) 0%, transparent 65%)",
            }}
          />

          {/* the whole scene pushes forward into the archive on "entering" */}
          <motion.div
            className="relative flex flex-col items-center gap-10 px-6 text-center"
            animate={
              entering
                ? { scale: 2.4, opacity: 0, filter: "blur(6px)" }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <p className="ink-label text-xs text-[var(--color-gold-pale)]/70">
              LSC FTU HCMC · Archive of Generations
            </p>

            {/* the book */}
            <div className="relative flex items-center justify-center">
              {/* archival props — old papers, a fountain pen, a stray wax drip. Purely
                  decorative and out of the click flow; the book itself stays centered
                  regardless since these are absolutely positioned around it. */}
              <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
                <div className="page-shadow paper-texture absolute -left-20 top-4 h-32 w-24 -rotate-[11deg] rounded-sm opacity-80" />
                <div className="page-shadow paper-texture absolute -right-24 bottom-0 h-28 w-36 rotate-[7deg] rounded-sm opacity-70" />
                <svg
                  className="absolute -left-14 bottom-[-22px] h-8 w-44 -rotate-[5deg] opacity-80"
                  viewBox="0 0 180 32"
                  fill="none"
                >
                  <line x1="4" y1="28" x2="160" y2="6" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M160 6 L176 2 L166 14 Z" fill="var(--color-gold-bright)" />
                </svg>
                <div
                  className="absolute -right-10 -top-8 h-7 w-7 rounded-full opacity-90"
                  style={{
                    background: "radial-gradient(circle at 35% 30%, #8a2c22, #5c1712 70%)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              <div className="relative aspect-[195/143] w-[min(84vw,390px)] [perspective:1400px] sm:aspect-auto sm:h-[340px] sm:w-[468px]">
                {/* desk shadow — deepened */}
                <div className="absolute -bottom-5 left-1/2 h-6 w-[82%] -translate-x-1/2 rounded-full bg-black/65 blur-2xl sm:-bottom-7 sm:h-8" />

                {/* ambient glow that grows as the seal breaks, hinting at what's inside */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-sm"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(224,172,83,0.6), transparent 70%)",
                  }}
                  animate={{ opacity: stage === "idle" ? 0 : 0.9 }}
                  transition={{ duration: 1.2 }}
                />

                {/* book base (right page / spine block) */}
                <div className="page-shadow paper-texture absolute inset-0 rounded-sm" />

              {/* wax seal */}
              <AnimatePresence>
                {stage === "idle" && (
                  <motion.button
                    aria-label="Open the Chronicle"
                    onClick={handleOpen}
                    className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-20 sm:w-20"
                    style={{
                      background: "radial-gradient(circle at 35% 30%, #8a2c22, #5c1712 70%)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.55), inset 0 2px 4px rgba(255,255,255,0.15)",
                    }}
                    exit={{
                      scale: [1, 1.08, 0.3],
                      rotate: [0, -6, 24],
                      opacity: [1, 1, 0],
                      transition: { duration: 0.8, times: [0, 0.3, 1] },
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span
                      className="ink-label text-[9px] text-[var(--color-gold-pale)]/90 sm:text-[10px]"
                      style={{ letterSpacing: "0.14em" }}
                    >
                      LSC
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* left cover swinging open */}
              <motion.div
                className="page-shadow codex-cover-texture absolute inset-y-0 left-0 w-1/2 origin-left rounded-l-sm"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={
                  stage === "opening" || entering
                    ? { rotateY: -150, transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] } }
                    : { rotateY: 0 }
                }
              >
                <div className="absolute inset-3 rounded-sm border border-[var(--color-gold)]/30" />
                <div className="absolute inset-6 flex items-center justify-center">
                  <span
                    className="text-center text-xl text-[var(--color-gold-pale)]/80 sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    CodeX
                  </span>
                </div>
              </motion.div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <AnimatePresence mode="wait">
                {stage === "idle" && (
                  <motion.button
                    key="cta"
                    onClick={handleOpen}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.6 }}
                    className="ink-label rounded-full border border-[var(--color-gold)]/50 px-6 py-3 text-[11px] text-[var(--color-gold-pale)] transition-colors hover:border-[var(--color-gold-bright)] hover:bg-[var(--color-gold)]/10"
                  >
                    Open the Chronicle
                  </motion.button>
                )}
                {stage === "breaking" && (
                  <motion.p
                    key="breaking-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    className="ink-label text-[11px] text-[var(--color-gold-pale)]/70"
                  >
                    Breaking the seal…
                  </motion.p>
                )}
                {stage === "opening" && (
                  <motion.p
                    key="opening-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    className="ink-label text-[11px] text-[var(--color-gold-pale)]/70"
                  >
                    The pages are turning…
                  </motion.p>
                )}
                {entering && (
                  <motion.p
                    key="entering-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="ink-label text-[11px] text-[var(--color-gold-pale)]/70"
                  >
                    Stepping into the archive…
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* bloom flash that carries the eye from the book into the archive */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle, rgba(224,172,83,0.9), transparent 60%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: entering ? [0, 0.55, 0] : 0 }}
            transition={{ duration: 0.9, times: [0, 0.55, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
