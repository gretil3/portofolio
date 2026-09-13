"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import type { ProjectProps } from "@/types/project";

interface ProjectCardProps {
  project: ProjectProps;
  reversed?: boolean;
}

export default function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const {
    index,
    title,
    description,
    highlights,
    techStack,
    image,
    liveUrl,
    sourceUrl,
  } = project;

  const previewUrl = liveUrl ?? sourceUrl;
  const previewLabel = liveUrl ? "Visit Project" : "View Source";
  const ImagePreview = (
    <>
      <Image
        src={image}
        alt={`${title} project preview`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        priority={index.startsWith("01")}
      />
      {previewUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/60 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-text-high/95 px-5 py-2.5 text-sm font-semibold text-background shadow-lg">
            {previewLabel}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      )}
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image preview */}
      {previewUrl ? (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${previewLabel}: ${title}`}
          className="group relative block aspect-video overflow-hidden rounded-2xl border border-emerald-900/40 bg-surface shadow-xl shadow-black/20"
        >
          {ImagePreview}
        </a>
      ) : (
        <div className="group relative block aspect-video overflow-hidden rounded-2xl border border-emerald-900/40 bg-surface shadow-xl shadow-black/20">
          {ImagePreview}
        </div>
      )}

      {/* Explanation content */}
      <div>
        <p className="mb-3 font-mono text-sm tracking-wide text-accent-soft">
          {index}
        </p>
        <h3 className="mb-4 font-sans text-2xl font-semibold text-text-high sm:text-3xl">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-amber"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mb-5 leading-relaxed text-text-muted">{description}</p>

        <ul className="mb-6 space-y-2.5">
          {highlights.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-muted">
              <span aria-hidden className="mt-0.5 text-accent-soft">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-emerald-800/40 bg-emerald-950/50 px-3 py-1 font-mono text-xs text-emerald-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-text-high transition hover:bg-accent-soft"
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
              className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-emerald-800/60 hover:text-text-high"
            >
              <Terminal className="h-4 w-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
