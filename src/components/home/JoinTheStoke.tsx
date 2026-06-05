"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { INTERESTS, subscribe, type InterestKey } from "@/lib/subscribe";
import { trackEvent } from "@/lib/track";

type Step = "email" | "details" | "done";

export function JoinTheStoke() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checked, setChecked] = useState<InterestKey[]>(["updates"]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  function toggle(key: InterestKey) {
    setChecked((c) => (c.includes(key) ? c.filter((k) => k !== key) : [...c, key]));
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setErr("");
    const r = await subscribe({ email, interests: ["updates"], source: "hero" });
    setBusy(false);
    if (!r.ok) {
      setErr("Something went wrong — please try again.");
      return;
    }
    trackEvent("newsletter_signup", { source: "hero" });
    setStep("details");
  }

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await subscribe({ email, name, interests: checked, source: "hero" });
    setBusy(false);
    if (!r.ok) setErr("Saved your email, but couldn't save the rest — we'll follow up.");
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="rounded-2xl bg-foam/10 border border-foam/20 backdrop-blur-sm px-6 py-5 text-foam max-w-md md:ml-auto text-left">
        <p className="flex items-center gap-2 font-semibold">
          <Check size={18} className="text-sunset" /> You&apos;re in 🤙
        </p>
        <p className="mt-1 text-sm text-foam/85">
          Thanks for joining the Stoke — check your inbox to confirm.
        </p>
        {err && <p className="mt-2 text-sm text-sunset">{err}</p>}
      </div>
    );
  }

  if (step === "email") {
    return (
      <div className="text-left">
        <form onSubmit={submitEmail} className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <label htmlFor="jts-email" className="sr-only">Email address</label>
          <input
            id="jts-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 sm:w-72 sm:flex-none rounded-full bg-foam/15 border border-foam/30 px-5 py-3 text-foam placeholder:text-foam/60 backdrop-blur-sm focus:outline-none focus:border-sunset"
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset text-ink font-bold px-6 py-3 hover:bg-sunset-dark transition-colors disabled:opacity-60"
          >
            {busy ? "Joining…" : (<>Join the Stoke <ArrowRight size={18} /></>)}
          </button>
        </form>
        {err && <p className="mt-2 text-sm text-sunset md:text-right">{err}</p>}
      </div>
    );
  }

  // step === "details"
  return (
    <form
      onSubmit={submitDetails}
      className="rounded-2xl bg-foam/10 border border-foam/20 backdrop-blur-sm p-5 max-w-md md:ml-auto text-left animate-[fadeUp_0.4s_ease-out_both]"
    >
      <p className="text-sm text-foam/85">Nice! A couple more things (optional):</p>
      <label htmlFor="jts-name" className="sr-only">First name</label>
      <input
        id="jts-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="First name"
        className="mt-3 w-full rounded-full bg-foam/15 border border-foam/30 px-5 py-3 text-foam placeholder:text-foam/60 focus:outline-none focus:border-sunset"
      />
      <fieldset className="mt-4">
        <legend className="sr-only">Your interests</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {INTERESTS.map((it) => (
            <label key={it.key} className="flex items-center gap-2 text-sm text-foam/90 cursor-pointer">
              <input
                type="checkbox"
                checked={checked.includes(it.key)}
                onChange={() => toggle(it.key)}
                className="h-4 w-4 rounded border-foam/40 bg-foam/10 text-sunset focus:ring-sunset"
              />
              {it.label}
            </label>
          ))}
        </div>
      </fieldset>
      {err && <p className="mt-3 text-sm text-sunset">{err}</p>}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset text-ink font-bold px-6 py-3 hover:bg-sunset-dark transition-colors disabled:opacity-60"
        >
          {busy ? "Saving…" : "Finish"}
        </button>
        <button type="button" onClick={() => setStep("done")} className="text-sm text-foam/70 hover:text-foam">
          Skip
        </button>
      </div>
    </form>
  );
}
