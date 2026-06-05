import { NextResponse } from "next/server";
import type { InterestKey } from "@/lib/subscribe";
import { handleSubscribe } from "./subscribe-core";

const GROUP_ENV: Record<InterestKey, string> = {
  updates: "MAILERLITE_GROUP_UPDATES",
  volunteer: "MAILERLITE_GROUP_VOLUNTEER",
  sponsor: "MAILERLITE_GROUP_SPONSOR",
  equipment: "MAILERLITE_GROUP_EQUIPMENT",
};

export async function POST(req: Request) {
  let raw: unknown = null;
  try {
    raw = await req.json();
  } catch {
    /* leave raw null → invalid email → 400 */
  }
  const result = await handleSubscribe(raw, {
    apiKey: process.env.MAILERLITE_API_KEY,
    groupId: (k) => process.env[GROUP_ENV[k]],
    fetchFn: fetch,
  });
  return NextResponse.json(result.body, { status: result.status });
}
