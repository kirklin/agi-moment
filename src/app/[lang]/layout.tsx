import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "~/components/Footer";
import MouseFollower from "~/components/MouseFollower";
import Navbar from "~/components/Navbar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// 支持的语言列表
const languages = ["en", "zh"] as const;
type Lang = (typeof languages)[number];

// 网站基本信息
const websiteConfig = {
  name: "AGI Moment",
  domain: "agimoment.com",
  baseUrl: "https://agimoment.com",
  logo: "https://agimoment.com/logo.png",
  defaultDescription: "Exploring the Future of Artificial General Intelligence - Join us in understanding and shaping the development of AGI",
};

// 多语言描述
const descriptions: Record<Lang, string> = {
  en: "Exploring the Future of Artificial General Intelligence - Join us in understanding and shaping the development of AGI",
  zh: "探索通用人工智能的未来 - 与我们一起理解和塑造AGI的发展",
};

// 多语言标题
const titles: Record<Lang, string> = {
  en: "AGI Moment - Future of Artificial General Intelligence",
  zh: "AGI时刻 - 通用人工智能的未来",
};

export async function generateMetadata({ params: { lang } }: { params: { lang: Lang } }): Promise<Metadata> {
  const alternateLanguages = languages.reduce((acc, cur) => {
    acc[cur] = `${websiteConfig.baseUrl}/${cur}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    metadataBase: new URL(websiteConfig.baseUrl),
    title: {
      template: `%s | ${websiteConfig.name}`,
      default: titles[lang],
    },
    description: descriptions[lang],
    applicationName: websiteConfig.name,
    referrer: "origin-when-cross-origin",
    keywords: ["AGI", "Artificial General Intelligence", "AI", "Future", "Technology", "Machine Learning", "Deep Learning", "Neural Networks", "AI Timeline", "AI Development"],
    authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
    creator: "Kirk Lin",
    publisher: websiteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${websiteConfig.baseUrl}/${lang}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: websiteConfig.baseUrl,
      siteName: websiteConfig.name,
      images: [
        {
          url: websiteConfig.logo,
          width: 1200,
          height: 630,
          alt: `${websiteConfig.name} Logo`,
        },
      ],
      locale: lang,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        "index": true,
        "follow": true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang],
      description: descriptions[lang],
      creator: "@lkirkun",
      images: [websiteConfig.logo],
    },
    verification: {
      google: "google-site-verification-code",
    },
    other: {
      "baidu-site-verification": "baidu-verification-code",
    },
  };
}

// JSON-LD结构化数据
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": websiteConfig.name,
  "url": websiteConfig.baseUrl,
  "description": websiteConfig.defaultDescription,
  "publisher": {
    "@type": "Organization",
    "name": websiteConfig.name,
    "logo": {
      "@type": "ImageObject",
      "url": websiteConfig.logo,
    },
  },
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {languages.map(l => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${websiteConfig.baseUrl}/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${websiteConfig.baseUrl}/en`}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <MouseFollower />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
