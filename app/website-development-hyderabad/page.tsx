import type { Metadata } from "next";
import LocationPageLayout from "@/components/LocationPageLayout";
import { locationPages } from "@/lib/services-data";

const page = locationPages.find((l) => l.slug === "website-development-hyderabad")!;

export const metadata: Metadata = {
  alternates: { canonical: `https://www.snrdigitalmarketing.com/${page.slug}` },
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function WebsiteDevelopmentHyderabadPage() {
  return <LocationPageLayout page={page} />;
}
