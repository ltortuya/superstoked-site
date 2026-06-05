import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

// Site shell: adds Nav/Footer + skip link around every public page.
// Lives outside of /studio so the Studio renders without the site chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
