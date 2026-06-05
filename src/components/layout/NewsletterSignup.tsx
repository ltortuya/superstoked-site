"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { subscribe } from "@/lib/subscribe";
import { trackEvent } from "@/lib/track";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const r = await subscribe({ email, interests: ["updates"], source: "footer" });
    if (r.ok) {
      trackEvent("newsletter_signup", { source: "footer" });
      setStatus("ok");
      setEmail("");
    } else {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-foam">
        Stay in the loop
      </label>
      <p className="text-sm text-foam/70 -mt-2">
        Occasional updates from the communities we serve — no spam, ever.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-full bg-foam/10 border border-foam/20 px-5 py-3 text-foam placeholder:text-foam/50 focus:outline-none focus:border-ocean-light"
          aria-describedby="newsletter-status"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean-light text-ocean-deep px-5 py-3 text-sm font-semibold hover:bg-foam transition-colors disabled:opacity-60"
        >
          {status === "ok" ? <Check size={16} /> : <Send size={16} />}
          {status === "loading" ? "Sending…" : status === "ok" ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <p id="newsletter-status" aria-live="polite" className="text-xs text-foam/60 min-h-[1rem]">
        {status === "ok" && "Thanks — we'll be in touch."}
        {status === "err" && "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
