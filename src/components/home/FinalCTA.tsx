import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/shared/Button";
import { callsToAction } from "@/lib/content";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden ocean-gradient text-foam py-24 sm:py-32">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 -top-px w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0 0 Q 720 120 1440 0 L 1440 0 L 0 0 Z" fill="#F2E9DC" />
      </svg>
      <Container className="relative text-center">
        <RevealOnScroll>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-foam max-w-3xl mx-auto">
            {callsToAction.finalHeadline}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <p className="mt-6 text-lg sm:text-xl text-foam/85 max-w-2xl mx-auto leading-relaxed">
            {callsToAction.finalBody}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={220}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/donate/" variant="sunset" size="lg">
              Donate Now
            </Button>
            <Button
              href="/get-involved/"
              variant="secondary"
              size="lg"
              className="bg-foam/10 border-foam/30 text-foam hover:bg-foam/20 hover:border-foam/50"
            >
              Get Involved
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
