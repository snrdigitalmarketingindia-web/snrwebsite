import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Digital Marketing Blog — SEO, Google Ads & Growth Tips | SNR Digital Marketing",
  description:
    "Expert insights on SEO, Google Ads, Meta Ads, and digital marketing for Indian businesses. Updated monthly by SNR Digital Marketing, Hyderabad.",
};

export default function BlogIndex() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
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
