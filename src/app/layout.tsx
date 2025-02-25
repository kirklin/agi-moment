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
  title: "AGI Moment | Exploring the Frontier of Artificial General Intelligence",
  description: "AGI Moment is a curated exploration of Artificial General Intelligence breakthroughs, featuring interactive visualizations, expert insights, and thought-provoking perspectives on how AGI will transform our future. Discover the intersection of human creativity and machine intelligence.",
  keywords: [
    "AGI",
    "Artificial General Intelligence",
    "AGI research",
    "future of AI",
    "machine intelligence",
    "AI breakthroughs",
    "cognitive computing",
    "AI ethics",
    "technological singularity",
    "neural networks",
    "deep learning",
    "machine consciousness",
    "AI visualization",
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
  openGraph: {
    title: "AGI Moment | Exploring the Frontier of Artificial General Intelligence",
    description: "Dive into the fascinating world of Artificial General Intelligence through interactive visualizations and thought-provoking content. Explore how AGI is reshaping our understanding of intelligence and creativity at the intersection of human ingenuity and machine learning.",
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
    title: "AGI Moment | Exploring the Frontier of Artificial General Intelligence",
    description: "Discover interactive visualizations and thought-provoking perspectives on Artificial General Intelligence. Explore the evolution of AI from the Turing Test to modern breakthroughs, and glimpse into our collective technological future.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              "description": "AGI Moment is a curated exploration of Artificial General Intelligence breakthroughs, featuring interactive visualizations, expert insights, and thought-provoking perspectives on how AGI will transform our future.",
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
        <MouseFollower />
        <div id="app" className="relative">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
