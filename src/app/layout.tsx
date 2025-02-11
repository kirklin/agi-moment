import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";

import Analytics from "~/components/Analytics";
import MouseFollower from "~/components/MouseFollower";
import { cn } from "~/utils/cn";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://agimoment.com"),
  title: "AGI Moment - 想象AGI的无限可能 | Imagine the Infinite Possibilities of AGI",
  description: "AGI Moment是一场视觉盛宴，通过艺术与科技的完美融合，展现人类对AGI的无限想象。在这里，每一刻都是人类创意与人工智能碰撞的瞬间，让我们一同期待AGI带来的奇妙未来。| AGI Moment is a visual feast that showcases humanity's infinite imagination of AGI through the perfect fusion of art and technology. Here, every moment is an instant of collision between human creativity and artificial intelligence.",
  keywords: [
    "AGI",
    "人工通用智能",
    "Artificial General Intelligence",
    "创意",
    "Creativity",
    "艺术",
    "Art",
    "未来",
    "Future",
    "想象力",
    "Imagination",
    "科技艺术",
    "Tech Art",
    "数字艺术",
    "Digital Art",
    "未来主义",
    "Futurism",
    "Kirk Lin",
  ],
  authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
  creator: "Kirk Lin",
  publisher: "AGI Moment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    title: "AGI Moment - 想象AGI的无限可能 | Imagine the Infinite Possibilities of AGI",
    description: "AGI Moment是一场视觉盛宴，通过艺术与科技的完美融合，展现人类对AGI的无限想象。在这里，每一刻都是人类创意与人工智能碰撞的瞬间。",
    url: "https://agimoment.com",
    siteName: "AGI Moment",
    images: [
      {
        url: "https://agimoment.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AGI Moment - Exploring the Future of AGI",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Moment - Imagine the Infinite Possibilities of AGI",
    description: "A visual feast showcasing humanity's infinite imagination of AGI through the perfect fusion of art and technology. Experience the magical moments where human creativity meets artificial intelligence.",
    creator: "@kirklin",
    images: ["https://agimoment.com/twitter-image.png"],
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
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="alternate" hrefLang="en" href="https://agimoment.com/en" />
        <link rel="alternate" hrefLang="zh" href="https://agimoment.com/zh" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AGI Moment",
              "alternateName": "AGIMoment",
              "url": "https://agimoment.com",
              "author": {
                "@type": "Person",
                "name": "Kirk Lin",
                "url": "https://github.com/kirklin",
              },
              "description": "AGI Moment是一场视觉盛宴，通过艺术与科技的完美融合，展现人类对AGI的无限想象。在这里，每一刻都是人类创意与人工智能碰撞的瞬间。",
              "publisher": {
                "@type": "Organization",
                "name": "AGI Moment",
                "url": "https://agimoment.com",
              },
              "inLanguage": ["en", "zh"],
            }),
          }}
        />
      </head>
      <body className={cn(
        spaceGrotesk.className,
        "antialiased bg-black text-white min-h-screen",
      )}
      >
        <MouseFollower />
        <div id="app" className="relative">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
