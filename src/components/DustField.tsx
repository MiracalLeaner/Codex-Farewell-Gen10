"use client";

import { useState } from "react";

interface DustFieldProps {
  count?: number;
  className?: string;
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

export default function DustField({ count = 18, className = "" }: DustFieldProps) {
  // Lazy initializer runs exactly once on mount (never re-invoked on
  // re-render), which is the React-recommended place for one-time
  // non-deterministic setup like random particle positions.
  const [particles] = useState<Particle[]>(() => generateParticles(count));

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
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
    </div>
  );
}
