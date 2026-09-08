"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Tool = { name: string; top: string; left: string; rotate: number };

// Diagonal cloud: paragraph anchors top-left, photo anchors mid/bottom-right.
// Chips trail across the diagonal, fanning around the photo edge.
const TOOLS: Tool[] = [
  { name: "Figma",             top: "6%",  left: "36%", rotate: -3 },
  { name: "Claude",            top: "10%", left: "56%", rotate: 2 },
  { name: "ChatGPT",           top: "16%", left: "74%", rotate: 3 },
  { name: "Claude Skills",     top: "26%", left: "64%", rotate: -2 },
  { name: "Adobe Illustrator", top: "22%", left: "38%", rotate: -2 },
  { name: "Miro",              top: "30%", left: "20%", rotate: 1 },
  { name: "Cursor",            top: "36%", left: "44%", rotate: -3 },
  { name: "Notion",            top: "44%", left: "28%", rotate: 2 },
  { name: "Adobe InDesign",    top: "50%", left: "50%", rotate: -3 },
  { name: "Framer",            top: "58%", left: "14%", rotate: 3 },
  { name: "Optimal Workshop",  top: "64%", left: "36%", rotate: -2 },
  { name: "Canva",             top: "72%", left: "54%", rotate: -2 },
  { name: "HTML/CSS",          top: "80%", left: "22%", rotate: 3 },
  { name: "GitHub",            top: "88%", left: "40%", rotate: -2 },
  { name: "Visual Studio",     top: "92%", left: "62%", rotate: 4 },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  // Reveal observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const revealEls = el.querySelectorAll<HTMLElement>(".reveal");

    revealEls.forEach((rEl, i) => {
      rEl.dataset.delay = String(i * 60);
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

  // Ambient drift + mouse-reactive scatter
  useEffect(() => {
    const cloud = cloudRef.current;
    const section = sectionRef.current;
    if (!cloud || !section) return;

    const pushers = Array.from(
      cloud.querySelectorAll<HTMLElement>(".chip-pusher")
    );
    if (pushers.length === 0) return;

    // Per-chip state: current x/y (lerped), target x/y, drift phase/speed.
    // Phase/speed are derived from index for stability across renders.
    const states = pushers.map((_, i) => ({
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      driftPhase: (i * 1.37) % (Math.PI * 2),
      driftSpeed: 0.35 + (i % 5) * 0.045, // 0.35 → 0.53 rad/s
    }));

    // Cache chip center positions relative to the cloud container.
    // Recompute on resize.
    let positions: { cx: number; cy: number }[] = [];
    const measure = () => {
      const cloudR = cloud.getBoundingClientRect();
      positions = pushers.map((p) => {
        const r = p.getBoundingClientRect();
        return {
          cx: r.left - cloudR.left + r.width / 2,
          cy: r.top - cloudR.top + r.height / 2,
        };
      });
    };
    measure();

    let mouseX = -10000;
    let mouseY = -10000;
    const threshold = 150; // px — chips within this distance react
    const maxPush = 22; // px — strongest push at zero distance

    const onMouseMove = (e: MouseEvent) => {
      const r = cloud.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onMouseLeave = () => {
      mouseX = -10000;
      mouseY = -10000;
    };

    let raf = 0;
    let running = true;

    const tick = () => {
      const now = performance.now() / 1000;
      for (let i = 0; i < states.length; i++) {
        const s = states[i];
        const p = positions[i];
        const dx = p.cx - mouseX;
        const dy = p.cy - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < threshold && dist > 5) {
          const k = ((1 - dist / threshold) * maxPush) / dist;
          s.tx = dx * k;
          s.ty = dy * k;
        } else {
          s.tx = 0;
          s.ty = 0;
        }

        // Smooth lerp toward target push
        s.x += (s.tx - s.x) * 0.16;
        s.y += (s.ty - s.y) * 0.16;

        // Ambient drift — figure-8-ish: y is sine, x is slower cosine.
        const driftY = Math.sin(now * s.driftSpeed + s.driftPhase) * 3.5;
        const driftX =
          Math.cos(now * s.driftSpeed * 0.6 + s.driftPhase) * 2.2;

        pushers[i].style.transform = `translate(${(s.x + driftX).toFixed(
          2
        )}px, ${(s.y + driftY).toFixed(2)}px)`;
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    // Pause RAF when section is off-screen to save battery.
    const visObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !raf) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!visible && raf) {
          running = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    visObserver.observe(section);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      visObserver.disconnect();
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about-sec" className="px-16 py-20">
      <div className="flex justify-between items-center mb-12">
        <h2 className="reveal font-body font-medium" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>
          about.
        </h2>
        <Link
          href="/resume"
          className="reveal bg-[#e8e3dc] px-7 py-3.5 font-body text-[0.75rem] font-medium text-[#1a1a1a] no-underline hover:opacity-80 transition-opacity"
        >
          Resume
        </Link>
      </div>

      <div className="relative" style={{ minHeight: "640px" }}>
        {/* Warm blob — biased to the diagonal axis */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "5%",
            left: "20%",
            width: "70%",
            height: "85%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(232,227,220,0.65) 0%, rgba(210,200,185,0.28) 40%, rgba(232,227,220,0) 75%)",
            filter: "blur(10px)",
            zIndex: 0,
          }}
        />

        {/* Paragraph — anchored top-left */}
        <p
          className="reveal font-body text-[#1a1a1a] absolute"
          style={{
            top: 0,
            left: 0,
            width: "28%",
            fontSize: "clamp(0.92rem,1.55vw,1.24rem)",
            lineHeight: 1.65,
            zIndex: 2,
          }}
        >
          I combine business thinking, human-centered design, and AI tools
          to transform ideas into trusted user experiences through rapid
          prototyping, early testing, and continuous iteration.
        </p>

        {/* Photo — anchored mid-right with +3° tilt */}
        <div
          className="reveal absolute"
          style={{
            top: "30%",
            right: "2%",
            width: "260px",
            zIndex: 2,
          }}
        >
          <div
            className="relative rounded-[18px] overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              transform: "rotate(3deg)",
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.28), 0 8px 18px -6px rgba(0,0,0,0.12)",
            }}
          >
            <Image
              src="/images/galina-portrait.png"
              alt="Galina Kupina"
              width={1085}
              height={1450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Floating tool chip cloud — flows diagonally around the photo.
            Two-layer transform: outer .reveal handles entrance, middle
            .chip-pusher handles ambient drift + mouse-reactive push,
            inner .about-chip handles per-chip rotation + hover lift. */}
        <div
          ref={cloudRef}
          aria-label="Toolkit"
          className="absolute inset-0"
          style={{ zIndex: 3, pointerEvents: "none" }}
        >
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="reveal"
              style={{
                position: "absolute",
                top: t.top,
                left: t.left,
                pointerEvents: "auto",
              }}
            >
              <div className="chip-pusher">
                <span
                  className="about-chip"
                  style={{ transform: `rotate(${t.rotate}deg)` }}
                >
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
