import Navbar from "@/components/Navbar";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

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
        <section className="px-16 pt-20 pb-16">
          <p
            className="font-body text-[#4A5565] uppercase tracking-[0.16em] opacity-70 mb-6"
            style={{ fontSize: "12px" }}
          >
            Resume
          </p>

          <h1
            className="font-body font-medium text-[#1a1a1a] mb-3"
            style={{
              fontSize: "clamp(2rem,4.5vw,3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            Galina Kupina
          </h1>

          <div
            className="font-body text-[#4A5565] flex flex-wrap items-center gap-x-2 gap-y-1 mb-14"
            style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
          >
            <span>UX Designer · Interaction Design · AI Product Experiences</span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              San Francisco Bay Area, CA
            </span>
          </div>

          <p
            className="font-body text-[#1a1a1a]"
            style={{
              fontSize: "clamp(1.5rem,3vw,2.4rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              maxWidth: "24ch",
              fontWeight: 400,
            }}
          >
            I combine business thinking, human behavior, and AI tools to
            create experiences users trust.
          </p>
        </section>

        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ToolsSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
