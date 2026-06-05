import type { Metadata } from "next";
import { BookOpen, Waves, Users, Handshake, Package, Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Button } from "@/components/shared/Button";
import { programs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Superstoked Foundation's programs — libraries, youth surf instruction, mentorship, community outreach, and equipment donations.",
};

const iconMap = {
  book: BookOpen,
  waves: Waves,
  users: Users,
  handshake: Handshake,
  package: Package,
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Five ways we invest in coastal youth and communities"
        lead="Every program below is run in partnership with a local surf club or school. We supply the resources and the support; they bring the teaching, the trust, and the continuity."
      />

      <div className="py-16 sm:py-20 bg-foam">
        <Container>
          {programs.map((program, idx) => {
            const Icon = iconMap[program.icon as keyof typeof iconMap];
            const reversed = idx % 2 === 1;
            return (
              <section
                key={program.id}
                id={program.id}
                className="py-12 sm:py-16 border-b border-ink/5 last:border-0 scroll-mt-24"
              >
                <div
                  className={`grid gap-10 lg:gap-16 lg:grid-cols-2 items-center ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <RevealOnScroll>
                    <ImagePlaceholder
                      label={`REPLACE: Photo for ${program.title} — e.g. a representative scene from this program in action.`}
                      aspect="4/3"
                      tone={idx % 3 === 0 ? "ocean" : idx % 3 === 1 ? "sand" : "sunset"}
                    />
                  </RevealOnScroll>
                  <RevealOnScroll delay={120}>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep">
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ocean-mid">
                          Program {idx + 1} of {programs.length}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight leading-[1.1] text-ocean-deep">
                        {program.title}
                      </h2>
                      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{program.body}</p>
                      <ul className="mt-6 space-y-3">
                        {program.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-ink-soft">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-mid/15 text-ocean-mid">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealOnScroll>
                </div>
              </section>
            );
          })}
        </Container>
      </div>

      <section className="py-20 sm:py-28 bg-sand">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Support a Program"
              title="Every program runs because someone stepped up"
              lead="Whether it's $25 for school supplies or a monthly gift that keeps a surf program on the water, your support is the reason this work keeps going."
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/donate/" variant="primary" size="lg">
                Donate to Programs
              </Button>
              <Button href="/get-involved/" variant="ghost" size="lg">
                Volunteer with us
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
