import type { Metadata } from "next";
import { Users, Briefcase, Handshake } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/shared/Button";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { SponsorForm } from "@/components/forms/SponsorForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, sponsor, or partner with Superstoked Foundation. Whether you're a surf shop, a school, a company, or one person with an afternoon to give — we've got a place for you.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="There's a place for everyone who wants to help."
        lead="We don't run on donations alone — this work takes people. Surf instructors, gear sorters, letter-writers, event organizers, and organizations ready to show up bigger."
      />

      {/* Quick nav */}
      <section className="py-12 bg-foam border-b border-ink/5">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: "#volunteer", icon: Users, label: "Volunteer" },
              { href: "#sponsor", icon: Briefcase, label: "Sponsor" },
              { href: "#partner", icon: Handshake, label: "Partner" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl bg-sand p-5 border border-sand-dark/40 hover:border-ocean-mid transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep">
                  <item.icon size={18} />
                </span>
                <span className="font-semibold text-ocean-deep">{item.label}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="py-20 sm:py-28 bg-foam scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
            <RevealOnScroll>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Volunteer"
                  title="Raise your hand. We'll find the right way for you to help."
                />
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  Volunteers are the foundation of this foundation. Whether you can give an hour a
                  month or a whole summer in the field, we want to meet you.
                </p>
                <ul className="mt-6 space-y-3 text-ink-soft">
                  {[
                    "Surf instruction at partner beaches (California + abroad)",
                    "Event staffing — fundraisers, gear drives, community days",
                    "Letter-writing and mentor correspondence",
                    "Gear sorting, shipping, and logistics",
                    "Skills-based help: design, photography, accounting, translation",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ocean-mid shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div className="rounded-3xl bg-sand p-6 sm:p-8 border border-sand-dark/40">
                <VolunteerForm />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Sponsor */}
      <section id="sponsor" className="py-20 sm:py-28 bg-sand scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
            <RevealOnScroll>
              <div className="rounded-3xl bg-foam p-6 sm:p-8 border border-ink/10 shadow-sm">
                <SponsorForm />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Sponsors"
                  title="Companies that show up for coastal communities."
                />
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  From surf shops donating inventory to businesses underwriting a library build, our
                  sponsor partnerships are custom-shaped around what you can offer and what the
                  communities actually need.
                </p>
                <ul className="mt-6 space-y-3 text-ink-soft">
                  {[
                    "Branded sponsorship of a program, event, or library",
                    "Gear / inventory donations (boards, wetsuits, fins, books)",
                    "Matching gift campaigns for your employees",
                    "Event hosting and fundraiser collaboration",
                    "Cause-marketing partnerships",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ocean-mid shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Partner CTA */}
      <section id="partner" className="py-24 sm:py-32 bg-ocean-deep text-foam scroll-mt-24">
        <Container className="text-center">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Partner Organizations"
              title="Are you a surf club, school, or grassroots group?"
              lead="If you're already doing the work on the ground and want a partner who can help with resources, coordination, and connection — let's talk."
              tone="light"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="mailto:hello@superstokedfoundation.org?subject=Partnership%20inquiry"
                variant="sunset"
                size="lg"
              >
                Email us about a partnership
              </Button>
              <Button
                href="/contact/"
                variant="secondary"
                size="lg"
                className="bg-foam/10 border-foam/30 text-foam hover:bg-foam/20"
              >
                Use the contact form
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
