"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormField, FormMessage } from "./FormField";
import { Button } from "@/components/shared/Button";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT || "";

export function ContactForm() {
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
      <FormField label="Your name" name="name" required placeholder="Jane Doe" />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
      />
      <FormField
        label="Message"
        name="message"
        textarea
        required
        placeholder="Tell us what's on your mind…"
      />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
        <Send size={16} />
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>
      <FormMessage status={status}>
        {status === "ok" && "Thanks — we'll be in touch soon."}
        {status === "err" && "Something went wrong. Please try again, or email us directly."}
      </FormMessage>
    </form>
  );
}
