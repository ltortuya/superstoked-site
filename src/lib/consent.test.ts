import { describe, it, expect, beforeEach } from "vitest";
import { getConsent, setConsent, CONSENT_KEY } from "./consent";

describe("consent storage", () => {
  beforeEach(() => localStorage.clear());

  it("returns 'unset' with nothing stored", () => {
    expect(getConsent()).toBe("unset");
  });

  it("persists and reads a granted choice", () => {
    setConsent("granted");
    expect(localStorage.getItem(CONSENT_KEY)).toBe("granted");
    expect(getConsent()).toBe("granted");
  });

  it("persists a denied choice", () => {
    setConsent("denied");
    expect(getConsent()).toBe("denied");
  });
});
