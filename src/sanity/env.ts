// The SSF Sanity project ID and dataset are public and permanent (the projectId
// already ships in the public Studio config and client bundles), so they are
// hardcoded here. This intentionally ignores NEXT_PUBLIC_SANITY_* env vars for
// project/dataset so a dashboard typo (e.g. "3s51u1k9" vs "3s51ulk9") can't
// break content. apiVersion stays overridable via env for flexibility.
export const projectId = "3s51ulk9";
export const dataset = "production";

export const apiVersion = (
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"
).trim();

// `useCdn` false because we mostly use ISR for caching; Sanity's CDN adds a
// second layer we don't need and can delay fresh content.
export const useCdn = false;

// Sanity is always configured now (hardcoded project). sanityFetch still catches
// any runtime error and falls back to empty content, so a Sanity outage or a bad
// query can never crash a build or page render.
export const sanityEnabled = true;
