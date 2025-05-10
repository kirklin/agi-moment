import type { Metadata } from "next";
import { createAlternates } from "~/lib/utils";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // 确保params已经被解析
  const { locale } = await params;

  return {
    title: "About AGI Moment | Creative Exploration of AI's Future",
    description: "AGI Moment is a creative design project that visualizes and explores artificial general intelligence concepts through interactive experiences, aiming to spark curiosity and thoughtful conversation about our technological future.",
    alternates: createAlternates("/about", locale),
    openGraph: {
      title: "About AGI Moment | Creative Exploration of AI's Future",
      description: "Discover our creative design project that visualizes artificial general intelligence concepts through interactive experiences, sparking curiosity and conversation about our technological future.",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "AGI Moment - About Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About AGI Moment | Creative Exploration of AI's Future",
      description: "Discover our creative design project that visualizes artificial general intelligence concepts through interactive experiences, sparking curiosity and conversation about our technological future.",
      images: ["/twitter-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    creator: "Kirk Lin",
    authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
    keywords: ["AI visualization", "creative AI design", "future technology", "AI concepts", "Kirk Lin", "digital art", "interactive design", "thought experiment"],
  };
}
