import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "~/components/Footer";
import MouseFollower from "~/components/MouseFollower";
import Navbar from "~/components/Navbar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: {
      template: "%s | AGI Moment",
      default: "AGI Moment",
    },
    description: "AGI Moment - Exploring the Future of Artificial General Intelligence",
    openGraph: {
      title: "AGI Moment",
      description: "AGI Moment - Exploring the Future of Artificial General Intelligence",
      url: "https://agimoment.com",
      siteName: "AGI Moment",
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
      title: "AGI Moment",
      card: "summary_large_image",
    },
    verification: {
      google: "google-site-verification-code",
    },
  };
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
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
