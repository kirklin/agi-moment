import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Analytics from "~/components/Analytics";
import MouseFollower from "~/components/MouseFollower";
import { cn } from "~/utils/cn";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AGI Moment - Exploring the Future of Artificial Intelligence",
  description: "Discover the transformative power of Artificial General Intelligence and its impact on our future. Join us in exploring the AGI revolution.",
  keywords: "AGI, Artificial General Intelligence, AI, Future Technology, Innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
