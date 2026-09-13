"use client";

import { motion, type MotionValue } from "framer-motion";
import { TREELINE_VIEWBOX } from "@/lib/forest";

interface TreelineProps {
  d: string;
  /** Tailwind fill class for the silhouette, e.g. "fill-background" */
  tone: string;
  className?: string;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
}

export default function Treeline({ d, tone, className = "", x, y }: TreelineProps) {
  return (
    <motion.svg
      aria-hidden
      viewBox={TREELINE_VIEWBOX}
      preserveAspectRatio="xMidYMax slice"
      style={{ x, y }}
      className={`pointer-events-none absolute bottom-0 left-[-5%] w-[110%] ${className}`}
    >
      <path d={d} className={tone} />
    </motion.svg>
  );
}
