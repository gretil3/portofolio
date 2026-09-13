"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { FOREST_SECTIONS, SECTION_IDS, getForestSection } from "@/lib/forest";

export default function DepthRail() {
  const { scrollYProgress } = useScroll();
  const growth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Forest depth"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      <div className="relative flex h-[42vh] flex-col items-center justify-between">
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-line-strong" />
        <motion.span
          aria-hidden
          style={{ scaleY: growth }}
          className="absolute inset-y-0 left-1/2 w-px origin-top bg-linear-to-b from-firefly via-fern to-amber"
        />
        {FOREST_SECTIONS.map((section) => {
          const isActive = section.id === active;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={`${section.label} (${section.depth})`}
              aria-current={isActive ? "location" : undefined}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={`block h-2.5 w-2.5 rotate-45 rounded-[0_60%_0_60%] transition-all duration-300 ${
                  isActive
                    ? "scale-125 bg-firefly shadow-[0_0_12px_2px_rgba(217,249,157,0.45)]"
                    : "bg-surface-hover ring-1 ring-line-strong group-hover:bg-fern"
                }`}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-8 whitespace-nowrap rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-[11px] text-text-high opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {section.label} <span className="text-text-muted">{section.depth}</span>
              </span>
            </a>
          );
        })}
      </div>
      <p aria-hidden className="w-12 text-center font-mono text-[10px] tabular-nums text-moss">
        {getForestSection(active).depth}
      </p>
    </nav>
  );
}
