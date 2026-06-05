import { describe, it, expect, vi, afterEach } from "vitest";
import { INTERESTS, subscribe } from "./subscribe";

describe("INTERESTS", () => {
  it("lists the four interests with 'updates' first", () => {
    expect(INTERESTS.map((i) => i.key)).toEqual(["updates", "volunteer", "sponsor", "equipment"]);
    expect(INTERESTS.every((i) => i.label.length > 0)).toBe(true);
  });
});

describe("subscribe()", () => {
  afterEach(() => vi.restoreAllMocks());

  it("POSTs the payload to /api/subscribe and returns ok on 200", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, configured: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const r = await subscribe({ email: "a@b.com", interests: ["updates"], source: "hero" });
    expect(r).toEqual({ ok: true, configured: true });
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/subscribe");
    expect(opts.method).toBe("POST");
    expect(JSON.parse(opts.body)).toMatchObject({ email: "a@b.com", source: "hero" });
  });

  it("returns ok:false on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 502 })));
    expect(await subscribe({ email: "a@b.com" })).toEqual({ ok: false, configured: true });
  });

  it("returns ok:false when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect(await subscribe({ email: "a@b.com" })).toEqual({ ok: false, configured: true });
  });

  it("reports configured:false when the API says so", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, configured: false }), { status: 200 }),
    ));
    expect(await subscribe({ email: "a@b.com" })).toEqual({ ok: true, configured: false });
  });
});
