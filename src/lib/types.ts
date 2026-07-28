export interface MilestoneEntry {
  year: string;
  label: string;
}

export interface GalleryEntry {
  image: string;
  caption: string;
}

export interface GenerationData {
  title: string;
  subtitle: string;
  club: string;
  years: string;
  departments: string;
  openingLine: string;
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  milestones: MilestoneEntry[];
  chapter1: {
    label: string;
    year: string;
    title: string;
    image: string;
    body: string;
  };
  groupGallery: GalleryEntry[];
  archive: {
    eyebrow: string;
    title: string;
    body: string;
  };
  ending: {
    line1: string;
    line2: string;
  };
}

export interface DepartmentLetter {
  heading: string;
  paragraphs: string[];
}

export interface DepartmentData {
  code: string;
  name: string;
  fullName: string;
  tagline: string;
  story: string;
  heroImage: string;
  members: string[];
  gallery: GalleryEntry[];
  memberLetters: Record<string, string[]>;
  departmentLetter: DepartmentLetter;
}

export type DepartmentSlug = "fer" | "hre" | "media" | "rnd";
