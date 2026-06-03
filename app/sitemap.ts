import type { MetadataRoute } from "next";
import { servicePages, locationPages } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

const BASE = "https://snrdigitalmarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const services: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${BASE}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const locations: MetadataRoute.Sitemap = locationPages.map((l) => ({
    url: `${BASE}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...services, ...locations, ...posts];
}
