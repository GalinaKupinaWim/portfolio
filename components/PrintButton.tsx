"use client";
import { useEffect, useRef, useState } from "react";

type Mode = "full" | "short";

const OPTIONS: { mode: Mode; label: string; hint: string }[] = [
  { mode: "full", label: "Full résumé", hint: "Every role in detail" },
  { mode: "short", label: "Short résumé", hint: "Current role in detail, earlier roles as titles" },
];

export default function PrintButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on Escape or a click outside, the way any menu should behave.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // The mode is stamped on <html> so ExperienceSection's beforeprint handler
  // knows whether to expand every role or leave the older ones collapsed.
  const save = (mode: Mode) => {
    setOpen(false);
    document.documentElement.dataset.printMode = mode;
    const clear = () => {
      delete document.documentElement.dataset.printMode;
      window.removeEventListener("afterprint", clear);
    };
    window.addEventListener("afterprint", clear);
    // Let the menu close paint before the print dialog blocks the thread.
    requestAnimationFrame(() => {
      window.print();
      // Safari fires no afterprint in some versions; don't leave the flag set.
      setTimeout(clear, 1000);
    });
  };

  return (
    <div ref={wrapRef} className={`no-print relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Save this résumé as a PDF"
        className="inline-flex items-center gap-2 bg-[#e8e3dc] hover:bg-[#ded8cf] transition-colors border-none px-7 py-3.5 font-body text-[0.75rem] font-medium text-[#1a1a1a] cursor-pointer"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Save as PDF
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-50 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 z-30 w-[270px] bg-white rounded-md overflow-hidden"
          style={{
            border: "1px solid rgba(26,26,26,0.12)",
            boxShadow: "0 14px 34px -14px rgba(0,0,0,0.26), 0 4px 10px -4px rgba(0,0,0,0.08)",
          }}
        >
          {OPTIONS.map((o) => (
            <button
              key={o.mode}
              role="menuitem"
              onClick={() => save(o.mode)}
              className="w-full text-left px-4 py-3 bg-transparent border-none cursor-pointer hover:bg-[#f6f3ee] transition-colors block"
            >
              <span
                className="font-body font-medium text-[#1a1a1a] block"
                style={{ fontSize: "0.86rem" }}
              >
                {o.label}
              </span>
              <span
                className="font-body text-[#4A5565] block mt-0.5"
                style={{ fontSize: "0.76rem", lineHeight: 1.4 }}
              >
                {o.hint}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
