import Image from "next/image";
import { urlFor } from "@/sanity/client";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type Props = {
  image: SanityImageType;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
};

// Wrapper around next/image that pulls URLs from Sanity's image pipeline.
// Honors hotspot crops and serves WebP at the requested size.
export function SanityImage({
  image,
  width,
  height,
  sizes,
  className,
  priority,
  fill,
}: Props) {
  if (!image?.asset) {
    return null;
  }
  const alt = image.alt || "";
  const builder = urlFor(image).auto("format").fit("max");

  if (fill) {
    return (
      <Image
        src={builder.width(1600).url()}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
      />
    );
  }

  const w = width ?? 1200;
  const h = height ?? Math.round((w * 3) / 4);
  return (
    <Image
      src={builder.width(w).height(h).url()}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes ?? `(max-width: 640px) 100vw, ${w}px`}
      className={className}
      priority={priority}
    />
  );
}
