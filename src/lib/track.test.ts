import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackEvent } from "./track";

describe("trackEvent", () => {
  beforeEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  it("is a no-op when gtag is not present", () => {
    expect(() => trackEvent("newsletter_signup", { source: "footer" })).not.toThrow();
  });

  it("forwards the event to gtag when present", () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    trackEvent("donation_click", { value: 50, frequency: "monthly" });
    expect(gtag).toHaveBeenCalledWith("event", "donation_click", { value: 50, frequency: "monthly" });
  });
});
