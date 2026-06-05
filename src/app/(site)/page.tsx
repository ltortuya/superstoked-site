import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { EventsStrip } from "@/components/events/EventsStrip";
import { PartnersSection } from "@/components/home/PartnersSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { sanityFetch } from "@/sanity/client";
import { featuredEventsQuery, recentEventsQuery, homePageQuery, partnersQuery, testimonialsQuery } from "@/sanity/queries";
import type { Event, HomePageContent, Partner, Testimonial } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  // Prefer featured events; fall back to the 3 most recent if nothing is
  // flagged yet. Keeps the home page self-managing as the team learns Sanity.
  const featured = await sanityFetch<Event[]>(featuredEventsQuery, {}, "events");
  const events =
    featured.length > 0
      ? featured
      : await sanityFetch<Event[]>(recentEventsQuery, { limit: 3 }, "events");

  const hp = await sanityFetch<HomePageContent | null>(homePageQuery, {}, "homePage");
  const partners = await sanityFetch<Partner[]>(partnersQuery, {}, "partner");
  const testimonials = await sanityFetch<Testimonial[]>(testimonialsQuery, {}, "testimonial");
  const home = Array.isArray(hp) ? null : hp;
  const paras = (s?: string) => (s ? s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
  const fp = home?.featuredProject;

  return (
    <>
      <Hero headline={home?.heroHeadline} subhead={home?.heroSubhead} />
      <MissionSection mission={{ headline: home?.missionHeading, body: paras(home?.missionBody) }} />
      <WhatWeDo whatWeDo={home?.whatWeDoItems ?? []} />
      <FeaturedProject featuredProject={fp ? { ...fp, body: paras(fp.body), ctaHref: fp.ctaUrl } : undefined} />
      <EventsStrip events={events} />
      <PartnersSection partners={partners} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCTA headline={home?.finalCtaHeadline} body={home?.finalCtaBody} />
    </>
  );
}
