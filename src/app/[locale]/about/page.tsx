import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Script from "next/script";
import React, { use } from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "About AGI Moment | Creative Exploration of AI's Future",
  description: "AGI Moment is a creative design project that visualizes and explores artificial general intelligence concepts through interactive experiences, aiming to spark curiosity and thoughtful conversation about our technological future.",
  keywords: ["AI visualization", "creative AI design", "future technology", "AI concepts", "Kirk Lin", "digital art", "interactive design", "thought experiment"],
  openGraph: {
    title: "About AGI Moment | Creative Exploration of AI's Future",
    description: "Discover our creative design project that visualizes artificial general intelligence concepts through interactive experiences, sparking curiosity and conversation about our technological future.",
    url: "https://agimoment.com/about",
    type: "website",
  },
};

export default function AboutPage({
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
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About AGI Moment",
            "description": "A creative design project exploring artificial general intelligence through visual storytelling and interactive experiences.",
            "url": "https://agimoment.com/about",
            "mainEntity": {
              "@type": "CreativeWork",
              "name": "AGI Moment",
              "url": "https://agimoment.com",
              "creator": {
                "@type": "Person",
                "name": "Kirk Lin",
                "url": "https://github.com/kirklin",
              },
              "description": "A digital art project visualizing artificial intelligence concepts through creative design and interactive experiences.",
              "keywords": ["Digital Art", "AI Visualization", "Creative Design", "Interactive Experience", "Thought Experiment"],
            },
          }),
        }}
      />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <header>
            <h1 className="text-4xl font-bold mb-8 text-center">About AGI Moment</h1>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">The Concept</h2>
            <p className="text-xl mb-6">
              AGI Moment is a creative design project that visualizes the fascinating world of artificial general intelligence through interactive digital experiences.
            </p>
            <p className="text-lg mb-6">
              This project isn't about predicting the future or making definitive claims—it's about sparking imagination, curiosity, and thoughtful conversation about our technological horizon.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Creative Exploration</h2>
            <p className="text-lg mb-6">
              Through visual storytelling and interactive design, we invite you to explore the possibilities, questions, and paradoxes that emerge when we contemplate truly intelligent machines.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Visual Storytelling</h3>
                <p>Using creative design to visualize complex AI concepts in ways that are both aesthetically engaging and thought-provoking.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Digital Playground</h3>
                <p>Creating interactive experiences that let you engage with AI concepts in intuitive and playful ways.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Thought Experiments</h3>
                <p>Presenting scenarios and questions that challenge our assumptions about intelligence, consciousness, and humanity's future.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Creative Inspiration</h3>
                <p>Drawing inspiration from science fiction, philosophy, art, and cutting-edge AI research to create a unique digital experience.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why AGI Fascinates Us</h2>
            <p className="text-lg mb-6">
              Artificial General Intelligence represents one of the most intriguing thought experiments of our time—what happens when we create machines that can think in ways similar to (or beyond) human cognition?
            </p>
            <p className="text-lg mb-6">
              This isn't just a technical question but a deeply philosophical one that touches on consciousness, creativity, purpose, and what it means to be human.
            </p>
            <p className="text-lg mb-6">
              AGI Moment doesn't claim to have answers—instead, we offer a creative space to contemplate these questions through visual and interactive experiences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">The Creator</h2>
            <p className="text-lg mb-6">
              AGI Moment is a creative project by Kirk Lin, a developer who explores the intersection of technology, art, and philosophy through digital experiences.
            </p>
            <p className="text-lg mb-6">
              This project represents a personal exploration of AI concepts through creative design—a digital art project rather than a research initiative or organization.
            </p>
            <div className="flex justify-center mt-8">
              <a
                href="https://github.com/kirklin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Connect on GitHub
              </a>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
