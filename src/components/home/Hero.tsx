import Image from "next/image";
import { Heart } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { JoinTheStoke } from "@/components/home/JoinTheStoke";

export function Hero({ headline, subhead }: { headline?: string; subhead?: string }) {
  return (
    <section className="relative min-h-[88vh] w-full flex items-end overflow-hidden bg-ocean-deep -mt-16 sm:-mt-20">
      <Image
        src="/brand/hero-surf.jpg"
        alt="A lone surfer riding a clean wave with a traditional Filipino bangka outrigger in the foreground"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: "brightness(0.85) saturate(1.05)" }}
      />
      {/* Gradient overlay for text legibility (matches live .hero-grad) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,31,53,.45) 0%, rgba(15,31,53,.15) 35%, rgba(15,31,53,.55) 80%, rgba(15,31,53,.78) 100%)",
        }}
      />
      <Container className="relative z-10 pb-20 sm:pb-28 pt-28 w-full">
        <div className="max-w-xl ml-auto text-center md:text-right animate-[fadeUp_0.9s_ease-out_both]">
          <p className="inline-flex items-center gap-2 rounded-full bg-foam/10 border border-foam/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ocean-light backdrop-blur-sm">
            <Heart size={13} /> A Grassroots Nonprofit
          </p>
          {headline && (
            <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foam">
              {headline}
            </h1>
          )}
          {subhead && (
            <p className="mt-6 text-lg leading-relaxed text-foam/90 md:ml-auto max-w-lg">
              {subhead}
            </p>
          )}
          <div className="mt-9">
            <JoinTheStoke />
          </div>
        </div>
      </Container>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(14px);} to {opacity:1; transform:translateY(0);} }`}</style>
    </section>
  );
}
