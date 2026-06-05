"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormField, FormMessage } from "./FormField";
import { Button } from "@/components/shared/Button";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_SPONSOR || "";

export function SponsorForm() {
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
        <FormField label="Your name" name="name" required placeholder="Jane Doe" />
        <FormField label="Company / Organization" name="company" required placeholder="Acme Co." />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" name="email" type="email" required placeholder="you@company.com" />
        <FormField label="Website" name="website" placeholder="https://…" />
      </div>
      <FormField
        label="Type of partnership"
        name="partnership_type"
        options={[
          "Financial sponsorship",
          "Gear / in-kind donations",
          "Event partnership",
          "Cause marketing campaign",
          "Something else",
        ]}
        required
      />
      <FormField
        label="Tell us about your interest"
        name="message"
        textarea
        placeholder="What are you hoping to do together? Any ideas, timelines, or questions?"
      />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
        <Send size={16} />
        {status === "loading" ? "Sending…" : "Submit Inquiry"}
      </Button>
      <FormMessage status={status}>
        {status === "ok" && "Thanks — we'll be in touch to set up a conversation."}
        {status === "err" && "Something went wrong. Please try again, or email hello@superstokedfoundation.org."}
      </FormMessage>
    </form>
  );
}
