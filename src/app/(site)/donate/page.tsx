import type { Metadata } from "next";
import { ShieldCheck, FileText, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { DonateWidget } from "@/components/donate/DonateWidget";
import { stewardship } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Superstoked Foundation with a one-time or monthly gift. 501(c)(3) registered, tax-deductible, transparent about the books.",
};

const trust = [
  {
    icon: ShieldCheck,
    title: "501(c)(3) Registered",
    body: "Tax-deductible donations in the United States. EIN provided on every receipt.",
  },
  {
    icon: HeartHandshake,
    title: "Direct to Programs",
    body: "90%+ of every dollar goes straight into libraries, surf programs, and community partners.",
  },
  {
    icon: FileText,
    title: "Transparent Reporting",
    body: "Annual financials published. Ask anytime — we'll walk you through line by line.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your gift fills shelves, funds boards, and keeps the programs running."
        lead="Every dollar goes toward a program, a partner, or a piece of equipment we can point to on a map. Give once, or set up a monthly gift that keeps the work steady."
      />

      {/* Widget + trust strip */}
      <section className="py-20 sm:py-24 bg-sand">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
            <RevealOnScroll>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Make a Gift"
                  title="Pick an amount. Pick a frequency. That's it."
                />
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  Every tier below maps to a concrete piece of the work. Prefer to give an item
                  rather than dollars? Scroll down — gifts in kind are welcome too.
                </p>

                <div className="mt-8 space-y-4">
                  {trust.map((t) => (
                    <div key={t.title} className="flex items-start gap-4">
                      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-mid/15 text-ocean-mid">
                        <t.icon size={18} />
                      </span>
                      <div>
                        <p className="font-semibold text-ocean-deep">{t.title}</p>
                        <p className="text-sm text-ink-soft leading-relaxed">{t.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <DonateWidget />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Other ways */}
      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Other Ways to Give"
              title="Beyond a one-time donation"
            />
          </RevealOnScroll>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <RevealOnScroll delay={0}>
              <div className="h-full rounded-2xl bg-sand p-7 border border-sand-dark/50">
                <h3 className="font-display text-xl tracking-tight text-ocean-deep">
                  Gifts in Kind
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">
                  Surfboards, leashes, fins, wetsuits, and new or like-new books for the library.
                  Email us to coordinate pickup or drop-off.
                </p>
                <a
                  href="mailto:hello@superstokedfoundation.org?subject=Gift%20in%20Kind"
                  className="mt-4 inline-flex items-center gap-1.5 text-ocean-mid font-semibold hover:text-ocean-deep"
                >
                  Coordinate a gift →
                </a>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <div className="h-full rounded-2xl bg-sand p-7 border border-sand-dark/50">
                <h3 className="font-display text-xl tracking-tight text-ocean-deep">
                  Planned Giving
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">
                  Include Superstoked Foundation in your estate plans. We&apos;ll work with your
                  attorney or financial advisor to make it simple.
                </p>
                <a
                  href="mailto:hello@superstokedfoundation.org?subject=Planned%20Giving"
                  className="mt-4 inline-flex items-center gap-1.5 text-ocean-mid font-semibold hover:text-ocean-deep"
                >
                  Start a conversation →
                </a>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="h-full rounded-2xl bg-sand p-7 border border-sand-dark/50">
                <h3 className="font-display text-xl tracking-tight text-ocean-deep">
                  Employer Matching
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">
                  Many employers will match your donation dollar-for-dollar. Ask your HR team — we
                  can provide everything they need.
                </p>
                <a
                  href="mailto:hello@superstokedfoundation.org?subject=Employer%20Match"
                  className="mt-4 inline-flex items-center gap-1.5 text-ocean-mid font-semibold hover:text-ocean-deep"
                >
                  Request paperwork →
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Stewardship */}
      <section className="py-20 sm:py-28 bg-ocean-deep text-foam">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <RevealOnScroll>
              <SectionHeading
                align="left"
                eyebrow="Our Pledge"
                title="Every dollar is accounted for."
                tone="light"
                lead={stewardship.pledge}
              />
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div className="space-y-4">
                {stewardship.principles.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl bg-foam/5 border border-foam/10 p-6"
                  >
                    <h3 className="font-display text-lg tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-foam/75 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
