import Link from "next/link";
import Image from "next/image";

// Brand logo. White (outlined) over dark/hero; navy over light/scrolled chrome.
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const src = tone === "light" ? "/brand/logo-super-white.png" : "/brand/logo-super-navy.png";
  return (
    <Link href="/" aria-label="Superstoked Foundation — home" className="inline-flex items-center">
      <Image
        src={src}
        alt="Superstoked Foundation"
        width={160}
        height={56}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
