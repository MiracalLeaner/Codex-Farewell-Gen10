"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import generationData from "../../content/generation.json";
import ferData from "../../content/departments/fer.json";
import hreData from "../../content/departments/hre.json";
import mediaData from "../../content/departments/media.json";
import rndData from "../../content/departments/rnd.json";
import type { DepartmentData, DepartmentSlug, GenerationData } from "@/lib/types";
import { AudioProvider, useAudio } from "@/lib/audio-context";
import BookGate from "@/components/BookGate";
import SoundToggle from "@/components/SoundToggle";
import BookmarkRibbon from "@/components/BookmarkRibbon";
import TitlePage from "@/components/TitlePage";
import Prologue from "@/components/Prologue";
import Milestones from "@/components/Milestones";
import PolaroidGallery from "@/components/PolaroidGallery";
import Chapter1 from "@/components/Chapter1";
import ArchiveDirectory from "@/components/ArchiveDirectory";
import DepartmentView from "@/components/DepartmentView";
import Ending from "@/components/Ending";

const generation = generationData as GenerationData;

const departments: Record<DepartmentSlug, DepartmentData> = {
  fer: ferData as DepartmentData,
  hre: hreData as DepartmentData,
  media: mediaData as DepartmentData,
  rnd: rndData as DepartmentData,
};

function Experience() {
  const [opened, setOpened] = useState(false);
  const [activeDept, setActiveDept] = useState<DepartmentSlug | null>(null);
  const { start } = useAudio();

  const openDepartment = useCallback((slug: DepartmentSlug) => {
    setActiveDept(slug);
  }, []);

  const closeDepartment = useCallback(() => {
    setActiveDept(null);
  }, []);

  return (
    <main className="relative">
      <BookGate onStart={start} onOpened={() => setOpened(true)} />

      <LayoutGroup>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <SoundToggle />
              <BookmarkRibbon />
              <TitlePage generation={generation} />
              <Prologue generation={generation} />
              <Milestones items={generation.milestones} />
              <PolaroidGallery
                eyebrow="Group Memories"
                title="Faces we won't forget"
                items={generation.groupGallery}
                dark
              />
              <Chapter1 generation={generation} />
              <ArchiveDirectory generation={generation} departments={departments} onOpen={openDepartment} />
              <Ending generation={generation} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeDept && (
            <DepartmentView slug={activeDept} department={departments[activeDept]} onClose={closeDepartment} />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </main>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <Experience />
    </AudioProvider>
  );
}
