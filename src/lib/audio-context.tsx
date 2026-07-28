"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

interface AudioContextValue {
  muted: boolean;
  hasStarted: boolean;
  start: () => void;
  toggleMute: () => void;
}

const Ctx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Called once, from a user gesture (the "Open the Chronicle" click), so the
  // browser's autoplay policy allows playback. The element is never paused
  // or restarted again afterwards — only muted/unmuted — so the music plays
  // continuously across the whole experience.
  const start = useCallback(() => {
    const el = audioRef.current;
    if (!el || hasStarted) return;
    el.volume = 0.25;
    el.play().catch(() => {
      // Autoplay can still be blocked in rare cases; the toggle lets the
      // visitor start it manually.
    });
    setHasStarted(true);
  }, [hasStarted]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ muted, hasStarted, start, toggleMute }}>
      {children}
      <audio ref={audioRef} src="/audio/bgm.mp3" loop preload="auto" />
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
