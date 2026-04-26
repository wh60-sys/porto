export interface Student {
  name: string;
  nim: string;
  program: string;
  programLink: string;
  cohort: string;
  bio: string;
  email: string;
  whatsapp: string;
  photoUrl: string;
  socials: SocialLink[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  hint?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export type SkillCategory = "Technical" | "Soft Skills" | "Tools";

export type GalleryCategory = "Proyek" | "Sertifikat" | "Kegiatan";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  imageUrl: string;
  tags: string[];
  span?: 1 | 2 | 3; // height span hint
}

export interface ProgramStudi {
  name: string;
  url: string;
  icon?: string;
  tagline?: string;
  gelar?: string;
  durasi?: string;
  jenjang?: string;
  syaratUrl?: string;
  biayaUrl?: string;
  accent?: "blue" | "gold";
}

export interface AboutMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
}

export interface UnsiaCard {
  title: string;
  description: string;
  url: string;
  icon: string;
  accent?: "blue" | "gold";
}

export interface TimelineEvent {
  semester: string;
  date: string;
  title: string;
  description: string;
  achievement?: string;
  icon: string;
}

export interface RadarData {
  label: string;
  value: number;
}

export interface Track {
  title: string;
  src: string;
}

export interface Referral {
  code: string;
  registerUrl: string;
  benefitUrl: string;
  ownerName: string;
  ownerProgram: string;
  perks: string[];
}
