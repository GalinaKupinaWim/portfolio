"use client";
import { useCallback, useEffect, useRef, useState } from "react";

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
    projectsLabel: "Selected projects",
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
];

function Dot() {
  return (
    <span
      className="bullet-dot inline-block flex-shrink-0"
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

// Summary, highlights and selected projects — everything below the job title.
// Pulled out so the current role can render it inline while older roles keep
// it behind a disclosure.
function RoleBody({ job }: { job: Job }) {
  return (
    <>
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
            className="projects-label font-body text-[#4A5565] uppercase font-medium mb-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.14em" }}
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
                <span className="project-name font-medium">{p.name}</span>
                <span className="text-[#4A5565]"> — {p.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  );
}

export default function ExperienceSection() {
  const [allOpen, setAllOpen] = useState(false);

  const disclosures = useCallback(
    () => [...(sectionRef.current?.querySelectorAll<HTMLDetailsElement>("details") ?? [])],
    [],
  );

  // `toggle` does not bubble, so the listener is registered in the capture
  // phase. This keeps the label honest when roles are opened one at a time.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sync = () => {
      const all = [...section.querySelectorAll<HTMLDetailsElement>("details")];
      setAllOpen(all.length > 0 && all.every((d) => d.open));
    };
    section.addEventListener("toggle", sync, true);
    return () => section.removeEventListener("toggle", sync, true);
  }, []);

  const toggleAll = () => {
    const next = !allOpen;
    disclosures().forEach((d) => (d.open = next));
    setAllOpen(next);
  };

  const sectionRef = useRef<HTMLElement>(null);

  // The PDF is the artifact that gets forwarded, so it must never inherit
  // whatever the reader happened to leave collapsed. Open every disclosure
  // before printing, then put them back exactly as they were.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let changed: [HTMLDetailsElement, boolean][] = [];
    const expand = () => {
      // "short" prints only the current role in detail; anything else prints
      // everything. The intent is stamped on <html> by the save control.
      const wantOpen = document.documentElement.dataset.printMode !== "short";
      changed = [...section.querySelectorAll<HTMLDetailsElement>("details")]
        .filter((d) => d.open !== wantOpen)
        .map((d) => [d, d.open] as [HTMLDetailsElement, boolean]);
      changed.forEach(([d]) => (d.open = wantOpen));
    };
    const restore = () => {
      changed.forEach(([d, was]) => (d.open = was));
      changed = [];
    };
    window.addEventListener("beforeprint", expand);
    window.addEventListener("afterprint", restore);
    return () => {
      window.removeEventListener("beforeprint", expand);
      window.removeEventListener("afterprint", restore);
    };
  }, []);

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
    <section ref={sectionRef} id="experience-sec" className="px-5 md:px-16 pt-10 pb-20">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-14">
        <h2
          className="reveal font-body font-medium text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}
        >
          experience.
        </h2>
        <div className="reveal flex flex-col sm:items-end gap-2 pb-1">
          <span className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-[#4A5565] opacity-70">
            My professional journey
          </span>
          <button
            type="button"
            onClick={toggleAll}
            aria-expanded={allOpen}
            className="exp-expand-all no-print"
          >
            <svg
              className="exp-chevron"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ transform: allOpen ? "rotate(90deg)" : undefined }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        {EXPERIENCE.map((job, i) => (
          <div
            key={job.title + job.company + job.dates}
            className="reveal exp-row grid gap-2 md:gap-8 py-9 grid-cols-1 md:grid-cols-[minmax(170px,1fr)_6fr]"
            style={{
              borderTop: i === 0 ? "1px solid rgba(26,26,26,0.1)" : undefined,
              borderBottom: "1px solid rgba(26,26,26,0.1)",
            }}
          >
            {/* Left: dates + location */}
            <div className="pt-1">
              <div
                className="font-body uppercase"
                style={{
                  // Dates orient, they don't carry the story — so they sit a
                  // step below the role title in size, weight and tracking.
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  // The current role reads darker, so "what is she doing now"
                  // is answerable at a glance.
                  color: i === 0 ? "#1B2B4B" : "#4A5565",
                }}
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

            {/* Right: role details. Also carries the timeline spine, which is
                offset back by half the 2rem gutter so it rides the gutter's
                centre without needing to know the date column's width. */}
            <div className="exp-col">
              <span className={`exp-rail${i === 0 ? " exp-rail-first" : ""}`} aria-hidden />
              <span className={`exp-dot${i === 0 ? " exp-dot-current" : ""}`} aria-hidden />
              <div
                className="role-title font-body text-[#1a1a1a] font-medium"
                style={{
                  fontSize: "clamp(1.15rem,1.9vw,1.5rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {job.title}
              </div>
              <div
                className="role-company font-body text-[#4A5565] mt-1"
                style={{ fontSize: "0.9rem", lineHeight: 1.5 }}
              >
                {job.company}
              </div>

              {i === 0 ? (
                /* Current role stays open — it is the one a reader came for. */
                <RoleBody job={job} />
              ) : (
                /* Native <details>: keyboard-operable, and Chrome expands it
                   automatically when find-in-page matches text inside. */
                <details className="exp-disclosure">
                  <summary className="exp-summary">
                    <svg
                      className="exp-chevron"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    What I did
                  </summary>
                  <div className="exp-body">
                    <RoleBody job={job} />
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
