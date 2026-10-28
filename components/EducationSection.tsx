"use client";
import { useEffect, useRef } from "react";

type EduItem = {
  dates: string;
  school: string;
  degree: string;
  detail?: string;
};

const EDUCATION: EduItem[] = [
  {
    dates: "Sep 2025 – Jan 2026",
    school: "Stanford Continuing Studies",
    degree: "Certificate of Achievement in UI/UX Design for AI Products",
    detail: "UI/UX Design",
  },
  {
    dates: "Sep 2023 – May 2025",
    school: "University of California, Berkeley",
    degree: "Professional Program in User Experience Design",
    detail: "UX Design",
  },
  {
    dates: "May 2023 – Sep 2024",
    school: "Google Career Certificates",
    degree: "Google UX Design Professional Certificate",
    detail: "UI/UX Design",
  },
  {
    dates: "Jun 2007",
    school: "Novosibirsk State University (NSU)",
    degree: "Bachelor of Science in Business Administration",
    detail: "Management & Operations",
  },
];

export default function EducationSection() {
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
    <section ref={sectionRef} id="education-sec" className="px-5 md:px-16 py-20">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-14">
        <h2
          className="reveal font-body font-medium text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}
        >
          education.
        </h2>
        <span className="reveal font-body text-[0.75rem] tracking-[0.12em] uppercase text-[#4A5565] opacity-70 pb-2">
          Where I learned the craft
        </span>
      </div>

      <div className="flex flex-col">
        {EDUCATION.map((item, i) => (
          <div
            key={item.school + item.degree}
            className="reveal grid items-baseline gap-1.5 md:gap-8 py-7 grid-cols-1 md:grid-cols-[minmax(160px,1fr)_6fr]"
            style={{
              borderTop: i === 0 ? "1px solid rgba(26,26,26,0.1)" : undefined,
              borderBottom: "1px solid rgba(26,26,26,0.1)",
            }}
          >
            <div
              // Matches the Experience dates: orienting detail, a step below
              // the entry title in size, weight and tracking.
              className="font-body text-[#4A5565] uppercase"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              {item.dates}
            </div>
            <div>
              <div
                className="font-body text-[#1a1a1a] font-medium"
                style={{
                  fontSize: "clamp(1.05rem,1.7vw,1.35rem)",
                  lineHeight: 1.35,
                }}
              >
                {item.school}
              </div>
              <div
                className="font-body text-[#1a1a1a] mt-1"
                style={{
                  fontSize: "clamp(0.92rem,1.4vw,1.1rem)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {item.degree}
              </div>
              {item.detail && (
                <div
                  className="font-body text-[#4A5565] mt-1"
                  style={{ fontSize: "0.9rem", lineHeight: 1.5 }}
                >
                  {item.detail}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
