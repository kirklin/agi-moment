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
    metadataBase: new URL("https://agimoment.com"),
    title: "AGI Moment: AI History Timeline & Future Insights",
    description: "Explore AI's evolution on our interactive timeline, from Turing to AGI. Get insights on breakthroughs, ethics, and the future of machine intelligence.",
    alternates: createAlternates("/", locale),
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
      locale: locale.replace("-", "_"), // 动态设置 locale，并将格式从 'zh-CN' 转换为 'zh_CN'
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
}
