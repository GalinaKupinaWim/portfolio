"use client";

export default function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      title="Opens your browser's print dialog — choose 'Save as PDF' or send to a printer"
      className={`no-print inline-flex items-center gap-2 bg-[#e8e3dc] hover:bg-[#ded8cf] transition-colors border-none px-7 py-3.5 font-body text-[0.75rem] font-medium text-[#1a1a1a] cursor-pointer ${className}`}
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
    </button>
  );
}
