import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignClasses =
    align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? "text-foam" : "text-ocean-deep";
  const leadColor = tone === "light" ? "text-foam/80" : "text-ink-soft";
  const eyebrowColor = tone === "light" ? "text-ocean-light" : "text-ocean-mid";

  return (
    <div className={`${alignClasses} max-w-3xl`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lg sm:text-xl leading-relaxed ${leadColor}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
