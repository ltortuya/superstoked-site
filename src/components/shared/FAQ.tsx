"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = { q: string; a: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-foam">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left hover:bg-ocean-deep/[0.02] transition-colors"
            >
              <span className="font-semibold text-ocean-deep text-[1.05rem] leading-snug">
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={`text-ocean-mid shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div className="px-5 sm:px-7 pb-6 text-ink-soft leading-relaxed">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
