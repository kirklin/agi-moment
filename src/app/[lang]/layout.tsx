import { Inter } from "next/font/google";
import Analytics from "~/components/Analytics";
import Footer from "~/components/Footer";
import MouseFollower from "~/components/MouseFollower";
import Navbar from "~/components/Navbar";
import { DefaultSEO } from "~/components/SEO";
import { getLanguageSEOConfig } from "~/config/next-seo.config";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// 支持的语言列表
const _languages = ["en", "zh"] as const;
type Lang = (typeof _languages)[number];

// 网站基本信息
const websiteConfig = {
  name: "AGI Moment",
  domain: "agimoment.com",
  baseUrl: "https://agimoment.com",
  logo: "https://agimoment.com/logo.png",
};

// JSON-LD结构化数据
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": websiteConfig.name,
  "url": websiteConfig.baseUrl,
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
  const seoConfig = getLanguageSEOConfig(lang);

  return (
    <html lang={lang}>
      <head>
        <DefaultSEO config={seoConfig} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MouseFollower />
        <Analytics />
      </body>
    </html>
  );
}
