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
function H4({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={`font-heading font-semibold mb-2 ${className}`}
      style={{ fontSize: "0.9375rem" }}>
      {children}
    </h4>
  );
}
function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-body leading-[1.72] max-w-[700px] ${className}`}
      style={{ fontSize: "0.9375rem", color: SAT.subtleText }}>
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
      <div className="px-14 pt-14 pb-8 max-w-[1200px] mx-auto">
        <PillLight>UX/UI Design · Front-End (HTML/CSS)</PillLight>
        <PageH1>AI-Powered SAT Prep Platform</PageH1>
        <PageSub>PrepMate — EdTech · Team Project</PageSub>
      </div>

      {/* ── Hero image ── */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div className="relative w-full" style={{ maxWidth: "900px", aspectRatio: "1560/1008" }}>
          <Image src="/images/PrepMate-hero-v2.png" alt="SAT Hero" fill className="object-contain" priority />
        </div>
      </div>

      {/* ── Meta ── */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-8 py-8 border-b border-[#E2E8F0] mt-10 mb-2">
          <div><InfoLabel>Role</InfoLabel><InfoVal>UX Researcher<br/>UX/UI Designer<br/>Front-End (HTML/CSS)</InfoVal></div>
          <div><InfoLabel>Timeline</InfoLabel><InfoVal>10 Weeks<br/>Sept. – Nov. 2024<span className="block mt-2">AI Strategy · Feb. 2026</span></InfoVal></div>
          <div><InfoLabel>Team</InfoLabel><InfoVal>Galina Kupina<br/>Daniel Opoku<br/>Alen Ghavami</InfoVal></div>
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
        <div className="px-14 max-w-[1200px] mx-auto">
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

      <div className="px-14 max-w-[1200px] mx-auto">
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
          We sat down with <strong>5 students</strong> in the middle of their SAT journey,
          some still in high school, some in college reflecting back. The conversations were less
          about study tips and more about how it actually felt: the pressure, the doubt, and the
          small things that made the difference.
        </Body>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: icons.zap,    title: "Overwhelm",           text: "Every student we talked to felt buried by the sheer amount of material. \"Where do I even start?\" came up again and again." },
            { icon: icons.target, title: "Need for Focus",      text: "Students didn't want to relearn what they already knew. They wanted help pinpointing the gaps and going straight to those." },
            { icon: icons.trend,  title: "Progress Visibility", text: "Four out of five said seeing real progress, even small wins, was what kept them coming back to study." },
            { icon: icons.clock,  title: "Time Constraints",    text: "Long study sessions weren't realistic. Most needed something they could fit into 20 minutes between school, work, and life." },
            { icon: icons.chat,   title: "Feedback Gap",        text: "A wrong answer with no explanation felt like a dead end. Students cared less about the score and more about understanding why." },
            { icon: icons.dollar, title: "Cost Barrier",        text: "Tutors and paid prep books weren't an option for most. Affordability wasn't a nice-to-have; it was the deciding factor." },
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
          <div className="grid grid-cols-2">
            <div className="p-8 border-r border-[#E2E8F0]">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image src="/images/sarah-persona.jpg" alt="Sarah" fill className="object-cover" />
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
              <Bullet>Achieve higher test scores</Bullet>
              <Bullet>Access flexible learning</Bullet>
              <Bullet>Track progress effectively</Bullet>
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
                  There&apos;s so much to study. I don&apos;t even know where to start. I just want something that tells me what to actually focus on.
                </Body>
              </div>
            </div>
          </div>
        </div>

        {/* ── Context Scenario ── */}
        <H3>Context Scenario</H3>
        <Body className="mb-4 max-w-3xl">We mapped out what real moments of using PrepMate might look like, from a quick 15-minute review on the bus to a longer Saturday-morning session at home, to make sure the design held up across the messy reality of student life.</Body>
        <Image src="/images/sat-context-scenario.png" alt="Context Scenario" width={1200} height={700}
          className="w-full rounded-xl border border-[#E2E8F0]" />

        {/* ── Journey Map ── */}
        <H3>Journey Map</H3>
        <Sm className="mb-5">Walking through Sarah&apos;s journey from her first practice question to test day surfaced the exact moments where students lose momentum, lose confidence, or just lose interest, and those moments became our design targets.</Sm>
        <div className="p-6 rounded-2xl" style={{ background: SAT.brandLight }}>
          <Image src="/images/sat-journey-map.jpg" alt="Journey Map" width={1200} height={600} className="w-full rounded-xl" />
        </div>

        {/* ── Stats ── */}
        <H3>Research & Statistics</H3>
        <div className="grid grid-cols-2 gap-6 mt-4">
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
          With the research in hand, we stepped back to make sense of what we had heard. The
          patterns were clearer than we expected, and they pointed to a sharper problem, a
          stronger vision, and a set of goals worth designing around.
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

        {/* ── AI Adaptive Engine ── */}
        <PhaseBadge label="AI Strategy" />
        <H2>The AI Adaptive Engine</H2>
        <Body className="max-w-3xl">
          Under the hood, PrepMate runs on a single adaptive engine, but it&apos;s really four
          quiet observations woven together. Each one helps the system decide what the student
          should see next. The design work was figuring out where that thinking should stay
          invisible, and where it should surface in a way students could understand and trust.
        </Body>

        <H3>The Four Signals</H3>
        <div className="grid grid-cols-2 gap-4 mt-4">
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
              desc: "Shows students where their current effort could take them. Not a fixed verdict, but a hopeful arc that updates as they grow.",
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

        <H3>How the Signals Feed the Experience</H3>
        <Sm className="mt-1 mb-5">
          On their own, each signal is just an observation. Together, they form a loop that
          shapes everything a student touches, from the next question to the small explanation
          behind why it appeared.
        </Sm>
        <CardBlue>
          <div className="grid grid-cols-5 gap-4 items-start text-center relative">
            {[
              { label: "Student answers", desc: "Question, hint use, time spent" },
              { label: "Engine updates", desc: "All four signals re-score" },
              { label: "Decision", desc: "Next question, topic, or break" },
              { label: "Surface", desc: "Shown with reasoning" },
              { label: "Feedback", desc: "Student response loops back" },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-2 relative">
                {i < 4 && (
                  <div
                    className="absolute top-4 hidden md:block"
                    style={{ right: "-12%", color: SAT.brandBorder, fontSize: "1.25rem" }}
                  >
                    →
                  </div>
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-white"
                  style={{ background: SAT.brand, fontSize: "0.75rem" }}
                >
                  {i + 1}
                </div>
                <div className="font-body font-semibold" style={{ fontSize: "0.8125rem", color: SAT.bodyText }}>
                  {step.label}
                </div>
                <div className="font-body" style={{ fontSize: "0.6875rem", color: SAT.muted, lineHeight: 1.45 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </CardBlue>

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
          Two decisions shaped how the AI actually feels to a student. Both came down to the same
          question: how do we use the system&apos;s intelligence without taking away the student&apos;s?
        </Sm>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "Why adaptive difficulty instead of fixed practice tests?",
              a: "Fixed tests favor students who already get it and frustrate the ones still finding their footing. Adaptive difficulty meets students where they actually are and grows the challenge with them, the way a good tutor does: pushing just hard enough to stretch, never hard enough to break.",
            },
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

      {/* ── Design Goals — light blue section ── */}
      <section style={{ background: SAT.brandLight }} className="py-20">
        <div className="px-14 max-w-[1200px] mx-auto">
          <H2>Design Goals</H2>
          <Body className="mb-10 max-w-2xl">
            Four goals fell out of the research, each one a direct response to something we kept
            hearing from students. They became the guardrails for every design decision that followed.
          </Body>

          <div className="grid grid-cols-2 gap-5">
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

      <div className="px-14 pt-16 max-w-[1200px] mx-auto">
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
        <div className="grid grid-cols-2 gap-4 mt-4">
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
        <div className="grid grid-cols-2 gap-4">
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

      {/* ── Ethics & Responsible AI ── */}
      <section className="py-20" style={{ background: SAT.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <PhaseBadge label="Ethics & Responsible AI" />
          <H2 white>Building an AI Experience Students &amp; Parents Can Trust</H2>
          <p className="font-body leading-[1.72] max-w-[760px] mb-10" style={{ fontSize: "0.9375rem", color: "#CBD5E1" }}>
            AI in education isn&apos;t a low-stakes space. Most users are kids, the test
            influences where they go to college, and the same tools that could narrow
            achievement gaps could just as easily widen them. So we sat with the risks honestly
            and designed deliberate responses to three of the biggest.
          </p>

          <div className="flex flex-col gap-5">
            {[
              {
                title: "Data Privacy",
                risk: "Students using PrepMate are minors. Their study patterns, mistakes, and projected scores are personal, and in the wrong hands (advertisers, colleges, even an anxious parent), that data can shape someone's future unfairly.",
                response: "Collect only what personalization actually needs. Stay aligned with FERPA and COPPA. Let students decide what parents see, never share with third parties, and give students the right to delete their mistake history on request.",
              },
              {
                title: "Algorithm Overreliance",
                risk: "If the AI is always the one choosing what to study next, students stop building the most important skill of all: knowing themselves as learners. That's the skill they'll need long after the SAT.",
                response: "The AI suggests a daily plan, but the student leads. They can change the order, swap a subject, or skip a topic outright. The system offers a map, not a leash.",
              },
              {
                title: "Transparency",
                risk: "A silent \"do this next\" doesn’t teach anything. Students either follow blindly or stop trusting the system the first time it feels arbitrary. Either outcome is a loss.",
                response: "Every recommendation comes with a small honest reason: which concept, which mistake pattern, which time of day. Score predictions show a range, not a verdict, so progress feels like possibility instead of pressure.",
              },
            ].map(({ title, risk, response }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white border"
                style={{ borderColor: SAT.brandBorder }}
              >
                <H4 className="text-[#0F172A] mb-3">{title}</H4>
                <div className="mb-3">
                  <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#B45309", textTransform: "uppercase" }}>
                    Risk
                  </div>
                  <Sm>{risk}</Sm>
                </div>
                <div>
                  <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SAT.brand, textTransform: "uppercase" }}>
                    Design Response
                  </div>
                  <Sm>{response}</Sm>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact — blue-tinted ── */}
      <section className="py-20" style={{ background: SAT.brandLight }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <H2>Impact & Results</H2>
          <Body className="max-w-2xl mb-10">
            The design changes weren&apos;t just abstract improvements, they showed up clearly in
            how students used the product. A few of the numbers we&apos;re most proud of:
          </Body>
          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "58% → 91%", title: "Task Completion Rate",   desc: "Once the key screens were redesigned, far more students made it through the core flows from start to finish." },
              { num: "100%",      title: "Dashboard Clarity",      desc: "After simplifying what the dashboard tried to say, every tester told us it finally made sense at a glance." },
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

      {/* ── Key Learnings ── */}
      <div className="px-14 py-20 max-w-[1200px] mx-auto">
        <div className="grid gap-12 items-start" style={{ gridTemplateColumns: "1fr 2fr" }}>
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
      <footer className="px-14 py-10 flex justify-between items-center border-t max-w-[1200px] mx-auto" style={{ borderColor: SAT.brandBorder }}>
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
