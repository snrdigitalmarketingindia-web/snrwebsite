import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact SNR Digital Marketing | Free Growth Audit — Hyderabad",
  description: "Get in touch with SNR Digital Marketing. Request a free business growth audit, ask about SEO, Google Ads, Meta Ads or Website Development. We reply within 2–4 hours.",
  alternates: {
    canonical: "https://www.snrdigitalmarketing.com/contact/",
  },
  openGraph: {
    type: "website",
    url: "https://www.snrdigitalmarketing.com/contact/",
    title: "Contact SNR Digital Marketing | Free Growth Audit — Hyderabad",
    description: "Get in touch with SNR Digital Marketing. Request a free business growth audit, ask about SEO, Google Ads, Meta Ads or Website Development. We reply within 2–4 hours.",
    siteName: "SNR Digital Marketing",
    images: [{ url: "https://www.snrdigitalmarketing.com/og-image.png", width: 1200, height: 630, alt: "SNR Digital Marketing" }],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
