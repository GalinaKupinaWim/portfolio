"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CaseStudyNav from "@/components/CaseStudyNav";

/* ─── SAT / PrepMate design tokens ─── */
const SAT = {
  brand:        "#1E40AF",   // blue-800
  brandMid:     "#2563EB",   // blue-600
  brandLight:   "#EFF6FF",   // blue-50
  brandBorder:  "#BFDBFE",   // blue-200
  dark:         "#0F172A",   // slate-950
  darkCard:     "#1E293B",   // slate-800
  muted:        "#64748B",   // slate-500
  bodyText:     "#1E293B",   // slate-800
  subtleText:   "#475569",   // slate-600
};

/* ─── Typography ─── */
function PageH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading font-bold text-[#0F172A]"
      style={{ fontSize: "clamp(1.9rem,4.5vw,3.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
      {children}
    </h1>
  );
}
function PageSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading font-normal mt-3"
      style={{ fontSize: "clamp(0.95rem,1.8vw,1.25rem)", color: SAT.muted, lineHeight: 1.4 }}>
      {children}
    </p>
  );
}
function H2({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <h2 className={`font-heading font-bold mt-10 mb-4 tracking-tight ${white ? "text-white" : "text-[#0F172A]"}`}
      style={{ fontSize: "clamp(1.3rem,2.2vw,1.75rem)", letterSpacing: "-0.025em" }}>
      {children}
    </h2>
  );
}
function H3({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <h3 className={`font-heading font-semibold mt-6 mb-3 tracking-tight ${white ? "text-white" : "text-[#0F172A]"}`}
      style={{ fontSize: "clamp(0.95rem,1.5vw,1.125rem)", letterSpacing: "-0.01em" }}>
      {children}
    </h3>
  );
}
function H4({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <h4 className={`font-heading font-semibold mb-2 ${className}`}
      style={{ fontSize: "0.9375rem", ...style }}>
      {children}
    </h4>
  );
}
function Body({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`font-body leading-[1.72] max-w-[700px] ${className}`}
      style={{ fontSize: "0.9375rem", color: SAT.subtleText, ...style }}>
      {children}
    </p>
  );
}
function Sm({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-body leading-[1.65] max-w-[700px] ${className}`}
      style={{ fontSize: "0.875rem", color: SAT.subtleText }}>
      {children}
    </p>
  );
}
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-2.5 font-body" style={{ fontSize: "0.875rem", color: SAT.subtleText, lineHeight: 1.65 }}>
      <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SAT.brandMid, marginTop: "0.45em" }} />
      <span>{children}</span>
    </div>
  );
}

/* ─── Layout atoms ─── */
function PhaseBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="font-body font-semibold text-white text-[0.6875rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded"
        style={{ background: SAT.brand, letterSpacing: "0.18em" }}>
        {label}
      </span>
    </div>
  );
}
function PillLight({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-body text-[0.8125rem] font-medium px-4 py-1.5 rounded-full mb-6"
      style={{ background: SAT.brandLight, color: SAT.brand, border: `1px solid ${SAT.brandBorder}` }}>
      {children}
    </span>
  );
}
function Divider() {
  return <div className="my-12 h-px" style={{ background: `linear-gradient(to right, ${SAT.brandBorder}, transparent)` }} />;
}
function CardBlue({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-6 ${className}`}
      style={{ background: SAT.brandLight, border: `1px solid ${SAT.brandBorder}` }}>
      {children}
    </div>
  );
}
function CardWhite({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 border border-[#E2E8F0] ${className}`}>
      {children}
    </div>
  );
}
function InfoLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-[0.6875rem] uppercase tracking-[0.12em] mb-2" style={{ color: SAT.muted }}>{children}</div>;
}
function InfoVal({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-[0.875rem] leading-[1.6]" style={{ color: SAT.bodyText }}>{children}</div>;
}
function StatNum({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.5rem)", color: SAT.brand, lineHeight: 1 }}>
      {children}
    </div>
  );
}

/* ─── Icons ─── */
const icons = {
  zap:    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  target: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>,
  trend:  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  clock:  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  chat:   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  dollar: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
};

export default function SATPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    // Find all grid containers and mark their direct children as reveal items
    const gridChildren = Array.from(
      root.querySelectorAll<HTMLElement>('[class*="grid-cols-"] > div, [class*="grid-cols-"] > a')
    );

    const sectionTargets = Array.from(
      root.querySelectorAll<HTMLElement>("section, [data-reveal-block]")
    );

    sectionTargets.forEach((el) => el.classList.add("reveal"));
    gridChildren.forEach((el) => el.classList.add("reveal"));

    const all = [...sectionTargets, ...gridChildren];

    // Wait for template page transition (~550ms) to complete
    const initialTimer = setTimeout(() => {
      // Reveal items currently in viewport
      const inView = all.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      inView.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });

      // Observe the rest for scroll reveal — stagger by grid-sibling index
      const remaining = all.filter((el) => !inView.includes(el));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              const parent = target.parentElement;
              let delay = 0;
              if (parent && parent.className.includes("grid-cols-")) {
                const siblings = Array.from(parent.children);
                delay = siblings.indexOf(target) * 90;
              }
              setTimeout(() => target.classList.add("visible"), delay);
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px 100px 0px" }
      );
      remaining.forEach((el) => observer.observe(el));
    }, 600);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div ref={pageRef}>
      <CaseStudyNav />

      {/* ── Hero ── */}
      <div className="px-6 md:px-14 pt-14 pb-8 max-w-[1200px] mx-auto">
        <PillLight>UX/UI Design · Front-End (HTML/CSS)</PillLight>
        <PageH1>AI-Powered SAT Prep Platform</PageH1>
        <PageSub>PrepMate — EdTech · Team Project</PageSub>

        {/* Phase 06 sits ~70% down a very long page; say it's there up front. */}
        <div
          className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl px-4 py-3"
          style={{ background: SAT.brandLight, border: `1px solid ${SAT.brandBorder}` }}
        >
          <span className="font-body text-[0.875rem] font-semibold" style={{ color: SAT.brand }}>
            2026 update
          </span>
          <span className="font-body text-[0.875rem]" style={{ color: SAT.bodyText }}>
            I added an AI layer — six screens, a control model, and a plan to validate it.
          </span>
          <a
            href="#ai-layer"
            className="font-body text-[0.875rem] font-medium no-underline whitespace-nowrap hover:opacity-70 transition-opacity"
            style={{ color: SAT.brand }}
          >
            Jump to it →
          </a>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
        <div className="relative w-full" style={{ maxWidth: "900px", aspectRatio: "1560/1008" }}>
          <Image src="/images/PrepMate-hero-v2.png" alt="SAT Hero" fill sizes="(max-width: 900px) 100vw, 900px" className="object-contain" priority />
        </div>
      </div>

      {/* ── Meta ── */}
      <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[#E2E8F0] mt-10 mb-2">
          <div><InfoLabel>Role</InfoLabel><InfoVal>UX Researcher<br/>UX/UI Designer<br/>Front-End (HTML/CSS)</InfoVal></div>
          <div><InfoLabel>Timeline</InfoLabel><InfoVal>March – May 2025<a href="#ai-layer" className="block mt-2 w-fit no-underline border-b border-dashed hover:opacity-70 transition-opacity" style={{ color: SAT.brand, borderColor: SAT.brandBorder }}>AI Strategy · Feb. 2026</a></InfoVal></div>
          <div><InfoLabel>Team</InfoLabel><InfoVal>Galina Kupina<br/>Daniel Opoku<br/>Alen Ghavami<span className="block mt-2 italic" style={{ color: SAT.muted }}>AI layer (2026): solo</span></InfoVal></div>
          <div><InfoLabel>Tools</InfoLabel><InfoVal>Figma · Miro<br/>Canva · Vision Studio<br/>GitHub</InfoVal></div>
        </div>

        {/* ── Overview ── */}
        <H2>Project Overview</H2>
        <Body className="max-w-3xl">
          PrepMate is an AI-powered SAT prep platform built around a simple idea: studying for the
          SAT shouldn&apos;t feel the same for everyone. The system adapts to each student&apos;s pace,
          adjusts difficulty as they grow, and gives feedback in the moment, so the road to college
          readiness feels less like a checklist and more like guidance.
        </Body>
      </div>

      {/* ── The Problem — deep slate ── */}
      <section className="py-16 mt-12" style={{ background: SAT.dark }}>
        <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
          <H2 white>The Problem</H2>
          <p
            className="font-body leading-[1.75] max-w-[820px] mb-5"
            style={{ fontSize: "0.9375rem", color: "#CBD5E1" }}
          >
            Most SAT prep wasn&apos;t built with the individual student in mind. It assumes everyone
            learns the same way and at the same pace, and students who don&apos;t fit that mold
            quietly fall behind.
          </p>
          <p
            className="font-body leading-[1.75] max-w-[820px]"
            style={{ fontSize: "0.9375rem", color: "#CBD5E1" }}
          >
            The result is familiar: students feel unprepared, discouraged, and unsure where to
            focus, and their test scores reflect it.
          </p>
        </div>
      </section>

      <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
        <Divider />

        {/* ── Phase 01 ── */}
        <PhaseBadge label="Phase 01" />
        <H2>User Research</H2>
        <Body className="max-w-3xl">
          We started the way every meaningful design starts: by listening. Before sketching a
          single screen, we wanted to understand what SAT prep actually feels like for the people
          living through it.
        </Body>

        <H3>Research Methods</H3>
        <Body>A mix of methods, each one shedding light on a different part of the experience:</Body>
        <div className="mt-3 space-y-0.5">
          <Bullet>Moderated user interviews with high school and college students</Bullet>
          <Bullet>Persona development based on research findings</Bullet>
          <Bullet>Context scenarios to explore real-life usage situations</Bullet>
          <Bullet>User journey mapping to visualize the SAT preparation experience</Bullet>
        </div>

        <H3>Interview Insights</H3>
        <Body className="max-w-3xl">
          We interviewed <strong>five students</strong> at various stages of their SAT journey.
          Some are still in high school, while others are in college reflecting on their
          experiences. All five interviews were conducted over Zoom, using a shared discussion
          guide. We then synthesized their responses to identify recurring themes.
        </Body>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: icons.zap,    title: "Overwhelm",           text: "Every student we talked to felt buried by the sheer amount of material. \"Where do I even start?\" came up again and again." },
            { icon: icons.target, title: "Need for Focus",      text: "Students didn't want to relearn what they already knew. They wanted help pinpointing the gaps and going straight to those." },
            { icon: icons.trend,  title: "Progress Visibility", text: "Four out of five said seeing real progress, even small wins, was what kept them coming back to study." },
            { icon: icons.clock,  title: "Time Constraints",    text: "Long study sessions weren't realistic. Most needed something they could fit into 20 minutes between school, work, and life." },
            { icon: icons.chat,   title: "Feedback Gap",        text: "A wrong answer with no explanation felt like a dead end. Students cared less about the score and more about understanding why." },
            { icon: icons.dollar, title: "Cost Barrier",        text: "For three out of five, a tutor was out of reach on cost. Books were the affordable fallback, but when they got stuck, there was no one to explain why." },
          ].map(({ icon, title, text }) => (
            <CardBlue key={title}>
              <div className="mb-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: SAT.brandLight, color: SAT.brandMid, border: `1px solid ${SAT.brandBorder}` }}>
                {icon}
              </div>
              <H4 className="text-[#0F172A]">{title}</H4>
              <Sm>{text}</Sm>
            </CardBlue>
          ))}
        </div>

        {/* ── Persona ── */}
        <H3>User Persona</H3>
        <div className="mt-4 rounded-2xl overflow-hidden border border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-r border-[#E2E8F0]">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image src="/images/sarah-persona-v2.png" alt="Sarah" fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <div className="font-heading font-bold text-[#0F172A]" style={{ fontSize: "1.0625rem" }}>Sarah Martinez</div>
                  <Sm>High School Junior · Age 16</Sm>
                </div>
              </div>
              <div className="mb-5">
                <InfoLabel>Background</InfoLabel>
                <Sm>A high school student preparing for the SAT, juggling classes, family expectations, and the quiet pressure of figuring out where to apply next.</Sm>
              </div>
              <InfoLabel>Goals</InfoLabel>
              <Bullet>Hit a target score for her college list</Bullet>
              <Bullet>Build confidence and lower test-day anxiety</Bullet>
              <Bullet>Stay consistent and motivated</Bullet>
            </div>
            <div className="p-8">
              <InfoLabel>Frustrations</InfoLabel>
              <div className="mb-6">
                <Bullet>Traditional test prep either too slow or too fast</Bullet>
                <Bullet>Confused about where to start</Bullet>
                <Bullet>Lack of progress tracking</Bullet>
              </div>
              <div className="p-5 rounded-xl relative" style={{ background: SAT.brandLight, borderLeft: `3px solid ${SAT.brandMid}` }}>
                <div className="font-heading font-bold mb-2" style={{ fontSize: "2.5rem", color: SAT.brandBorder, lineHeight: 1 }}>&ldquo;</div>
                <Body className="italic" style={{ color: SAT.bodyText } as React.CSSProperties}>
                  There&apos;s so much to study. I don&apos;t even know where to start and what to actually focus on.
                </Body>
              </div>
            </div>
          </div>
        </div>

        {/* ── Context Scenario ── */}
        <H3>Context Scenario</H3>
        <Body className="mb-4 max-w-3xl">We mapped Sarah&apos;s journey with PrepMate as one continuous story, from the overwhelm of too many books and no clear place to start, to finding the app, getting a personalized dashboard and instant feedback, and slowly building the confidence to walk into test day ready.</Body>
        <Image src="/images/sat-context-storyboard.png" alt="Context Scenario" width={1536} height={1024}
          className="w-full h-auto rounded-xl border border-[#E2E8F0]" />

        {/* ── Journey Map ── */}
        <H3>Journey Map</H3>
        <Sm className="mb-5">Walking through Sarah&apos;s journey from her first practice question to test day surfaced the exact moments where students lose momentum, lose confidence, or just lose interest, and those moments became our design targets.</Sm>
        <div className="p-6 rounded-2xl" style={{ background: SAT.brandLight }}>
          <Image src="/images/sat-journey-map-v2.jpg" alt="Journey Map" width={1366} height={994} className="w-full rounded-xl" />
        </div>

        {/* ── Stats ── */}
        <H3>Research & Statistics</H3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <CardWhite>
            <StatNum>43%</StatNum>
            <Sm>Per the College Board, fewer than half of students meet college-readiness benchmarks. The other 57% need more than a study guide can offer.</Sm>
          </CardWhite>
          <CardWhite>
            <StatNum>1150 vs 950</StatNum>
            <Sm>The score gap between wealthier and lower-income students is real and persistent. PrepMate exists, in part, to chip away at it.</Sm>
          </CardWhite>
        </div>

        <Divider />

        {/* ── Phase 02 ── */}
        <PhaseBadge label="Phase 02" />
        <H2>Define & Vision</H2>
        <Body className="max-w-3xl">
          After our research, we took a step back to look at what we&apos;d learned. A few clear
          patterns emerged, helping us better define the problem, shape our vision, and set goals
          for the design.
        </Body>

        <H3>Project Vision</H3>
        <CardBlue className="mt-4">
          <Sm className="mb-4">We believe smarter personalization can change what SAT prep feels like, by:</Sm>
          <Bullet>Building study plans around the student, not the other way around</Bullet>
          <Bullet>Adjusting difficulty in the moment, based on how the student is actually doing</Bullet>
          <Bullet>Giving feedback that meets each learner&apos;s style and pace</Bullet>
        </CardBlue>

        <H3>Problem Statement</H3>
        <div className="mt-4 p-6 rounded-xl flex flex-col gap-4" style={{ borderLeft: `3px solid ${SAT.brandMid}`, background: "#FAFBFF" }}>
          <Body>An AI-powered SAT prep platform that adapts to who the student actually is, instead of forcing the student to adapt to the platform.</Body>
          <Body>The tools available today don&apos;t do that, and the cost is real: students disengage, scores drop, and many give up before test day.</Body>
        </div>

        <Divider />

      </div>

      {/* ── Design Goals — light blue section ── */}
      <section style={{ background: SAT.brandLight }} className="py-20">
        <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
          <H2>Design Goals</H2>
          <Body className="mb-10 max-w-2xl">
            Four goals fell out of the research, each one a direct response to something we kept
            hearing from students. They became the guardrails for every design decision that followed.
          </Body>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { n: "01", title: "Personalized Study Plans",  desc: "The AI looks at where each student is strong, where they're shaky, and quietly builds a path that grows with them." },
              { n: "02", title: "Adaptive Difficulty",       desc: "Questions get easier or harder as the student goes, keeping the work challenging but never crushing." },
              { n: "03", title: "Real-Time Feedback",        desc: "Feedback shows up the moment a student needs it, with the kind of explanation a good teacher would give, in plain language." },
              { n: "04", title: "Progress Tracking",         desc: "A clear dashboard shows what's clicking and what still needs work, so progress feels real instead of imagined." },
            ].map(({ n, title, desc }) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-7 border relative overflow-hidden"
                style={{ borderColor: SAT.brandBorder }}
              >
                <div className="absolute top-0 left-0 h-1 w-full" style={{ background: SAT.brand }} />
                <span
                  className="font-heading font-bold block mb-3"
                  style={{ fontSize: "2rem", color: SAT.brand, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {n}
                </span>
                <H4 className="text-[#0F172A] mb-2">{title}</H4>
                <Sm>{desc}</Sm>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 md:px-14 pt-16 max-w-[1200px] mx-auto">
        <Divider />

        {/* ── Phase 03 ── */}
        <PhaseBadge label="Phase 03" />
        <H2>Design & Ideation</H2>
        <Body className="max-w-3xl">
          Once we had a clear problem and a set of goals, the fun part started. We sketched,
          wireframed, and traced flows on paper, trying ideas quickly so we could throw out the
          ones that didn&apos;t hold up.
        </Body>

        <H3>Initial Sketches & Wireframes</H3>
        <Image src="/images/sat-sketches.jpg" alt="Sketches" width={1200} height={700}
          className="w-full mt-4 rounded-xl border border-[#E2E8F0]" />

        <H3>Task Flows</H3>
        <Body className="mb-4 max-w-3xl">
          Mapping the flows step by step, from onboarding all the way to reviewing a score
          report, helped us catch dead ends and awkward jumps before they ever made it into a
          screen.
        </Body>
        <Image src="/images/sat-task-flows.jpg" alt="Task Flows" width={1200} height={700}
          className="w-full rounded-xl" />

        <Divider />

        {/* ── Phase 04 ── */}
        <PhaseBadge label="Phase 04" />
        <H2>Prototyping & Testing</H2>
        <Body className="max-w-3xl">
          With the structure in place, we built mid-fidelity prototypes that we could put in
          front of real students. The goal wasn&apos;t a polished demo, it was a chance to find
          out what didn&apos;t work yet.
        </Body>

        <H3>Mid-Fidelity Prototype</H3>
        <Image src="/images/sat-midfi.jpg" alt="Mid-Fidelity Prototype" width={1200} height={700}
          className="w-full mt-4 rounded-xl" />
        <Body className="mt-5 max-w-3xl">
          The prototype covered the moments that matter most: onboarding, the learning-style
          check, practice sessions, the score report, and the dashboard that ties it all together.
        </Body>

        <H3>Usability Test Insights</H3>
        <Body className="max-w-3xl">We ran moderated sessions with four students and the feedback was honest, useful, and exactly what we needed to hear.</Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <CardWhite>
            <H4 className="text-[#0F172A] mb-3">Key Findings</H4>
            <Bullet><><strong>Home Page Confusion:</strong> Students opened the app and weren&apos;t sure where to go first. The starting point wasn&apos;t obvious.</></Bullet>
            <Bullet><><strong>Button Inconsistency:</strong> Different labels and styles for similar actions left people second-guessing themselves.</></Bullet>
            <Bullet><><strong>Data Overload:</strong> The dashboard tried to say everything at once, and students tuned it out.</></Bullet>
          </CardWhite>
          <CardWhite>
            <H4 className="text-[#0F172A] mb-3">Recommendations</H4>
            <Bullet><><strong>Clearer Navigation:</strong> A redesigned home page with one obvious next step.</></Bullet>
            <Bullet><><strong>Consistent Buttons:</strong> One label, one style, one expectation across the app.</></Bullet>
            <Bullet><><strong>Simplified Data:</strong> Show what matters first, let the rest reveal itself when needed.</></Bullet>
            <Bullet><><strong>Motivating Elements:</strong> Small visual cues for progress, so studying feels like it&apos;s adding up to something.</></Bullet>
          </CardWhite>
        </div>

        <H3>Issue Prioritization Matrix</H3>
        <Sm className="mt-1 mb-5">
          Not every issue needed fixing at once. We sorted them by how much they hurt the
          experience (impact) and how often they showed up (frequency), so we knew where to
          spend our energy.
        </Sm>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-6 bg-[#FEF2F2] border-2 border-[#FCA5A5]">
            <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-[#DC2626] mb-2 font-body font-semibold">Critical Priority</div>
            <H4 className="text-[#7F1D1D]">High Impact + High Frequency</H4>
            <Bullet>Navigation clarity issues</Bullet>
            <Bullet>Home page intuitiveness problems</Bullet>
          </div>
          <div className="rounded-xl p-6 bg-[#FFF7ED] border-2 border-[#FDBA74]">
            <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-[#EA580C] mb-2 font-body font-semibold">High Priority</div>
            <H4 className="text-[#7C2D12]">High Impact + Low Frequency</H4>
            <Bullet>Consistency principles</Bullet>
            <Bullet>Feedback mechanisms</Bullet>
          </div>
          <div className="rounded-xl p-6 bg-[#FEFCE8] border-2 border-[#FDE047]">
            <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-[#CA8A04] mb-2 font-body font-semibold">Medium Priority</div>
            <H4 className="text-[#713F12]">Low Impact + High Frequency</H4>
            <Bullet>Visual hierarchy refinements</Bullet>
            <Bullet>Minor UI inconsistencies</Bullet>
          </div>
          <div className="rounded-xl p-6 bg-[#F0FDF4] border-2 border-[#86EFAC]">
            <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-[#16A34A] mb-2 font-body font-semibold">Low Priority</div>
            <H4 className="text-[#14532D]">Low Impact + Low Frequency</H4>
            <Bullet>Edge case scenarios</Bullet>
            <Bullet>Nice-to-have features</Bullet>
          </div>
        </div>

        <Divider />

        {/* ── Phase 05 ── */}
        <PhaseBadge label="Phase 05" />
        <H2>Design Iterations</H2>
        <Body className="max-w-3xl">
          With the feedback sorted and the worst friction points named, we went back to the
          screens. Each iteration was a small step closer to a product that felt clear, calm,
          and trustworthy, and along the way, a design system started to take shape.
        </Body>
        <div className="flex flex-col gap-4 mt-5">
          {["sat-iteration1.png","sat-iteration2.png","sat-iteration3.png","sat-iteration4.png"].map((img, i) => (
            <div key={img} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <Image
                src={`/images/${img}`}
                alt={`Iteration ${i + 1}`}
                width={1200}
                height={700}
                className="w-full block"
                style={img === "sat-iteration2.png" ? { marginBottom: "-18px" } : undefined}
              />
            </div>
          ))}
        </div>

        <H3>Design System</H3>
        <Body className="mb-4 max-w-3xl">
          We pulled the recurring pieces, colors, type, components, and interaction patterns,
          into a single, documented system. Once it was in place, the design moved faster and
          stayed quieter, the way good systems do.
        </Body>
        <Image src="/images/sat-design-system.png" alt="Design System" width={1200} height={700}
          className="w-full rounded-xl border border-[#E2E8F0]" />

        <Divider />

      </div>

      {/* ── Impact — blue-tinted ── */}
      <section className="py-20" style={{ background: SAT.brandLight }}>
        <div className="px-6 md:px-14 max-w-[1200px] mx-auto">
          <H2>Impact & Results</H2>
          <Body className="max-w-2xl mb-10">
            The design changes weren&apos;t just abstract improvements, they showed up clearly in
            how students used the product. A few of the numbers we&apos;re most proud of:
          </Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { num: "Half → Nearly all", title: "Task Completion",  desc: "Across the test tasks, completion climbed from about half to nearly all in round two, once the key screens were redesigned." },
              { num: "100%",      title: "Dashboard Clarity",      desc: "After simplifying what the dashboard tried to say, all four testers told us it finally made sense at a glance." },
              { num: "38% Faster", title: "Task Efficiency",       desc: "Students moved through the same tasks 38% faster in round two, the kind of speed-up that comes from removing friction, not adding shortcuts." },
              { num: "5 → 0",    title: "Design Consistency",      desc: "The design system erased the button inconsistencies we found in testing, and they didn't come back." },
            ].map(({ num, title, desc }) => (
              <CardWhite key={title}>
                <StatNum>{num}</StatNum>
                <H4 className="text-[#0F172A] mb-2">{title}</H4>
                <Sm>{desc}</Sm>
              </CardWhite>
            ))}
          </div>
        </div>
      </section>

      <div id="ai-layer" className="px-6 md:px-14 pt-16 max-w-[1200px] mx-auto scroll-mt-24">

        {/* ── AI Adaptive Engine ── */}
        <div className="flex flex-wrap items-center gap-3">
          <PhaseBadge label="Phase 06" />
          <PillLight>AI Strategy · Solo · 2026</PillLight>
        </div>
        <Body className="max-w-3xl">
          This part came later. After completing Stanford&apos;s <strong>UI/UX Design for AI
          Products</strong> program, I returned to PrepMate to put my new knowledge into practice,
          rethinking the adaptive AI behind the product and how its intelligence should surface for
          students.
        </Body>
        <H2>The AI Adaptive Engine</H2>
        <Body className="max-w-3xl">
          Under the hood, PrepMate runs on a single adaptive engine, but it&apos;s really four
          quiet observations woven together. Each one helps the system decide what the student
          should see next. The design work was figuring out where that thinking should stay
          invisible, and where it should surface in a way students could understand and trust.
        </Body>

        <H3>The Four Signals</H3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[
            {
              label: "Signal 01",
              title: "Knowledge Tracing",
              desc: "Tracks what each student actually knows, building a quiet, evolving picture of mastery from every answer, hint, and skipped question.",
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              ),
            },
            {
              label: "Signal 02",
              title: "Difficulty Calibration",
              desc: "Keeps the difficulty in the sweet spot, not so easy that students coast, not so hard that they shut down, but just challenging enough that they keep going.",
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="4" y1="21" x2="4" y2="14"/>
                  <line x1="4" y1="10" x2="4" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12" y2="3"/>
                  <line x1="20" y1="21" x2="20" y2="16"/>
                  <line x1="20" y1="12" x2="20" y2="3"/>
                  <line x1="1" y1="14" x2="7" y2="14"/>
                  <line x1="9" y1="8" x2="15" y2="8"/>
                  <line x1="17" y1="16" x2="23" y2="16"/>
                </svg>
              ),
            },
            {
              label: "Signal 03",
              title: "Mistake-Pattern Detection",
              desc: "Looks past right or wrong and asks why. A rushed mistake, a misunderstood concept, and a time-pressure slip all need different responses, so we built the engine to tell them apart.",
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                  <path d="M8 11h6"/>
                </svg>
              ),
            },
            {
              label: "Signal 04",
              title: "Score Trajectory Prediction",
              desc: "Shows students where their current effort could take them, an arc that updates as they grow.",
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              ),
            },
          ].map(({ label, title, desc, icon }) => (
            <CardBlue key={title}>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "white", color: SAT.brand, border: `1px solid ${SAT.brandBorder}` }}
                >
                  {icon}
                </div>
                <span
                  className="font-body font-semibold uppercase px-2.5 py-1 rounded-full"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SAT.brand, background: "white", border: `1px solid ${SAT.brandBorder}` }}
                >
                  {label}
                </span>
              </div>
              <H4 className="text-[#0F172A]">{title}</H4>
              <Sm>{desc}</Sm>
            </CardBlue>
          ))}
        </div>

        <H3>Designing Around the Engine</H3>
        <Body className="max-w-3xl">
          Students never see the four signals as raw data. Each one quietly shapes something they
          actually touch: the next question that appears, the mastery dashboard they check between
          sessions, the small &quot;why this?&quot; tooltip that explains a recommendation, the
          trajectory chart that shows where they&apos;re heading. The job wasn&apos;t to hide the
          AI. It was to give it a voice students could trust.
        </Body>

        <H3>AI Decisions &amp; Trade-offs</H3>
        <Sm className="mt-1 mb-5">
          One decision shaped how the AI actually feels to a student more than any other.
        </Sm>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "Why design the AI to sound like a tutor, not a testing engine?",
              a: "Tone decides whether a student leans in or shuts down. A flat \"You answered 7 of 10 correctly\" doesn’t help when someone is already struggling. But \"You’re getting closer on geometry — let’s try a slightly harder one\" keeps them in the seat.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="p-6 rounded-xl border-l-4 bg-white"
              style={{
                borderLeftColor: SAT.brand,
                borderTop: `1px solid ${SAT.brandBorder}`,
                borderRight: `1px solid ${SAT.brandBorder}`,
                borderBottom: `1px solid ${SAT.brandBorder}`,
                borderRadius: "0.5rem 0.75rem 0.75rem 0.5rem",
              }}
            >
              <H4 className="mb-2" style={{ color: SAT.brand }}>{q}</H4>
              <Sm>{a}</Sm>
            </div>
          ))}
        </div>

        <Divider />

      </div>

      {/* ── Phase 06, continued · AI layer ── */}
      <section className="px-6 md:px-14 pt-14 pb-20 max-w-[1200px] mx-auto">

        <H2>AI layer: from strategy to screens</H2>

        {/* 1 · How the study coach works */}
        <H3>How the study coach works</H3>
        <Sm className="max-w-[820px]">
          Each AI feature is one concrete mapping from input to output. If I couldn&apos;t name
          both, the feature wasn&apos;t ready to design.
        </Sm>

        <div className="mt-6 rounded-[20px] p-8" style={{ background: SAT.brandLight }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-5 items-center">
            {/* inputs */}
            <div>
              <InfoLabel>What goes in</InfoLabel>
              <div className="flex flex-col gap-2.5">
                {["Answers per topic", "Time per question", "Practice test history", "Test date"].map((t) => (
                  <div key={t} className="bg-white rounded-[10px] px-3.5 py-2.5 font-body text-[0.875rem]"
                    style={{ border: `1px solid ${SAT.brandBorder}`, color: SAT.bodyText }}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* core */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span aria-hidden className="text-[1.375rem] rotate-90 md:rotate-0" style={{ color: SAT.brandMid }}>→</span>
              <div className="flex-1 rounded-[18px] p-[22px] text-white w-full" style={{ background: SAT.brand }}>
                <div className="font-heading text-[1.25rem] font-semibold whitespace-nowrap mb-3">Study coach</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Predicts mastery", "Recommends", "Classifies mistakes", "Estimates score", "Writes feedback"].map((p) => (
                    <span key={p} className="font-body text-[0.75rem] px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{ background: "rgba(255,255,255,.14)" }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <span aria-hidden className="text-[1.375rem] rotate-90 md:rotate-0" style={{ color: SAT.brandMid }}>→</span>
            </div>

            {/* outputs */}
            <div>
              <InfoLabel>What comes out</InfoLabel>
              <div className="flex flex-col gap-2.5">
                {[
                  ["Next set + reason", "Home"],
                  ["Harder or easier question", "Quiz"],
                  ["Likely mistake causes", "Report"],
                  ["Test-day score range", "Progress"],
                ].map(([left, right]) => (
                  <div key={left} className="bg-white rounded-[10px] px-3.5 py-2.5 flex justify-between items-center gap-3"
                    style={{ border: `1px solid ${SAT.brandBorder}` }}>
                    <span className="font-body text-[0.875rem]" style={{ color: SAT.bodyText }}>{left}</span>
                    <span className="font-body text-[0.75rem] whitespace-nowrap" style={{ color: SAT.muted }}>{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 text-center font-body text-[0.8125rem]"
            style={{ borderTop: `1px dashed ${SAT.brandBorder}`, color: SAT.subtleText }}>
            ↺ The student acts on it, and every new answer feeds the coach again.
          </div>
        </div>

        {/* 2 · Control scale */}
        <H3>The AI suggests, the student decides</H3>
        <Sm className="max-w-[820px]">
          For every screen I chose how much the AI does on its own and how the student takes
          control back.
        </Sm>

        <div className="mt-6 mb-14 overflow-x-auto">
          <div className="relative min-w-[700px] h-[250px]">
            {/* the bar */}
            <div className="absolute left-0 right-0 rounded-[4px]"
              style={{ top: "126px", height: "8px", background: "linear-gradient(to right, #BFDBFE, #1E40AF)" }} />
            {/* end labels */}
            <div className="absolute left-0 font-body text-[0.6875rem] uppercase tracking-[0.12em]"
              style={{ top: "228px", color: SAT.muted }}>Student controls</div>
            <div className="absolute right-0 font-body text-[0.6875rem] uppercase tracking-[0.12em]"
              style={{ top: "228px", color: SAT.muted }}>AI acts</div>

            {[
              { left: "10%", above: true,  title: "Settings",     caption: "Student owns the data",       dot: "#93B4F5" },
              { left: "26%", above: false, title: "Self-check",   caption: "Student picks first",         dot: "#7BA0EE" },
              { left: "42%", above: true,  title: "Score report", caption: "Causes are editable guesses", dot: "#638CE6" },
              { left: "58%", above: false, title: "Progress",     caption: "Range + “why”",               dot: "#4B78DF" },
              { left: "74%", above: true,  title: "Quiz",         caption: "Adjusts difficulty, says why", dot: "#3364D7" },
              { left: "90%", above: false, title: "Home",         caption: "Picks for you, Swap anytime", dot: "#1E40AF" },
            ].map(({ left, above, title, caption, dot }) => (
              <div
                key={title}
                className="absolute w-[150px] -translate-x-1/2 flex flex-col items-center text-center"
                style={above ? { left, bottom: "111px" } : { left, top: "136px" }}
              >
                {above ? (
                  <>
                    <div className="font-body text-[0.875rem] font-semibold" style={{ color: "#0F172A" }}>{title}</div>
                    <div className="font-body text-[0.75rem] mt-0.5" style={{ color: SAT.subtleText }}>{caption}</div>
                    <div className="w-0.5 h-[26px] mt-1.5" style={{ background: SAT.brandBorder }} />
                    <div className="w-[18px] h-[18px] rounded-full bg-white" style={{ border: `4px solid ${dot}` }} />
                  </>
                ) : (
                  <>
                    <div className="w-[18px] h-[18px] rounded-full bg-white -mt-3.5" style={{ border: `4px solid ${dot}` }} />
                    <div className="w-0.5 h-[26px] mb-1.5" style={{ background: SAT.brandBorder }} />
                    <div className="font-body text-[0.875rem] font-semibold" style={{ color: "#0F172A" }}>{title}</div>
                    <div className="font-body text-[0.75rem] mt-0.5" style={{ color: SAT.subtleText }}>{caption}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2b · The six screens */}
        <H3>The six screens</H3>
        <Sm className="max-w-[820px]">
          Each screen puts one AI signal into the interface. Concept work, not yet tested with
          students.
        </Sm>

        {/* Each screen carries the accent it has on the control scale above, so the
            two sections read as one argument rather than two lists. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16 mt-10">
          {[
            { file: "sat-ai-home.png",      n: "01", title: "Home",           accent: "#1E40AF", caption: "“Up next” pick with its reason; Swap anytime",    alt: "PrepMate home screen with a recommended Geometry practice set and the reason for the pick" },
            { file: "sat-ai-score.png",     n: "02", title: "Score report",   accent: "#638CE6", caption: "Score as a range; likely mistake causes",         alt: "PrepMate score report showing 1330 with range 1300–1360 and mistake causes" },
            { file: "sat-ai-progress.png",  n: "03", title: "Progress",       accent: "#4B78DF", caption: "Trend and test-day projection as a band",         alt: "PrepMate progress chart with three practice tests and a projected score range" },
            { file: "sat-ai-quiz.png",      n: "04", title: "Quiz",           accent: "#3364D7", caption: "Difficulty adjusts and says why",                 alt: "PrepMate quiz question with a difficulty change note" },
            { file: "sat-ai-selfcheck.png", n: "05", title: "Self-check",     accent: "#7BA0EE", caption: "Student picks first, then sees the coach’s pick", alt: "PrepMate self-check asking the student what to practise before showing the AI pick" },
            { file: "sat-ai-privacy.png",   n: "06", title: "Privacy & data", accent: "#93B4F5", caption: "Student controls what parents see",               alt: "PrepMate privacy settings with parent view and data deletion controls" },
          ].map(({ file, n, title, caption, alt, accent }, i) => (
            // Middle column rides lower, so the row reads as a board rather than a table.
            <div key={file} className={i % 3 === 1 ? "md:mt-16" : ""}>
              <div className="w-4/5 mx-auto">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-x-0 rounded-[28px]"
                  style={{ top: "6%", bottom: "6%", background: SAT.brandLight }}
                />
                <Image
                  src={`/images/${file}`}
                  alt={alt}
                  width={390}
                  height={844}
                  sizes="(min-width:768px) 27vw, 40vw"
                  className="relative w-full h-auto"
                  style={{ borderRadius: "14.36% / 6.64%" }}
                />
              </div>

              <div className="mt-5 flex items-start gap-3">
                <span className="font-heading text-[1.625rem] font-bold leading-none" style={{ color: accent }}>
                  {n}
                </span>
                <span className="block pt-0.5">
                  <span className="block font-body text-[0.875rem] font-semibold" style={{ color: "#0F172A" }}>
                    {title}
                  </span>
                  <span className="block font-body text-[0.8125rem] mt-1" style={{ color: SAT.subtleText }}>
                    {caption}
                  </span>
                </span>
              </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px" style={{ background: `linear-gradient(to right, ${SAT.brandBorder}, transparent)` }} />

        {/* 3 · Validation plan */}
        <H3>How I&apos;d validate this</H3>
        <Sm className="max-w-[820px]">
          Four cheap steps before any model is built, from &ldquo;is the output useful?&rdquo; to
          &ldquo;do real students trust it?&rdquo;.
        </Sm>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { n: "1", title: "LLM value test", body: "Paste a student's real test answers into an LLM. Ask for the next set, a reason and mistake causes. Show students the output, with no UI.", tests: "is the pick useful and believable?" },
            { n: "2", title: "Wizard of Oz", body: "A tutor hand-picks “Up next” and writes the reason, delivered through the prototype for one week.", tests: "do students follow the pick or swap it?" },
            { n: "3", title: "Simulated students", body: "Run the flows past 10–20 AI student personas (anxious junior, short-on-time athlete, English learner) to collect likely objections.", tests: "hypotheses only, not evidence." },
            { n: "4", title: "Real students", body: "Moderated sessions with 4–5 students on the clickable prototype, focused on what simulation flagged.", tests: "trust, understanding, control." },
          ].map(({ n, title, body, tests }) => (
            <div key={n} className="relative bg-white rounded-2xl pt-7 px-[1.375rem] pb-[1.375rem] overflow-hidden"
              style={{ border: `1px solid ${SAT.brandBorder}` }}>
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: SAT.brand }} />
              <div className="font-heading text-[2rem] font-bold leading-none mb-2" style={{ color: SAT.brand }}>{n}</div>
              <H4 className="mb-2" style={{ color: "#0F172A" }}>{title}</H4>
              <p className="font-body text-[0.875rem] leading-[1.6] mb-2" style={{ color: SAT.bodyText }}>{body}</p>
              <p className="font-body text-[0.8125rem] italic" style={{ color: SAT.muted }}>Tests: {tests}</p>
            </div>
          ))}
        </div>

        {/* 4 · Success metrics */}
        <H3>What would prove it works</H3>
        <Sm className="max-w-[820px]">
          The goal is students who learn faster with the AI than without it. Targets would be set
          during the pilot.
        </Sm>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { title: "Score gain per week", body: "Students following picks vs choosing alone." },
            { title: "Repeated mistakes", body: "Same mistake type showing up again within two weeks." },
            { title: "Time to goal score", body: "Weeks from first test to target." },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-2xl p-[1.375rem]"
              style={{ background: SAT.brandLight, border: `1px solid ${SAT.brandBorder}` }}>
              <H4 className="mb-2" style={{ color: SAT.brand }}>{title}</H4>
              <p className="font-body text-[0.875rem] leading-[1.6]" style={{ color: SAT.bodyText }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl px-[1.375rem] py-5 bg-white" style={{ border: "1px solid #E2E8F0" }}>
          <div className="flex flex-wrap justify-between items-baseline gap-2 mb-3">
            <H4 style={{ color: "#0F172A" }}>Healthy trust</H4>
            <span className="font-body text-[0.8125rem]" style={{ color: SAT.muted }}>
              Share of coach picks students accept
            </span>
          </div>
          <div className="flex gap-0.5 h-3.5 rounded-[7px] overflow-hidden">
            <div className="basis-0 grow" style={{ background: "#FDBA74" }} />
            <div className="basis-0 grow-[2]" style={{ background: "#86EFAC" }} />
            <div className="basis-0 grow" style={{ background: "#FDBA74" }} />
          </div>
          <div className="flex gap-0.5 mt-2 font-body text-[0.75rem]">
            <span className="basis-0 grow" style={{ color: SAT.muted }}>Almost none · students don&apos;t trust it</span>
            <span className="basis-0 grow-[2] text-center font-semibold" style={{ color: "#14532D" }}>Mix of accept, swap and relabel</span>
            <span className="basis-0 grow text-right" style={{ color: SAT.muted }}>Almost all · accepted without thinking</span>
          </div>
        </div>

        <div className="mt-14 h-px" style={{ background: `linear-gradient(to right, ${SAT.brandBorder}, transparent)` }} />

        {/* 5 · Ethics and society review */}
        <H3>Ethics and society review</H3>
        <Sm className="max-w-[820px]">
          AI in education isn&apos;t a low-stakes space. Most users are kids, the test influences
          where they go to college, and the same tools that could narrow achievement gaps could
          just as easily widen them. For each risk I set a principle, then turned it into a
          concrete design decision.
        </Sm>

        <div className="mt-6 overflow-x-auto rounded-2xl" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr style={{ background: SAT.brandLight }}>
                {["Risk", "Principle", "Design decision"].map((h, i) => (
                  <th key={h}
                    className="text-left font-body text-[0.6875rem] uppercase tracking-[0.12em] font-semibold px-[1.125rem] py-3.5"
                    style={{ color: SAT.muted, width: i === 2 ? "39%" : "30.5%" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Parents or schools watching every mistake", "The student owns their data", "Parent view shows scores and practice time only, and the student turns it on"],
                ["Students leaning on the AI instead of learning to study", "Build self-direction, not dependence", "The AI proposes a daily plan; students reorder, swap or skip any of it — a map, not a leash"],
                ["A silent “do this next” teaching nothing", "Every pick explains itself", "Each recommendation names the concept, mistake pattern or time of day behind it"],
                ["Projections discouraging lower-scoring students", "Encourage, never label ability", "Ranges, “Why this estimate?” and a how-to-improve step next to every projection"],
                ["Model works worse for some groups", "Equal accuracy across students", "Check pick and mistake-label accuracy for English learners and other groups before launch"],
                ["Streaks causing stress and late-night study", "Healthy habits over engagement", "Forgiving streak and quiet hours, both on by default"],
                ["Minors' data reused or sold", "Transparency and consent", "Collect only what personalization needs, aligned with FERPA and COPPA; download and delete history, and we never sell data"],
              ].map(([risk, principle, decision]) => (
                <tr key={risk} style={{ borderTop: "1px solid #E2E8F0" }}>
                  <td className="align-top px-[1.125rem] py-3.5 font-body text-[0.875rem] font-semibold leading-[1.6]" style={{ color: "#0F172A" }}>{risk}</td>
                  <td className="align-top px-[1.125rem] py-3.5 font-body text-[0.875rem] leading-[1.6]" style={{ color: SAT.bodyText }}>{principle}</td>
                  <td className="align-top px-[1.125rem] py-3.5 font-body text-[0.875rem] leading-[1.6]" style={{ color: SAT.bodyText }}>{decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Key Learnings ── */}
      <div className="px-6 md:px-14 py-20 max-w-[1200px] mx-auto">
        <div className="grid gap-6 md:gap-12 items-start grid-cols-1 md:grid-cols-[1fr_2fr]">
          <div>
            <H2>Key Learnings</H2>
          </div>
          <div className="space-y-8">
            {[
              { title: "Personalization Is Critical for EdTech",   desc: "Two students preparing for the same test are rarely the same student. Designing for that difference, not against it, was the unlock." },
              { title: "AI Can Bridge Educational Equity Gaps",    desc: "When adaptive, thoughtful prep is available to anyone with a phone, the playing field starts to look a little less tilted." },
              { title: "Research Uncovers Hidden Pain Points",     desc: "The most important things students said never showed up in a survey. They came out in conversation, often as a sigh, and they shaped the product more than any metric did." },
              { title: "Balance Power with Simplicity",           desc: "A smart system that overwhelms the user isn't smart. The best AI experiences are the ones that quietly make the surface easier." },
            ].map(({ title, desc }) => (
              <div key={title}>
                <H4 className="text-[#0F172A] mb-1">{title}</H4>
                <Sm>{desc}</Sm>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-14 py-10 flex justify-between items-center border-t max-w-[1200px] mx-auto" style={{ borderColor: SAT.brandBorder }}>
        <p className="font-body text-[0.875rem]" style={{ color: SAT.muted }}>
          Thank you for reading this case study!
        </p>
        <a href="/"
          className="px-7 py-3.5 rounded-full font-body font-medium text-white no-underline"
          style={{ background: SAT.brand, fontSize: "0.875rem" }}>
          Back to Portfolio
        </a>
      </footer>
    </div>
  );
}
