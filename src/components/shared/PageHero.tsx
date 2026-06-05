import { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden ocean-gradient text-foam -mt-16 sm:-mt-20 pt-16 sm:pt-20">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full opacity-30"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
      >
        <path d="M0 90 Q 360 50 720 90 T 1440 90 L 1440 140 L 0 140 Z" fill="rgba(191,215,234,0.4)" />
      </svg>
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-light">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foam max-w-3xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-foam/80 max-w-2xl">
            {lead}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
