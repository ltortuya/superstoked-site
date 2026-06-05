import type { Metadata } from "next";
import { Compass, Heart, Users, Waves } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Card } from "@/components/shared/Card";
import { PageHero } from "@/components/shared/PageHero";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Button } from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the origin story of Superstoked Foundation — how a small group of surfers, teachers, and volunteers started building bridges between California and Palawan.",
};

const principles = [
  {
    icon: Heart,
    title: "Human first, programs second",
    body: "Every dollar, board, and book we move is a proxy for a relationship. Relationships come first. Always.",
  },
  {
    icon: Users,
    title: "Local leadership always",
    body: "If it doesn't come from the community, it doesn't come from us. We fund, we coordinate, we listen.",
  },
  {
    icon: Compass,
    title: "Patient over splashy",
    body: "The work that lasts is quiet, slow, and rarely photogenic. We're okay with that.",
  },
  {
    icon: Waves,
    title: "The ocean teaches",
    body: "Courage. Humility. Reading conditions. Showing up. We build programs that let kids learn all of that on a board.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A grassroots foundation built around one question: what do you actually need?"
        lead="Superstoked Foundation started between two coastlines, two languages, and one shared belief — that when a kid meets the ocean on their own terms, something changes."
      />

      {/* Origin story */}
      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <RevealOnScroll>
              <ImagePlaceholder
                label="REPLACE: Early photo of founders, volunteers, or first surf lesson in Palawan."
                aspect="4/3"
                tone="sand"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Origin Story"
                  title="How it started"
                />
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                  <p>
                    Superstoked Foundation was born in the in-between — between a group of
                    California surfers who wanted to give back, and a coastal village in Palawan
                    where kids were growing up with empty library shelves and borrowed boards.
                  </p>
                  <p>
                    What started as one trip, a few donated surfboards, and a promise to return
                    became something we couldn't walk away from. Teachers pulled us aside and asked
                    for books. Parents asked if their kids could learn to swim safely. Local
                    surf clubs asked for partners, not saviors. So we listened.
                  </p>
                  <p>
                    Today we're a registered 501(c)(3) nonprofit run largely by volunteers, working
                    with partners in the Philippines and California to build programs that
                    communities actually asked for.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Why it matters */}
      <section className="py-20 sm:py-28 bg-sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <RevealOnScroll>
              <SectionHeading
                align="left"
                eyebrow="Why We Started"
                title="Because coastal kids deserve more than good intentions."
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  In every coastal community we've worked in, we've heard the same story: nonprofits
                  show up with a plan, run a program for a weekend, take photos, and leave.
                </p>
                <p>
                  We started Superstoked because we thought the model needed to flip. Local leaders
                  know their kids, their conditions, and their culture. Our job is to hand them
                  resources and then get out of the way.
                </p>
                <p>
                  We're small. We move slowly. We don't always have the prettiest website or the
                  loudest campaigns. But the libraries we help build stay stocked, the surf programs
                  we support still run after we've gone home, and the partnerships we invest in last.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120} className="lg:order-first">
              <ImagePlaceholder
                label="REPLACE: Portrait-style photo of youth or community gathering, tall crop."
                aspect="3/4"
                tone="ocean"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="What We Stand For"
              title="Four principles that shape everything we do"
              lead="These aren't corporate values — they're the guardrails we've learned to trust after years of trying (and sometimes failing) to do this work well."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 100}>
                <Card className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep mb-5">
                    <p.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-ocean-deep">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-20 sm:py-28 bg-ocean-deep text-foam">
        <Container>
          <div className="max-w-3xl">
            <RevealOnScroll>
              <SectionHeading
                align="left"
                eyebrow="Looking Ahead"
                title="Where we're going next"
                tone="light"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foam/85">
                <p>
                  Over the next three years we want to see the Alimanguan library fully stocked and
                  run entirely by local volunteers, a second library opened with a new partner
                  community, and surf programs running weekly at each of our four partner sites.
                </p>
                <p>
                  We want a California mentorship pipeline strong enough to make travel between
                  coastlines routine — not rare. And we want to be able to answer the question "where
                  did my donation go?" with a name, a place, and a story, every single time.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={220}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/impact/" variant="sunset" size="lg">
                  See our impact
                </Button>
                <Button
                  href="/get-involved/"
                  variant="secondary"
                  size="lg"
                  className="bg-foam/10 border-foam/30 text-foam hover:bg-foam/20"
                >
                  Get involved
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
