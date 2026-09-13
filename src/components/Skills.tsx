"use client";

import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(45%_35%_at_85%_10%,rgba(217,249,157,0.05),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          section="skills"
          title="Skills & Toolkit"
          description="What I actually reach for when building — grown out of the projects below, not a checklist."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-surface/30 px-6 py-16 text-center"
        >
          <Sprout aria-hidden className="h-6 w-6 text-fern" />
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-moss">Update soon</p>
        </motion.div>
      </div>
    </section>
  );
}
