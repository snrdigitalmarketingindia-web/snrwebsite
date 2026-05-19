import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { servicePages } from "@/lib/services-data";

const page = servicePages.find((s) => s.slug === "mobile-app-development")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function MobileAppPage() {
  return <ServicePageLayout page={page} />;
}
