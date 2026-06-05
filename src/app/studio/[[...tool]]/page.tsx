import type { Metadata } from "next";
import { Studio } from "./Studio";

/**
 * Embedded Sanity Studio at /studio.
 *
 * Studio itself is configured in /sanity.config.ts at the project root.
 * Team members visit /studio on the live site, sign in with Google / magic
 * link, and manage content from there.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Superstoked Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
