import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { servicePages } from "@/lib/services-data";

const page = servicePages.find((s) => s.slug === "seo-services")!;

export const metadata: Metadata = {
  alternates: { canonical: `https://www.snrdigitalmarketing.com/${page.slug}/` },
  title: page.metaTitle,
  description: page.metaDescription,
  openGraph: {
    type: "website",
    url: `https://www.snrdigitalmarketing.com/${page.slug}/`,
    title: page.metaTitle,
    description: page.metaDescription,
    siteName: "SNR Digital Marketing",
    images: [{ url: "https://www.snrdigitalmarketing.com/og-image.png", width: 1200, height: 630, alt: "SNR Digital Marketing" }],
  },
};

export default function SEOServicesPage() {
  return <ServicePageLayout page={page} />;
}
