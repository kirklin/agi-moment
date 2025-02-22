import type { DefaultSeoProps } from "next-seo";

// 网站基本信息配置
const websiteConfig = {
  name: "AGI Moment",
  domain: "agimoment.com",
  baseUrl: "https://agimoment.com",
  logo: "https://agimoment.com/logo.png",
};

// 多语言描述
const descriptions = {
  en: "Exploring the Future of Artificial General Intelligence - Join us in understanding and shaping the development of AGI",
  zh: "探索通用人工智能的未来 - 与我们一起理解和塑造AGI的发展",
} as const;

// 多语言标题
const titles = {
  en: "AGI Moment - Future of Artificial General Intelligence",
  zh: "AGI时刻 - 通用人工智能的未来",
} as const;

// 默认SEO配置
export const defaultSEOConfig: DefaultSeoProps = {
  defaultTitle: titles.en,
  titleTemplate: `%s | ${websiteConfig.name}`,
  description: descriptions.en,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: websiteConfig.baseUrl,
    siteName: websiteConfig.name,
    title: titles.en,
    description: descriptions.en,
    images: [
      {
        url: websiteConfig.logo,
        width: 1200,
        height: 630,
        alt: `${websiteConfig.name} Logo`,
      },
    ],
  },

  twitter: {
    handle: "@lkirkun",
    site: "@lkirkun",
    cardType: "summary_large_image",
  },

  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],

  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
};

// 获取特定语言的SEO配置
export function getLanguageSEOConfig(lang: "en" | "zh"): DefaultSeoProps {
  return {
    ...defaultSEOConfig,
    defaultTitle: titles[lang],
    description: descriptions[lang],
    openGraph: {
      ...defaultSEOConfig.openGraph,
      locale: lang === "en" ? "en_US" : "zh_CN",
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}
