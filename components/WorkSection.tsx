"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const projects = [
  {
    href: "/sat",
    image: "/images/sat-card.jpg",
    title: "AI-Powered SAT Prep Platform",
    cat: "AI Product · Web App · Mobile App · UX/UI Design · Front-End (HTML/CSS)",
  },
  {
    href: "/nutri",
    image: "/images/nutri-card.jpg",
    title: "Personalized Nutrition App",
    cat: "AI Product · Mobile App · UX Research · UX/UI Design",
  },
  {
    href: "/sfpl",
    image: "/images/sfpl-card-ia-clean.png",
    title: "SF Public Library — IA Redesign",
    cat: "Information Architecture · UX Research · Tree Testing",
    fit: "contain",
    bgColor: "#E6E6E6",
  },
  {
    href: null,
    image: null,
    bgColor: "#cfd4d8",
    title: "Freelance Projects",
    cat: "Selected client work · Available on request",
    comingSoon: true,
  },
];

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
    <section ref={sectionRef} id="work-sec" className="px-16 py-20">
      <div className="flex justify-between items-center mb-12">
        <h2 className="reveal font-body font-medium text-[#1a1a1a]" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>
          work.
        </h2>
        <button className="reveal bg-[#e8e3dc] border-none px-7 py-3.5 font-body text-[0.75rem] font-medium text-[#1a1a1a]">
          Show More
        </button>
      </div>

      <div className="grid grid-cols-2 gap-7">
        {projects.map((p, i) => {
          const card = (
            <div className="proj-card reveal group" key={i}>
              <div className="aspect-[4/3] overflow-hidden relative mb-3.5" style={{ background: p.bgColor || "#e0ddd7" }}>
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className={`${p.fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[600ms] group-hover:scale-105`}
                  />
                )}
                {p.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  {p.href && (
                    <span className="font-body text-[13px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-[0.05em]">
                      View Case Study
                    </span>
                  )}
                </div>
              </div>
              <div className="font-body text-[1.15rem] font-medium mb-1">{p.title}</div>
              <div className="font-body text-[12px] text-[#666]">{p.cat}</div>
            </div>
          );

          return p.href ? (
            <Link key={i} href={p.href} className="no-underline text-inherit">
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>
    </section>
  );
}
