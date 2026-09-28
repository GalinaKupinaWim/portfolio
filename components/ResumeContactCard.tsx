"use client";
import { useState } from "react";
import PrintButton from "./PrintButton";

const EMAIL = "galinauxdesign@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/galina-kupina-a219821a";

export default function ResumeContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
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

  return (
    <div
      className="p-5"
      style={{ background: "#faf8f4", border: "1px solid rgba(26,26,26,0.1)" }}
    >
      <div
        className="font-body uppercase text-[#4A5565] mb-3"
        style={{ fontSize: "0.68rem", letterSpacing: "0.16em", opacity: 0.85 }}
      >
        Contact
      </div>

      {/* Email — click to copy */}
      <button
        onClick={copyEmail}
        title="Click to copy email"
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="group/e w-full text-left bg-transparent border-none p-0 cursor-pointer font-body text-[#1a1a1a] inline-flex items-center gap-2"
        style={{ fontSize: "0.92rem" }}
      >
        <span className="border-b border-transparent group-hover/e:border-[#1a1a1a]/30 transition-colors break-all">
          {EMAIL}
        </span>
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[#1B2B4B] font-medium flex-shrink-0" style={{ fontSize: "0.78rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied
          </span>
        ) : (
          <svg className="opacity-0 group-hover/e:opacity-50 transition-opacity flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>

      <div className="my-4 h-px" style={{ background: "rgba(26,26,26,0.08)" }} />

      {/* LinkedIn QR */}
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className="group/q flex items-center gap-3.5 no-underline"
      >
        <div
          className="bg-white flex-shrink-0"
          style={{ padding: "5px", border: "1px solid rgba(26,26,26,0.12)", width: "74px", height: "74px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/linkedin-qr.svg" alt="QR code linking to Galina Kupina's LinkedIn profile" width={64} height={64} style={{ width: "100%", height: "100%" }} />
        </div>
        <div>
          <div className="font-body font-medium text-[#1a1a1a] inline-flex items-center gap-1" style={{ fontSize: "0.9rem" }}>
            LinkedIn
            <svg className="opacity-40 group-hover/q:opacity-100 group-hover/q:translate-x-0.5 transition-all" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
          <div className="font-body text-[#4A5565] mt-0.5" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
            Scan to connect
          </div>
        </div>
      </a>

      <div className="my-4 h-px" style={{ background: "rgba(26,26,26,0.08)" }} />

      {/* Save / print this resume */}
      <PrintButton className="w-full justify-center" />
    </div>
  );
}
