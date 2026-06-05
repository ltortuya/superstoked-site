"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === "unset");
  }, []);

  function choose(value: "granted" | "denied") {
    setConsent(value);
    window.dispatchEvent(new Event("ssf-consent-change"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-[60] rounded-2xl bg-ocean-deep text-foam shadow-lg p-5"
    >
      <p className="text-sm leading-relaxed">
        We use cookies for anonymous analytics to improve the site. No tracking until you accept.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-full bg-sunset text-ink px-4 py-2 text-sm font-semibold hover:bg-sunset-dark transition-colors"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-full bg-foam/10 border border-foam/30 px-4 py-2 text-sm font-semibold hover:bg-foam/20 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
