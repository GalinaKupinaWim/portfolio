"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  // Reset scroll to top on every page mount (fixes the "opens at about" issue
  // when the browser restores a previous scroll position).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
