"use client";

import { motion } from "framer-motion";
import { getForestSection, type ForestSectionId } from "@/lib/forest";

interface SectionHeadingProps {
  section: ForestSectionId;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  section,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const { label, depth } = getForestSection(section);
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      <p
        className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-moss ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden className="h-px w-8 bg-moss/50" />
        {label}
        <span className="text-text-muted/70">{depth}</span>
      </p>
      <h2 className="font-display text-4xl font-medium tracking-tight text-text-high sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-md leading-relaxed text-text-muted ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
