import type { InterestKey } from "@/lib/subscribe";

export type CoreResult = { status: number; body: Record<string, unknown> };
export type CoreDeps = {
  apiKey: string | undefined;
  groupId: (key: InterestKey) => string | undefined;
  fetchFn: typeof fetch;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleSubscribe(raw: unknown, deps: CoreDeps): Promise<CoreResult> {
  const body = (raw ?? {}) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) return { status: 400, body: { ok: false, error: "invalid email" } };

  const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : undefined;
  const interests = Array.isArray(body.interests) ? (body.interests as InterestKey[]) : [];

  if (!deps.apiKey) {
    console.warn("[subscribe] MAILERLITE_API_KEY not set — accepting without sending to MailerLite");
    return { status: 200, body: { ok: true, configured: false } };
  }

  const keys = new Set<InterestKey>(["updates", ...interests]);
  const groups: string[] = [];
  for (const k of keys) {
    const id = deps.groupId(k);
    if (id) groups.push(id);
  }

  try {
    const res = await deps.fetchFn("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${deps.apiKey}`,
      },
      body: JSON.stringify({ email, ...(name ? { fields: { name } } : {}), groups }),
    });
    if (!res.ok) {
      console.warn("[subscribe] MailerLite returned", res.status);
      return { status: 502, body: { ok: false } };
    }
    return { status: 200, body: { ok: true, configured: true } };
  } catch (err) {
    console.warn("[subscribe] MailerLite request failed:", err instanceof Error ? err.message : err);
    return { status: 502, body: { ok: false } };
  }
}
