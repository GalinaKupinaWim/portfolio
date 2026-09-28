"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GKUXIntroAnimation from "./GKUXIntroAnimation";

const PHRASES = [
  "AI Products",
  "0→1 Product Design",
  "Human–AI Interaction",
  "Conversational UX",
  "Intelligent Systems",
];

const EMAIL = "galinauxdesign@gmail.com";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback for browsers without clipboard API
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // GKUX refs
  const heroGWrapRef = useRef<HTMLSpanElement>(null);
  const heroGRef = useRef<HTMLSpanElement>(null);
  const heroKRef = useRef<HTMLSpanElement>(null);
  const heroURef = useRef<HTMLSpanElement>(null);
  const heroXRef = useRef<HTMLSpanElement>(null);
  // Typewriter ref
  const twRef = useRef<HTMLSpanElement>(null);
  // Blob canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // ── GKUX animation ──
  useEffect(() => {
    const gWrap = heroGWrapRef.current;
    const g = heroGRef.current;
    const k = heroKRef.current;
    const u = heroURef.current;
    const x = heroXRef.current;
    if (!g || !k || !u || !x) return;

    const el = gWrap || g;
    [el, k].forEach((e) => {
      e.style.transition = "none";
      e.style.transform = "translate(0,0) rotate(0deg)";
    });
    void document.body.offsetHeight;

    const gR = el.getBoundingClientRect();
    const kR = k.getBoundingClientRect();
    const uR = u.getBoundingClientRect();
    const xR = x.getBoundingClientRect();
    const gW = gR.width;

    const kShift = (xR.left - kR.right) + kR.width * 0.215;
    const gShift = kShift;
    const targetX = uR.left;
    const targetY = uR.top;
    const dx = targetX - (gR.right + gShift) + gW * 0.10;
    const dy = targetY - gR.bottom;

    const t1 = setTimeout(() => {
      el.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)";
      k.style.transition = "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
      el.style.transform = `translate(${gShift}px,0) rotate(0deg)`;
      k.style.transform = `translate(${kShift}px,0)`;
    }, 1000);

    const t2 = setTimeout(() => {
      el.style.transition = "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)";
      el.style.transformOrigin = "bottom right";
      el.style.transform = `translate(${gShift + dx}px,${dy}px) rotate(-32deg)`;
      k.style.transition = "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
      k.style.transform = `translate(${kShift}px,0)`;
    }, 1600);

    const handleResize = () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── Typewriter ──
  useEffect(() => {
    const el = twRef.current;
    if (!el) return;
    let phraseIdx = 0, charIdx = 0, deleting = false, pause = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const current = PHRASES[phraseIdx];
      if (pause) { pause = false; timer = setTimeout(tick, 1400); return; }
      if (!deleting) {
        charIdx++;
        el!.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) { deleting = true; pause = true; }
        timer = setTimeout(tick, 80 + Math.random() * 40);
      } else {
        charIdx--;
        el!.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 40);
      }
    }

    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, []);

  // ── Breathing Blob ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    let mX = 0, mY = 0, tX = 0, tY = 0;
    let raf: number;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function blobPoint(angle: number, time: number) {
      return 1
        + Math.sin(angle * 2 + time * 0.4) * 0.10
        + Math.sin(angle * 3 - time * 0.25) * 0.07
        + Math.sin(angle * 5 + time * 0.6) * 0.04
        + Math.sin(angle * 1 - time * 0.15) * 0.08
        + Math.sin(angle * 4 + time * 0.35) * 0.04;
    }

    function draw() {
      const w = canvas!.width, h = canvas!.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.26 + mX * w * 0.04;
      const cy = h * 0.55 + mY * h * 0.04;
      const rx = w * 0.42, ry = h * 0.58;
      const pts = 120;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const r = blobPoint(angle, t);
        const x = cx + Math.cos(angle) * rx * r;
        const y = cy + Math.sin(angle) * ry * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx - rx * 0.15, cy - ry * 0.15, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, "rgba(210,200,185,0.55)");
      grad.addColorStop(0.5, "rgba(195,183,165,0.35)");
      grad.addColorStop(1, "rgba(180,165,145,0.0)");
      ctx.fillStyle = grad;
      ctx.fill();
      const glow = ctx.createRadialGradient(cx, cy, rx * 0.5, cx, cy, rx * 1.2);
      glow.addColorStop(0, "rgba(200,190,170,0.0)");
      glow.addColorStop(0.7, "rgba(180,165,140,0.12)");
      glow.addColorStop(1, "rgba(160,145,120,0.0)");
      ctx.fillStyle = glow;
      ctx.fill();
      t += 0.006;
    }

    function animate() {
      mX += (tX - mX) * 0.04;
      mY += (tY - mY) * 0.04;
      draw();
      raf = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = hero!.getBoundingClientRect();
      tX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onMouseLeave = () => { tX = 0; tY = 0; };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100); };

    hero?.addEventListener("mousemove", onMouseMove);
    hero?.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(raf);
      hero?.removeEventListener("mousemove", onMouseMove);
      hero?.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-[#e8e3dc] min-h-[90vh] grid grid-cols-2 items-stretch relative overflow-visible"
      style={{ padding: "clamp(40px,8vw,100px) clamp(16px,4vw,48px) clamp(40px,6vw,80px)", gap: "clamp(16px,3vw,40px)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Left: GKUX intro animation (native React, transparent — blends with hero blob) */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "50vh", zIndex: 2, transform: "translateY(20%)" }}
      >
        <GKUXIntroAnimation />
      </div>

      {/* Right: info */}
      <div className="relative flex flex-col justify-center" style={{ zIndex: 2, transform: "translateY(-20%)" }}>
        <p
          className="font-body text-[#4A5565] uppercase tracking-[0.08em] opacity-80 mb-3.5"
          style={{ fontSize: "13px" }}
        >
          PORTFOLIO 2026
        </p>
        <h2
          className="font-body font-medium mb-7"
          style={{ fontSize: "clamp(1.5rem,2.5vw,2.2rem)", lineHeight: 1.5 }}
        >
          Designing intuitive experiences for AI-powered and digital products.
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-[#1a1a1a] overflow-hidden flex-shrink-0 relative">
            <Image
              src="/images/galina-portrait.png"
              alt="Galina Kupina"
              fill
              sizes="56px"
              className="object-cover"
              style={{ objectPosition: "50% 0%" }}
              priority
            />
          </div>
          <div>
            <div className="font-body text-2xl font-medium">Galina Kupina</div>
            <div className="font-body text-[0.82rem] text-[#4A5565] opacity-80 mt-0.5">
              Product Designer | UX Designer | AI Product Experiences
            </div>
            <div className="flex items-center gap-1 mt-1 font-body text-[0.78rem] text-[#4A5565] opacity-90">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>San Francisco Bay Area, CA</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3" style={{ fontSize: "0.85rem", color: "#4A5565", minHeight: "1.4em" }}>
              <span className="opacity-60 whitespace-nowrap flex-shrink-0 font-body">Designing for</span>
              <span
                ref={twRef}
                className="font-medium text-[#1a1a1a] typewriter-cursor whitespace-nowrap overflow-hidden font-body"
              />
            </div>
            <button
              onClick={copyEmail}
              title="Click to copy email"
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="group/email font-body text-[0.82rem] text-[#364153] mt-1.5 inline-flex items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer"
            >
              <span className="border-b border-transparent group-hover/email:border-[#364153]/40 transition-colors">
                {EMAIL}
              </span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-[#1B2B4B] font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </span>
              ) : (
                <svg className="opacity-0 group-hover/email:opacity-60 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
