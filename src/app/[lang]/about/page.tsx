import type { Metadata } from "next";

// 多语言内容
const content = {
  en: {
    title: "About AGI Moment",
    description: "About AGI Moment - Learn about our mission to explore and advance artificial general intelligence research and development",
    heading: "About AGI Moment",
    intro: "AGI Moment is dedicated to exploring and advancing the field of artificial general intelligence.",
    mission: "Our mission is to contribute to the development of safe and beneficial AGI systems that can help solve humanity's most pressing challenges.",
  },
  zh: {
    title: "关于AGI时刻",
    description: "关于AGI时刻 - 了解我们探索和推进通用人工智能研究与发展的使命",
    heading: "关于AGI时刻",
    intro: "AGI时刻致力于探索和推进通用人工智能领域的发展。",
    mission: "我们的使命是为安全且有益的AGI系统的发展做出贡献，以帮助解决人类最紧迫的挑战。",
  },
};

// 生成页面元数据
export async function generateMetadata({ params: { lang } }: { params: { lang: "en" | "zh" } }): Promise<Metadata> {
  const t = content[lang];

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      type: "article",
      publishedTime: "2024-02-11T00:00:00.000Z",
      authors: ["Kirk Lin"],
      url: `https://agimoment.com/${lang}/about`,
    },
    twitter: {
      card: "summary",
      title: t.title,
      description: t.description,
    },
  };
}

// JSON-LD结构化数据
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About AGI Moment",
  "description": "Learn about AGI Moment's mission and vision for artificial general intelligence",
  "url": "https://agimoment.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "AGI Moment",
    "description": "Organization dedicated to AGI research and development",
    "url": "https://agimoment.com",
  },
};

export default function AboutPage({ params: { lang } }: { params: { lang: "en" | "zh" } }) {
  const t = content[lang];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold mb-8">{t.heading}</h1>
          <p className="text-xl mb-4">{t.intro}</p>
          <p className="text-lg mb-4">{t.mission}</p>
        </div>
      </main>
    </>
  );
}
