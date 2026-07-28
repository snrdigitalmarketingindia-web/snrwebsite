import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { servicePages } from "@/lib/services-data";

const page = servicePages.find((s) => s.slug === "social-media-management")!;

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/social-media-management/" },
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function SocialMediaManagementPage() {
  return <ServicePageLayout page={page} />;
}
