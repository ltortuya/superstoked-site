"use client";

import { useState } from "react";
import { Heart, Repeat, ExternalLink } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { donationTiers } from "@/lib/content";

// Provider placeholders — set any of these env vars at build time and the
// corresponding button becomes a real link. With none set, tier cards still
// render cleanly and point to a placeholder handler.
const DONORBOX_URL = process.env.NEXT_PUBLIC_DONORBOX_URL || "";
const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "";
const PAYPAL_URL = process.env.NEXT_PUBLIC_PAYPAL_URL || "";

type Frequency = "once" | "monthly";

export function DonateWidget() {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [selected, setSelected] = useState<number | "custom">(100);
  const [custom, setCustom] = useState("");

  const amount =
    selected === "custom"
      ? Math.max(0, parseInt(custom || "0", 10))
      : selected;

  function buildUrl(base: string) {
    if (!base) return "";
    const params = new URLSearchParams();
    params.set("amount", String(amount));
    if (frequency === "monthly") params.set("frequency", "monthly");
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}${params.toString()}`;
  }

  const donorboxHref = buildUrl(DONORBOX_URL);
  const stripeHref = buildUrl(STRIPE_PAYMENT_LINK);
  const paypalHref = buildUrl(PAYPAL_URL);
  const anyProvider = donorboxHref || stripeHref || paypalHref;

  return (
    <div className="rounded-3xl bg-foam shadow-xl border border-ink/5 p-6 sm:p-8">
      {/* Frequency toggle */}
      <div className="flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Donation frequency"
          className="inline-flex items-center rounded-full bg-sand p-1"
        >
          <button
            role="tab"
            aria-selected={frequency === "once"}
            onClick={() => setFrequency("once")}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
              frequency === "once"
                ? "bg-foam text-ocean-deep shadow-sm"
                : "text-ink-soft"
            }`}
          >
            One-time
          </button>
          <button
            role="tab"
            aria-selected={frequency === "monthly"}
            onClick={() => setFrequency("monthly")}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all inline-flex items-center gap-1.5 ${
              frequency === "monthly"
                ? "bg-foam text-ocean-deep shadow-sm"
                : "text-ink-soft"
            }`}
          >
            <Repeat size={14} /> Monthly
          </button>
        </div>
      </div>

      {/* Tier grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {donationTiers.map((tier) => {
          const isActive = selected === tier.amount;
          return (
            <button
              key={tier.amount}
              onClick={() => {
                setSelected(tier.amount);
                setCustom("");
              }}
              className={`text-left rounded-2xl border-2 p-5 transition-all ${
                isActive
                  ? "border-ocean-deep bg-ocean-deep/5 shadow-md"
                  : "border-ink/10 hover:border-ocean-mid"
              } ${tier.highlight && !isActive ? "border-ocean-mid/40" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl tracking-tight text-ocean-deep">
                  ${tier.amount}
                  {frequency === "monthly" && (
                    <span className="text-base text-ink-soft font-sans">/mo</span>
                  )}
                </span>
                {tier.highlight && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sunset-dark bg-sunset/10 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-2 font-semibold text-ink">{tier.title}</p>
              <p className="mt-1 text-sm text-ink-soft leading-snug">{tier.body}</p>
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div className="mt-4">
        <button
          onClick={() => setSelected("custom")}
          className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
            selected === "custom"
              ? "border-ocean-deep bg-ocean-deep/5"
              : "border-ink/10 hover:border-ocean-mid"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-ocean-deep">Custom amount</span>
            <span className="text-ink-soft text-sm">Give any amount you choose</span>
          </div>
          {selected === "custom" && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg text-ocean-deep font-semibold">$</span>
              <input
                type="number"
                min={1}
                autoFocus
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="50"
                className="flex-1 text-lg font-semibold text-ocean-deep bg-transparent focus:outline-none"
              />
              {frequency === "monthly" && (
                <span className="text-sm text-ink-soft">/ month</span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center justify-between text-sm rounded-xl bg-sand px-4 py-3">
        <span className="text-ink-soft">You&apos;re giving</span>
        <span className="font-semibold text-ocean-deep">
          ${amount || 0}
          {frequency === "monthly" && " / month"}
        </span>
      </div>

      {/* Provider buttons */}
      <div className="mt-6 space-y-3">
        {donorboxHref ? (
          <Button href={donorboxHref} external variant="primary" size="lg" className="w-full">
            <Heart size={18} /> Donate with Donorbox
          </Button>
        ) : null}
        {stripeHref ? (
          <Button href={stripeHref} external variant="secondary" size="lg" className="w-full">
            Donate with Card (Stripe) <ExternalLink size={16} />
          </Button>
        ) : null}
        {paypalHref ? (
          <Button href={paypalHref} external variant="secondary" size="lg" className="w-full">
            Donate with PayPal <ExternalLink size={16} />
          </Button>
        ) : null}

        {!anyProvider && (
          <>
            <Button
              href="mailto:hello@superstokedfoundation.org?subject=I%20want%20to%20donate"
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Heart size={18} /> Donate ${amount || 0}
              {frequency === "monthly" && " / month"}
            </Button>
            <p className="text-xs text-muted text-center leading-relaxed px-2">
              Online giving is launching soon. In the meantime, email us and we&apos;ll send you a
              secure donation link. Thank you for your patience.
            </p>
          </>
        )}
      </div>

      <p className="mt-6 text-xs text-muted text-center leading-relaxed">
        Superstoked Foundation is a registered 501(c)(3) nonprofit. Your donation is tax-deductible
        to the extent allowed by law. You&apos;ll receive a receipt by email.
      </p>
    </div>
  );
}
