"use client";

import { useMemo, useState } from "react";
import { EventCard } from "./EventCard";
import type { Event } from "@/sanity/types";
import { PROGRAM_LABELS } from "@/sanity/types";

type Filter = "all" | keyof typeof PROGRAM_LABELS;

export function EventsListClient({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only show filter pills for programs that actually have events.
  const availablePrograms = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.program && set.add(e.program));
    return Array.from(set);
  }, [events]);

  const filtered = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.program === filter)),
    [events, filter]
  );

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink/15 p-12 text-center">
        <p className="font-display text-2xl text-ocean-deep">No events yet</p>
        <p className="mt-2 text-ink-soft max-w-md mx-auto">
          Our team is working on it. Check back soon for photos from library builds, surf
          sessions, and community events.
        </p>
      </div>
    );
  }

  return (
    <>
      {availablePrograms.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
            All ({events.length})
          </FilterPill>
          {availablePrograms.map((p) => {
            const count = events.filter((e) => e.program === p).length;
            return (
              <FilterPill key={p} active={filter === p} onClick={() => setFilter(p as Filter)}>
                {PROGRAM_LABELS[p as keyof typeof PROGRAM_LABELS]} ({count})
              </FilterPill>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event, i) => (
          <EventCard key={event._id} event={event} priority={i < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-soft">
          No events in this category yet.
        </p>
      )}
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all ${
        active
          ? "bg-ocean-deep text-foam border-ocean-deep"
          : "bg-foam text-ink-soft border-ink/15 hover:border-ocean-mid hover:text-ocean-deep"
      }`}
    >
      {children}
    </button>
  );
}
