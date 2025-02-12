import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Timeline from "~/components/Timeline/index";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <div id="timeline" className="scroll-mt-20">
        <Timeline />
      </div>
      <Footer />
    </main>
  );
}
