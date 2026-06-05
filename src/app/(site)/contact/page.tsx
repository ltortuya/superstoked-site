import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQ } from "@/components/shared/FAQ";
import { site } from "@/lib/site";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Superstoked Foundation. Questions, partnerships, press, or just saying hi — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We read every message. Really."
        lead="Whether it's a question, a partnership idea, or just saying hi — drop us a note. We try to reply within a few business days."
      />

      <section className="py-20 sm:py-28 bg-foam">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <RevealOnScroll>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Reach Out"
                  title="Any way you'd like to connect."
                />

                <div className="mt-8 space-y-6">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-4 rounded-2xl bg-sand p-5 border border-sand-dark/40 hover:border-ocean-mid transition-colors"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep">
                      <Mail size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-ocean-deep">Email</p>
                      <p className="text-ink-soft">{site.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-2xl bg-sand p-5 border border-sand-dark/40">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-deep/10 text-ocean-deep">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-ocean-deep">Based in</p>
                      <p className="text-ink-soft">{site.addressLine}</p>
                      <p className="text-sm text-muted mt-1">
                        Programs run in the Philippines and California.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sand p-5 border border-sand-dark/40">
                    <p className="font-semibold text-ocean-deep mb-3">Follow our work</p>
                    <div className="flex items-center gap-4">
                      <a
                        href={site.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foam border border-ink/10 text-ocean-deep hover:bg-ocean-deep hover:text-foam transition-colors"
                      >
                        <InstagramIcon size={18} />
                      </a>
                      <a
                        href={site.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foam border border-ink/10 text-ocean-deep hover:bg-ocean-deep hover:text-foam transition-colors"
                      >
                        <FacebookIcon size={18} />
                      </a>
                      <a
                        href={site.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foam border border-ink/10 text-ocean-deep hover:bg-ocean-deep hover:text-foam transition-colors"
                      >
                        <YoutubeIcon size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="rounded-3xl bg-sand p-6 sm:p-8 border border-sand-dark/40">
                <h2 className="font-display text-2xl tracking-tight text-ocean-deep">
                  Send us a message
                </h2>
                <p className="mt-2 text-ink-soft">We'll read it and reply as soon as we can.</p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <Container>
          <RevealOnScroll>
            <SectionHeading
              eyebrow="FAQ"
              title="Quick answers to common questions"
              lead="Before you hit send — maybe the answer's here."
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div className="mt-12 max-w-3xl mx-auto">
              <FAQ items={faq} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={220}>
            <p className="mt-10 text-center text-ink-soft">
              Still have a question? Email us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ocean-mid font-semibold hover:text-ocean-deep"
              >
                {site.email}
              </a>
              .
            </p>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
