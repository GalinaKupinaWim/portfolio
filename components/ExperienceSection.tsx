"use client";
import { useEffect, useRef } from "react";

type Project = { name: string; desc: string };
type Job = {
  dates: string;
  location?: string;
  title: string;
  company: string;
  summary: string;
  bullets?: string[];
  projectsLabel?: string;
  projects?: Project[];
  compact?: boolean;
};

const EXPERIENCE: Job[] = [
  {
    dates: "Nov 2025 – Present",
    location: "Walnut Creek, CA · Remote",
    title: "UX/UI & Product Designer",
    company: "Freelance · Self-Employed",
    summary:
      "Working with clients and early-stage product concepts to design user-centered digital experiences — from research and problem definition through wireframing, prototyping, visual design, and delivery.",
    bullets: [
      "Designed the UX/UI for a stand-up comedian's personal website, translating the client's brand and goals into a responsive experience with clear content hierarchy, navigation, and calls to action.",
      "Designed a debate-focused app end-to-end — user and problem analysis, information architecture, user flows, interaction design, wireframes, and high-fidelity prototypes — iterating on feedback to balance user needs, business goals, and technical feasibility.",
    ],
  },
  {
    dates: "Jan 2015 – Oct 2025",
    location: "United States · Remote",
    title: "Project Manager · Digital Product Development",
    company: "AcademProject · Part-time",
    summary:
      "Managed end-to-end development of digital products and custom software solutions, translating business requirements into deliverables and coordinating distributed, cross-functional teams.",
    bullets: [
      "Led projects from requirements gathering through development and early-stage implementation, coordinating remote developers, QA specialists, and freelance designers.",
      "Worked directly with stakeholders to define priorities, communicate progress, gather feedback, and coordinate iterations.",
      "Managed timelines, budgets, resources, and deliverables while recruiting and onboarding technical and creative specialists as project needs required.",
    ],
    projectsLabel: "Selected product projects",
    projects: [
      {
        name: "Real Estate CRM Platform",
        desc: "Coordinated development from scratch through early implementation, gathering user and stakeholder feedback to shape improvements.",
      },
      {
        name: "Photography Marketplace",
        desc: "A platform connecting freelance photographers with customers at tourist locations to upload, find, purchase, and download photos.",
      },
      {
        name: "Windows Mobile Games",
        desc: "Managed development of two original games, coordinating developers and partnership discussions with external production studios.",
      },
    ],
  },
  {
    dates: "Jan 2012 – May 2013",
    location: "Moscow, Russia",
    title: "Human Resources Director",
    company: "Zelenski Corporate Travel Solutions",
    summary:
      "Led recruitment, employee development, performance management, and organizational initiatives while managing an HR team and partnering with leadership on people strategy.",
    compact: true,
  },
  {
    dates: "Jun 2011 – Jan 2012",
    location: "Moscow, Russia",
    title: "Human Resources Generalist",
    company: "Zelenski Corporate Travel Solutions",
    summary:
      "Managed recruitment, employee relations, HR processes, and internal policies while supporting employees and business leadership.",
    compact: true,
  },
  {
    dates: "May 2008 – Jan 2011",
    location: "Novosibirsk, Russia",
    title: "Human Resources Generalist",
    company: "AP Real Estate & Tourism Agency",
    summary:
      "Managed recruitment, employee relations, payroll administration, and training while supporting organizational growth.",
    compact: true,
  },
  {
    dates: "Mar 2006 – Apr 2008",
    location: "Novosibirsk, Russia",
    title: "Executive Assistant",
    company: "Jilfond",
    summary:
      "Supported executives and internal stakeholders through coordination, scheduling, communication, expense reporting, and administrative operations.",
    compact: true,
  },
];

function Dot() {
  return (
    <span
      className="inline-block flex-shrink-0"
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "#1a1a1a",
        opacity: 0.4,
        marginTop: "0.6em",
      }}
    />
  );
}

export default function ExperienceSection() {
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
    <section ref={sectionRef} id="experience-sec" className="px-16 py-20">
      <div className="flex justify-between items-end mb-14">
        <h2
          className="reveal font-body font-medium text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}
        >
          experience.
        </h2>
        <span className="reveal font-body text-[0.75rem] tracking-[0.12em] uppercase text-[#4A5565] opacity-70 pb-2">
          My professional journey
        </span>
      </div>

      <div className="flex flex-col">
        {EXPERIENCE.map((job, i) => (
          <div
            key={job.title + job.company + job.dates}
            className="reveal grid gap-8 py-9"
            style={{
              gridTemplateColumns: "minmax(170px, 1fr) 6fr",
              borderTop: i === 0 ? "1px solid rgba(26,26,26,0.1)" : undefined,
              borderBottom: "1px solid rgba(26,26,26,0.1)",
            }}
          >
            {/* Left: dates + location */}
            <div className="pt-1">
              <div
                className="font-body text-[#4A5565] uppercase font-medium"
                style={{ fontSize: "0.78rem", letterSpacing: "0.14em" }}
              >
                {job.dates}
              </div>
              {job.location && (
                <div
                  className="font-body text-[#4A5565] mt-1.5"
                  style={{ fontSize: "0.8rem", lineHeight: 1.45, opacity: 0.85 }}
                >
                  {job.location}
                </div>
              )}
            </div>

            {/* Right: role details */}
            <div>
              <div
                className="font-body text-[#1a1a1a] font-medium"
                style={{
                  fontSize: "clamp(1.15rem,1.9vw,1.5rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {job.title}
              </div>
              <div
                className="font-body text-[#4A5565] mt-1"
                style={{ fontSize: "0.98rem", lineHeight: 1.5 }}
              >
                {job.company}
              </div>

              <p
                className="font-body text-[#1a1a1a] mt-4"
                style={{
                  fontSize: "clamp(0.95rem,1.4vw,1.08rem)",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: "62ch",
                  opacity: job.compact ? 0.85 : 1,
                }}
              >
                {job.summary}
              </p>

              {job.bullets && (
                <ul className="mt-4 flex flex-col gap-2.5" style={{ maxWidth: "62ch" }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <Dot />
                      <span
                        className="font-body text-[#1a1a1a]"
                        style={{ fontSize: "0.98rem", lineHeight: 1.55, fontWeight: 400 }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {job.projects && (
                <div className="mt-6">
                  {job.projectsLabel && (
                    <div
                      className="font-body text-[#4A5565] uppercase font-medium mb-3"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.14em" }}
                    >
                      {job.projectsLabel}
                    </div>
                  )}
                  <div className="flex flex-col gap-2.5" style={{ maxWidth: "62ch" }}>
                    {job.projects.map((p) => (
                      <div key={p.name} className="flex gap-3">
                        <Dot />
                        <span
                          className="font-body text-[#1a1a1a]"
                          style={{ fontSize: "0.98rem", lineHeight: 1.55, fontWeight: 400 }}
                        >
                          <span className="font-medium">{p.name}</span>
                          <span className="text-[#4A5565]"> — {p.desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
