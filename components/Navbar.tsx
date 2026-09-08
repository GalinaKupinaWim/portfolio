"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";

// ── Layout proportions mirror the hero GKUX intro animation, scaled
//    down for the navbar. Ratios match the bottom-of-page mark.
const LETTER_W = 22;
const LETTER_H = Math.round((LETTER_W * 290) / 320); // 20
const FONT_SIZE = Math.round((LETTER_W * 380) / 320); // 26
const GUTTER = Math.round((LETTER_W * 60) / 320); // 4
const V_GUTTER = Math.max(1, Math.round(LETTER_H * 0.05)); // 1
const GRID_W = LETTER_W * 2 + GUTTER;
const GRID_H = LETTER_H * 2 + V_GUTTER;

const G_X = 0;
const G_Y = 0;
const K_X = LETTER_W + GUTTER;
const K_Y = 0;
const U_X = 0;
const U_Y = LETTER_H + V_GUTTER;
const X_X = LETTER_W + GUTTER;
const X_Y = LETTER_H + V_GUTTER;

const letterBase: React.CSSProperties = {
  position: "absolute",
  width: LETTER_W,
  height: LETTER_H,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  fontFamily:
    "var(--font-unbounded), 'Unbounded', system-ui, sans-serif",
  fontWeight: 500,
  fontSize: FONT_SIZE,
  lineHeight: 0.8,
  color: "#1B2B4B",
  letterSpacing: "-0.02em",
  willChange: "transform, opacity",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  // Bumping animKey remounts the 4 letters → CSS animations replay from 0.
  const [animKey, setAnimKey] = useState(0);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white border-b border-[#e5e5e5] px-12 py-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={() => setAnimKey((k) => k + 1)}
          className="select-none"
          style={{ display: "block" }}
          aria-label="GKUX home"
        >
          <div
            key={animKey}
            className="relative"
            style={{ width: GRID_W, height: GRID_H, overflow: "visible" }}
          >
            <div
              className="nav-logo-g"
              style={{ ...letterBase, left: G_X, top: G_Y }}
            >
              G
            </div>
            <div
              className="nav-logo-k"
              style={{ ...letterBase, left: K_X, top: K_Y }}
            >
              K
            </div>
            <div
              className="nav-logo-u"
              style={{ ...letterBase, left: U_X, top: U_Y }}
            >
              U
            </div>
            <div
              className="nav-logo-x"
              style={{ ...letterBase, left: X_X, top: X_Y }}
            >
              X
            </div>
          </div>
        </Link>

        <div ref={menuContainerRef} className="relative">
          <button
            className="grid grid-cols-2 gap-[5px] p-1.5 bg-transparent border-none rounded-md transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background: menuOpen ? "rgba(26,26,26,0.06)" : "transparent",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 bg-[#1a1a1a]" />
            ))}
          </button>

          <DropdownMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </nav>
    </>
  );
}
