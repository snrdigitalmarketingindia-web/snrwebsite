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
    canonical: BASE,
  },
  openGraph: {
    title: "SNR Digital Marketing — Get More Customers Online in India",
    description:
      "Struggling to get customers online? We help Indian businesses generate daily enquiries through SEO, Google Ads, Meta Ads & Websites. Free Business Growth Audit available.",
    siteName: "SNR Digital Marketing",
    url: BASE,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNR Digital Marketing — Get More Customers Online in India",
    description:
      "We help Indian businesses get more customers through SEO, Google Ads, Meta Ads & Websites. Free Business Growth Audit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Global schema.org markup ──────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SNR Digital Marketing",
  "url": BASE,
  "logo": `${BASE}/logo.png`,
  "email": "snrdigitalmarketingindia@gmail.com",
  "telephone": "+91-9989437777",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN",
  },
  "sameAs": [
    "https://www.facebook.com/snrdigitalmarketing",
    "https://www.instagram.com/snrdigitalmarketing",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SNR Digital Marketing",
  "url": BASE,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE}/blog?q={search_term_string}`,
    },
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
