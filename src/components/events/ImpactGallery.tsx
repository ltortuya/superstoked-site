import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SanityImage } from "./SanityImage";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { Event } from "@/sanity/types";

// Pulls the 6 most recent event cover photos for the Impact page gallery.
// Falls back to branded placeholders when no events exist yet.
export function ImpactGallery({ events }: { events: Event[] }) {
  const hasEvents = events && events.length > 0;
  const slots = hasEvents ? events.slice(0, 6) : [];
  const fallback = [
    "REPLACE: Library opening day in Alimanguan",
    "REPLACE: Youth surf session, partner beach",
    "REPLACE: California volunteer team",
    "REPLACE: Beach cleanup in Eastern Samar",
    "REPLACE: Board and gear donation drive",
    "REPLACE: Teacher workshop or story hour",
  ];

  return (
    <>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hasEvents
          ? slots.map((e, i) => (
              <RevealOnScroll key={e._id} delay={i * 70}>
                <Link
                  href={`/events/${e.slug}/`}
                  className="group relative block overflow-hidden rounded-2xl bg-ocean-deep/10 aspect-[4/3]"
                >
                  <SanityImage
                    image={e.cover}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-foam/80 text-xs font-semibold uppercase tracking-[0.1em]">
                      {e.location ?? "Event"}
                    </p>
                    <p className="text-foam font-display text-lg leading-tight mt-1 line-clamp-2">
                      {e.title}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))
          : fallback.map((label, i) => (
              <RevealOnScroll key={i} delay={i * 70}>
                <ImagePlaceholder
                  label={label}
                  aspect={i % 3 === 0 ? "4/3" : i % 3 === 1 ? "1/1" : "3/2"}
                  tone={i % 3 === 0 ? "ocean" : i % 3 === 1 ? "sand" : "sunset"}
                />
              </RevealOnScroll>
            ))}
      </div>
      {hasEvents && (
        <div className="mt-10 text-center">
          <Link
            href="/events/"
            className="inline-flex items-center gap-1.5 text-ocean-mid font-semibold hover:text-ocean-deep"
          >
            See all events <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
