import { describe, it, expect, vi } from "vitest";
import { handleSubscribe } from "./subscribe-core";
import type { InterestKey } from "@/lib/subscribe";

const groupId = (k: InterestKey) =>
  ({ updates: "g-up", volunteer: "g-vol", sponsor: "g-spo", equipment: "g-eq" })[k];

describe("handleSubscribe", () => {
  it("rejects an invalid email with 400", async () => {
    const fetchFn = vi.fn();
    const r = await handleSubscribe({ email: "nope" }, { apiKey: "k", groupId, fetchFn });
    expect(r.status).toBe(400);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("accepts gracefully with configured:false when no API key", async () => {
    const fetchFn = vi.fn();
    const r = await handleSubscribe({ email: "a@b.com" }, { apiKey: undefined, groupId, fetchFn });
    expect(r).toEqual({ status: 200, body: { ok: true, configured: false } });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("calls MailerLite with bearer auth, name field, and always-includes the updates group", async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response("{}", { status: 201 }));
    const r = await handleSubscribe(
      { email: "a@b.com", name: "Lui", interests: ["volunteer"] as InterestKey[] },
      { apiKey: "secret", groupId, fetchFn },
    );
    expect(r).toEqual({ status: 200, body: { ok: true, configured: true } });
    const [url, opts] = fetchFn.mock.calls[0];
    expect(url).toBe("https://connect.mailerlite.com/api/subscribers");
    expect(opts.headers.Authorization).toBe("Bearer secret");
    const sent = JSON.parse(opts.body);
    expect(sent.email).toBe("a@b.com");
    expect(sent.fields).toEqual({ name: "Lui" });
    expect(sent.groups.sort()).toEqual(["g-up", "g-vol"]);
  });

  it("returns 502 when MailerLite responds non-ok", async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response("", { status: 422 }));
    const r = await handleSubscribe({ email: "a@b.com" }, { apiKey: "k", groupId, fetchFn });
    expect(r.status).toBe(502);
  });

  it("returns 502 when the request throws", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("down"));
    const r = await handleSubscribe({ email: "a@b.com" }, { apiKey: "k", groupId, fetchFn });
    expect(r.status).toBe(502);
  });
});
