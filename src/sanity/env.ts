// Env values are trimmed so a stray space/newline from a dashboard paste can't
// break anything. A projectId that isn't a valid Sanity ID (lowercase a-z, 0-9,
// dashes) is treated as "not configured" rather than crashing the build.
export const apiVersion = (
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"
).trim();

export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();

const rawProjectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
export const projectId = /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : "";

// `useCdn` false because we mostly use ISR for caching; Sanity's CDN adds a
// second layer we don't need and can delay fresh content.
export const useCdn = false;

// Feature flag: when false, Sanity-backed UI falls back gracefully (empty lists,
// placeholder markers) so the site builds and renders even before Sanity is
// correctly configured.
export const sanityEnabled = Boolean(projectId);
