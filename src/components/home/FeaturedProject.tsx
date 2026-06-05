import { MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/shared/Button";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { featuredProject } from "@/lib/content";

export function FeaturedProject() {
  const pct = Math.min(
    100,
    Math.round((featuredProject.progressRaised / featuredProject.progressGoal) * 100)
  );

  return (
    <section className="py-20 sm:py-28 bg-foam">
      <Container>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          <RevealOnScroll>
            <ImagePlaceholder
              label={featuredProject.imageAlt}
              aspect="4/3"
              tone="ocean"
              className="shadow-xl"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sunset/10 text-sunset-dark px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]">
                {featuredProject.badge}
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-ocean-deep">
                {featuredProject.title}
              </h2>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ocean-mid font-semibold">
                <MapPin size={14} /> Alimanguan, Palawan — Philippines
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {featuredProject.lead}
              </p>
              <div className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {featuredProject.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-8 rounded-2xl bg-sand p-5">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ocean-deep">
                    {featuredProject.progressLabel}
                  </span>
                  <span className="text-ink-soft">
                    <span className="font-semibold text-ocean-deep">
                      ${featuredProject.progressRaised.toLocaleString()}
                    </span>{" "}
                    of ${featuredProject.progressGoal.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-ocean-deep/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-ocean-mid to-ocean-deep transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-ink-soft">
                  {pct}% raised · help us finish the build
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href={featuredProject.ctaHref} variant="primary" size="lg">
                  {featuredProject.ctaLabel}
                </Button>
                <Button href="/programs/#libraries" variant="ghost" size="lg">
                  Learn more
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
