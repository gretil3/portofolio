"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Leaf,
  MousePointerClick,
  Sprout,
  Terminal,
} from "lucide-react";
import type { ProjectProps } from "@/types/project";
import BrowserBar from "./BrowserBar";
import LiveDemoDialog from "./LiveDemoDialog";
import LivePreview from "./LivePreview";

interface ProjectCardProps {
  project: ProjectProps;
  number: string;
  reversed?: boolean;
}

const MAX_TILT_DEG = 7;

const pillClass =
  "inline-flex items-center gap-2 rounded-full bg-firefly px-5 py-2.5 text-sm font-semibold text-background shadow-lg shadow-black/30";

export default function ProjectCard({ project, number, reversed = false }: ProjectCardProps) {
  const {
    title,
    description,
    disclaimer,
    highlights,
    techStack,
    image,
    embedUrl,
    liveUrl,
    sourceUrl,
  } = project;
  const reduceMotion = useReducedMotion();
  const [demoOpen, setDemoOpen] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18 });
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${lightX}% ${lightY}%, rgba(217, 249, 157, 0.16), transparent 65%)`;
  const rim = useMotionTemplate`radial-gradient(280px circle at ${lightX}% ${lightY}%, rgba(217, 249, 157, 0.7), transparent 70%)`;

  const previewUrl = liveUrl ?? sourceUrl;
  const previewLabel = liveUrl ? "Visit Project" : "View Source";

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    lightX.set(px * 100);
    lightY.set(py * 100);
    if (reduceMotion) return;
    tiltY.set((px - 0.5) * MAX_TILT_DEG * 2);
    tiltX.set((0.5 - py) * MAX_TILT_DEG * 2);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const spotlightLayer = (
    <motion.div
      aria-hidden
      style={{ background: spotlight }}
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  );
  // Curtain retracts upward so the preview appears to grow from the ground.
  const curtain = (
    <motion.div
      aria-hidden
      initial={{ scaleY: 1 }}
      whileInView={{ scaleY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      className="pointer-events-none absolute inset-0 z-10 origin-top bg-surface"
    />
  );

  let frame: React.ReactNode;
  if (embedUrl) {
    frame = (
      <div className="relative overflow-hidden rounded-[15px] bg-surface">
        <BrowserBar url={embedUrl}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} in a new tab`}
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-high"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </BrowserBar>
        <div className="relative aspect-video overflow-hidden">
          <LivePreview url={embedUrl} title={title} poster={image} />
          {spotlightLayer}
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            aria-label={`Try ${title} live`}
            className="absolute inset-0 flex items-end justify-center bg-background/0 pb-5 opacity-0 transition duration-300 hover:bg-background/30 hover:opacity-100 focus-visible:bg-background/30 focus-visible:opacity-100 focus-visible:outline-none [@media(hover:none)]:opacity-100"
          >
            <span className={pillClass}>
              Try it live
              <MousePointerClick className="h-4 w-4" />
            </span>
          </button>
        </div>
        {curtain}
      </div>
    );
  } else {
    const frameClass = "relative block aspect-video overflow-hidden rounded-[15px] bg-surface";
    const frameContent = (
      <>
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {spotlightLayer}
        {previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition duration-300 group-focus-within:bg-background/55 group-focus-within:opacity-100 group-hover:bg-background/55 group-hover:opacity-100">
            <span className={pillClass}>
              {previewLabel}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        )}
        {curtain}
      </>
    );
    frame = previewUrl ? (
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${previewLabel}: ${title}`}
        className={frameClass}
      >
        {frameContent}
      </a>
    ) : (
      <div className={frameClass}>{frameContent}</div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className={`group relative rounded-2xl p-px shadow-2xl shadow-black/40 ${reversed ? "lg:order-2" : ""}`}
      >
        <div aria-hidden className="absolute inset-0 rounded-2xl bg-line-strong" />
        <motion.div
          aria-hidden
          style={{ background: rim }}
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {frame}
      </motion.div>

      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-14 right-0 select-none font-display text-[8rem] font-semibold leading-none text-fern/[0.07] sm:text-[10rem] lg:-top-20"
        >
          {number}
        </span>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-moss">
          {number} — Featured
        </p>
        <h3 className="mb-4 font-display text-3xl font-medium tracking-tight text-text-high sm:text-4xl">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-firefly"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mb-6 leading-relaxed text-text-muted">{description}</p>
        {disclaimer && (
          <p className="-mt-2 mb-6 flex gap-3 rounded-lg border border-amber/25 bg-amber/5 px-4 py-3 text-sm leading-relaxed text-amber">
            <Sprout aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{disclaimer}</span>
          </p>
        )}

        <ul className="mb-7 space-y-3">
          {highlights.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-muted">
              <Leaf aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-fern" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <ul aria-label="Tech stack" className="mb-8 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-fern/20 bg-fern/5 px-3 py-1 font-mono text-xs text-fern"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fern px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-firefly"
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-fern/50 hover:text-text-high"
            >
              <Terminal className="h-4 w-4" />
              Source Code
            </a>
          )}
        </div>
      </div>

      {embedUrl && (
        <LiveDemoDialog
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          title={title}
          embedUrl={embedUrl}
          liveUrl={liveUrl}
        />
      )}
    </motion.article>
  );
}
