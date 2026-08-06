import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { TenantProvider } from "@/components/TenantProvider";
import SiteNav from "@/components/SiteNav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE = "https://www.snrdigitalmarketing.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "SNR Digital Marketing — Get More Customers Online in India",
    template: "%s | SNR Digital Marketing",
  },
  description:
    "SNR Digital Marketing helps Indian businesses get more customers through SEO, Google Ads, Meta Ads & Websites. Get a Free Business Growth Audit. Based in Hyderabad.",
  alternates: {
    canonical: `${BASE}/`,
  },
  openGraph: {
    title: "SNR Digital Marketing — Get More Customers Online in India",
    description:
      "Struggling to get customers online? We help Indian businesses generate daily enquiries through SEO, Google Ads, Meta Ads & Websites. Free Business Growth Audit available.",
    siteName: "SNR Digital Marketing",
    url: BASE,
    locale: "en_IN",
    type: "website",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "SNR Digital Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SNR Digital Marketing — Get More Customers Online in India",
    description:
      "We help Indian businesses get more customers through SEO, Google Ads, Meta Ads & Websites. Free Business Growth Audit.",
    images: [`${BASE}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Global schema.org markup ──────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SNR Digital Marketing",
  "url": BASE,
  "logo": `${BASE}/logo.png`,
  "image": `${BASE}/og-image.png`,
  "email": "snrdigitalmarketingindia@gmail.com",
  "telephone": "+91-9989437777",
  "priceRange": "₹₹",
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
  "areaServed": [
    { "@type": "City", "name": "Hyderabad" },
    { "@type": "State", "name": "Telangana" },
    { "@type": "Country", "name": "India" },
  ],
  "knowsAbout": ["SEO", "Google Ads", "Meta Ads", "Digital Marketing", "GEO", "Website Development"],
  "sameAs": [
    "https://www.facebook.com/snrdigitalmarketing",
    "https://www.instagram.com/snrdigitalmarketing",
    "https://www.linkedin.com/company/snr-digital-marketing",
    "https://maps.app.goo.gl/7gU7V1dGZJrefpX4A",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SNR Digital Marketing",
  "url": BASE,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE}/blog/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${geist.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <AuthProvider>
          <TenantProvider>
            <SiteNav />
            {children}
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
