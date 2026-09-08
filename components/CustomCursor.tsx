"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current + "px";
      ring.style.top = ringY.current + "px";
      rafRef.current = requestAnimationFrame(loop);
    };

    const onDown = () => { dot.classList.add("click"); ring.classList.add("click"); };
    const onUp = () => { dot.classList.remove("click"); ring.classList.remove("click"); };
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const isLink = t.closest("a,button,.proj-card,.back-btn,.ai-toggle,.chip,.show-more,.menu-btn,[data-cursor-link]");
      const isText = t.closest("p,h1,h2,h3,h4,span,li,td,th") && !isLink;
      dot.classList.remove("hover", "text");
      ring.classList.remove("hover", "text", "link");
      if (isLink) { dot.classList.add("hover"); ring.classList.add("hover", "link"); }
      else if (isText) { dot.classList.add("text"); ring.classList.add("text"); }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
