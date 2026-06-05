export const CONSENT_KEY = "ssf-analytics-consent";
export type Consent = "granted" | "denied" | "unset";

export function getConsent(): Consent {
  if (typeof window === "undefined") return "unset";
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : "unset";
}

export function setConsent(value: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
}

/**
 * Subscribe to consent changes for useSyncExternalStore. Fires on our custom
 * "ssf-consent-change" event (same tab) and the native "storage" event (other tabs).
 */
export function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("ssf-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ssf-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}
