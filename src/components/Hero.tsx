"use client";

import { Fragment, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import Fireflies from "@/components/forest/Fireflies";
import Treeline from "@/components/forest/Treeline";
import { TREELINES } from "@/lib/forest";

const GREETING = ["Hi,", "I'm", "David", "Sinambela."];
const NAME_FROM = 2;
const ROLE = ["Computer", "Science", "Student", "&", "Wanna", "be", "AI", "Developer."];
const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealWordsProps {
  words: string[];
  startIndex?: number;
  highlightFrom?: number;
}

function RevealWords({ words, startIndex = 0, highlightFrom = words.length }: RevealWordsProps) {
  return words.map((word, i) => (
    <Fragment key={`${i}-${word}`}>
      <span aria-hidden className="inline-block overflow-hidden pb-[0.12em]">
        <motion.span
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 + (startIndex + i) * 0.06, ease: EASE }}
          className={`inline-block ${
            i >= highlightFrom ? "bg-linear-to-r from-fern to-firefly bg-clip-text text-transparent" : ""
          }`}
        >
          {word}
        </motion.span>
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Farther layers drift more against the scroll, which reads as depth.
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const farX = useTransform(smoothX, [0, 1], [10, -10]);
  const midX = useTransform(smoothX, [0, 1], [22, -22]);
  const nearX = useTransform(smoothX, [0, 1], [36, -36]);
  const lanternX = useTransform(smoothX, (v) => `${v * 100}%`);
  const lanternY = useTransform(smoothY, (v) => `${v * 100}%`);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="forest-sky relative flex min-h-[100svh] items-center overflow-hidden px-6 sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden
        style={{ y: moonY }}
        className="pointer-events-none absolute right-[12%] top-[16%] motion-reduce:transform-none!"
      >
        <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f4f9e4,#cfdcb4_60%,#a9b98f)] opacity-90 shadow-[0_0_60px_18px_rgba(217,249,157,0.14),0_0_180px_70px_rgba(217,249,157,0.06)] sm:h-24 sm:w-24" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ left: lanternX, top: lanternY }}
        className="pointer-events-none absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,249,157,0.10)_0%,transparent_65%)] motion-reduce:hidden"
      />

      <Treeline
        d={TREELINES.far}
        tone="fill-[#0f2a20]"
        x={farX}
        y={farY}
        className="h-[46vh] min-h-[260px] motion-reduce:transform-none!"
      />
      <div
        aria-hidden
        className="mist pointer-events-none absolute inset-x-[-20%] bottom-[20vh] h-40 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,225,200,0.08),transparent)] blur-2xl"
      />
      <Treeline
        d={TREELINES.mid}
        tone="fill-[#0a1c15]"
        x={midX}
        y={midY}
        className="h-[36vh] min-h-[210px] motion-reduce:transform-none!"
      />

      <Fireflies />

      <Treeline
        d={TREELINES.near}
        tone="fill-background"
        x={nearX}
        className="h-[26vh] min-h-[160px] motion-reduce:transform-none!"
      />
      {/* Hides the parallax layers' clipped bottoms so the hero melts into the next section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background via-background/80 to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl pb-[14vh] pt-24 motion-reduce:transform-none!"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-sm tracking-wide text-moss"
        >
          {"// Less Decision, more focus"}
        </motion.p>

        <h1
          aria-label={`${GREETING.join(" ")} ${ROLE.join(" ")}`}
          className="max-w-5xl font-display font-medium tracking-tight text-text-high"
        >
          <span className="block text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            <RevealWords words={GREETING} highlightFrom={NAME_FROM} />
          </span>
          <span className="mt-4 block text-2xl leading-snug text-text-high/85 sm:text-3xl lg:text-4xl">
            <RevealWords words={ROLE} startIndex={GREETING.length} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          Still learning a lot about Deep Learning AI, and practical{" "}
          <span className="whitespace-nowrap">tech-building.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-fern px-6 py-3 font-semibold text-background shadow-[0_0_30px_-6px_rgba(111,207,143,0.55)] transition hover:bg-firefly hover:shadow-[0_0_40px_-4px_rgba(217,249,157,0.6)]"
          >
            Explore Work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://github.com/gretil3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 py-3 font-medium text-text-high backdrop-blur transition hover:border-fern/50 hover:bg-surface-hover"
          >
            <Terminal className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-firefly sm:flex"
      >
        descend
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="animate-descend absolute inset-x-0 top-0 h-1/2 bg-firefly" />
        </span>
      </a>
    </section>
  );
}
