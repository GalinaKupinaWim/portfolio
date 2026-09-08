"use client";
import { useEffect, useRef } from "react";

type SkillRow = { label: string; skills: string[] };

const SKILLS: SkillRow[] = [
  {
    label: "Design",
    skills: [
      "UX Design",
      "UI Design",
      "Interaction Design",
      "Information Architecture",
      "Design Systems",
      "Prototyping",
      "Wireframing",
    ],
  },
  {
    label: "Research",
    skills: [
      "User Research",
      "Usability Testing",
      "User Interviews",
      "A/B Testing",
      "Wizard of Oz Testing",
      "Journey Mapping",
      "Personas",
    ],
  },
  {
    label: "AI & Product",
    skills: [
      "AI Product Design",
      "Conversational UX",
      "Human-AI Interaction",
      "Prompt Design",
      "AI-Augmented Workflow",
    ],
  },
  {
    label: "Collaboration",
    skills: [
      "Cross-functional Teams",
      "Agile / Scrum",
      "Stakeholder Management",
      "Design Workshops",
      "Design-to-Dev Handoff",
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const revealEls = el.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(
              (entry.target as HTMLElement).dataset.delay || 0
            );
            setTimeout(() => entry.target.classList.add("visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((rEl, i) => {
      rEl.dataset.delay = String(i * 90);
      observer.observe(rEl);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills-sec" className="px-16 py-20">
      <div className="flex justify-between items-end mb-14">
        <h2
          className="reveal font-body font-medium text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}
        >
          skills.
        </h2>
        <span
          className="reveal font-body text-[0.75rem] tracking-[0.12em] uppercase text-[#4A5565] opacity-70 pb-2"
        >
          What I bring to the table
        </span>
      </div>

      <div className="flex flex-col">
        {SKILLS.map((row, i) => (
          <div
            key={row.label}
            className="reveal grid items-baseline gap-8 py-7"
            style={{
              gridTemplateColumns: "minmax(140px, 1fr) 6fr",
              borderTop:
                i === 0 ? "1px solid rgba(26,26,26,0.1)" : undefined,
              borderBottom: "1px solid rgba(26,26,26,0.1)",
            }}
          >
            <div
              className="font-body text-[#4A5565] uppercase font-medium"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
              }}
            >
              {row.label}
            </div>
            <div
              className="font-body text-[#1a1a1a] flex flex-wrap items-baseline"
              style={{
                fontSize: "clamp(0.92rem,1.55vw,1.24rem)",
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              {row.skills.map((s, j) => (
                <span key={s} className="whitespace-nowrap">
                  {s}
                  {j < row.skills.length - 1 && (
                    <span
                      className="mx-3 inline-block opacity-30"
                      style={{ transform: "translateY(-2px)" }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
