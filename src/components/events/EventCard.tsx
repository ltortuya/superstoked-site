import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { SanityImage } from "./SanityImage";
import type { Event } from "@/sanity/types";
import { PROGRAM_LABELS } from "@/sanity/types";

function formatDate(iso: string, ongoing?: boolean) {
  if (ongoing) return "In progress";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function EventCard({ event, priority = false }: { event: Event; priority?: boolean }) {
  return (
    <Link
      href={`/events/${event.slug}/`}
      className="group block h-full overflow-hidden rounded-2xl bg-foam border border-ink/10 hover:border-ocean-mid transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ocean-deep/10">
        <SanityImage
          image={event.cover}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {event.program && event.program !== "other" && (
          <span className="absolute top-3 left-3 rounded-full bg-foam/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ocean-deep">
            {PROGRAM_LABELS[event.program]}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} /> {formatDate(event.date, event.ongoing)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} /> {event.location}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl leading-tight tracking-tight text-ocean-deep group-hover:text-ocean-mid transition-colors">
          {event.title}
        </h3>
        {event.summary && (
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft line-clamp-3">
            {event.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
