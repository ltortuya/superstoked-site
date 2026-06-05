import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { Stat } from "@/components/shared/Stat";
import { Card } from "@/components/shared/Card";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Button } from "@/components/shared/Button";
import { ImpactGallery } from "@/components/events/ImpactGallery";
import { sanityFetch } from "@/sanity/client";
import { recentEventsQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";
import { impactStats, beforeAfter, stewardship } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "See the impact of Superstoked Foundation — youth served, books donated, communities reached, and the stewardship principles behind every dollar raised.",
};

export const revalidate = 60;

export default async function ImpactPage() {
  const events = await sanityFetch<Event[]>(recentEventsQuery, { limit: 6 }, "events");
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Numbers tell part of the story. Communities tell the rest."
        lead="Here's the plain accounting of what your support has helped make possible — and a few honest pictures of what's changed."
      />

      {/* Metrics */}
      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="By the Numbers"
              title="Where we are today"
              lead="These numbers update as we go. We'd rather under-count than overstate — every metric here comes from program records we can verify."
            />
          </RevealOnScroll>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s, i) => (
              <RevealOnScroll key={s.label} delay={i * 100}>
                <Stat value={s.value} label={s.label} suffix={s.suffix} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Before/After */}
      <section className="py-20 sm:py-28 bg-sand">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Before & After"
              title="What actually changed"
              lead="Not every story we tell involves big numbers. Sometimes the most meaningful impact is a quiet shift — a room that used to be empty, a kid who now shows up early."
            />
          </RevealOnScroll>
          <div className="mt-14 space-y-12">
            {beforeAfter.map((story, i) => (
              <RevealOnScroll key={i} delay={i * 120}>
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
                  <ImagePlaceholder label={story.imageAlt} aspect="4/3" tone="ocean" />
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-ocean-deep">
                      {story.title}
                    </h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Card tone="foam">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-2">
                          Before
                        </p>
                        <p className="text-[0.95rem] leading-relaxed text-ink-soft">{story.before}</p>
                      </Card>
                      <Card tone="ocean">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ocean-light mb-2">
                          After
                        </p>
                        <p className="text-[0.95rem] leading-relaxed text-foam/90">{story.after}</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Financial stewardship */}
      <section className="py-20 sm:py-28 bg-ocean-deep text-foam">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Financial Stewardship"
              title="Transparent about the money"
              tone="light"
              lead="We know trust is earned, not claimed. Here's how we manage what you give us."
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="mt-10 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-foam/85 text-center">
              {stewardship.pledge}
            </p>
          </RevealOnScroll>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {stewardship.principles.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 100}>
                <div className="h-full rounded-2xl bg-foam/5 border border-foam/10 p-6">
                  <h3 className="font-display text-xl tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-foam/75 leading-relaxed">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Button
                href="/contact/"
                variant="secondary"
                className="bg-foam/10 border-foam/30 text-foam hover:bg-foam/20"
              >
                Request our annual report
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Gallery — pulls latest event photos from Sanity, falls back to
          branded placeholders until the team adds events. */}
      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Moments"
              title="From the communities we serve"
              lead={
                events.length > 0
                  ? "Recent photos pulled directly from our event archive."
                  : "A small gallery of moments from programs, trips, and partnerships. Your team can add real photos from the Studio."
              }
            />
          </RevealOnScroll>
          <ImpactGallery events={events} />
        </Container>
      </section>
    </>
  );
}
