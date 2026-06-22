import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/privacy-policy" },
  title: "Privacy Policy | SNR Digital Marketing",
  description: "SNR Digital Marketing privacy policy — how we collect, use and protect your personal data in accordance with India's Digital Personal Data Protection Act 2023.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "1. Who We Are",
    content: `SNR Digital Marketing ("we", "us", "our") is a digital marketing agency based in Hyderabad, Telangana, India. We operate the website www.snrdigitalmarketing.com and provide digital marketing services including SEO, Google Ads, Meta Ads, website development, and Generative Engine Optimization (GEO).

Contact: snrdigitalmarketingindia@gmail.com`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect personal information only when you voluntarily provide it to us. This includes:

• Contact form submissions: your name, email address, business name, and message
• Lead audit form: your name, phone number, business type, goal, and budget
• Email correspondence: any information you share when you email us
• Analytics: anonymised usage data collected via Google Analytics 4 (no personally identifiable information)

We do not collect sensitive personal data such as financial information, government ID numbers, or health data.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information you provide solely to:

• Respond to your enquiries and provide the services you requested
• Send you the free business growth audit you requested
• Improve our website and services based on anonymised usage analytics
• Comply with legal obligations

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `Under India's Digital Personal Data Protection Act 2023 (DPDP Act), we process your personal data on the following bases:

• Consent: you voluntarily submit your details through our forms
• Legitimate interest: to respond to your business enquiries
• Contractual necessity: to deliver services you have engaged us for

You may withdraw consent at any time by emailing us at snrdigitalmarketingindia@gmail.com.`,
  },
  {
    title: "5. Cookies and Analytics",
    content: `Our website uses Google Analytics 4 to understand how visitors use our site. This service collects anonymised data including pages visited, time spent, and approximate location (city level). We do not use cookies for advertising targeting or cross-site tracking.

You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on or adjusting your browser's cookie settings.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal data only for as long as necessary to provide our services or as required by law:

• Form submissions and enquiries: retained for 2 years or until you request deletion
• Active client data: retained for the duration of our engagement plus 1 year
• Analytics data: anonymised data retained per Google Analytics default settings (14 months)`,
  },
  {
    title: "7. Your Rights",
    content: `Under the DPDP Act 2023 and applicable laws, you have the right to:

• Access the personal data we hold about you
• Correct inaccurate personal data
• Request deletion of your personal data
• Withdraw consent for data processing
• Lodge a complaint with the Data Protection Board of India

To exercise any of these rights, email us at snrdigitalmarketingindia@gmail.com. We will respond within 30 days.`,
  },
  {
    title: "8. Data Security",
    content: `We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. Our website is served over HTTPS. Form data is transmitted securely via EmailJS (TLS encrypted) and stored in Supabase (ISO 27001 certified infrastructure).

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "9. Third-Party Services",
    content: `We use the following third-party services that may process data on our behalf:

• Google Analytics 4: website analytics (Google LLC, USA)
• EmailJS: email delivery for contact forms (EmailJS Ltd)
• Supabase: database for lead storage (Supabase Inc, USA)
• Vercel / GitHub Pages: website hosting

Each of these services has its own privacy policy. We have data processing agreements in place where required.`,
  },
  {
    title: "10. Children's Privacy",
    content: `Our services are not directed to children under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, please contact us and we will delete it promptly.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last updated. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "12. Contact Us",
    content: `For any privacy-related queries, requests, or complaints, please contact:

SNR Digital Marketing
Hyderabad, Telangana, India
Email: snrdigitalmarketingindia@gmail.com

We aim to respond to all privacy requests within 30 days.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-12">Last updated: June 2026 · Effective from: 2024</p>

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-white font-semibold text-lg mb-3">{s.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
