"use client";
import { useEffect, useRef } from "react";

type ToolRow = { label: string; tools: string[] };

const TOOLS: ToolRow[] = [
  {
    label: "Design",
    tools: ["Figma", "Adobe Illustrator", "InDesign", "Framer", "Canva"],
  },
  {
    label: "AI",
    tools: ["Claude Code", "Claude Design", "ChatGPT", "NotebookLM", "Cursor", "Figma Make", "v0"],
  },
  {
    label: "Research & Collab",
    tools: ["Miro", "Optimal Workshop", "Granola"],
  },
  {
    label: "Code",
    tools: ["HTML / CSS", "GitHub"],
  },
];

export default function ToolsSection() {
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
    <section ref={sectionRef} id="tools-sec" className="px-5 md:px-16 py-20">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-14">
        <h2
          className="reveal font-body font-medium text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}
        >
          tools.
        </h2>
        <span className="reveal font-body text-[0.75rem] tracking-[0.12em] uppercase text-[#4A5565] opacity-70 pb-2">
          My day-to-day stack
        </span>
      </div>

      <div className="flex flex-col">
        {TOOLS.map((row, i) => (
          <div
            key={row.label}
            className="reveal grid items-baseline gap-2 md:gap-8 py-7 grid-cols-1 md:grid-cols-[minmax(140px,1fr)_6fr]"
            style={{
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
                // Matches the body scale elsewhere on the page. At the old
                // clamp these ran to 19.8px — larger than any other body text,
                // which is what made them read as emphasised.
                fontSize: "0.98rem",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {row.tools.map((s, j) => (
                <span key={s} className="whitespace-nowrap">
                  {s}
                  {j < row.tools.length - 1 && (
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
