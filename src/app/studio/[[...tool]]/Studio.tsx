"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Sanity Studio is a React SPA — must render client-side only.
// The server component in page.tsx exports the metadata; this file is the
// actual client-rendered Studio.
export function Studio() {
  return <NextStudio config={config} />;
}
