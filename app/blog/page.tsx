import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.snrdigitalmarketing.com/blog/" },
  title: { absolute: "Digital Marketing Blog — SEO, Google Ads & Growth Tips | SNR Digital Marketing" },
  description:
    "Expert insights on SEO, Google Ads, Meta Ads, and digital marketing for Indian businesses. Updated monthly by SNR Digital Marketing, Hyderabad.",
  openGraph: {
    type: "website",
    url: "https://www.snrdigitalmarketing.com/blog/",
    title: { absolute: "Digital Marketing Blog — SEO, Google Ads & Growth Tips | SNR Digital Marketing" },
    description: "Expert insights on SEO, Google Ads, Meta Ads, and digital marketing for Indian businesses. Updated monthly by SNR Digital Marketing, Hyderabad.",
    siteName: "SNR Digital Marketing",
    images: [{ url: "https://www.snrdigitalmarketing.com/og-image.png", width: 1200, height: 630, alt: "SNR Digital Marketing" }],
  },
};

const BASE = "https://www.snrdigitalmarketing.com";

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "SNR Digital Marketing Blog",
  "description": "Expert insights on SEO, Google Ads, Meta Ads, and digital marketing for Indian businesses.",
  "url": `${BASE}/blog/`,
  "publisher": {
    "@type": "ProfessionalService",
    "name": "SNR Digital Marketing",
    "url": BASE,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SNR Digital Marketing Blog Posts",
  "url": `${BASE}/blog/`,
  "itemListElement": [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.title,
      "url": `${BASE}/blog/${p.slug}/`,
    })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog/` },
  ],
};

export default function BlogIndex() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="py-24 px-6 bg-[#0A0F1E]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Insights & Guides</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Digital Marketing Blog</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Practical SEO, Google Ads, and growth strategies for Indian businesses — written by our team in Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
