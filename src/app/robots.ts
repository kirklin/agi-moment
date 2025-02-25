import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/static/",
        "/admin/",
      ],
    },
    sitemap: "https://agimoment.com/sitemap.xml",
    host: "https://agimoment.com",
  };
}
