import type { Metadata } from "next";
import LocationPageLayout from "@/components/LocationPageLayout";
import { locationPages } from "@/lib/services-data";

const page = locationPages.find((p) => p.slug === "google-ads-agency-hyderabad")!;

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

export default function GoogleAdsHyderabadPage() {
  return <LocationPageLayout page={page} />;
}
