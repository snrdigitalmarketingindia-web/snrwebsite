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
          "/admin/",
          "/super-admin",
          "/super-admin/",
          "/dashboard",
          "/dashboard/",
          "/campaigns",
          "/campaigns/",
          "/ai-operator",
          "/ai-operator/",
          "/onboarding",
          "/onboarding/",
          "/login",
          "/login/",
          "/signup",
          "/signup/",
        ],
      },
    ],
    sitemap: "https://www.snrdigitalmarketing.com/sitemap.xml",
  };
}
