"use client";
import { useState, useRef, useEffect } from "react";
import { trackChatOpen, trackChatOption, trackWhatsApp } from "@/lib/analytics";

const WA_URL = "https://wa.me/919989437777?text=Hi%2C%20I%20want%20to%20grow%20my%20business%20online";

type Option = { label: string; value: string };
type Message = { from: "bot" | "user"; text: string; options?: Option[] };

const WELCOME: Message = {
  from: "bot",
  text: "Hi! 👋 I'm SNR's Digital Growth Assistant.\n\nHow can I help you grow your business today?",
  options: [
    { label: "How do I get more customers?", value: "more_customers" },
    { label: "What service do I need?", value: "which_service" },
    { label: "How fast can I see results?", value: "results_timeline" },
  ],
};

const FLOWS: Record<string, Message> = {
  more_customers: {
    from: "bot",
    text: "Great question! We help businesses get customers through SEO, Google Ads & Meta Ads.\n\nWhat type of business do you run?",
    options: [
      { label: "Hospital / Clinic", value: "ind_health" },
      { label: "Real Estate", value: "ind_realestate" },
      { label: "Education", value: "ind_edu" },
      { label: "E-commerce / Startup", value: "ind_other" },
    ],
  },
  which_service: {
    from: "bot",
    text: "Let me find the right service for you. What's your #1 goal right now?",
    options: [
      { label: "More calls & WhatsApp enquiries", value: "goal_calls" },
      { label: "More website visitors", value: "goal_traffic" },
      { label: "Need a new website", value: "goal_website" },
      { label: "More social media leads", value: "goal_social" },
    ],
  },
  results_timeline: {
    from: "bot",
    text: "Here's what to expect:\n\n⚡ Google Ads → Results in 1–2 weeks\n📈 Meta Ads → Results in 2–3 weeks\n🔍 SEO → Results in 2–3 months\n🌐 New Website → Ready in 1–2 weeks\n\nWant a free audit for your business?",
    options: [
      { label: "Get Free Business Audit", value: "cta_audit" },
      { label: "Talk to an expert", value: "cta_whatsapp" },
    ],
  },
  ind_health: {
    from: "bot",
    text: "For hospitals & clinics, Google Ads + Local SEO is the winning combo.\n\nPatients search for doctors online daily. We can get you daily patient enquiries within 2 weeks. 🏥",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  ind_realestate: {
    from: "bot",
    text: "For real estate, Meta Ads + Google Ads generates the best leads.\n\nWe create campaigns that bring daily property enquiries via WhatsApp. 🏠",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  ind_edu: {
    from: "bot",
    text: "For education businesses, SEO + Google Ads drives the best student admissions.\n\nWe help coaching centres, schools and colleges fill seats every semester. 🎓",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  ind_other: {
    from: "bot",
    text: "We work with all types of businesses across India.\n\nOur growth experts will understand your business and suggest the best strategy — completely free. 🚀",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  goal_calls: {
    from: "bot",
    text: "For more calls & WhatsApp enquiries, Google Ads + a conversion landing page is the fastest path.\n\nMost clients see daily enquiries within 2 weeks of launch.",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  goal_traffic: {
    from: "bot",
    text: "For more visitors, SEO is the long-term winner. For instant traffic, Google Ads is fastest.\n\nWe recommend Google Ads now + SEO running in parallel for compounding results.",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  goal_website: {
    from: "bot",
    text: "We build fast, mobile-first websites designed to convert visitors into customers.\n\nTypical delivery: 1–2 weeks. Every website includes WhatsApp + call lead capture. 🌐",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  goal_social: {
    from: "bot",
    text: "For social media leads, Meta Ads (Facebook + Instagram) is the best channel.\n\nWe run targeted campaigns that bring WhatsApp enquiries daily for your business.",
    options: [{ label: "Talk to Expert on WhatsApp", value: "cta_whatsapp" }],
  },
  cta_audit: {
    from: "bot",
    text: "Our free Business Growth Audit includes:\n\n✓ SEO health check\n✓ Competitor analysis\n✓ Top 3 growth opportunities\n✓ Recommended ad strategy\n\nConnect with our expert on WhatsApp 👇",
    options: [{ label: "Get Free Audit on WhatsApp", value: "cta_whatsapp" }],
  },
};

function BotIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const [showUnread, setShowUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function handleOption(value: string, label: string) {
    if (value === "cta_whatsapp") {
      trackWhatsApp("chat_widget");
      window.open(WA_URL, "_blank");
      return;
    }

    trackChatOption(label);

    const userMsg: Message = { from: "user", text: label };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = FLOWS[value];
      if (response) setMessages((prev) => [...prev, response]);
    }, 900);
  }

  function handleOpen() {
    setOpen(true);
    setShowUnread(false);
    trackChatOpen();
  }

  const lastOptions = [...messages].reverse().find((m) => m.options)?.options;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-80 sm:w-96 bg-[#0D1528] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "480px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111C35] border-b border-white/[0.07]">
            <div className="flex items-center gap-2.5">
              <BotIcon />
              <div>
                <p className="text-white text-sm font-semibold">SNR Growth Assistant</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online — Typically replies instantly
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white p-1 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ maxHeight: "320px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && <BotIcon />}
                <div className={`max-w-[85%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.from === "bot"
                      ? "bg-[#1A2540] text-slate-200 rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                  {/* Options only show on last bot message */}
                  {msg.from === "bot" && msg.options && i === messages.length - 1 && (
                    <div className="flex flex-col gap-1.5 w-full">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleOption(opt.value, opt.label)}
                          className="text-left text-xs px-3 py-2 rounded-xl border border-blue-500/30 text-blue-300 bg-blue-500/8 hover:bg-blue-500/20 hover:border-blue-500/60 transition-all duration-150 font-medium"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2 justify-start">
                <BotIcon />
                <div className="bg-[#1A2540] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Restart */}
          {messages.length > 2 && !typing && (
            <div className="px-4 py-2 border-t border-white/[0.05] flex justify-between items-center">
              <button
                onClick={() => setMessages([WELCOME])}
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
              >
                ↺ Start over
              </button>
              {lastOptions?.some((o) => o.value !== "cta_whatsapp") && (
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors">
                  Jump to WhatsApp →
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={handleOpen}
        aria-label="Open chat assistant"
        className="relative w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-xl hover:bg-blue-500 transition-all duration-200 hover:scale-110"
        style={{ boxShadow: "0 4px 24px rgba(59,130,246,0.45)" }}
      >
        {showUnread && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            1
          </span>
        )}
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
