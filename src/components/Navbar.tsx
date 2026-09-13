"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { TreePine } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTION_IDS } from "@/lib/forest";

const links = [
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Archive", id: "archive" },
  { label: "Contact", id: "contact" },
] as const;

export default function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-background/75 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-display text-lg font-semibold text-text-high"
        >
          <TreePine
            aria-hidden
            className="h-5 w-5 text-fern transition-transform duration-500 group-hover:-rotate-12"
          />
          <span>
            david<span className="text-fern">.</span>dev
          </span>
        </a>
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative isolate block rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
                    isActive ? "text-text-high" : "text-text-muted hover:text-text-high"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full border border-fern/30 bg-fern/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
