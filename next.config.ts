import type { NextConfig } from "next";

// Site is deployed to Vercel so we run a real Next.js server (no static export).
// This enables: embedded Sanity Studio at /studio, ISR for ~60s content
// freshness without manual rebuilds, and next/image optimization.
// If you ever need to export to static hosting, re-add `output: 'export'` and
// remove the `/studio` route (Studio needs a server runtime).
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
