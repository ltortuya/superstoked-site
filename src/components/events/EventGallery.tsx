"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SanityImage } from "./SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

export function EventGallery({ images }: { images: SanityImageType[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  if (!images || images.length === 0) return null;

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img._key ?? i}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-ocean-deep/10 focus-visible:outline-ocean-mid"
            aria-label={`Open photo ${i + 1}: ${img.alt}`}
          >
            <SanityImage
              image={img}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {active !== null && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-foam/80">
            <span className="text-sm">
              {openIndex + 1} / {images.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-foam/10"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-2 sm:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam hover:bg-foam/20 backdrop-blur-sm"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div className="relative max-h-full max-w-full">
              <SanityImage
                image={active}
                fill={false}
                width={1600}
                height={1200}
                priority
                className="max-h-[75vh] w-auto object-contain rounded-xl"
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={next}
                className="absolute right-2 sm:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-foam/10 text-foam hover:bg-foam/20 backdrop-blur-sm"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {(active.caption || active.alt) && (
            <div
              className="px-6 pb-6 text-center text-foam/80 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {active.caption || active.alt}
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
