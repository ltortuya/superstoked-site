import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { EventsStrip } from "@/components/events/EventsStrip";
import { PartnersSection } from "@/components/home/PartnersSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { sanityFetch } from "@/sanity/client";
import { featuredEventsQuery, recentEventsQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";

export const revalidate = 60;

export default async function Home() {
  // Prefer featured events; fall back to the 3 most recent if nothing is
  // flagged yet. Keeps the home page self-managing as the team learns Sanity.
  const featured = await sanityFetch<Event[]>(featuredEventsQuery, {}, "events");
  const events =
    featured.length > 0
      ? featured
      : await sanityFetch<Event[]>(recentEventsQuery, { limit: 3 }, "events");

  return (
    <>
      <Hero />
      <MissionSection />
      <WhatWeDo />
      <FeaturedProject />
      <EventsStrip events={events} />
      <PartnersSection />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
