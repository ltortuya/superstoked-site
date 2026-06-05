import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/shared/Card";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Button } from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Stories and updates from Superstoked Foundation programs, partners, and the communities we work alongside.",
};

// Placeholder posts — replace with real entries as stories land.
const posts = [
  {
    slug: "#",
    title: "Opening Week: Alimanguan's First Community Library",
    date: "REPLACE: Month DD, YYYY",
    excerpt:
      "An inside look at the kids, teachers, and volunteers who made the library build possible — and what comes next for reading in Alimanguan.",
    category: "Library",
  },
  {
    slug: "#",
    title: "Youth Surf Cohort: A Year of Showing Up",
    date: "REPLACE: Month DD, YYYY",
    excerpt:
      "Twelve kids, one beach, and a weekly ritual that changed more than their surfing. A reflection after the first twelve months of the Alimanguan youth surf program.",
    category: "Programs",
  },
  {
    slug: "#",
    title: "California Volunteers Visit Our Partners Abroad",
    date: "REPLACE: Month DD, YYYY",
    excerpt:
      "Three Wind and Sea Surf Club members spent two weeks with our team in Palawan. Here's what they learned — and what they brought home.",
    category: "Volunteers",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="Stories from the shoreline."
        lead="Library openings, program milestones, partner spotlights, and honest updates on what's working — and what's not. New posts as the work unfolds."
      />

      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted">
              <span className="font-semibold text-ocean-deep">Coming soon:</span> real posts from
              the field. Below are placeholder examples to show the layout.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-foam hover:shadow-lg transition-shadow">
                  <ImagePlaceholder
                    label={`REPLACE: Hero image for "${post.title}"`}
                    aspect="16/9"
                    tone={i % 3 === 0 ? "ocean" : i % 3 === 1 ? "sand" : "sunset"}
                    className="rounded-none"
                  />
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-deep/5 text-ocean-deep px-2.5 py-1 font-semibold uppercase tracking-[0.1em]">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-xl leading-tight tracking-tight text-ocean-deep">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-ink-soft leading-relaxed text-[0.95rem]">
                      {post.excerpt}
                    </p>
                    <a
                      href={post.slug}
                      aria-disabled="true"
                      className="mt-5 inline-flex items-center gap-1.5 text-ocean-mid font-semibold text-sm hover:text-ocean-deep"
                    >
                      Read more <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-sand border border-sand-dark/40 p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ocean-deep">
              Want the updates in your inbox?
            </h2>
            <p className="mt-3 text-ink-soft max-w-xl mx-auto">
              We send an occasional newsletter — updates from the field, partner spotlights, and
              the stories we can't quite fit anywhere else.
            </p>
            <div className="mt-6">
              <Button href="/contact/" variant="primary" size="lg">
                Get in touch to subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
