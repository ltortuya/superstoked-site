import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ocean-deep text-foam mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 text-sm text-foam/75 max-w-xs leading-relaxed">
              Empowering coastal youth through surf, education, and community —
              from Palawan to California.
            </p>
            <p className="mt-6 text-xs text-foam/50">
              EIN: {site.ein}
              <br />
              501(c)(3) nonprofit • {site.addressLine}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-ocean-light mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-foam/80 hover:text-foam transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/news/" className="text-foam/80 hover:text-foam transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-ocean-light mb-4">
              Take Action
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/donate/" className="text-foam/80 hover:text-foam transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/get-involved/" className="text-foam/80 hover:text-foam transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/get-involved/#sponsor" className="text-foam/80 hover:text-foam transition-colors">
                  Sponsor
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-foam/80 hover:text-foam transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <NewsletterSignup />
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-foam/70 hover:text-foam transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-foam/70 hover:text-foam transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-foam/70 hover:text-foam transition-colors"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foam/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-foam/50">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Made with care for coastal communities 🌊</p>
        </div>
      </div>
    </footer>
  );
}
