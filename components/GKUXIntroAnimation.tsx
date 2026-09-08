"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#1B2B4B";
const TOTAL_FRAMES = 300; // 10s @ 30fps
const FPS = 30;

// Easing helpers
function bezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return (t: number) => {
    // approximate cubic-bezier
    const cx = 3 * p1x;
    const bx = 3 * (p2x - p1x) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * p1y;
    const by = 3 * (p2y - p1y) - cy;
    const ay = 1 - cy - by;
    // Solve for x via Newton
    let x = t;
    for (let i = 0; i < 6; i++) {
      const xVal = ((ax * x + bx) * x + cx) * x;
      const dx = (3 * ax * x + 2 * bx) * x + cx;
      if (dx === 0) break;
      x -= (xVal - t) / dx;
    }
    return ((ay * x + by) * x + cy) * x;
  };
}
const easeOutExpo = bezier(0.16, 1, 0.3, 1);
const easeOutBack = bezier(0.34, 1.56, 0.64, 1);
const easeInOut = bezier(0.65, 0, 0.35, 1);

function interp(
  v: number,
  from: [number, number],
  to: [number, number],
  easing: (t: number) => number = (t) => t
): number {
  const [a, b] = from;
  const [c, d] = to;
  if (v <= a) return c;
  if (v >= b) return d;
  const t = (v - a) / (b - a);
  const e = easing(t);
  return c + (d - c) * e;
}

type LetterDir = "top" | "right" | "bottom" | "rightSpin";

interface LetterConfig {
  char: string;
  enterFrom: LetterDir;
  enterAt: number;
  enterDuration: number;
  baseX: number;
  baseY: number;
  signature?: {
    startFrame: number;
    endFrame: number;
    dx: number;
    dy: number;
    rotate: number;
    originX?: string;
    originY?: string;
  };
}

function computeTransform(
  cfg: LetterConfig,
  frame: number,
  boxW: number,
  boxH: number
) {
  const localFrame = frame - cfg.enterAt;
  const enterEase =
    cfg.enterFrom === "rightSpin" || cfg.enterFrom === "top"
      ? easeOutBack
      : easeOutExpo;
  const enterProgress = interp(
    localFrame,
    [0, cfg.enterDuration],
    [0, 1],
    enterEase
  );

  let enterX = 0;
  let enterY = 0;
  let enterRotate = 0;

  switch (cfg.enterFrom) {
    case "top":
      enterY = -600 * (1 - enterProgress);
      break;
    case "right":
      enterX = 700 * (1 - enterProgress);
      break;
    case "bottom":
      enterY = 600 * (1 - enterProgress);
      break;
    case "rightSpin":
      enterX = 700 * (1 - enterProgress);
      enterRotate = -180 * (1 - enterProgress);
      break;
  }

  const enterOpacity = interp(localFrame, [0, cfg.enterDuration * 0.4], [0, 1]);

  const t = frame / FPS;
  const breath = 1 + Math.sin(t * 1.4) * 0.012;

  let sigX = 0;
  let sigY = 0;
  let sigRotate = 0;
  let originX = "50%";
  let originY = "50%";

  if (cfg.signature) {
    const sigProgress = interp(
      frame,
      [cfg.signature.startFrame, cfg.signature.endFrame],
      [0, 1],
      easeInOut
    );
    sigX = cfg.signature.dx * sigProgress;
    sigY = cfg.signature.dy * sigProgress;
    sigRotate = cfg.signature.rotate * sigProgress;
    if (cfg.signature.rotate !== 0) {
      originX = cfg.signature.originX ?? "100%";
      originY = cfg.signature.originY ?? "100%";
    }
  }

  const totalX = enterX + sigX;
  const totalY = enterY + sigY;
  const totalRotate = enterRotate + sigRotate;

  return {
    transform: `translate(${totalX}px, ${totalY}px) rotate(${totalRotate}deg) scale(${breath})`,
    transformOrigin: `${originX} ${originY}`,
    opacity: enterOpacity,
    boxW,
    boxH,
  };
}

export default function GKUXIntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);

  // Animation loop
  useEffect(() => {
    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsedMs = now - startTimeRef.current;
      const f = Math.min(Math.floor((elapsedMs / 1000) * FPS), TOTAL_FRAMES - 1);
      setFrame(f);
      if (f < TOTAL_FRAMES - 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Responsive scale - the animation is designed for 1920x1080 logical canvas;
  // we scale it down to fit the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Logical design canvas is 1920x1080. Letters occupy ~700x600 area centered.
      // Scale to fit container.
      const sx = w / 1920;
      const sy = h / 1080;
      setScale(Math.min(sx, sy));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Layout
  const W = 1920;
  const H = 1080;
  const letterW = 320;
  const letterH = 290;
  const gutter = 60;
  const vGutter = Math.round(letterH * 0.05);
  const gridW = letterW * 2 + gutter;
  const gridH = letterH * 2 + vGutter;
  const startX = (W - gridW) / 2;
  const startY = (H - gridH) / 2 - 30;

  const G_X = startX;
  const G_Y = startY;
  const K_X = startX + letterW + gutter;
  const K_Y = startY;
  const U_X = startX;
  const U_Y = startY + letterH + vGutter;
  const X_X = startX + letterW + gutter;
  const X_Y = startY + letterH + vGutter;

  const G_ENTER = FPS * 2;
  const K_ENTER = FPS * 2 + FPS * 0.4;
  const U_ENTER = FPS * 2 + FPS * 0.8;
  const X_ENTER = FPS * 2 + FPS * 1.2;
  const ENTER_DUR = FPS * 1.0;

  // Held state: 3.6s-5.3s (1.7s of breathing). Signature: 5.3s-6.9s.
  const SIG_START = FPS * 5.3;
  const SIG_END = FPS * 6.9;

  const kSlide = -letterW * 0.78;
  const gSlideX = -letterW / 2;
  const gSlideY = vGutter;
  const gRotate = -32;

  const letters: LetterConfig[] = [
    {
      char: "G",
      enterFrom: "top",
      enterAt: G_ENTER,
      enterDuration: ENTER_DUR,
      baseX: G_X,
      baseY: G_Y,
      signature: {
        startFrame: SIG_START,
        endFrame: SIG_END,
        dx: gSlideX,
        dy: gSlideY,
        rotate: gRotate,
        originX: "50%",
        originY: "100%",
      },
    },
    {
      char: "K",
      enterFrom: "right",
      enterAt: K_ENTER,
      enterDuration: ENTER_DUR,
      baseX: K_X,
      baseY: K_Y,
      signature: {
        startFrame: SIG_START,
        endFrame: SIG_END,
        dx: kSlide,
        dy: 0,
        rotate: 0,
      },
    },
    {
      char: "U",
      enterFrom: "bottom",
      enterAt: U_ENTER,
      enterDuration: ENTER_DUR,
      baseX: U_X,
      baseY: U_Y,
    },
    {
      char: "X",
      enterFrom: "rightSpin",
      enterAt: X_ENTER,
      enterDuration: ENTER_DUR,
      baseX: X_X,
      baseY: X_Y,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ aspectRatio: "1920 / 1080" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {letters.map((cfg) => {
          const t = computeTransform(cfg, frame, letterW, letterH);
          return (
            <div
              key={cfg.char}
              style={{
                position: "absolute",
                left: cfg.baseX,
                top: cfg.baseY,
                width: letterW,
                height: letterH,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: "var(--font-unbounded), 'Unbounded', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 380,
                lineHeight: 0.8,
                color: NAVY,
                letterSpacing: "-0.02em",
                transform: t.transform,
                transformOrigin: t.transformOrigin,
                opacity: t.opacity,
                willChange: "transform, opacity",
              }}
            >
              {cfg.char}
            </div>
          );
        })}
      </div>
    </div>
  );
}
