import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const BASE = "https://www.snrdigitalmarketing.com";

export const metadata: Metadata = {
  title: { absolute: "Contact SNR Digital Marketing | Free Growth Audit — Hyderabad" },
  description: "Get in touch with SNR Digital Marketing. Request a free business growth audit, ask about SEO, Google Ads, Meta Ads or Website Development. We reply within 2–4 hours.",
  alternates: {
    canonical: `${BASE}/contact/`,
  },
  openGraph: {
    type: "website",
    url: `${BASE}/contact/`,
    title: { absolute: "Contact SNR Digital Marketing | Free Growth Audit — Hyderabad" },
    description: "Get in touch with SNR Digital Marketing. Request a free business growth audit, ask about SEO, Google Ads, Meta Ads or Website Development. We reply within 2–4 hours.",
    siteName: "SNR Digital Marketing",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "SNR Digital Marketing" }],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact SNR Digital Marketing",
  "url": `${BASE}/contact/`,
  "description": "Contact page for SNR Digital Marketing — Hyderabad's digital marketing agency.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE}/contact/` },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SNR Digital Marketing",
  "url": BASE,
  "telephone": "+91-9989437777",
  "email": "snrdigitalmarketingindia@gmail.com",
  "priceRange": "₹₹",
  "image": `${BASE}/og-image.png`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500079",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.3850",
    "longitude": "78.4867",
  },
  "hasMap": "https://maps.app.goo.gl/7gU7V1dGZJrefpX4A",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "21:00",
    },
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "snrdigitalmarketingindia@gmail.com",
    "availableLanguage": ["English", "Telugu", "Hindi"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <ContactForm />
    </>
  );
}
