"use client";
import { useState } from "react";

export default function StickyBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="sticky-bar-enter sticky top-0 left-0 right-0 z-50 bg-[#0D1528] border-b border-blue-500/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left message */}
        <p className="text-slate-300 text-xs sm:text-sm font-medium hidden sm:block">
          <span className="text-green-400 font-semibold">Limited spots this month</span>
          &nbsp;— Get your free business growth audit today
        </p>
        <p className="text-slate-300 text-xs font-medium sm:hidden">
          Free Growth Audit — Limited Spots
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Business%20Growth%20Audit&body=Hi%20SNR%2C%0A%0AI%20want%20a%20free%20business%20growth%20audit.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="btn-green px-3 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email Us
          </a>
          <a
            href="mailto:snrdigitalmarketingindia@gmail.com?subject=Free%20Business%20Growth%20Audit&body=Hi%20SNR%2C%0A%0AI%20want%20a%20free%20business%20growth%20audit.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-lg text-xs font-semibold items-center gap-1.5 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            Free Audit
          </a>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="ml-1 text-slate-500 hover:text-white transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
