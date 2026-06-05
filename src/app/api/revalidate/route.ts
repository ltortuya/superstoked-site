import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity webhook endpoint. Configure this in your Sanity project:
//   Sanity Studio → Manage project → API → Webhooks → Add webhook
//   URL: https://your-domain.com/api/revalidate
//   Trigger on: Create / Update / Delete
//   Filter: _type == "event"
//   Projection: { "tag": "events" }
//   Secret: match NEXT_PUBLIC_SANITY_WEBHOOK_SECRET (stored in Vercel env)
//
// On publish, this route revalidates the "events" tag — which pulls new
// content into /events, /events/[slug], /impact, and the home page strip
// within a few seconds of save.

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ tag?: string }>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const tag = body?.tag ?? "events";
    // Next.js 16: revalidateTag takes a profile — "default" matches our
    // 60s ISR cadence on event pages.
    revalidateTag(tag, "default");

    return NextResponse.json({ success: true, tag, revalidated: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
