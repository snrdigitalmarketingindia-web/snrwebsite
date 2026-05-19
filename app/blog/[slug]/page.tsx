import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import PageCTA from "@/components/PageCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogCard from "@/components/BlogCard";
import { blogPosts, type BlogSection } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.metaTitle, description: post.metaDescription };
}

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "h2":
      return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{section.text}</h2>;
    case "h3":
      return <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{section.text}</h3>;
    case "p":
      return <p key={i} className="text-slate-300 leading-relaxed mb-4">{section.text}</p>;
    case "ul":
      return (
        <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-slate-300">
          {section.items?.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 mb-4 text-slate-300">
          {section.items?.map((item, j) => <li key={j}>{item}</li>)}
        </ol>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
      />
      {/* Article header */}
      <article className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {post.category}
            </span>
            <span className="text-slate-600 text-xs">{post.readTime}</span>
            <span className="text-slate-600 text-xs">·</span>
            <span className="text-slate-600 text-xs">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 pb-10 border-b border-white/[0.07]">
            {post.excerpt}
          </p>

          {/* Article body */}
          <div className="prose-snr">
            {post.content.map((section, i) => renderSection(section, i))}
          </div>
        </div>
      </article>

      {post.faqs.length > 0 && (
        <FAQSection faqs={post.faqs} heading="Frequently Asked Questions" />
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20 px-6 bg-[#111C35]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <PageCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
