import type { MetadataRoute } from "next";
import { servicePages, locationPages } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

const BASE = "https://www.snrdigitalmarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,              lastModified: new Date("2026-08-06") },
    { url: `${BASE}/about/`,        lastModified: new Date("2026-08-06") },
    { url: `${BASE}/contact/`,      lastModified: new Date("2026-08-06") },
    { url: `${BASE}/blog/`,         lastModified: new Date("2026-08-06") },
    { url: `${BASE}/case-studies/`, lastModified: new Date("2026-07-01") },
    { url: `${BASE}/privacy-policy/`, lastModified: new Date("2026-01-01") },
  ];

  const services: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${BASE}/${s.slug}/`,
    lastModified: new Date("2026-08-06"),
  }));

  const locations: MetadataRoute.Sitemap = locationPages.map((l) => ({
    url: `${BASE}/${l.slug}/`,
    lastModified: new Date("2026-08-06"),
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}/`,
    lastModified: (p.schema?.dateModified as string) ?? p.publishedAt,
  }));

  return [...core, ...services, ...locations, ...posts];
}
