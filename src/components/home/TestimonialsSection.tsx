import { Quote } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-sand">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Voices"
            title="Words from the people we work with"
            lead="The best measure of what we do is the language kids, teachers, and partners use to describe it."
          />
        </RevealOnScroll>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <figure className="h-full flex flex-col rounded-2xl bg-foam p-7 shadow-sm border border-sand-dark/40">
                <Quote className="text-ocean-mid/40" size={28} />
                <blockquote className="mt-4 font-display text-xl leading-snug text-ocean-deep">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <div className="font-semibold text-ocean-deep">{t.attribution}</div>
                  <div className="text-sm text-ink-soft">{t.role}</div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
