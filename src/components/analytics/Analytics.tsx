"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Renders GA4 only when an ID is configured AND consent === "granted".
// Listens for a window event so the banner can flip it on without a reload.
export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(getConsent() === "granted");
    const onChange = () => setGranted(getConsent() === "granted");
    window.addEventListener("ssf-consent-change", onChange);
    return () => window.removeEventListener("ssf-consent-change", onChange);
  }, []);

  if (!GA_ID || !granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
