import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNR Digital Marketing — Get More Customers Online | Hyderabad",
  description:
    "SNR Digital Marketing helps Indian businesses get more customers through SEO, Google Ads, Meta Ads, Websites & Mobile Apps. Free consultation available. Call +91 9989437777.",
  keywords:
    "digital marketing hyderabad, SEO india, google ads agency hyderabad, meta ads india, website design hyderabad, lead generation india, digital marketing agency india",
  openGraph: {
    title: "SNR Digital Marketing — Get More Customers Online",
    description:
      "Get more leads, enquiries and customers with SNR Digital Marketing. SEO, Google Ads, Meta Ads, Websites & More. Based in Hyderabad, serving all of India.",
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
