import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { EventsListClient } from "@/components/events/EventsListClient";
import { sanityFetch } from "@/sanity/client";
import { allEventsQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Photos and stories from Superstoked Foundation events — library builds, youth surf sessions, community days, and volunteer trips.",
};

// Revalidate every 60 seconds — new events show up within a minute of publish.
export const revalidate = 60;

export default async function EventsPage() {
  const events = await sanityFetch<Event[]>(allEventsQuery, {}, "events");

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Photos from the work, the water, and the communities."
        lead="Library openings, surf sessions, volunteer trips, and everything in between — updated as our team adds new photos."
      />
      <section className="py-16 sm:py-20 bg-foam">
        <Container>
          <EventsListClient events={events} />
        </Container>
      </section>
    </>
  );
}
