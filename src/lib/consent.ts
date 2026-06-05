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
