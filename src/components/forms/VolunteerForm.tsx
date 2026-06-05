"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormField, FormMessage } from "./FormField";
import { Button } from "@/components/shared/Button";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_VOLUNTEER || "";

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        if (!res.ok) throw new Error("Submit failed");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" required placeholder="Your name" />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />
      </div>
      <FormField
        label="Where are you based?"
        name="location"
        placeholder="City, State / Country"
        hint="California? The Philippines? Somewhere else? Let us know."
      />
      <FormField
        label="How would you like to help?"
        name="interest"
        options={[
          "Surf program volunteer",
          "Event / fundraiser volunteer",
          "Gear drive coordinator",
          "Mentor (California or remote)",
          "On-the-ground in the Philippines",
          "Other (I'll explain below)",
        ]}
        required
      />
      <FormField
        label="Tell us a bit about yourself"
        name="message"
        textarea
        placeholder="Skills, availability, or anything you want us to know…"
      />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
        <Send size={16} />
        {status === "loading" ? "Sending…" : "Submit Volunteer Interest"}
      </Button>
      <FormMessage status={status}>
        {status === "ok" && "Thanks for raising your hand — we'll follow up within a week."}
        {status === "err" && "Something went wrong. Please try again, or email hello@superstokedfoundation.org."}
      </FormMessage>
    </form>
  );
}
