import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";

import Analytics from "~/components/Analytics";
import MouseFollower from "~/components/MouseFollower";
import { ThemeProvider } from "~/components/theme-provider";
import { routing } from "~/lib/i18n/navigation";
import { cn, createAlternates } from "~/lib/utils";
import "~/styles/global.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://agimoment.com"),
  title: "AGI Moment: AI History Timeline & Future Insights",
  description: "Explore AI's evolution on our interactive timeline, from Turing to AGI. Get insights on breakthroughs, ethics, and the future of machine intelligence.",
  alternates: createAlternates("/"),
  keywords: [
    "Artificial General Intelligence",
    "AGI",
    "What is AGI",
    "AGI definition",
    "Strong AI",
    "General AI",
    "AGI vs AI",
    "AGI vs ASI",
    "AGI development",
    "AGI research",
    "AGI roadmap",
    "Future of AGI",
    "AGI timeline",
    "AGI capabilities",
    "AGI ethics",
    "AGI safety",
    "AI alignment",
    "AGI risks",
    "Impact of AGI",
    "How close is AGI",
    "AGI breakthroughs",
    "AGI examples",
    "agi ai",
    "asi vs agi",
  ],
  authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
  creator: "Kirk Lin",
  publisher: "AGI Moment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AGI Moment: AI History Timeline & Future Insights",
    description: "Explore AI's evolution on our interactive timeline, from Turing to AGI. Get insights on breakthroughs, ethics, and the future of machine intelligence.",
    url: "https://agimoment.com",
    siteName: "AGI Moment",
    images: [
      {
        url: "https://agimoment.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AGI Moment - Visualizing the Future of Artificial General Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGI Moment: AI History Timeline & Future Insights",
    description: "Explore AI's evolution on our interactive timeline, from Turing to AGI. Get insights on breakthroughs, ethics, and the future of machine intelligence.",
    creator: "@lkirkun",
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
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    // suppressHydrationWarning用于防止主题切换时服务端和客户端渲染不匹配导致的水合错误
    <html lang={locale} suppressHydrationWarning>
      <head>
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
              "description": "Explore AI's evolution on our interactive timeline, from Turing to AGI. Get insights on breakthroughs, ethics, and the future of machine intelligence.",
              "publisher": {
                "@type": "Organization",
                "name": "AGI Moment",
                "url": "https://agimoment.com",
              },
              "inLanguage": "en",
              "keywords": "AGI, Artificial General Intelligence, AI research, future of AI, machine intelligence",
              "about": {
                "@type": "Thing",
                "name": "Artificial General Intelligence",
                "description": "Artificial General Intelligence (AGI) refers to highly autonomous systems that outperform humans at most economically valuable work and can learn to perform virtually any task.",
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "AI researchers, technology enthusiasts, futurists, and anyone interested in the evolution of artificial intelligence",
              },
            }),
          }}
        />
      </head>
      <body className={cn(
        spaceGrotesk.className,
        "antialiased bg-black text-white min-h-screen",
      )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MouseFollower />
            <div id="app" className="relative">
              {children}
            </div>
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
