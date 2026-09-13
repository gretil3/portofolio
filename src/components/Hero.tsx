"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(46,139,87,0.55) 0%, rgba(18,27,22,0) 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-amber/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-sm tracking-wide text-accent-soft"
        >
          {"// hello, world"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance font-sans text-4xl font-semibold leading-tight text-text-high sm:text-5xl lg:text-6xl"
        >
          Building clean, high-performance systems from the ground up.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
        >
          I&apos;m David Sinambela.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-text-high shadow-lg shadow-emerald-950/40 transition hover:bg-accent-soft"
          >
            Explore Work
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://github.com/gretil3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 bg-surface px-6 py-3 font-medium text-text-high transition hover:border-emerald-800/60 hover:bg-surface-hover"
          >
            <Terminal className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
