import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/shared/Container";
import { SanityImage } from "@/components/events/SanityImage";
import { EventGallery } from "@/components/events/EventGallery";
import { sanityFetch } from "@/sanity/client";
import { eventBySlugQuery, eventSlugsQuery } from "@/sanity/queries";
import { PROGRAM_LABELS } from "@/sanity/types";
import type { Event } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(eventSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityFetch<Event | null>(eventBySlugQuery, { slug });
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.summary || `Event from ${event.location || "Superstoked Foundation"}`,
  };
}

function formatDate(iso: string, ongoing?: boolean) {
  if (ongoing) return "In progress";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await sanityFetch<Event | null>(eventBySlugQuery, { slug }, `event:${slug}`);
  if (!event) notFound();

  return (
    <>
      {/* Cover */}
      <section className="relative bg-ocean-deep -mt-16 sm:-mt-20 pt-16 sm:pt-20">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-ocean-deep/50 overflow-hidden">
          <SanityImage
            image={event.cover}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-transparent" />
        </div>

        <Container className="relative -mt-20 sm:-mt-28 lg:-mt-36 pb-16 z-10">
          <Link
            href="/events/"
            className="inline-flex items-center gap-1.5 text-foam/80 hover:text-foam text-sm font-semibold mb-6"
          >
            <ArrowLeft size={14} /> All events
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foam max-w-3xl">
            {event.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-foam/85 text-sm">
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} /> {formatDate(event.date, event.ongoing)}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> {event.location}
              </span>
            )}
            {event.program && event.program !== "other" && (
              <span className="inline-flex items-center gap-2">
                <Tag size={14} /> {PROGRAM_LABELS[event.program]}
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-16 sm:py-20 bg-foam">
        <Container>
          <div className="max-w-3xl">
            {event.summary && (
              <p className="text-xl sm:text-2xl leading-relaxed text-ocean-deep font-display">
                {event.summary}
              </p>
            )}
            {event.body && event.body.length > 0 && (
              <div className="mt-8 prose prose-lg max-w-none text-ink-soft leading-relaxed [&_h3]:font-display [&_h3]:text-ocean-deep [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-4 [&_a]:text-ocean-mid [&_a:hover]:text-ocean-deep [&_blockquote]:border-l-4 [&_blockquote]:border-ocean-mid [&_blockquote]:pl-6 [&_blockquote]:italic [&_p]:mt-4">
                <PortableText
                  value={event.body}
                  components={{
                    marks: {
                      link: ({ value, children }) => (
                        <a
                          href={value?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ocean-deep mb-8">
                Photos
              </h2>
              <EventGallery images={event.gallery} />
              <p className="mt-6 text-sm text-muted text-center">
                Click any photo to view it full-size. Use arrow keys to navigate.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
