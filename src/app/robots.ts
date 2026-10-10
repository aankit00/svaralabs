import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    // Login and app pages use noindex; allow crawlers to read that directive.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
