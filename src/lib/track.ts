export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: TrackParams) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. No-op until GA is loaded (i.e. after consent). */
export function trackEvent(name: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
