import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { partners } from "@/lib/content";

export function PartnersSection() {
  return (
    <section className="py-20 sm:py-24 bg-ocean-deep text-foam">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Our Partners"
            title="The people doing the work"
            lead="We don't parachute in. Every program we run is built hand-in-hand with a local surf club, school, or community group."
            tone="light"
          />
        </RevealOnScroll>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p, i) => (
            <RevealOnScroll key={p.name} delay={i * 80}>
              <div className="h-full rounded-2xl bg-foam/5 border border-foam/10 p-6 backdrop-blur-sm hover:bg-foam/10 transition-colors">
                {/* Logo placeholder — swap in real SVG/image later */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ocean-mid to-ocean-light text-ocean-deep font-display text-lg font-semibold">
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 3)
                    .join("")}
                </div>
                <h3 className="mt-4 font-display text-lg tracking-tight">{p.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ocean-light">
                  {p.location}
                </p>
                <p className="mt-3 text-sm text-foam/75 leading-relaxed">{p.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
