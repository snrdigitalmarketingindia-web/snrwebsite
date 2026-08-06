import type { Metadata } from "next";
import Link from "next/link";
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

const BASE = "https://www.snrdigitalmarketing.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${BASE}/blog/${slug}/`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      siteName: "SNR Digital Marketing",
      images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: post.coverAlt }],
    },
  };
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog/` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE}/blog/${slug}/` },
    ],
  };

  const fullSchema = {
    ...post.schema,
    "image": { "@type": "ImageObject", "url": `${BASE}/og-image.png`, "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE}/blog/${slug}/` },
    "description": post.metaDescription,
    "publisher": {
      "@type": "ProfessionalService",
      "name": "SNR Digital Marketing",
      "url": BASE,
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png`, "width": 180, "height": 60 },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Article header */}
      <article className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-slate-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{post.category}</span>
          </nav>

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

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author bio */}
          <div className="flex items-center gap-4 py-5 border-y border-white/[0.07] mb-10">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <Link href="/about/" className="text-white font-semibold text-sm hover:text-blue-400 transition-colors">
                Srinivas Reddy
              </Link>
              <p className="text-slate-500 text-xs mt-0.5">
                Founder, SNR Digital Marketing · Digital marketing strategist helping Indian businesses grow online through SEO, Google Ads, Meta Ads &amp; GEO.
              </p>
            </div>
          </div>

          {/* Article body */}
          <div className="prose-snr">
            {post.content.map((section, i) => renderSection(section, i))}
          </div>
        </div>
      </article>

      {/* Related service CTA */}
      {post.relatedServiceHref && post.relatedServiceLabel && (
        <section className="py-12 px-6 bg-[#111C35] border-y border-white/[0.06]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-slate-300 text-base">
              Interested in this for your business?{" "}
              <span className="text-white font-semibold">{post.relatedServiceLabel}</span>
            </p>
            <a
              href={post.relatedServiceHref}
              className="btn-green flex-shrink-0 px-7 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
            >
              Learn More →
            </a>
          </div>
        </section>
      )}

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
