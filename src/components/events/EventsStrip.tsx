import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { EventCard } from "./EventCard";
import type { Event } from "@/sanity/types";

// Home-page "Recent Events" strip. Renders nothing if there are no events yet —
// keeps the home page clean while the team is still setting up Sanity.
export function EventsStrip({ events }: { events: Event[] }) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-foam">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Recent Events"
              title="What we've been up to"
              lead="Snapshots from the latest work — library build days, youth surf sessions, volunteer trips, and everything in between."
            />
            <a
              href="/events/"
              className="inline-flex shrink-0 items-center gap-1.5 text-ocean-mid font-semibold hover:text-ocean-deep transition-colors"
            >
              See all events <ArrowRight size={16} />
            </a>
          </div>
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event, i) => (
            <RevealOnScroll key={event._id} delay={i * 120}>
              <EventCard event={event} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
