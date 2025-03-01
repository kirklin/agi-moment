import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // 配置网站的规范域名
  // 网站会自动将普通域名(https://agimoment.com)重定向到www域名(https://www.agimoment.com)
  // 因此www版本是规范版本(canonical version)
  const baseUrl = "https://www.agimoment.com";
  const nonWwwBaseUrl = "https://agimoment.com";

  // 由于已配置重定向，sitemap只需包含规范版本(www)的URL
  const includeNonWwwVersion = false;

  const currentDate = new Date();

  // Define all routes
  const routes = [
    {
      url: "/",
      changeFrequency: "weekly" as const,
      priority: 1.0,
      lastModified: currentDate,
    },
    {
      url: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.9,
      lastModified: currentDate,
    },
    // Future content
    {
      url: "/blog",
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: currentDate,
    },
  ];

  // Generate sitemap entries
  let sitemapEntries: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 如果需要，添加非www版本的URL（通常不需要，因为已配置重定向）
  if (includeNonWwwVersion) {
    const nonWwwEntries = routes.map(route => ({
      url: `${nonWwwBaseUrl}${route.url}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
    sitemapEntries = [...sitemapEntries, ...nonWwwEntries];
  }

  // Add special entries for AI milestones as creative explorations
  const milestones = [
    {
      id: "turing-test",
      year: 1950,
      title: "The Turing Test",
      description: "A creative exploration of Alan Turing's famous test and its implications for machine intelligence",
    },
    {
      id: "backpropagation",
      year: 1986,
      title: "Backpropagation Algorithm",
      description: "Visual storytelling of how neural networks learn through the revolutionary backpropagation algorithm",
    },
    {
      id: "deep-blue",
      year: 1997,
      title: "Deep Blue Defeats Kasparov",
      description: "An interactive experience exploring the historic chess match between IBM's Deep Blue and Garry Kasparov",
    },
    {
      id: "watson",
      year: 2011,
      title: "IBM Watson",
      description: "Creative visualization of Watson's Jeopardy! victory and what it meant for question-answering systems",
    },
    {
      id: "alphago",
      year: 2016,
      title: "AlphaGo Defeats Lee Sedol",
      description: "Digital art project examining the cultural and technological significance of DeepMind's Go-playing AI",
    },
    {
      id: "chatgpt",
      year: 2022,
      title: "ChatGPT Launch",
      description: "Interactive exploration of how large language models are changing our relationship with technology",
    },
    {
      id: "multimodal-ai",
      year: 2023,
      title: "Multimodal AI Revolution",
      description: "Visual journey through the integration of text, image, and audio understanding in modern AI systems",
    },
  ];

  // Add milestone pages to sitemap
  milestones.forEach((milestone) => {
    sitemapEntries.push({
      url: `${baseUrl}/milestones/${milestone.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    });

    // 如果需要，添加非www版本的里程碑页面
    if (includeNonWwwVersion) {
      sitemapEntries.push({
        url: `${nonWwwBaseUrl}/milestones/${milestone.id}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  // Add creative showcase pages
  const showcaseCategories = ["interactive", "visualization", "thought-experiment", "digital-art"];

  showcaseCategories.forEach((category) => {
    sitemapEntries.push({
      url: `${baseUrl}/showcase/${category}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });

    // 如果需要，添加非www版本的展示页面
    if (includeNonWwwVersion) {
      sitemapEntries.push({
        url: `${nonWwwBaseUrl}/showcase/${category}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  });

  return sitemapEntries;
}
