import Navbar from "@/components/Navbar";
import ResumeContactRow from "@/components/ResumeContactRow";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resume — Galina Kupina",
  description:
    "Resume of Galina Kupina, UX Designer specializing in AI Product Design, based in the San Francisco Bay Area.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — a tint behind the text that falls off to white at both edges,
            so the band reads as a wash rather than a framed rectangle. Sized so
            the first job is on screen without scrolling. */}
        <section
          className="px-5 md:px-16 pt-9 pb-8"
          style={{
            background:
              "linear-gradient(to right, #fff 0%, #f6f3ee 18%, #f6f3ee 82%, #fff 100%)",
          }}
        >
          <p
            className="font-body text-[#4A5565] uppercase tracking-[0.16em] opacity-70 mb-3"
            style={{ fontSize: "12px" }}
          >
            Resume
          </p>

          <h1
            className="font-body font-medium text-[#1a1a1a] mb-3"
            style={{
              // Outranks the section headings (clamp(1.6rem,4vw,2.8rem)) at
              // every width, so the name sits at the top of the ladder.
              fontSize: "clamp(2.2rem,5.2vw,3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            Galina Kupina
          </h1>

          {/* Positioning line carries the role, so it is stated once. */}
          <p
            className="font-body text-[#1a1a1a] max-w-[62ch] mb-1.5"
            style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
          >
            UX/UI &amp; Product Designer for AI-powered products
          </p>

          {/* Plain facts below it. */}
          <p
            className="font-body text-[#4A5565]"
            style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
          >
            San Francisco Bay Area, CA · Open to full-time, part-time and contract
          </p>

          <ResumeContactRow />
        </section>

        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ToolsSection />
      </main>
      <Footer />
    </>
  );
}
