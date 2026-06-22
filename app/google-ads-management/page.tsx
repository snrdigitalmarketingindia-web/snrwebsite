import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { servicePages } from "@/lib/services-data";

const page = servicePages.find((s) => s.slug === "google-ads-management")!;

export const metadata: Metadata = {
  alternates: { canonical: `https://www.snrdigitalmarketing.com/${page.slug}` },
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function GoogleAdsPage() {
  return <ServicePageLayout page={page} />;
}
