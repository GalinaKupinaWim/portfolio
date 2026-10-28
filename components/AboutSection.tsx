"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";


// How I work — principles in my own voice (not a textbook pipeline).
const ABOUT_INTRO =
  "My path to UX wasn't a straight line, and it shaped how I approach design. Years in HR taught me to understand people; leading digital product development taught me how products are built and shipped. Design brings it all together. I look at the user, the product, the team, and the business as one connected system \u2014 creating experiences that work for people and make sense for the product.";

const PRINCIPLES = [
  {
    title: "Prototype fast, learn faster.",
    body: "Clickable prototypes with real users in days, not weeks.",
  },
  {
    title: "Design the whole system.",
    body: "User, product, team and business — one picture.",
  },
  {
    title: "Ship, then sharpen.",
    body: "Test rough early, then sharpen.",
  },
];

// What I do, and the tools I reach for at each stage.
type Capability = { area: string; tools: string[]; href?: string };
const CAPABILITIES: Capability[] = [
  {
    area: "Product & UX Design",
    tools: ["Figma", "Adobe Illustrator", "InDesign", "Framer", "Canva"],
    href: "/sat",
  },
  {
    area: "UX Research & Synthesis",
    tools: ["NotebookLM", "Miro", "ChatGPT", "Claude"],
    href: "/nutri",
  },
  {
    area: "Information Architecture",
    tools: ["Optimal Workshop"],
    href: "/sfpl",
  },
  {
    area: "AI-Enhanced Product Prototyping",
    tools: ["Figma Make", "v0", "Claude Design"],
  },
  {
    area: "AI-Assisted Development",
    tools: ["Cursor", "Claude Code", "HTML/CSS", "GitHub"],
    href: "/sat",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Portrait mouse-tilt (subtle 3D toward the cursor)
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const BASE = "rotate(3deg)";
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const ry = clamp(dx) * 6;
      const rx = -clamp(dy) * 6;
      el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ${BASE}`;
    };
    const onLeave = () => {
      el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) ${BASE}`;
    };
    el.style.transition = "transform 0.25s ease-out";
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Reveal observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const revealEls = el.querySelectorAll<HTMLElement>(".reveal");

    revealEls.forEach((rEl, i) => {
      rEl.dataset.delay = String(i * 110);
    });

    const markIfInView = (rEl: HTMLElement) => {
      const r = rEl.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (inView && !rEl.classList.contains("visible")) {
        const delay = Number(rEl.dataset.delay || 0);
        setTimeout(() => rEl.classList.add("visible"), delay);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number((entry.target as HTMLElement).dataset.delay || 0);
            setTimeout(() => entry.target.classList.add("visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    revealEls.forEach((rEl) => {
      if (!markIfInView(rEl)) {
        observer.observe(rEl);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about-sec" className="relative overflow-hidden px-5 md:px-16 py-20">
      {/* Warm blob accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "8%",
          right: "-6%",
          width: "620px",
          height: "620px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(232,227,220,0.55) 0%, rgba(210,200,185,0.22) 42%, rgba(232,227,220,0) 74%)",
          filter: "blur(10px)",
          zIndex: 0,
        }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="reveal font-body font-medium" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>
            about.
          </h2>
          <Link
            href="/resume"
            className="reveal bg-[#e8e3dc] border-none px-7 py-3.5 font-body text-[0.75rem] font-medium text-[#1a1a1a] no-underline hover:opacity-80 transition-opacity"
          >
            Resume
          </Link>
        </div>

        <div className="grid gap-x-14 gap-y-10 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Left column: intro, process, capabilities */}
          <div>
            <p
              className="reveal font-body text-[#1a1a1a]"
              style={{
                fontSize: "clamp(1.05rem,1.7vw,1.45rem)",
                lineHeight: 1.55,
                maxWidth: "46ch",
                fontWeight: 400,
              }}
            >
              {ABOUT_INTRO.split(" ").map((word, i) => (
                <span key={i} className="about-word">
                  {word}{" "}
                </span>
              ))}
            </p>

            {/* How I work — principles */}
            <div className="reveal trigger flow-block mt-10">
              <div
                className="font-body uppercase text-[#4A5565] mb-3"
                style={{ fontSize: "0.72rem", letterSpacing: "0.16em", opacity: 0.8 }}
              >
                How I work
              </div>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3 mt-5">
                {PRINCIPLES.map((p, i) => (
                  <div
                    key={p.title}
                    className="principle-item"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <div className="principle-rule mb-3" aria-hidden />
                    <div
                      className="principle-text font-body font-medium text-[#1B2B4B] mb-1.5"
                      style={{ fontSize: "0.98rem", lineHeight: 1.3, "--j": 0 } as React.CSSProperties}
                    >
                      {p.title.split(" ").map((w, j) => (
                        <span key={j} className="about-word">
                          {w}{" "}
                        </span>
                      ))}
                    </div>
                    <p
                      className="principle-text font-body text-[#4A5565]"
                      style={{ fontSize: "0.86rem", lineHeight: 1.55, "--j": 1 } as React.CSSProperties}
                    >
                      {p.body.split(" ").map((w, j) => (
                        <span key={j} className="about-word">
                          {w}{" "}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities → tools */}
            <div className="mt-12 flex flex-col">
              {CAPABILITIES.map((cap, i) => (
                <div key={cap.area} className="cap-row reveal trigger relative py-6">
                  {i === 0 && <div className="cap-divider cap-divider-top" aria-hidden />}
                  <div
                    className="cap-label font-body font-medium text-[#1a1a1a]"
                    style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)" }}
                  >
                    {cap.href ? (
                      <Link
                        href={cap.href}
                        className="group/cap inline-flex items-center gap-1.5 text-[#1a1a1a] no-underline"
                      >
                        <span className="border-b border-transparent group-hover/cap:border-[#1a1a1a]/40 transition-colors">
                          {cap.area}
                        </span>
                        <svg
                          className="opacity-40 group-hover/cap:opacity-100 group-hover/cap:translate-x-0.5 transition-all"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </Link>
                    ) : (
                      cap.area
                    )}
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {cap.tools.map((t, j) => (
                      <span
                        key={t}
                        className="pill-wrap"
                        style={{ "--i": j } as React.CSSProperties}
                      >
                        <span className="tool-pill">{t}</span>
                      </span>
                    ))}
                  </div>
                  <div className="cap-divider" aria-hidden />
                </div>
              ))}
            </div>
          </div>

          {/* Right column: portrait */}
          <div className="reveal order-first lg:order-none w-full max-w-[280px] lg:max-w-none mx-auto lg:mx-0">
            <div
              ref={portraitRef}
              className="relative rounded-[18px] overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                transform: "rotate(3deg)",
                boxShadow:
                  "0 30px 60px -20px rgba(0,0,0,0.28), 0 8px 18px -6px rgba(0,0,0,0.12)",
              }}
            >
              <Image
                src="/images/galina-portrait-ai.webp"
                alt="Galina Kupina, with a digital network motif flowing from her hair"
                width={1024}
                height={1536}
                sizes="300px"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
