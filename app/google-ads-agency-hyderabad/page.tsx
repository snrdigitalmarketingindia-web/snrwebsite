import type { Metadata } from "next";
import LocationPageLayout from "@/components/LocationPageLayout";
import { locationPages } from "@/lib/services-data";

const page = locationPages.find((p) => p.slug === "google-ads-agency-hyderabad")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function GoogleAdsHyderabadPage() {
  return <LocationPageLayout page={page} />;
}
