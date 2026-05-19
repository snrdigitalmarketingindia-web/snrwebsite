import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNR Digital Marketing — Your Digital Growth Partner",
  description:
    "SNR Digital Marketing helps Indian businesses grow online through SEO, Google Ads, Meta Ads, Websites, Mobile Apps and AI/GEO. Based in Hyderabad.",
  keywords:
    "digital marketing hyderabad, SEO india, google ads, meta ads, website design, mobile app development, AI marketing",
  openGraph: {
    title: "SNR Digital Marketing — Your Digital Growth Partner",
    description:
      "Get more leads, customers and growth with SNR Digital Marketing. SEO, Ads, Websites & More.",
    siteName: "SNR Digital Marketing",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
