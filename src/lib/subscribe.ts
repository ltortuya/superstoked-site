// Client-safe: no secrets, no server env. Server group-mapping lives in the route.
export type InterestKey = "updates" | "volunteer" | "sponsor" | "equipment";

export const INTERESTS: { key: InterestKey; label: string }[] = [
  { key: "updates", label: "Send me Foundation updates" },
  { key: "volunteer", label: "I want to volunteer" },
  { key: "sponsor", label: "I'm interested in corporate sponsorship" },
  { key: "equipment", label: "I'm interested in donating equipment" },
];

export type SubscribePayload = {
  email: string;
  name?: string;
  interests?: InterestKey[];
  source?: "hero" | "footer";
};

export type SubscribeResult = { ok: boolean; configured: boolean };

export async function subscribe(payload: SubscribePayload): Promise<SubscribeResult> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, configured: true };
    const data = (await res.json().catch(() => ({}))) as Partial<SubscribeResult>;
    return { ok: true, configured: data.configured !== false };
  } catch {
    return { ok: false, configured: true };
  }
}
