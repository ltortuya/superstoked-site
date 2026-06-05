export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  "Missing NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
);

// `useCdn` false because we mostly use ISR for caching; Sanity's CDN adds a
// second layer we don't need and can delay fresh content.
export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

// Feature flag: when true, Sanity-backed UI falls back gracefully (empty
// lists, placeholder markers). Lets the site build and render cleanly
// before Sanity is set up.
export const sanityEnabled = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== ""
);
