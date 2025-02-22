import type { Metadata } from "next";
import Hero from "~/components/Hero";
import { PageSEO } from "~/components/SEO";
import Timeline from "~/components/Timeline";

// 多语言内容
const content = {
  en: {
    title: "AGI Moment - Exploring the Future of Artificial General Intelligence",
    description: "Discover the journey towards Artificial General Intelligence (AGI). Explore key milestones, breakthroughs, and future possibilities in AGI development.",
  },
  zh: {
    title: "AGI时刻 - 探索通用人工智能的未来",
    description: "探索通向通用人工智能(AGI)的旅程。了解AGI发展中的关键里程碑、突破性进展和未来可能性。",
  },
} as const;

// JSON-LD结构化数据
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "AGI Moment",
  "description": "Exploring the Future of Artificial General Intelligence",
  "url": "https://agimoment.com",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description"],
  },
  "mainEntity": {
    "@type": "Article",
    "name": "AGI Development Timeline",
    "description": "A comprehensive timeline of artificial general intelligence development",
    "articleSection": "Technology",
    "keywords": "AGI, Artificial General Intelligence, AI Timeline, Future of AI",
  },
};

export default function Home({ params: { lang } }: { params: { lang: "en" | "zh" } }) {
  const t = content[lang];

  return (
    <>
      <PageSEO
        config={{
          title: t.title,
          description: t.description,
          openGraph: {
            title: t.title,
            description: t.description,
            url: `https://agimoment.com/${lang}`,
          },
        }}
        jsonLd={homeJsonLd}
      />
      <div className="flex flex-col">
        <Hero />
        <div id="timeline" className="scroll-mt-20">
          <Timeline />
        </div>
      </div>
    </>
  );
}
