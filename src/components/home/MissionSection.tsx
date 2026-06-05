import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function MissionSection({ mission }: { mission: { headline?: string; body?: string[] } | undefined }) {
  if (!mission?.headline) return null;
  return (
    <section className="py-20 sm:py-28 bg-foam">
      <Container>
        <RevealOnScroll>
          <SectionHeading eyebrow="Our Mission" title={mission.headline} />
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {(mission.body ?? []).map((p, i) => (
            <RevealOnScroll key={i} delay={i * 120}>
              <p className="text-lg leading-relaxed text-ink-soft">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={260}>
          <div className="mt-12 text-center">
            <Link
              href="/about/"
              className="inline-flex items-center gap-2 text-ocean-mid font-semibold hover:text-ocean-deep transition-colors"
            >
              Read our full story <ArrowRight size={16} />
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
