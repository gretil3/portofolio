"use client";

import { useId, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  House,
  Layers,
  Mail,
  Minus,
  Search,
  SearchX,
  Square,
  Star,
  X,
} from "lucide-react";
import { archiveProjects } from "@/data/projects";
import type { ArchiveProjectProps } from "@/types/project";
import SectionHeading from "./SectionHeading";

const QUICK_ACCESS = [
  { label: "Home", href: "#top", icon: House },
  { label: "Skills", href: "#skills", icon: Layers },
  { label: "Featured", href: "#projects", icon: Star },
  { label: "Archive", href: "#archive", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsArchive() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const items = q
    ? archiveProjects.filter((p) =>
        `${p.title} ${p.tech} ${p.forkedFrom ?? ""}`.toLowerCase().includes(q),
      )
    : archiveProjects;
  const groups = [
    { label: "My projects", items: items.filter((p) => !p.forkedFrom) },
    { label: "Forked from friends", items: items.filter((p) => p.forkedFrom) },
  ].filter((group) => group.items.length > 0);

  return (
    <section id="archive" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading section="archive" title="Archive" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-xl border border-line-strong bg-surface/70 shadow-2xl shadow-black/40 backdrop-blur-sm"
        >
          {/* Title bar: open tab + window controls */}
          <div className="flex items-end justify-between bg-background/80 pl-2 pt-2">
            <div className="flex items-center gap-2 rounded-t-lg bg-surface px-3.5 py-2 text-xs text-text-high">
              <FolderOpen aria-hidden className="h-3.5 w-3.5 text-amber" />
              Archive
              <X aria-hidden className="ml-4 h-3 w-3 text-text-muted sm:ml-8" />
            </div>
            <div aria-hidden className="flex self-start text-text-muted">
              <span className="px-3 py-2 sm:px-4">
                <Minus className="h-3.5 w-3.5" />
              </span>
              <span className="px-3 py-2 sm:px-4">
                <Square className="h-3 w-3" />
              </span>
              <span className="px-3 py-2 sm:px-4">
                <X className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Address bar + search */}
          <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
            <div aria-hidden className="hidden items-center gap-3 px-1 text-text-muted/40 sm:flex">
              <ArrowLeft className="h-4 w-4" />
              <ArrowRight className="h-4 w-4" />
              <ArrowUp className="h-4 w-4" />
            </div>
            <div
              aria-hidden
              className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-background/60 px-3 py-1.5 text-xs text-text-muted"
            >
              <FolderOpen className="h-3.5 w-3.5 shrink-0 text-amber" />
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="truncate">David</span>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="truncate">Projects</span>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="truncate text-text-high">Archive</span>
            </div>
            <label className="flex w-36 items-center gap-2 rounded-md border border-line bg-background/60 px-2.5 py-1.5 text-xs text-text-muted transition-colors focus-within:border-fern/40 sm:w-56">
              <Search aria-hidden className="h-3.5 w-3.5 shrink-0" />
              <span className="sr-only">Search archive</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Archive"
                className="w-full min-w-0 bg-transparent text-text-high placeholder:text-text-muted/70 focus:outline-none"
              />
            </label>
          </div>

          <div className="flex min-h-80">
            <nav aria-label="Quick access" className="hidden w-44 shrink-0 border-r border-line p-2 md:block">
              <ul className="space-y-0.5">
                {QUICK_ACCESS.map(({ label, href, icon: Icon }) => {
                  const current = href === "#archive";
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        aria-current={current ? "location" : undefined}
                        className={`relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                          current
                            ? "bg-fern/10 text-text-high before:absolute before:left-0 before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-fern"
                            : "text-text-muted hover:bg-surface-hover hover:text-text-high"
                        }`}
                      >
                        <Icon aria-hidden className={`h-3.5 w-3.5 ${current ? "text-amber" : ""}`} />
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex-1 space-y-5 p-3 sm:p-4">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div key={group.label}>
                    {/* Explorer-style "group by" header */}
                    <h3 className="mb-1 flex items-center gap-2 px-1 text-xs text-text-muted">
                      <ChevronDown aria-hidden className="h-3.5 w-3.5" />
                      <span className="text-text-high">{group.label}</span>
                      <span>({group.items.length})</span>
                      <span aria-hidden className="h-px flex-1 bg-line" />
                    </h3>
                    <motion.ul
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                      className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-1"
                    >
                      {group.items.map((project) => (
                        <FolderItem key={project.url ?? project.title} project={project} />
                      ))}
                    </motion.ul>
                  </div>
                ))
              ) : (
                <p className="flex h-full min-h-60 flex-col items-center justify-center gap-2 text-sm text-text-muted">
                  <SearchX aria-hidden className="h-5 w-5" />
                  No items match your search.
                </p>
              )}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-line bg-background/60 px-4 py-1.5 font-mono text-[11px] text-text-muted">
            <span aria-live="polite">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
            <span className="hidden sm:inline">Click a folder to open its GitHub repository</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FolderItem({ project }: { project: ArchiveProjectProps }) {
  const { year, title, tech, url, demoUrl, forkedFrom } = project;
  const forkNote = forkedFrom ? `Forked from ${forkedFrom}` : "";
  const cellClass =
    "group flex h-full flex-col items-center rounded-md border border-transparent px-2 pb-3 pt-4 text-center transition-colors";
  const content = (
    <>
      <FolderGlyph shortcut={Boolean(forkedFrom)} />
      <span className="mt-2 line-clamp-3 text-xs leading-snug text-text-high">{title}</span>
      <span className="mt-1 font-mono text-[10px] text-moss">{tech}</span>
      {forkedFrom && (
        <span className="mt-1 text-[10px] text-text-muted">
          Forked from {forkedFrom.split("/")[0]}
        </span>
      )}
    </>
  );

  return (
    <motion.li variants={itemVariants} className="relative">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={[title, `${tech} · ${year}`, forkNote].filter(Boolean).join("\n")}
          className={`${cellClass} hover:border-fern/15 hover:bg-fern/[0.06] focus-visible:border-fern/40 focus-visible:bg-fern/10 focus-visible:outline-none`}
        >
          {content}
          <span className="sr-only">
            {forkNote && ` (${forkNote})`} (opens GitHub repository)
          </span>
        </a>
      ) : (
        <div className={cellClass}>{content}</div>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live demo: ${title}`}
          className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full border border-firefly/30 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-firefly transition-colors hover:bg-firefly hover:text-background"
        >
          Live
          <ArrowUpRight className="h-2.5 w-2.5" />
        </a>
      )}
    </motion.li>
  );
}

function FolderGlyph({ shortcut = false }: { shortcut?: boolean }) {
  const gradientId = `${useId()}-folder`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 64 52"
      className="h-14 w-16 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3c98a" />
          <stop offset="1" stopColor="#d99a55" />
        </linearGradient>
      </defs>
      <path
        d="M2 8a4 4 0 0 1 4-4h15.2a4 4 0 0 1 2.9 1.2L28 9h30a4 4 0 0 1 4 4v33a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"
        fill="#a8733f"
      />
      {/* Sheet peeking out of the folder; rises on hover. */}
      <rect
        x="8"
        y="12"
        width="48"
        height="30"
        rx="2"
        fill="#dfe8dc"
        className="transition-transform duration-300 group-hover:-translate-y-1.5 motion-reduce:transition-none"
      />
      {/* Front flap leans open on hover. */}
      <path
        d="M2 20a4 4 0 0 1 4-4h52a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"
        fill={`url(#${gradientId})`}
        className="origin-bottom transition-transform duration-300 [transform-box:fill-box] group-hover:-skew-x-6 group-hover:scale-y-95 motion-reduce:transition-none"
      />
      {/* Windows-style shortcut arrow marks a fork of someone else's repo. */}
      {shortcut && (
        <g>
          <rect x="3" y="33" width="16" height="16" rx="2.5" fill="#eef3ea" stroke="#0e1a14" />
          <path
            d="M7.5 45c0-4 2.5-6.5 6.5-6.5M11.5 36l2.5 2.5-2.5 2.5"
            fill="none"
            stroke="#2f7d57"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}
