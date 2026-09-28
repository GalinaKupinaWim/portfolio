import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-12 py-9 border-t border-[#e5e5e5] flex justify-between items-center font-body text-[13px] text-[#999]">
      <div>© 2026 Galina Kupina · San Francisco Bay Area</div>
      <div className="flex gap-7">
        <Link href="https://www.linkedin.com/in/galina-kupina-a219821a" target="_blank" rel="noopener noreferrer" className="text-[#999] no-underline hover:text-[#1a1a1a] transition-colors">LinkedIn</Link>
        <Link href="https://dribbble.com" target="_blank" className="text-[#999] no-underline hover:text-[#1a1a1a] transition-colors">Dribbble</Link>
      </div>
    </footer>
  );
}
