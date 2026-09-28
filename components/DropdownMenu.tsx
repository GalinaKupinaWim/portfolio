"use client";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

const primary = [
  { href: "/resume", label: "Resume" },
  { href: "/#about-sec", label: "About" },
];

const cases = [
  { href: "/sat", label: "SAT PrepMate" },
  { href: "/nutri", label: "NutriWise" },
  { href: "/sfpl", label: "SF Public Library" },
];

export default function DropdownMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="dropdown-menu absolute"
      style={{
        right: 0,
        top: "calc(100% + 12px)",
        width: "240px",
        background: "#fafaf7",
        border: "1px solid rgba(26,26,26,0.08)",
        borderRadius: "14px",
        boxShadow:
          "0 24px 60px -22px rgba(0,0,0,0.22), 0 8px 18px -6px rgba(0,0,0,0.08)",
        padding: "8px",
        zIndex: 200,
        transformOrigin: "top right",
      }}
      role="menu"
    >
      {primary.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="dropdown-item"
          role="menuitem"
        >
          {label}
        </Link>
      ))}

      <div className="dropdown-divider" />
      <div className="dropdown-label">Case Studies</div>
      {cases.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="dropdown-item"
          role="menuitem"
        >
          {label}
        </Link>
      ))}

      <div className="dropdown-divider" />
      <div className="dropdown-label">Contact</div>
      <a
        href="mailto:galinauxdesign@gmail.com"
        onClick={onClose}
        className="dropdown-item"
        role="menuitem"
      >
        Email
      </a>
      <a
        href="https://www.linkedin.com/in/galina-kupina-a219821a"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="dropdown-item"
        role="menuitem"
      >
        LinkedIn
      </a>
    </div>
  );
}
