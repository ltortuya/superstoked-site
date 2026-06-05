"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Button } from "@/components/shared/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-foam/90 backdrop-blur-md shadow-sm border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex h-16 sm:h-20 items-center justify-between">
        <Logo tone={scrolled ? "dark" : "light"} />
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive(item.href)
                  ? scrolled
                    ? "text-ocean-deep bg-ocean-deep/5"
                    : "text-foam bg-foam/15"
                  : scrolled
                    ? "text-ink-soft hover:text-ocean-deep hover:bg-ocean-deep/5"
                    : "text-foam/90 hover:text-foam hover:bg-foam/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3">
            <Button href="/donate/" variant="sunset" size="sm">
              Support SSF
            </Button>
          </div>
        </nav>
        <button
          type="button"
          className={`lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full ${
            scrolled ? "text-ocean-deep hover:bg-ocean-deep/5" : "text-foam hover:bg-foam/10"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-foam z-40 transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col px-6 pt-6 pb-10 overflow-y-auto">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-lg font-medium ${
                  isActive(item.href)
                    ? "text-ocean-deep bg-ocean-deep/5"
                    : "text-ink hover:bg-ocean-deep/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/donate/" variant="sunset" size="lg" className="w-full">
              Donate Now
            </Button>
            <Button href="/get-involved/" variant="secondary" size="lg" className="w-full">
              Get Involved
            </Button>
          </div>
          <p className="mt-auto pt-8 text-xs text-muted">
            Superstoked Foundation is a registered 501(c)(3) nonprofit.
          </p>
        </div>
      </div>
    </header>
  );
}
