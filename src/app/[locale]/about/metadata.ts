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
    description: "A creative project exploring artificial general intelligence through visual stories and interactive designs, sparking curiosity about our AI future.",
    alternates: createAlternates("/about", locale),
    openGraph: {
      title: "About AGI Moment | Creative Exploration of AI's Future",
      description: "A creative project exploring artificial general intelligence through visual stories and interactive designs, sparking curiosity about our AI future.",
      type: "website",
      images: [
        {
          url: "/logo.svg",
          width: 1200,
          height: 630,
          alt: "AGI Moment - About Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About AGI Moment | Creative Exploration of AI's Future",
      description: "A creative project exploring artificial general intelligence through visual stories and interactive designs, sparking curiosity about our AI future.",
      images: ["/logo.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    creator: "Kirk Lin",
    authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
  };
}
