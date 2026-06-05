import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden ocean-gradient text-foam -mt-16 sm:-mt-20 pt-16 sm:pt-20">
      {/* Decorative horizon glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="sun" cx="30%" cy="25%" r="35%">
              <stop offset="0%" stopColor="#E85D4E" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#E85D4E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#sun)" />
        </svg>
      </div>

      {/* Animated wave lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full opacity-30"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 Q 360 80 720 120 T 1440 120 L 1440 180 L 0 180 Z"
          fill="rgba(191,215,234,0.4)"
        />
        <path
          d="M0 140 Q 360 100 720 140 T 1440 140 L 1440 180 L 0 180 Z"
          fill="rgba(191,215,234,0.3)"
        />
      </svg>

      <Container className="relative pt-20 sm:pt-24 lg:pt-32 pb-28 sm:pb-36 lg:pb-44">
        <div className="max-w-3xl animate-[fadeUp_0.9s_ease-out_both]">
          <p className="inline-flex items-center gap-2 rounded-full bg-foam/10 border border-foam/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ocean-light backdrop-blur-sm">
            <Heart size={13} /> A Grassroots Nonprofit
          </p>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-foam">
            Empowering Youth Through{" "}
            <span className="italic text-ocean-light">Surf, Education & Community</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-foam/85 max-w-2xl">
            Creating opportunities for underserved communities through mentorship, learning spaces,
            and the transformative power of the ocean.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/donate/" variant="sunset" size="lg">
              Donate Now <ArrowRight size={18} />
            </Button>
            <Button href="/get-involved/" variant="secondary" size="lg" className="bg-foam/10 border-foam/30 text-foam hover:bg-foam/20 hover:border-foam/50">
              Get Involved
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foam/70">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-light" />
              4 community partners
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-light" />
              120+ youth served
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-light" />
              California &amp; the Philippines
            </span>
          </div>
        </div>

        {/* Small scroll hint */}
        <div className="absolute bottom-14 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-2 text-foam/60">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-10 w-px bg-foam/40 animate-pulse" />
        </div>
      </Container>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
