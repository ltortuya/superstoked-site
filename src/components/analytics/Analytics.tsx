"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Renders GA4 only when an ID is configured AND consent === "granted".
// useSyncExternalStore reads consent client-side without an effect, so it stays
// SSR-safe (server snapshot is "unset") and flips on the moment the banner accepts.
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => "unset");

  if (!GA_ID || consent !== "granted") return null;

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
