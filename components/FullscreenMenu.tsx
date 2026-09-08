"use client";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Work" },
  { href: "/#about-sec", label: "About" },
  { href: "/sat", label: "SAT PrepMate" },
  { href: "/nutri", label: "NutriWise" },
  { href: "mailto:galinauxdesign@gmail.com", label: "Contact" },
];

export default function FullscreenMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-[500] flex flex-col items-center justify-center gap-10">
      <div className="absolute top-0 left-0 right-0 px-12 py-4 flex justify-between items-center border-b border-[#e5e5e5]">
        <div className="flex flex-col leading-[0.85]">
          <div className="flex items-end">
            <span className="text-[1.53rem] font-medium text-[#1B2B4B]">G</span>
            <span className="text-[1.53rem] font-medium text-[#1B2B4B]">K</span>
          </div>
          <div className="flex items-start mt-[-0.04em]">
            <span className="text-[1.53rem] font-medium text-[#1B2B4B]">U</span>
            <span className="text-[1.53rem] font-medium text-[#1B2B4B] ml-[-0.04em]">X</span>
          </div>
        </div>
        <button
          className="bg-transparent border-none text-[28px] leading-none text-[#1a1a1a]"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="font-body text-[clamp(2.5rem,5vw,4rem)] font-medium text-[#1a1a1a] no-underline hover:opacity-60 transition-opacity"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
