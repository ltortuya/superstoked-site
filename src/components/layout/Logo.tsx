import Link from "next/link";

// Wordmark-style logo. Replace with an SVG/image when real branding exists.
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-foam" : "text-ocean-deep";
  const accent = tone === "light" ? "text-ocean-light" : "text-ocean-mid";
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group`} aria-label="Superstoked Foundation — home">
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep shadow-sm transition-transform group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7 0" />
          <path d="M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7 0" />
        </svg>
      </span>
      <span className={`font-display text-lg leading-none tracking-tight ${color}`}>
        Superstoked<span className={accent}>.</span>
      </span>
    </Link>
  );
}
