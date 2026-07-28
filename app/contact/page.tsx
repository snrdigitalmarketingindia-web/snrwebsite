import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact SNR Digital Marketing | Free Growth Audit — Hyderabad",
  description: "Get in touch with SNR Digital Marketing. Request a free business growth audit, ask about SEO, Google Ads, Meta Ads or Website Development. We reply within 2–4 hours.",
  alternates: {
    canonical: "https://www.snrdigitalmarketing.com/contact/",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
