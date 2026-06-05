import { BookOpen, Waves, Handshake, Globe2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Card } from "@/components/shared/Card";
import { whatWeDo } from "@/lib/content";

const iconMap = {
  book: BookOpen,
  waves: Waves,
  handshake: Handshake,
  globe: Globe2,
};

export function WhatWeDo() {
  return (
    <section className="py-20 sm:py-28 bg-sand">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow="What We Do"
            title="Four ways we show up for coastal communities"
            lead="Different programs, one principle: meet communities where they are, and follow the lead of the people already doing the work."
          />
        </RevealOnScroll>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <RevealOnScroll key={item.title} delay={i * 80}>
                <Card interactive className="h-full flex flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-ocean-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </Card>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
