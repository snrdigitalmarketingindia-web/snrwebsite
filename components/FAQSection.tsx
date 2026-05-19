"use client";
import { useState } from "react";

type FAQ = { q: string; a: string };

export default function FAQSection({ faqs, heading = "Frequently Asked Questions" }: { faqs: FAQ[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-[#0A0F1E]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">{heading}</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.07] bg-[#111C35] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base leading-snug">{faq.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-transform ${open === i ? "rotate-180" : ""}`}>
                  <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
