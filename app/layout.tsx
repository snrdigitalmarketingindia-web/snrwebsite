import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import SiteNav from "@/components/SiteNav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNR Digital Marketing — Get More Customers Online in India",
  description:
    "SNR Digital Marketing helps Indian businesses get more customers through SEO, Google Ads, Meta Ads & Websites. Get a Free Business Growth Audit. Call +91 9989437777. Hyderabad.",
  keywords:
    "digital marketing hyderabad, get more customers online india, SEO agency india, google ads hyderabad, meta ads india, lead generation india, digital marketing agency hyderabad, business growth india",
  openGraph: {
    title: "SNR Digital Marketing — Get More Customers Online in India",
    description:
      "Struggling to get customers online? We help Indian businesses generate daily enquiries through SEO, Google Ads, Meta Ads & Websites. Free Business Growth Audit available.",
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
      <body className="min-h-screen antialiased">
          <AuthProvider>
            <SiteNav />
            {children}
          </AuthProvider>
        </body>
    </html>
  );
}
