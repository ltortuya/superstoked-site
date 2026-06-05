import { ReactNode } from "react";

// A branded placeholder for image slots. Replace with <Image> or <img> when real
// photography arrives — see public/images/PLACEHOLDERS.md for the list of slots.
export function ImagePlaceholder({
  label,
  aspect = "4/3",
  tone = "ocean",
  className = "",
  children,
}: {
  label: string;
  aspect?: "4/3" | "16/9" | "1/1" | "3/4" | "3/2";
  tone?: "ocean" | "sand" | "sunset";
  className?: string;
  children?: ReactNode;
}) {
  const toneStyle =
    tone === "sand"
      ? "bg-gradient-to-br from-sand-dark to-sand"
      : tone === "sunset"
      ? "bg-gradient-to-br from-sunset to-sunset-dark"
      : "bg-gradient-to-br from-ocean-mid to-ocean-deep";
  const aspectStyle = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
    "3/2": "aspect-[3/2]",
  }[aspect];
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-2xl ${aspectStyle} ${toneStyle} ${className}`}
    >
      {/* Subtle texture: concentric dots + ocean ripples */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-25"
      >
        <defs>
          <pattern id="ripples" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 Q15 20 30 30 T60 30" stroke="white" strokeWidth="1" fill="none" />
            <path d="M0 45 Q15 35 30 45 T60 45" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#ripples)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div className="text-foam/90">
          {children ?? (
            <>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                Image Placeholder
              </div>
              <div className="text-sm text-foam/70 max-w-[260px] mx-auto leading-snug">
                {label}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
