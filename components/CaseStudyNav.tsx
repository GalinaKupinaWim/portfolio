"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  backHref?: string;
  backLabel?: string;
  tag?: string;
}

export default function CaseStudyNav({ backHref = "/", backLabel = "Back to Portfolio", tag = "Case Study" }: Props) {
  return (
    <nav className="sticky top-0 bg-white/97 border-b border-[#e5e5e5] px-16 py-[18px] flex justify-between items-center z-[100]">
      <Link href={backHref} className="flex items-center gap-2 font-body text-[14px] text-[#1a1a1a] no-underline hover:opacity-60 transition-opacity">
        <ChevronLeft size={16} />
        {backLabel}
      </Link>
      <span className="font-body text-[12px] uppercase tracking-[0.1em] text-[#999]">{tag}</span>
    </nav>
  );
}
