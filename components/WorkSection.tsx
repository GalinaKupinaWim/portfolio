"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Project = {
  num: string;
  href: string;
  image: string;
  title: string;
  desc: string;
  role: string;
  team: string;
  year: string;
  note?: string;
  platforms: string[];
  fit?: "cover" | "contain";
  bgColor?: string;
};

// SAT leads as the featured case study.
const featured: Project = {
  num: "01",
  href: "/sat",
  image: "/images/sat-card.jpg",
  title: "PrepMate — AI-Powered SAT Prep Platform",
  desc: "Adaptive practice that helps students identify knowledge gaps, focus on what they need to improve, and build mastery across web and mobile.",
  role: "UX/UI Design, Front-End",
  team: "Team of 3 · Design lead",
  year: "2025",
  note: "+ 2026 AI strategy layer · solo",
  platforms: ["Web app", "Mobile app"],
};

const projects: Project[] = [
  {
    num: "02",
    href: "/nutri",
    image: "/images/nutri-card.jpg",
    title: "NutriWise — Personalized Nutrition App",
    desc: "Meal planning that turns nutrition goals into practical meals and grocery lists, making healthy eating easier while keeping every food choice in the user's hands.",
    role: "UX Research, UX/UI Design",
    team: "Solo",
    year: "2025",
    platforms: ["Mobile app"],
  },
  {
    num: "03",
    href: "/sfpl",
    image: "/images/sfpl-card-ia-clean.png",
    title: "SF Public Library — IA Redesign",
    desc: "Restructuring navigation and content to help patrons find e-books, discover events, and access library services faster and with less frustration.",
    role: "Information Architecture, UX Research",
    team: "Team of 3",
    year: "2024",
    platforms: ["Website"],
    fit: "contain",
    bgColor: "#E6E6E6",
  },
];

function FeaturedCard({ p }: { p: Project }) {
  return (
    <Link
      href={p.href}
      className="proj-card reveal group no-underline text-inherit block overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr]">
        {/* Image */}
        <div
          className="relative aspect-[16/11] md:aspect-auto md:min-h-[360px] overflow-hidden"
          style={{ background: p.bgColor || "#e0ddd7" }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className={`${p.fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[600ms] group-hover:scale-[1.04]`}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col pt-6 md:pt-1 md:pl-10 md:pb-1">
          <div className="font-body text-[11px] tracking-[0.16em] uppercase text-[#4A5565] opacity-70 mb-4">
            {p.num} · Featured
          </div>
          <h3
            className="font-heading font-medium text-[#1a1a1a] tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)", lineHeight: 1.12 }}
          >
            {p.title}
          </h3>
          <p className="font-body text-[0.98rem] text-[#4A5565] leading-relaxed mt-3 max-w-[42ch]">
            {p.desc}
          </p>

          <div className="mt-auto pt-7">
            <div className="border-t border-[rgba(26,26,26,0.12)] pt-4 font-body text-[13px] text-[#4A5565]">
              {p.role} · {p.team} · {p.year}
              {p.note && (
                <span className="block mt-1 font-medium text-[#1B2B4B]">{p.note}</span>
              )}
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-[#1B2B4B] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Read case study
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={p.href} className="proj-card reveal group no-underline text-inherit flex flex-col">
      <div
        className="aspect-[4/3] overflow-hidden relative mb-4"
        style={{ background: p.bgColor || "#e0ddd7" }}
      >
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${p.fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[600ms] group-hover:scale-105`}
        />
      </div>

      <div className="font-body text-[11px] tracking-[0.16em] uppercase text-[#4A5565] opacity-70 mb-2">
        {p.num}
      </div>
      <h3 className="font-heading text-[1.2rem] font-medium text-[#1a1a1a] tracking-[-0.01em] leading-snug">
        {p.title}
      </h3>
      <p className="font-body text-[0.92rem] text-[#4A5565] leading-relaxed mt-2 max-w-[44ch]">
        {p.desc}
      </p>

      <div className="mt-4 font-body text-[12px] text-[#4A5565]">
        {p.role} · {p.team} · {p.year}
        {p.note && <span className="block mt-1 font-medium text-[#1B2B4B]">{p.note}</span>}
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const revealEls = el.querySelectorAll<HTMLElement>(".reveal");
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
      { threshold: 0.12 }
    );
    revealEls.forEach((el, i) => {
      el.dataset.delay = String(i * 120);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work-sec" className="px-5 md:px-16 py-20">
      <div className="reveal flex items-baseline justify-between mb-10">
        <h2 className="font-body font-medium text-[#1a1a1a]" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>
          work.
        </h2>
        <span className="font-body text-[12px] tracking-[0.12em] uppercase text-[#4A5565] opacity-70">
          3 case studies
        </span>
      </div>

      {/* Featured */}
      <div className="mb-8">
        <FeaturedCard p={featured} />
      </div>

      {/* Remaining case studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.href} p={p} />
        ))}
      </div>
    </section>
  );
}
