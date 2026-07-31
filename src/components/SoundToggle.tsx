"use client";

import { useAudio } from "@/lib/audio-context";

export default function SoundToggle() {
  const { muted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute background music" : "Mute background music"}
      aria-pressed={!muted}
      className="touch-feedback fixed right-[calc(1rem+var(--safe-r))] top-[calc(1rem+var(--safe-t))] z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-wood)]/70 text-[var(--color-gold-pale)] backdrop-blur transition-colors hover:border-[var(--color-gold-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold-bright)] sm:right-[calc(1.5rem+var(--safe-r))] sm:top-[calc(1.5rem+var(--safe-t))] sm:h-10 sm:w-10"
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <line x1="16" y1="9" x2="21" y2="15" />
          <line x1="21" y1="9" x2="16" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      )}
    </button>
  );
}
