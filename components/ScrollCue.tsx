"use client";
import { useEffect, useState } from "react";

export default function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Fade out on the first scroll and stay hidden — don't reappear at the top.
    const onScroll = () => {
      if (window.scrollY > 40) {
        setHidden(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goDown = () => {
    const el = document.getElementById("work-sec");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={goDown}
      aria-label="Scroll to work"
      className="scroll-cue no-print"
      data-hidden={hidden}
    >
      <svg
        className="scroll-cue-chevron"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
