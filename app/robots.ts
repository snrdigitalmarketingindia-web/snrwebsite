import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/super-admin",
          "/dashboard",
          "/campaigns",
          "/ai-operator",
          "/onboarding",
          "/login",
          "/signup",
        ],
      },
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "Amazonbot",       allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://www.snrdigitalmarketing.com/sitemap.xml",
  };
}
