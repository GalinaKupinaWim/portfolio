import Navbar from "@/components/Navbar";
import ResumeContactCard from "@/components/ResumeContactCard";
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
        <section className="relative overflow-hidden px-16 pt-14 pb-2">
          {/* Warm beige blob — echoes the home hero background */}
          <div
            aria-hidden
            className="resume-blob no-print pointer-events-none absolute"
            style={{
              top: "-140px",
              left: "-160px",
              width: "620px",
              height: "520px",
              background:
                "radial-gradient(closest-side, rgba(232,227,220,0.85), rgba(232,227,220,0))",
              borderRadius: "60% 40% 55% 45% / 55% 50% 50% 45%",
              zIndex: 0,
            }}
          />

          <div className="relative" style={{ zIndex: 1 }}>
            <p
              className="font-body text-[#4A5565] uppercase tracking-[0.16em] opacity-70 mb-6"
              style={{ fontSize: "12px" }}
            >
              Resume
            </p>

            <div className="flex items-center justify-between gap-10">
              <div>
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
                  className="font-body text-[#4A5565] flex flex-wrap items-center gap-x-2 gap-y-1"
                  style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
                >
                  <span>
                    UX Designer · Interaction Design · AI Product Experiences
                  </span>
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
              </div>

              {/* Contact card — fast email copy + LinkedIn QR (great for the PDF/print) */}
              <div className="hidden md:block flex-shrink-0" style={{ width: "270px" }}>
                <ResumeContactCard />
              </div>
            </div>
          </div>
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
