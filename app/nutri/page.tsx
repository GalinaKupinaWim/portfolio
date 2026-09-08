"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CaseStudyNav from "@/components/CaseStudyNav";

/* ── NutriWise design tokens ── */
const N = {
  brand:       "#2BB673",  // Fresh Green Accent
  brandMid:    "#2BB673",
  brandLight:  "#DFF5EC",  // Soft Mint
  brandBorder: "#B2DEC9",  // Soft Mint border
  cream:       "#FAF9F6",  // Warm Cream
  gold:        "#F5B700",  // Soft Gold Accent
  dark:        "#0F4C5C",  // Deep Teal
  bodyText:    "#0F4C5C",  // Deep Teal for headings
  subtleText:  "#3D6B5E",
  muted:       "#7A9088",
};

/* ── Primitives ── */
function PhasePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-5 py-1.5 rounded-full font-body font-semibold tracking-[0.06em] uppercase mb-5 text-white"
      style={{ fontSize: "0.6875rem", background: N.brand }}
    >
      {children}
    </span>
  );
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-4 py-1.5 rounded-full font-body font-medium mb-6 border"
      style={{ fontSize: "0.8125rem", background: N.brandLight, borderColor: N.brandBorder, color: N.brand }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <hr
      className="border-none my-14"
      style={{ height: "1px", background: `linear-gradient(to right, transparent, ${N.brandBorder}, transparent)` }}
    />
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-heading font-bold tracking-[-0.02em] mb-4 ${className}`}
      style={{ fontSize: "clamp(1.3rem,2.2vw,1.75rem)", color: N.bodyText }}
    >
      {children}
    </h2>
  );
}

function H3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`font-heading font-semibold tracking-[-0.01em] mt-8 mb-3 ${className}`}
      style={{ fontSize: "clamp(0.95rem,1.5vw,1.125rem)", color: N.bodyText }}
    >
      {children}
    </h3>
  );
}

function H4({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <h4
      className={`font-heading font-semibold mb-2 ${className}`}
      style={{ fontSize: "0.9375rem", color: N.bodyText, ...style }}
    >
      {children}
    </h4>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-body leading-[1.75] max-w-[700px] ${className}`} style={{ fontSize: "0.9375rem", color: N.subtleText }}>
      {children}
    </p>
  );
}

function BodySm({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-body leading-[1.7] max-w-[700px] ${className}`} style={{ fontSize: "0.875rem", color: N.subtleText }}>
      {children}
    </p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-3 font-body leading-[1.7]" style={{ fontSize: "0.875rem", color: N.subtleText }}>
      <span style={{ color: N.brandMid, marginTop: "2px", flexShrink: 0 }}>◆</span>
      <span>{children}</span>
    </div>
  );
}

function CardGreen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-7 rounded-2xl border ${className}`} style={{ background: N.brandLight, borderColor: N.brandBorder }}>
      {children}
    </div>
  );
}

function CardWhite({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-7 rounded-2xl border ${className}`} style={{ background: N.cream, borderColor: N.brandBorder }}>
      {children}
    </div>
  );
}

function StatNum({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-heading font-bold" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: N.brand }}>
        {children}
      </span>
      <span className="font-body mt-1" style={{ fontSize: "0.75rem", color: N.muted, letterSpacing: "0.04em" }}>
        {label}
      </span>
    </div>
  );
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body uppercase tracking-[0.08em] mb-1" style={{ fontSize: "0.6875rem", color: N.muted }}>
      {children}
    </div>
  );
}

function InfoVal({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body leading-[1.6]" style={{ fontSize: "0.875rem", color: N.bodyText }}>
      {children}
    </div>
  );
}

export default function NutriPage() {
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
      <div className="px-14 pt-16 pb-10 max-w-[1200px] mx-auto">
        <TagPill>AI Product · Mobile App · UX Research · UX/UI Design</TagPill>
        <h1
          className="font-heading font-bold tracking-[-0.025em] mb-3"
          style={{ fontSize: "clamp(1.9rem,4.5vw,3.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: N.bodyText }}
        >
          NutriWise
        </h1>
        <p
          className="font-heading font-normal"
          style={{ fontSize: "clamp(1rem,2vw,1.5rem)", lineHeight: 1.3, color: N.muted }}
        >
          Empowering Healthy Eating
        </p>
      </div>

      {/* Hero image */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div className="relative w-full" style={{ maxWidth: "900px", aspectRatio: "1684/934" }}>
          <Image src="/images/nutri-hero-v3.png" alt="NutriWise Mockups" fill className="object-contain" priority />
        </div>
      </div>

      {/* ── Project meta ── */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div
          className="grid grid-cols-4 gap-8 py-7 my-10 border-t border-b"
          style={{ borderColor: N.brandBorder }}
        >
          <div><InfoLabel>Role</InfoLabel><InfoVal>UX Researcher<br />UX/UI Designer</InfoVal></div>
          <div><InfoLabel>Timeline</InfoLabel><InfoVal>20 weeks<br />(Jan – June 2025)</InfoVal></div>
          <div><InfoLabel>Team</InfoLabel><InfoVal>Solo Project</InfoVal></div>
          <div><InfoLabel>Tools</InfoLabel><InfoVal>Figma<br />FigJam<br />Optimal Workshop</InfoVal></div>
        </div>

        <H2>Project Overview</H2>
        <Body className="max-w-[760px]">
          NutriWise is an AI-powered nutrition platform designed to reduce the daily friction of
          eating well. It supports users across meal planning, shopping, and tracking, while
          preserving their sense of control over the choices that shape their day.
        </Body>

        <div className="grid grid-cols-3 gap-5 mt-8">
          <CardGreen>
            <H4>Problem Solved</H4>
            <BodySm>Reduces the cognitive load of recurring food decisions, what to cook, what to buy, what to skip, by offering flexible, personalized guidance instead of generic meal plans.</BodySm>
          </CardGreen>
          <CardGreen>
            <H4>Value Proposition</H4>
            <BodySm>A mixed-initiative AI experience that adapts to each user&apos;s schedule, skill level, and goals, while making it easy to pause, adjust, or take full control whenever needed. Trust grows when users always know they can.</BodySm>
          </CardGreen>
          <CardGreen>
            <H4>Core Features</H4>
            <BodySm>Meal planning, intelligent grocery lists, nutrition tracking, quick meal suggestions, and visual meal recognition that simplifies daily logging. Every recommendation is supported by clear, transparent reasoning.</BodySm>
          </CardGreen>
        </div>

        <Divider />
      </div>

      {/* ── The Problem — deep forest ── */}
      <section className="py-16" style={{ background: N.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <H2 className="!text-white">The Problem</H2>
          <p
            className="font-body leading-[1.75] max-w-[820px]"
            style={{ fontSize: "0.9375rem", color: "#DFF5EC" }}
          >
            Eating well takes more than motivation. For many people, nutrition apps add to the
            workload rather than reduce it, requiring constant logging, offering generic plans,
            and surfacing data without context. Most users begin with strong intentions but
            disengage within a few weeks, no closer to the goals they set out to reach.
          </p>
        </div>
      </section>

      {/* ── Phase 01 ── */}
      <div className="px-14 pt-14 max-w-[1200px] mx-auto">
        <PhasePill>Phase 01</PhasePill>
        <H2>User Research</H2>
        <Body>Before any design work, I wanted to understand what eating well looks like in practice, in real kitchens, real shopping habits, and real experiences with the apps people had tried and abandoned.</Body>

        <H3>Research Methods</H3>
        <div className="grid grid-cols-3 gap-5 mt-6">
          <CardWhite>
            <H4>Research Approach</H4>
            <BodySm>A qualitative study built around six in-depth interviews with people who cook regularly at home, focused on their habits, challenges, and the role technology plays in their food choices.</BodySm>
          </CardWhite>
          <CardWhite>
            <H4>Interview Structure</H4>
            <Bullet>45–60 minute remote one-on-one sessions designed to draw out detailed, candid responses</Bullet>
            <Bullet>Topics included cooking routines, prior experience with nutrition apps, and how technology supports or hinders daily eating decisions</Bullet>
          </CardWhite>
          <CardWhite>
            <H4>Analysis Techniques</H4>
            <Bullet>Synthesized recurring themes from each conversation to identify the most consistent user needs</Bullet>
            <Bullet>Translated insights into a customer journey map and user persona to ground design decisions in real behavior</Bullet>
          </CardWhite>
        </div>

        <H3>Participant Demographics</H3>
        <div className="flex gap-10 items-start mt-6">
          <div className="flex-1 flex flex-col gap-2">
            <Bullet>Six home cooks, all preparing meals at home at least four nights a week</Bullet>
            <Bullet>A range of genders, age groups, and life stages</Bullet>
            <Bullet>A mix of participants familiar with nutrition apps and others new to the category</Bullet>
            <Bullet>Busy professionals and family cooks, the audiences most affected by daily decision fatigue</Bullet>
          </div>
          {/* 6 participant photos — staggered grid matching original */}
          <div className="grid grid-cols-3 gap-4 w-[58%]">
            {[
              { img: "nutri-participant-1.png", mt: "0" },
              { img: "nutri-participant-2.png", mt: "32px" },
              { img: "nutri-participant-3.png", mt: "64px" },
              { img: "nutri-participant-4.png", mt: "16px" },
              { img: "nutri-participant-5.png", mt: "48px" },
              { img: "nutri-participant-6.png", mt: "80px" },
            ].map(({ img, mt }) => (
              <div
                key={img}
                className="aspect-video overflow-hidden rounded-xl border relative"
                style={{ borderColor: N.brandBorder, marginTop: mt }}
              >
                <Image src={`/images/${img}`} alt="Participant" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <H3>Experience with Nutrition Apps</H3>
        <Body>Understanding participants&apos; prior experience revealed a consistent pattern of why most nutrition apps fail to retain their users.</Body>
        <div className="grid grid-cols-3 gap-5 mt-6">
          {[
            {
              pct: "17%",
              title: "Still Searching",
              desc: "One participant was actively looking for a nutrition app that fit their lifestyle and goals.",
              icon: (
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              ),
            },
            {
              pct: "66%",
              title: "Used and Quit",
              desc: "Two-thirds of participants had tried a nutrition app and ultimately stopped using it.",
              icon: (
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              ),
            },
            {
              pct: "17%",
              title: "Never Tried",
              desc: "Only one participant had never used a nutrition app, citing skepticism about their value.",
              icon: (
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              ),
            },
          ].map(({ pct, title, desc, icon }) => (
            <CardGreen key={title} className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: N.brandBorder, color: N.brand }}
              >
                {icon}
              </div>
              <div className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", color: N.brand }}>
                {pct}
              </div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </CardGreen>
          ))}
        </div>

        <H3>Barriers &amp; Concerns Using Nutrition Apps</H3>
        <div className="mt-6 rounded-2xl overflow-hidden border" style={{ borderColor: N.brandBorder }}>
          <table className="w-full font-body" style={{ fontSize: "0.875rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: N.brand, color: "white" }}>
                <th className="text-left px-5 py-3 font-semibold">Barrier / Concern</th>
                <th className="text-left px-5 py-3 font-semibold">Importance</th>
                <th className="text-left px-5 py-3 font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { barrier: "Unhappy with the variety of recipes", importance: "Low", pct: "17%", high: false },
                { barrier: "Time consuming", importance: "High", pct: "50%", high: true },
                { barrier: "Easy to give up", importance: "Low", pct: "17%", high: false },
                { barrier: "Unwilling to pay until grasping the value", importance: "High", pct: "50%", high: true },
                { barrier: "Lack of flexibility in editing and choosing recipes", importance: "Medium", pct: "33%", high: false },
                { barrier: "Uncertainty about effectiveness and value", importance: "High", pct: "67%", high: true },
              ].map(({ barrier, importance, pct, high }) => (
                <tr
                  key={barrier}
                  style={{ background: high ? "#FFFBEA" : N.cream, borderBottom: `1px solid ${N.brandBorder}` }}
                >
                  <td className="px-5 py-3" style={{ color: N.subtleText }}>{barrier}</td>
                  <td className="px-5 py-3 font-medium" style={{ color: high ? "#B45309" : N.muted }}>{importance}</td>
                  <td className="px-5 py-3 font-semibold" style={{ color: high ? "#B45309" : N.muted }}>{pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H3>Customer Journey Map</H3>
        <Body>Mapping Rachel&apos;s week, from weekly meal planning to mid-week cooking, surfaced the recurring friction points and clarified where design could create the most meaningful improvements.</Body>
        <div className="border rounded-2xl p-6 mt-5" style={{ background: N.cream, borderColor: N.brandBorder }}>
          <Image
            src="/images/nutri-journey-map.png"
            alt="Customer Journey Map"
            width={1200}
            height={700}
            className="w-full"
          />
        </div>

        <H3>How might we help our customers to adopt and continue using our nutritional diet app?</H3>
        <div className="border rounded-2xl p-6 mt-5 flex justify-center" style={{ background: N.cream, borderColor: N.brandBorder }}>
          <Image
            src="/images/nutri-hmw.jpg"
            alt="How Might We"
            width={800}
            height={600}
            className="w-1/2"
          />
        </div>
        <div
          className="mt-5 p-6 rounded-r-xl border-l-4"
          style={{ background: N.cream, borderLeftColor: N.brand }}
        >
          <BodySm className="font-semibold mb-1">Key Recommendation:</BodySm>
          <BodySm>Most nutrition apps lose users not in the first session but in the months that follow. Introducing a dedicated Support stage that bridges initial engagement and long-term loyalty would directly address this drop-off and improve retention.</BodySm>
        </div>

        <H3>Features Testing</H3>
        <Body>Participants reviewed a curated list of potential features and shared their reactions to each. The chart below summarizes their interest, indicating which capabilities resonated and which did not.</Body>
        <div className="border rounded-2xl p-6 mt-5 flex justify-center" style={{ background: N.cream, borderColor: N.brandBorder }}>
          <Image
            src="/images/nutri-features-testing.jpg"
            alt="Features Testing"
            width={900}
            height={600}
            className="w-[65%]"
          />
        </div>

        <H3>Participant Feature Suggestions</H3>
        <div className="border rounded-2xl p-6 mt-5 flex justify-center" style={{ background: N.cream, borderColor: N.brandBorder }}>
          <Image
            src="/images/nutri-feature-suggestions.png"
            alt="Participant Feature Suggestions"
            width={900}
            height={600}
            className="w-[65%]"
          />
        </div>

        <H3>Recommendations for App Development</H3>
        <div className="grid grid-cols-3 gap-5 mt-6">
          {[
            {
              title: "User-Friendly Interface",
              desc: "Design meal planning, recipe browsing, grocery list creation, and nutrient tracking as a unified, intuitive flow rather than disconnected tools.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
            },
            {
              title: "Education and Motivation",
              desc: "Provide accessible educational content on label reading, ingredient substitutions, and budget-friendly cooking to support informed daily choices.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13"/></svg>,
            },
            {
              title: "Cost Considerations",
              desc: "Offer a meaningful free trial of the full app and maintain a consistent cadence of updates to build user trust before introducing paid features.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>,
            },
            {
              title: "Accuracy and Usability",
              desc: "Invest in features such as meal scanning, but prioritize reliability and ease of use. Users will only trust advanced functionality if the fundamentals work consistently.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            },
            {
              title: "Personalized Recommendations",
              desc: "Develop recommendation logic that considers user preferences, schedule, dietary needs, and health goals to deliver suggestions that feel tailored rather than generic.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
            },
            {
              title: "Recipe Variety and Flexibility",
              desc: "Offer a diverse recipe library that accommodates a wide range of dietary preferences, including vegetarian, vegan, low-carb, and other common needs.",
              icon: <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
            },
          ].map(({ title, desc, icon }) => (
            <CardWhite key={title}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: N.brandLight, color: N.brand }}
              >
                {icon}
              </div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </CardWhite>
          ))}
        </div>

        <Divider />
      </div>

      {/* ── Phase 02 — light green ── */}
      <section className="py-16" style={{ background: N.brandLight }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <PhasePill>Phase 02</PhasePill>
          <H2>Define &amp; Synthesize</H2>
          <Body>After the research phase, I worked through the findings to separate the strongest signals from incidental feedback. From there, the problem statement and design goals began to take shape.</Body>

          <H3>Refined Problem Statement</H3>
          <div
            className="p-7 mt-5 rounded-xl border-l-4"
            style={{ background: N.cream, borderLeftColor: N.brand }}
          >
            <Body>
              <strong>How might we</strong> design a nutrition experience that feels{" "}
              <strong>effortless, personalized, and motivating</strong>, so busy individuals can
              build and maintain healthy eating habits without feeling overwhelmed?
            </Body>
          </div>

          <H3>Design Goals</H3>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {[
              { emoji: "⚡", title: "Simplify Food Logging", desc: "Reduce the time and effort required to log meals through smart features such as barcode scanning, photo recognition, and recent meal suggestions." },
              { emoji: "🎯", title: "Provide Personalized Insights", desc: "Deliver actionable recommendations based on each user's preferences, schedule, and goals rather than population averages." },
              { emoji: "📈", title: "Motivate Consistency", desc: "Design progress tracking and feedback that feels honest and encouraging, supporting long-term engagement and habit formation." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl border" style={{ background: N.cream, borderColor: N.brandBorder }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl mb-4"
                  style={{ background: N.brandBorder }}
                >
                  {emoji}
                </div>
                <H4>{title}</H4>
                <BodySm>{desc}</BodySm>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Strategy — Capstone-driven ── */}
      <div className="px-14 pt-14 max-w-[1200px] mx-auto">
        <PhasePill>AI Strategy</PhasePill>
        <H2>Designing for Human-AI Collaboration</H2>
        <Body>
          With the problem space defined, the focus shifted from interface design to system
          design, mapping how the AI should behave, where it should step in, and where the
          user should remain in control. The objective was an intelligent assistant, not an
          autopilot.
        </Body>

        {/* A. The 4 AI Features */}
        <H3>The 4 AI Features</H3>
        <Body className="mb-6">
          Four AI capabilities emerged from research as the most valuable to users. Two were
          prioritized for MVP based on impact and feasibility; the other two were scoped as
          fast-follows.
        </Body>
        <div className="grid grid-cols-2 gap-5">
          {[
            {
              title: "AI Meal Planning Engine",
              desc: "Generates a weekly meal plan based on each user's goals, available time, cooking skill, and current pantry. Adapts continuously as preferences and circumstances change.",
              mvp: true,
            },
            {
              title: "AI Grocery Optimizer",
              desc: "Translates the weekly meal plan into an intelligent shopping list that updates in real time as items are checked off, substituted, or already on hand.",
              mvp: false,
            },
            {
              title: "Meal Scanning",
              desc: "Identifies ingredients, portions, and nutritional content from a single photo, transforming daily logging into a fast, low-effort interaction.",
              mvp: true,
            },
            {
              title: "AI Fast Meal Suggestions",
              desc: "Answers questions like \"What can I cook in twenty minutes with what I have?\" with quick, personalized recommendations tuned to skill level and available ingredients.",
              mvp: false,
            },
          ].map(({ title, desc, mvp }) => (
            <div
              key={title}
              className="p-6 rounded-2xl border relative"
              style={{ background: N.cream, borderColor: N.brandBorder }}
            >
              <div className="flex items-center justify-between mb-2">
                <H4 className="!mb-0">{title}</H4>
                <span
                  className="font-body font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.08em",
                    background: mvp ? N.brand : N.brandLight,
                    color: mvp ? "white" : N.muted,
                    border: `1px solid ${mvp ? N.brand : N.brandBorder}`,
                  }}
                >
                  {mvp ? "MVP" : "FAST-FOLLOW"}
                </span>
              </div>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>

        {/* B. Mixed-Initiative Model */}
        <H3>The Mixed-Initiative Model</H3>
        <Body className="mb-6">
          Rather than operating as a black-box autopilot, NutriWise uses a mixed-initiative
          interaction model. The AI proposes; the user decides. Either can take the lead at any
          moment, and control transfers fluidly between them.
        </Body>
        <div
          className="p-7 rounded-2xl border"
          style={{ background: N.brandLight, borderColor: N.brandBorder }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div
              className="font-heading font-bold"
              style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: N.brand }}
            >
              AI
            </div>
            <div />
            <div
              className="font-heading font-bold"
              style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: N.dark }}
            >
              USER
            </div>
            <BodySm className="!mb-0">Proposes recipes, plans, and grocery lists based on goals, history &amp; context.</BodySm>
            <div className="flex items-center justify-center">
              <div
                className="font-heading font-bold"
                style={{ fontSize: "1.5rem", color: N.dark, lineHeight: 1 }}
              >
                ⇄
              </div>
            </div>
            <BodySm className="!mb-0">Approves, edits, regenerates, or overrides any AI suggestion. Final say is theirs.</BodySm>
          </div>
          <div
            className="mt-5 pt-5 text-center font-body italic"
            style={{ fontSize: "0.8125rem", color: N.muted, borderTop: `1px solid ${N.brandBorder}` }}
          >
            AI proposes → user approves or overrides
          </div>
        </div>

        {/* C. 6 Trust-Building Principles */}
        <H3>6 Trust-Building Principles</H3>
        <Body className="mb-6">
          To make the AI feel like a partner rather than a black box, I designed every
          interaction around six principles that keep users in control.
        </Body>
        <div className="grid grid-cols-3 gap-5">
          {[
            { n: "01", title: "Gradual Onboarding", desc: "Users select their preferred level of AI involvement upfront, hands-on, semi-automatic, or fully automatic, so the experience begins on their terms." },
            { n: "02", title: "Mixed-Initiative Interaction", desc: "The user always has final say. The AI fills in supporting decisions when invited, never preemptively." },
            { n: "03", title: "Customizable Agency", desc: "The level of AI involvement can be adjusted at any moment, allowing users to scale automation up or down based on their current needs." },
            { n: "04", title: "Alert System", desc: "Significant decisions pause for user confirmation, ensuring no silent changes or actions taken without their awareness." },
            { n: "05", title: "Pause Feature", desc: "Users can temporarily disable automation, during travel, busy weeks, or any moment they prefer manual control, without losing their progress in the app." },
            { n: "06", title: "Transparent Reasoning", desc: "Each suggestion is accompanied by a clear explanation of the factors that informed it, such as available cooking time, past preferences, or ingredients on hand." },
          ].map(({ n, title, desc }) => (
            <div
              key={n}
              className="p-6 rounded-2xl border"
              style={{ background: N.cream, borderColor: N.brandBorder }}
            >
              <div
                className="font-heading font-bold mb-2"
                style={{ fontSize: "1.5rem", color: N.brand, lineHeight: 1 }}
              >
                {n}
              </div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>

        {/* AI Decisions & Trade-offs */}
        <H3>AI Decisions &amp; Trade-offs</H3>
        <Body className="mb-6">
          Three product decisions defined how the AI behaves in NutriWise. Each addressed the
          same underlying question: how much should the system do, and where should the user
          remain in control?
        </Body>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "Why mixed-initiative instead of full automation?",
              a: "Food choices are deeply personal, shaped by culture, dietary restrictions, routines, preferences, and even mood. A fully automated experience risks feeling intrusive and erodes trust. A mixed-initiative model creates a more balanced interaction, allowing the system to guide without overriding user agency.",
            },
            {
              q: "Why include a pause feature?",
              a: "Real life is unpredictable, travel, social events, and changing routines all impact how users engage with the app. An explicit pause feature allows users to step back from automation temporarily without disconnecting from the product entirely.",
            },
            {
              q: "Why provide reasoning behind recommendations?",
              a: "Without explanation, skeptical users may distrust the AI's suggestions, while highly trusting users may rely on them too heavily. Showing the reasoning behind each recommendation supports informed decision-making and keeps users actively engaged rather than passively dependent.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="p-6 rounded-2xl border-l-4"
              style={{ background: N.cream, borderLeftColor: N.brand, borderTop: `1px solid ${N.brandBorder}`, borderRight: `1px solid ${N.brandBorder}`, borderBottom: `1px solid ${N.brandBorder}`, borderRadius: "0.5rem 1rem 1rem 0.5rem" }}
            >
              <H4 className="mb-2" style={{ color: N.brand }}>{q}</H4>
              <BodySm>{a}</BodySm>
            </div>
          ))}
        </div>

        <Divider />
      </div>

      {/* ── Phase 03 ── */}
      <div className="px-14 pt-14 max-w-[1200px] mx-auto">
        <PhasePill>Phase 03</PhasePill>
        <H2>Ideation &amp; Concept Development</H2>
        <Body>With the problem statement and design goals established, I began exploring solutions through persona development, structured brainstorming, user flow mapping, and rapid sketching to identify the directions worth carrying forward.</Body>

        <H3>User Persona</H3>
        <Image
          src="/images/nutri-persona.png"
          alt="Rachel — User Persona"
          width={1200}
          height={700}
          className="w-full rounded-2xl mt-5"
        />

        <H3>Design Workshop — Brainstorm Session</H3>
        <div className="flex gap-10 items-start mt-5">
          <div className="w-1/3 flex-shrink-0">
            <Body>
              I ran a Scenario Mapping workshop with two collaborators to generate ideas for the
              grocery side of the product. Working through how a persona might respond across
              different situations turned abstract goals into specific design choices, and
              produced three storyboards along with a concept proposal that informed the next phase.
            </Body>
          </div>
          <div className="w-2/3 flex justify-center">
            <div
              style={{
                width: "80%",
                aspectRatio: "1721 / 1488",
                overflow: "hidden",
                borderRadius: "0.75rem",
                position: "relative",
                borderRight: `6px solid ${N.dark}`,
                boxShadow: `inset 0 0 0 1px ${N.brandBorder}`,
              }}
            >
              <Image
                src="/images/nutri-brainstorm.png"
                alt="Brainstorm Session"
                fill
                style={{ objectFit: "cover", objectPosition: "right" }}
              />
            </div>
          </div>
        </div>

        <H3>Storyboarding Process</H3>
        <Body className="max-w-[760px]">
          Each scenario from the brainstorm was translated into a visual storyboard, mapping
          how Rachel would move through key moments, from meal planning to grocery shopping.
          Storyboarding surfaced friction points, motivations, and design opportunities before
          any wireframes were created.
        </Body>
        <div className="flex flex-col gap-6 mt-5">
          <div
            style={{
              aspectRatio: "2621 / 1280",
              overflow: "hidden",
              borderRadius: "1rem",
              position: "relative",
              width: "100%",
            }}
          >
            <Image
              src="/images/nutri-storyboard1.png"
              alt="Storyboard — Scenario Mapping"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
            />
          </div>
          <Body className="max-w-[760px]">
            <strong>Selected scenario:</strong> A NUF test (New, Useful, Feasible) was applied to evaluate the options and identify the strongest direction to move forward.
          </Body>
          <div
            style={{
              aspectRatio: "2614 / 1190",
              overflow: "hidden",
              borderRadius: "1rem",
              position: "relative",
              width: "100%",
            }}
          >
            <Image
              src="/images/nutri-storyboard2.png"
              alt="Storyboard"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
            />
          </div>
        </div>

        <H3>Wireflow Sketches</H3>
        <Body className="max-w-[760px]">
          With the chosen direction in mind, I sketched the core user flows on paper to quickly
          explore screen layouts, navigation patterns, and key interactions before committing
          to higher-fidelity wireframes.
        </Body>
        <div className="flex gap-6 items-start mt-6">
          <div className="w-1/2 mt-[15%]">
            <Image src="/images/nutri-wireflow1.jpg" alt="Wireflow 1" width={600} height={800} className="w-full rounded-xl" />
          </div>
          <div className="w-1/2">
            <Image src="/images/nutri-wireflow2.jpg" alt="Wireflow 2" width={600} height={800} className="w-full rounded-xl" />
          </div>
        </div>

        <H3>Feature Prioritization</H3>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <CardGreen>
            <H4 style={{ color: N.brand }}>HIGH PRIORITY (MVP)</H4>
            <Bullet>AI-powered food recognition</Bullet>
            <Bullet>Meal planning &amp; recipes</Bullet>
            <Bullet>Daily nutrition summary</Bullet>
            <Bullet>Goal setting &amp; tracking</Bullet>
            <Bullet>Progress visualization</Bullet>
          </CardGreen>
          <CardWhite>
            <H4 style={{ color: N.muted }}>FUTURE ENHANCEMENTS</H4>
            <Bullet>AI Grocery Optimizer</Bullet>
            <Bullet>AI Fast Meal Suggestions</Bullet>
            <Bullet>Barcode scanning</Bullet>
            <Bullet>Meal history &amp; favorites</Bullet>
            <Bullet>Integration with fitness trackers</Bullet>
            <Bullet>Advanced analytics &amp; reports</Bullet>
            <Bullet>Nutrition coaching</Bullet>
          </CardWhite>
        </div>

        <H3>Initial Sketches</H3>
        <div className="flex gap-10 items-start mt-5">
          <div className="w-1/3 flex-shrink-0">
            <Body className="mb-4">
              I began with low-fidelity sketches to rapidly explore layout options and interaction
              patterns for the main screens.
            </Body>
            <Body>
              The focus was on visual hierarchy, content priority, and how users would navigate
              between meal planning, logging, and grocery flows.
            </Body>
          </div>
          <div className="w-2/3 flex justify-center">
            <div
              style={{
                width: "80%",
                borderRight: `6px solid ${N.dark}`,
                borderRadius: "0.75rem",
                overflow: "hidden",
                boxShadow: `inset 0 0 0 1px ${N.brandBorder}`,
              }}
            >
              <Image src="/images/nutri-sketches.jpg" alt="Initial Sketches" width={800} height={600} className="w-full h-auto block" />
            </div>
          </div>
        </div>

        <Divider />
      </div>

      {/* ── Phase 04 — deep forest ── */}
      <section className="py-16" style={{ background: N.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
        <PhasePill>Phase 04</PhasePill>
        <H2 className="!text-white">Testing and Refine</H2>
        <p className="font-body leading-[1.75] mb-8" style={{ fontSize: "0.9375rem", color: "#DFF5EC" }}>
          I conducted usability testing sessions with two participants to validate the wireframes and gather feedback on the core user flows. Both confirmed what worked and surfaced the areas that needed refinement.
        </p>

        <H3 className="!text-white">Key Testing Insights</H3>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {[
            {
              img: "nutri-wireframe1.jpg",
              title: "Account Setup",
              desc: "A guided setup process for establishing user goals, dietary preferences, and an initial profile configuration.",
              issue: "Testing revealed that users found the onboarding and account setup flow overly complex, particularly the volume of information requested before reaching the core experience.",
            },
            {
              img: "nutri-wireframe2.jpg",
              title: "Daily Nutritional Recommendations",
              desc: "A clear summary of how the day's intake compares to recommended daily nutrient values.",
              issue: "Participants needed additional context to interpret the percentage indicators. Supplementary explanatory information would improve clarity and confidence.",
            },
            {
              img: "nutri-wireframe3.jpg",
              title: "Grocery Shopping List",
              desc: "A shopping list designed to support both in-store purchases and online ordering.",
              issue: "The purpose of the checkboxes and the quantity field was unclear. Users had to infer their function, indicating the need for clearer labeling and visual hierarchy.",
            },
          ].map(({ img, title, desc, issue }) => (
            <div key={title} className="p-6 rounded-2xl flex flex-col" style={{ background: N.cream }}>
              <div className="flex justify-center mb-4" style={{ height: "340px" }}>
                <Image src={`/images/${img}`} alt={title} width={280} height={340} className="h-full w-auto object-contain rounded-lg" />
              </div>
              <H4>{title}</H4>
              <BodySm className="flex-1">{desc}</BodySm>
              <div className="border-t mt-4 pt-4" style={{ borderColor: N.brandBorder }}>
                <BodySm className="italic" style={{ color: N.gold }}>{issue}</BodySm>
              </div>
            </div>
          ))}
        </div>

        <H3 className="!text-white">Information Architecture</H3>
        <p className="font-body leading-[1.75] mb-6" style={{ fontSize: "0.9375rem", color: "#DFF5EC" }}>
          The app is organized into five main sections accessible via bottom navigation, designed for easy one-handed use during cooking, shopping, and other on-the-go moments.
        </p>
        <div className="grid grid-cols-5 gap-4">
          {[
            { emoji: "👤", title: "Profile", desc: "Settings & goals" },
            { emoji: "📅", title: "Meal Plan", desc: "Plan your meals" },
            { emoji: "➕", title: "Log", desc: "Add meals & foods" },
            { emoji: "🛒", title: "Groceries", desc: "Shopping lists" },
            { emoji: "✨", title: "AI Help", desc: "Fast meal suggestions" },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl text-center" style={{ background: N.cream }}>
              <div className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center text-xl" style={{ background: N.brandLight }}>
                {emoji}
              </div>
              <H4 className="!text-[0.875rem]">{title}</H4>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>

        <Image
          src="/images/nutri-ia.png"
          alt="Information Architecture"
          width={1200}
          height={700}
          className="w-full rounded-2xl mt-10"
        />

        <H3 className="!text-white">Annotated Wireframes</H3>
        <p className="font-body leading-[1.75] max-w-[760px]" style={{ fontSize: "0.9375rem", color: "#DFF5EC" }}>
          To document design decisions and prepare the screens for handoff, I annotated the key wireframes with explanations of interactions, edge cases, and the rationale behind layout choices, ensuring that the intent behind each element was clearly communicated.
        </p>
        <div className="flex flex-col gap-6 mt-5">
          <Image src="/images/nutri-annotated1.png" alt="Annotated Wireframes 1" width={1200} height={700} className="w-full rounded-2xl" />
          <Image src="/images/nutri-annotated2.png" alt="Annotated Wireframes 2" width={1200} height={700} className="w-full rounded-2xl" />
        </div>
        </div>
      </section>

      {/* ── Phase 05 ── */}
      <div className="px-14 pt-14 max-w-[1200px] mx-auto">
        <PhasePill>Phase 05</PhasePill>
        <H2>Mid-Fidelity Prototype</H2>
        <Body>
          The mid-fidelity prototype added enough structure and detail to evaluate core user flows
          and interactions while keeping the focus on functionality rather than visual polish.
          The goal was a prototype users could meaningfully test, not a final visual presentation.
        </Body>

        <div className="grid grid-cols-4 gap-10 mt-8 w-full">
          {[
            { img: "nutri-midfi1.png", mt: "0" },
            { img: "nutri-midfi2.png", mt: "48px" },
            { img: "nutri-midfi3.png", mt: "0" },
            { img: "nutri-midfi4.png", mt: "80px" },
          ].map(({ img, mt }) => (
            <div key={img} style={{ marginTop: mt }}>
              <Image src={`/images/${img}`} alt="Mid-fi screen" width={300} height={600} className="w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Phase 06 */}
        <div className="mt-16">
          <PhasePill>Phase 06</PhasePill>
          <H2>Usability Testing</H2>
          <div className="flex gap-10 items-center mb-10">
            <div className="flex-1">
              <Body>
                To understand how the app would fit into real-world use, I conducted a hybrid
                usability study with two participants who closely matched the target audience.
                Sessions were split between remote and in-person formats to observe behavior in
                different contexts.
              </Body>
            </div>
            <div className="w-[40%] flex items-center justify-center flex-shrink-0">
              <div className="flex items-center">
                <div className="w-[40%] z-10 relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                  <Image src="/images/nutri-usability1.png" alt="Usability test screen 1" width={200} height={400} className="w-full" />
                </div>
                <div className="w-[65%] -ml-10 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                  <Image src="/images/nutri-usability2.png" alt="Usability test screen 2" width={300} height={400} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <CardGreen>
              <H4 style={{ color: N.brand }}>What Worked Well ✓</H4>
              <Bullet>The user flow was clear and intuitive, allowing participants to complete tasks without confusion.</Bullet>
              <Bullet>Participants responded positively to the visual design, describing it as clean and visually appealing.</Bullet>
              <Bullet>Both participants found the product genuinely useful in supporting their needs and goals.</Bullet>
            </CardGreen>
            <CardWhite>
              <H4 style={{ color: N.gold }}>Areas for Improvement ⚠</H4>
              <Bullet>The &ldquo;Skip&rdquo; button did not lead to a clear or expected destination, requiring a more deliberate behavior.</Bullet>
              <Bullet>One participant was hesitant to provide an email address before fully understanding the value of the product.</Bullet>
              <Bullet>Participants expressed a desire for more encouraging, supportive messaging throughout the experience.</Bullet>
            </CardWhite>
          </div>

          <div
            className="mt-6 p-5 rounded-xl border-l-4"
            style={{ background: N.cream, borderLeftColor: N.brand }}
          >
            <BodySm className="!mb-0">
              <strong>Note on methodology:</strong> Because the AI system was still at the
              conceptual stage, several features were prototyped and tested using Wizard of Oz
              simulations rather than live AI models. This approach allowed us to evaluate user
              response to AI behavior before committing to a specific underlying system.
            </BodySm>
          </div>
        </div>

        <Divider />
      </div>

      {/* ── Ethics & Responsible AI ── */}
      <section className="py-16" style={{ background: N.brandLight }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <PhasePill>Ethics &amp; Responsible AI</PhasePill>
          <H2>Designing AI That Earns Its Place</H2>
          <Body className="mb-8">
            An AI system that engages with personal health data and adaptive recommendations
            carries real responsibility. I evaluated NutriWise against four ethical risk areas
            and developed a clear design response to each.
          </Body>

          <div className="grid grid-cols-2 gap-5">
            {[
              {
                title: "Data Privacy",
                risk: "Dietary preferences, allergies, and health goals are sensitive pieces of personal information. If misused or exposed, they could create real harm for users.",
                response: "Apply data minimization, collecting only what is required for personalization. Allow users to review, edit, or delete their data at any time without friction or hidden conditions.",
                icon: (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ),
              },
              {
                title: "Bias & Fairness",
                risk: "An AI trained on a narrow view of food, limited cuisines, diets, or budgets, can exclude users whose needs fall outside that frame.",
                response: "Use diverse training data, enable ingredient substitution, and support customizable cultural and budget preferences. Allow the AI to learn from user feedback rather than override it.",
                icon: (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
                  </svg>
                ),
              },
              {
                title: "Algorithm Overreliance",
                risk: "If users stop critically evaluating their food choices and follow the AI without reflection, the app shifts from supporting their decisions to replacing them.",
                response: "Maintain a mixed-initiative approval flow, include educational explanations alongside recommendations, and provide a clear pause feature to temporarily disable automation.",
                icon: (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                  </svg>
                ),
              },
              {
                title: "Transparency",
                risk: "A black-box system can lead to either distrust (algorithm aversion) or blind acceptance. Both outcomes undermine the trust this product depends on.",
                response: "Make every recommendation explainable, including the factors that informed it, what changed, and what data shaped the decision. Avoid any silent automation.",
                icon: (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ),
              },
            ].map(({ title, risk, response, icon }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border bg-white"
                style={{ borderColor: N.brandBorder }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: N.brandLight, color: N.brand }}
                  >
                    {icon}
                  </div>
                  <H4 className="!mb-0">{title}</H4>
                </div>
                <div className="mb-3">
                  <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: N.gold, textTransform: "uppercase" }}>
                    Risk
                  </div>
                  <BodySm>{risk}</BodySm>
                </div>
                <div>
                  <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: N.brand, textTransform: "uppercase" }}>
                    Design Response
                  </div>
                  <BodySm>{response}</BodySm>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact & Results — deep teal ── */}
      <section className="py-16" style={{ background: N.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
        <H2 className="!text-white">Impact &amp; Results</H2>
        <p className="font-body leading-[1.75] max-w-[760px] mb-10" style={{ fontSize: "0.9375rem", color: "#DFF5EC" }}>
          By grounding every decision in user research and validating each step through hands-on
          testing, NutriWise evolved from broad scenarios into a focused, intuitive nutrition
          experience.
        </p>

        <div className="grid grid-cols-3 gap-5">
          {[
            {
              num: "6",
              title: "Users Interviewed",
              desc: "Every design decision was grounded in real user behavior and pain points uncovered during research.",
            },
            {
              num: "3 → 1",
              title: "Validated Direction",
              desc: "Three initial design concepts were narrowed to one final direction through the NUF test, providing a clear focus for development.",
            },
            {
              num: "50% → 0%",
              title: "Logging Friction Removed",
              desc: "The \"time-consuming logging\" pain point, the strongest signal from research, was eliminated through meal scanning and meal history.",
            },
          ].map(({ num, title, desc }) => (
            <div key={title} className="bg-white p-7 rounded-2xl border" style={{ borderColor: N.brandBorder }}>
              <div className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: N.brand, lineHeight: 1 }}>{num}</div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
          {[
            {
              num: "3 Steps",
              title: "Simplified Onboarding",
              desc: "Three onboarding steps were removed after usability testing flagged them as unnecessarily complex.",
            },
            {
              num: "3 Iterations",
              title: "Refined Prototype",
              desc: "Three rounds of iteration sharpened the onboarding, daily summary, and meal plan flows based on testing feedback.",
            },
          ].map(({ num, title, desc }) => (
            <div key={title} className="bg-white p-7 rounded-2xl border" style={{ borderColor: N.brandBorder }}>
              <div className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: N.brand, lineHeight: 1 }}>{num}</div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── Next Steps — light green ── */}
      <section className="py-16" style={{ background: N.brandLight }}>
        <div className="px-14 max-w-[1200px] mx-auto">
        <H2>Next Steps</H2>
        <div className="grid grid-cols-3 gap-5 mt-6">
          {[
            { title: "High-Fidelity Design", desc: "Develop the full visual identity, including color palette, typography, and polished UI components, to bring the experience to its final form." },
            { title: "Iteration & Refinement", desc: "Address remaining usability issues identified in testing, thoroughly evaluate the AI meal scanning feature, and introduce thoughtful gamification through challenges and rewards." },
            { title: "Additional Testing", desc: "Conduct a diary study to observe how participants interact with the app in real-life scenarios over an extended period." },
          ].map(({ title, desc }, i) => (
            <div key={title} className="p-7 rounded-2xl border" style={{ background: N.cream, borderColor: N.brandBorder }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-body font-semibold mb-4 text-white"
                style={{ background: N.brand, fontSize: "0.8125rem" }}
              >
                {i + 1}
              </div>
              <H4>{title}</H4>
              <BodySm>{desc}</BodySm>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── Key Takeaways ── */}
      <div className="px-14 py-16 max-w-[1200px] mx-auto">
        <H2>Key Takeaways</H2>
        <div className="flex flex-col gap-5 mt-6">
          {[
            { n: "1", title: "Research Drives Design", desc: "User research consistently showed that simplicity and speed mattered more than comprehensive feature sets, fundamentally shaping the direction of the product." },
            { n: "2", title: "Iterative Testing Improved Both Usability and AI Interactions", desc: "Wireframes, mid-fidelity prototypes, and Wizard of Oz simulations each surfaced different issues early, reducing the cost of fixing them later in development." },
            { n: "3", title: "Trust Comes from UX, Not Just AI Accuracy", desc: "Users trust systems that explain clearly, ask before acting, and keep them in control. Strong models alone cannot compensate for an experience that feels opaque." },
            { n: "4", title: "Shared Control Works Better Than Full Automation", desc: "Food choices are personal. Suggestions consistently felt more trustworthy than fully automated decisions, reinforcing the value of the mixed-initiative model." },
            { n: "5", title: "Transparency Builds Balanced Trust", desc: "Clear explanations alongside each recommendation reduced both user skepticism and over-reliance, supporting a balanced level of engagement with the AI." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex gap-5 items-start p-6 rounded-2xl border" style={{ borderColor: N.brandBorder }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-body font-bold flex-shrink-0 text-white"
                style={{ background: N.brand, fontSize: "0.875rem" }}
              >
                {n}
              </div>
              <div>
                <H4>{title}</H4>
                <BodySm>{desc}</BodySm>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="px-12 py-10 flex justify-between items-center border-t max-w-[1200px] mx-auto" style={{ borderColor: N.brandBorder }}>
        <p className="font-body text-[0.875rem]" style={{ color: N.muted }}>
          Thank you for reading this case study!
        </p>
        <a
          href="/"
          className="px-7 py-3.5 rounded-full font-body font-medium text-white no-underline"
          style={{ background: N.brand, fontSize: "0.875rem" }}
        >
          Back to Portfolio
        </a>
      </footer>
    </div>
  );
}
