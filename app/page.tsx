import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
