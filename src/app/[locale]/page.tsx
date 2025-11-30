import { setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { use } from "react";

import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Timeline from "~/components/Timeline/index";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AGI Moment - Exploring the Frontier of Artificial General Intelligence",
            "description": "Discover the evolution of artificial intelligence from the Turing Test to modern breakthroughs in AGI through interactive visualizations and thought-provoking content.",
            "url": "https://agimoment.com",
            "isPartOf": {
              "@type": "WebSite",
              "name": "AGI Moment",
              "url": "https://agimoment.com",
            },
            "about": {
              "@type": "Thing",
              "name": "Artificial General Intelligence",
              "description": "The study and development of machine intelligence that can learn and apply knowledge across different domains, similar to human intelligence.",
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "The Turing Test (1950)",
                  "description": "Alan Turing proposes the famous Turing Test, pioneering the field of artificial intelligence research.",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Backpropagation Algorithm (1986)",
                  "description": "Rumelhart, Hinton, and Williams publish the backpropagation algorithm, revolutionizing neural network training.",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Deep Blue Defeats Kasparov (1997)",
                  "description": "IBM's Deep Blue supercomputer defeats world chess champion Garry Kasparov.",
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "IBM Watson (2011)",
                  "description": "IBM Watson defeats human champions on the quiz show Jeopardy!",
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "AlphaGo Defeats Lee Sedol (2016)",
                  "description": "DeepMind's AlphaGo defeats world Go champion Lee Sedol in a historic match.",
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "ChatGPT Launch (2022)",
                  "description": "OpenAI releases ChatGPT, showcasing the remarkable capabilities of large language models.",
                },
              ],
            },
            "specialty": "Artificial Intelligence History and Development",
            "keywords": "AGI, Artificial General Intelligence, AI timeline, AI history, Turing Test, Deep Blue, AlphaGo, ChatGPT",
          }),
        }}
      />
      <main className="relative">
        <Navbar />
        <article>
          <header>
            <Hero />
          </header>
          <section id="timeline" className="scroll-mt-20" aria-label="AI Timeline">
            <h2 className="sr-only">Historical Timeline of AI Development</h2>
            <Timeline />
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}
