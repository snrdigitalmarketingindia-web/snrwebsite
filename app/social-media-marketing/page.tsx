import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/social-media-management/" },
  robots: { index: false, follow: true },
};

export default function SocialMediaMarketingPage() {
  redirect("/social-media-management/");
}
