import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/google-ads-agency-hyderabad/" },
  robots: { index: false, follow: true },
};

export default function GoogleAdsManagementPage() {
  redirect("/google-ads-agency-hyderabad/");
}
