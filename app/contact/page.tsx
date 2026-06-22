"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";

const EMAIL = "snrdigitalmarketingindia@gmail.com";

const faqs = [
  { q: "How quickly will you respond?", a: "We respond to all emails within 2–4 business hours during Mon–Sat 9 AM to 7 PM IST." },
  { q: "Do you offer a free consultation?", a: "Yes — every enquiry starts with a free 30-minute growth strategy call. No commitment required." },
  { q: "Which cities do you serve?", a: "We work with businesses across India. Our headquarters is in Hyderabad but we serve clients in Bangalore, Mumbai, Chennai, Delhi, Pune, and beyond." },
];

export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Form: ${name} — ${business || "General Enquiry"}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\n\nMessage:\n${message}`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 px-6 bg-[#0A0F1E] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact SNR Digital Marketing</h1>
          <p className="text-slate-300 text-lg">
            Ready to grow your business online? Send us a message and we&apos;ll get back to you within 2–4 hours.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 px-6 bg-[#111C35]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            {sent ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Your email client has opened with your message pre-filled. We&apos;ll reply within 2–4 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5 font-medium">Your Name *</label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5 font-medium">Your Email *</label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5 font-medium">Business Name</label>
                  <input
                    type="text" value={business} onChange={(e) => setBusiness(e.target.value)}
                    placeholder="e.g. City Dental Clinic"
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1.5 font-medium">Message *</label>
                  <textarea
                    value={message} onChange={(e) => setMessage(e.target.value)} required rows={4}
                    placeholder="Tell us about your business and what you'd like help with..."
                    className="w-full bg-[#0A0F1E] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-green w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Our Details</h2>

            <div className="flex flex-col gap-4">
              <div className="bg-[#0A0F1E] rounded-2xl p-5 border border-white/[0.07] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="bg-[#0A0F1E] rounded-2xl p-5 border border-white/[0.07] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Location</p>
                  <p className="text-white text-sm font-medium">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <div className="bg-[#0A0F1E] rounded-2xl p-5 border border-white/[0.07] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Business Hours</p>
                  <p className="text-white text-sm font-medium">Mon – Sat · 9:00 AM – 7:00 PM IST</p>
                  <p className="text-slate-500 text-xs mt-0.5">We reply to emails within 2–4 hours</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-2">
              <h3 className="text-white font-semibold mb-4">Common Questions</h3>
              <div className="flex flex-col gap-3">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-[#0A0F1E] rounded-xl p-4 border border-white/[0.07]">
                    <p className="text-white text-sm font-medium mb-1">{f.q}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services quick links */}
      <section className="py-12 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-500 text-sm mb-6">Looking for a specific service?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "SEO Services", href: "/seo-services" },
              { label: "Google Ads", href: "/google-ads-management" },
              { label: "Meta Ads", href: "/meta-ads-management" },
              { label: "Website Development", href: "/website-development" },
              { label: "AI & GEO", href: "/ai-geo-optimization" },
            ].map((s) => (
              <Link key={s.href} href={s.href}
                className="px-4 py-2 rounded-xl bg-[#111C35] border border-white/[0.07] text-slate-300 hover:text-white hover:border-white/20 text-sm transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
