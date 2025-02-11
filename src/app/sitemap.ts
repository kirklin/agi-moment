import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agimoment.com";
  const lastModified = new Date();

  // 定义所有路由及其语言变体
  const routes = [
    {
      url: "/",
      languages: ["en", "zh"],
    },
    {
      url: "/about",
      languages: ["en", "zh"],
    },
  ];

  // 生成所有URL组合
  const sitemapEntries = routes.flatMap((route) => {
    // 默认URL
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}${route.url}`,
        lastModified,
        changeFrequency: route.url === "/" ? "daily" : "monthly",
        priority: route.url === "/" ? 1 : 0.8,
      },
    ];

    // 为每个语言生成URL
    route.languages.forEach((lang) => {
      entries.push({
        url: `${baseUrl}/${lang}${route.url}`,
        lastModified,
        changeFrequency: route.url === "/" ? "daily" : "monthly",
        priority: route.url === "/" ? 0.9 : 0.7,
      });
    });

    return entries;
  });

  return sitemapEntries;
}
