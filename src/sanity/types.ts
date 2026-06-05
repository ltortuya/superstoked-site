import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  _key?: string;
  _type?: "image";
  asset?: { _ref: string; _type: "reference" } | { _id: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt: string;
  caption?: string;
};

export type EventProgram =
  | "libraries"
  | "youth-surf"
  | "mentorship"
  | "community"
  | "equipment"
  | "other";

export type Event = {
  _id: string;
  title: string;
  slug: string;
  date: string; // ISO date
  ongoing?: boolean;
  location?: string;
  program?: EventProgram;
  summary?: string;
  featured?: boolean;
  cover: SanityImage;
  gallery?: SanityImage[];
  body?: PortableTextBlock[];
};

export const PROGRAM_LABELS: Record<EventProgram, string> = {
  libraries: "Libraries & Education",
  "youth-surf": "Youth Surf Programs",
  mentorship: "Mentorship",
  community: "Community Outreach",
  equipment: "Equipment Donations",
  other: "Other",
};

export type WhatWeDoItem = { title: string; body?: string; icon?: string };

export type FeaturedProjectContent = {
  badge?: string;
  title?: string;
  lead?: string;
  body?: string;
  image?: SanityImage;
  imageAlt?: string;
  progressLabel?: string;
  progressRaised?: number;
  progressGoal?: number;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type HomePageContent = {
  heroHeadline?: string;
  heroSubhead?: string;
  missionEyebrow?: string;
  missionHeading?: string;
  missionBody?: string;
  whatWeDoItems?: WhatWeDoItem[];
  featuredProject?: FeaturedProjectContent;
  finalCtaHeadline?: string;
  finalCtaBody?: string;
};

export type Partner = { name: string; location?: string; description?: string };
export type Testimonial = { quote: string; attribution: string; role?: string };
