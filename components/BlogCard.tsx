import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-[#111C35] rounded-2xl border border-white/[0.07] p-6 hover:border-blue-500/30 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {post.category}
        </span>
        <span className="text-xs text-slate-600">{post.readTime}</span>
      </div>
      <h3 className="text-white font-semibold text-base sm:text-lg leading-snug mb-3 group-hover:text-blue-300 transition-colors">
        {post.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-slate-600 text-xs">
          {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </span>
        <span className="text-blue-400 text-sm font-medium group-hover:underline">Read more →</span>
      </div>
    </Link>
  );
}
