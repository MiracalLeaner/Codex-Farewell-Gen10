# CODEX — The Chronicle of Logistics Studying Club

A cinematic, personalized farewell chronicle for LSC members. Built with Next.js 15, React 19, TailwindCSS, and Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Click "Open the Chronicle" to break the seal and begin.

## Personalize it (no code changes needed)

Everything user-facing lives in `content/person.json`:

- `name`, `department`, `generation`, `years` — title page details
- `firstInk` — the opening chapter (Scene 4)
- `timeline` — the margin timeline next to Scene 4
- `projects` — the paper-clipped project cards (Scene 5)
- `gallery` — the polaroid photo grid (Scene 6)
- `people` — teammates on the thread board (Scene 7)
- `legacy` — achievements and values (Scene 8)
- `letter` — the handwritten farewell letter (Scene 9)
- `ending` — the two closing lines (Scene 10)

To make a new person's chronicle, duplicate `content/person.json` per member, or wire it to a query param / route if you want one deployed site to serve many members.

## Images

Image slots are currently placeholders (`[ image ]` boxes) so the project runs with zero external assets. Drop real photos into `public/images/` matching the paths already referenced in `person.json` (e.g. `/images/first-ink.jpg`, `/images/gallery-1.jpg`), then swap each placeholder `<div>` for a Next.js `<Image>` component in the matching component file (`FirstInk.tsx`, `Journey.tsx`, `Gallery.tsx`, `PeopleBoard.tsx`).

## Sound

`SoundToggle.tsx` currently only toggles a muted/unmuted icon state. To wire real ambient music and page-turn sounds:

1. Add `.mp3` files to `public/audio/` (e.g. `ambient.mp3`, `page-turn.mp3`, `paper.mp3`).
2. In `SoundToggle.tsx`, create an `<audio>` element (or a small `useRef<HTMLAudioElement>`), play/pause it on toggle, and respect the user's mute choice.
3. Trigger the page-turn sound inside `BookGate.tsx` (`handleOpen`) and section-change moments if desired.

## Structure

```
content/person.json       — single source of truth for all copy/data
src/components/           — BookGate, TitlePage, FirstInk, Journey, Gallery,
                             PeopleBoard, Legacy, Letter, Ending, SoundToggle,
                             BookmarkRibbon, DustField, ScrollReveal
src/lib/types.ts           — PersonData TypeScript types
src/app/globals.css        — design tokens (paper/wood/gold/navy), textures, motion
```

## Notes

- No external font or image requests are made — all texture/paper-grain/dust effects are generated in CSS/SVG so the site works offline and in constrained network environments. Swap in real fonts (e.g. via `next/font/google`) and photos when you have network access / final assets.
- Respects `prefers-reduced-motion`.
- The right-edge ribbon shows reading progress like a bookmark moving down the book.
