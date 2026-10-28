"use client";
import { useState } from "react";
import PrintButton from "./PrintButton";

const EMAIL = "galinauxdesign@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/galinakupina";
// On paper a link can't be clicked, so print the address itself. Derived from
// the href so the two can never drift apart.
const LINKEDIN_PRINTED = LINKEDIN.replace(/^https?:\/\/(www\.)?/, "");

export default function ResumeContactRow() {
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
    <div id="resume-contact" className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-5">
      {/* Email and LinkedIn are links in the site's idiom — transparent, with
          the underline arriving on hover. Only Save as PDF earns a button. */}
      <button
        onClick={copyEmail}
        title="Click to copy email"
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="group/e bg-transparent border-none p-0 cursor-pointer font-body text-[#364153] inline-flex items-center gap-1.5"
        style={{ fontSize: "0.92rem" }}
      >
        <span className="border-b border-transparent group-hover/e:border-[#364153]/40 transition-colors">
          {EMAIL}
        </span>
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[#1B2B4B] font-medium flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied
          </span>
        ) : (
          <svg className="no-print opacity-0 group-hover/e:opacity-60 transition-opacity flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>

      <span className="contact-sep font-body text-[#4A5565] opacity-40 select-none" aria-hidden>
        ·
      </span>

      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-linkedin group/q font-body text-[#364153] no-underline inline-flex items-center gap-1.5"
        style={{ fontSize: "0.92rem" }}
      >
        <span className="border-b border-transparent group-hover/q:border-[#364153]/40 transition-colors">
          <span className="print:hidden">LinkedIn</span>
          <span className="hidden print:inline">{LINKEDIN_PRINTED}</span>
        </span>
        <svg className="no-print opacity-40 group-hover/q:opacity-100 group-hover/q:translate-x-0.5 transition-all" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>

      <PrintButton className="ml-2" />

      {/* On paper a link can't be clicked, so the QR earns its place there only.
          No caption: it sits immediately after the printed address, which says
          where it goes — and a caption pushed the group past the page margin. */}
      <div className="hidden print:flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/linkedin-qr.svg"
          alt="QR code linking to Galina Kupina's LinkedIn profile"
          width={56}
          height={56}
          style={{ width: "56px", height: "56px" }}
        />
      </div>
    </div>
  );
}
