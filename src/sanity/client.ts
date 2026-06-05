import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId, useCdn, sanityEnabled } from "./env";

// A safe no-op client for local/preview builds that don't have a Sanity
// project wired up yet. Returns a client configured with dummy values so
// typed imports still work; any actual fetch will be short-circuited by
// `sanityEnabled` checks upstream.
export const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn, perspective: "published" })
  : createClient({
      projectId: "placeholder",
      dataset: "placeholder",
      apiVersion,
      useCdn: false,
    });

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "placeholder",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Wraps fetch with ISR revalidation tag + time. Call from server components.
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tag?: string): Promise<T> {
  if (!sanityEnabled) {
    return [] as unknown as T;
  }
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: 60,
        tags: tag ? [tag] : undefined,
      },
    });
  } catch (err) {
    // Never let a Sanity error (wrong project/dataset, network, 404) crash the
    // build or a page render — log and fall back to empty content.
    console.warn(
      `[sanityFetch] query failed, returning empty:`,
      err instanceof Error ? err.message : err,
    );
    return [] as unknown as T;
  }
}
