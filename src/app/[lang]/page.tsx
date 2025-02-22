import type { Metadata } from "next";
import Hero from "~/components/Hero";
import Timeline from "~/components/Timeline";

export const metadata: Metadata = {
  title: "AGI Moment - Home",
  description: "AGI Moment - Exploring the Future of Artificial General Intelligence",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div id="timeline" className="scroll-mt-20">
        <Timeline />
      </div>
    </div>
  );
}
