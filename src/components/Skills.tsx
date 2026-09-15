"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { skillPockets } from "@/data/skills";
import PixelBag from "./skills/PixelBag";
import SkillIcon from "./skills/SkillIcon";
import TypedText from "./skills/TypedText";
import SectionHeading from "./SectionHeading";

const pocketArrowClass =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-high";

function Cursor({ color, visible }: { color: string; visible: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 4 7"
      shapeRendering="crispEdges"
      className={`h-3.5 w-2 shrink-0 ${visible ? "" : "invisible"}`}
      style={{ fill: color }}
    >
      <path d="M0 0h1v7H0zM1 1h1v5H1zM2 2h1v3H2zM3 3h1v1H3z" />
    </svg>
  );
}

export default function Skills() {
  const [pocketIndex, setPocketIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pocket = skillPockets[pocketIndex];
  const item = pocket.items[itemIndex];
  const usedInLabel = pocket.usedInLabel ?? "Used in";

  function openPocket(index: number, focusTab = false) {
    const next = (index + skillPockets.length) % skillPockets.length;
    setPocketIndex(next);
    setItemIndex(0);
    if (focusTab) tabRefs.current[next]?.focus();
  }

  function handleTabKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    openPocket(pocketIndex + (e.key === "ArrowRight" ? 1 : -1), true);
  }

  function handleItemKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const count = pocket.items.length;
    const next = (itemIndex + (e.key === "ArrowDown" ? 1 : -1) + count) % count;
    setItemIndex(next);
    itemRefs.current[next]?.focus();
  }

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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Shoulder straps looping over the top of the backpack */}
          <span
            aria-hidden
            className="absolute -top-6 left-[14%] h-10 w-12 rounded-t-2xl border-[5px] border-b-0 border-[#5e3b20] sm:left-[22%]"
          />
          <span
            aria-hidden
            className="absolute -top-6 right-[14%] h-10 w-12 rounded-t-2xl border-[5px] border-b-0 border-[#5e3b20] sm:right-[22%]"
          />

          <div className="relative rounded-[28px] border-[5px] border-[#5e3b20] bg-[#1d150d] p-2 shadow-2xl shadow-black/50">
            <div className="rounded-[20px] border-2 border-dashed border-[#c08a52]/35 p-2.5 sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[17rem_1fr]">
                {/* Bag + pocket switcher */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-line-strong bg-surface p-4 sm:p-5">
                  <motion.div
                    key={pocket.id}
                    animate={{ rotate: [0, -8, 7, -4, 0] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="origin-top"
                  >
                    <PixelBag
                      accent={pocket.accent}
                      className="h-[105px] w-[100px] sm:h-[168px] sm:w-[160px]"
                    />
                  </motion.div>

                  <div className="mt-4 flex w-full items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openPocket(pocketIndex - 1)}
                      aria-label="Previous pocket"
                      className={pocketArrowClass}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <p className="font-pixel text-lg uppercase tracking-wide text-text-high">
                      {pocket.label}
                    </p>
                    <button
                      type="button"
                      onClick={() => openPocket(pocketIndex + 1)}
                      aria-label="Next pocket"
                      className={pocketArrowClass}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div
                    role="tablist"
                    aria-label="Skill pockets"
                    onKeyDown={handleTabKeyDown}
                    className="mt-3 flex gap-1.5"
                  >
                    {skillPockets.map((p, i) => {
                      const Icon = p.icon;
                      const selected = i === pocketIndex;
                      return (
                        <button
                          key={p.id}
                          ref={(el) => {
                            tabRefs.current[i] = el;
                          }}
                          type="button"
                          role="tab"
                          id={`pocket-tab-${p.id}`}
                          aria-selected={selected}
                          aria-controls="skill-pocket-panel"
                          tabIndex={selected ? 0 : -1}
                          title={p.label}
                          onClick={() => openPocket(i)}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                            selected
                              ? "border-transparent text-background"
                              : "border-line-strong text-text-muted hover:text-text-high"
                          }`}
                          style={selected ? { backgroundColor: p.accent } : undefined}
                        >
                          <Icon aria-hidden className="h-4 w-4" />
                          <span className="sr-only">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Item list */}
                <div
                  id="skill-pocket-panel"
                  role="tabpanel"
                  aria-labelledby={`pocket-tab-${pocket.id}`}
                  className="rounded-2xl border border-line-strong bg-surface p-2 sm:p-3"
                >
                  <ul
                    key={pocket.id}
                    onKeyDown={handleItemKeyDown}
                    className="max-h-80 space-y-0.5 overflow-y-auto lg:max-h-none"
                  >
                    {pocket.items.map((skill, i) => {
                      const selected = i === itemIndex;
                      return (
                        <li key={skill.name}>
                          <button
                            ref={(el) => {
                              itemRefs.current[i] = el;
                            }}
                            type="button"
                            tabIndex={selected ? 0 : -1}
                            aria-current={selected ? "true" : undefined}
                            onClick={() => setItemIndex(i)}
                            onFocus={() => setItemIndex(i)}
                            onMouseEnter={() => setItemIndex(i)}
                            className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                              selected ? "" : "hover:bg-surface-hover"
                            }`}
                            style={selected ? { backgroundColor: `${pocket.accent}1f` } : undefined}
                          >
                            <Cursor color={pocket.accent} visible={selected} />
                            <SkillIcon
                              icon={skill.icon}
                              accent={pocket.accent}
                              color={skill.color}
                              className="h-5 w-5 shrink-0"
                            />
                            <span className="flex-1 font-pixel text-base text-text-high">
                              {skill.name}
                            </span>
                            {skill.usedIn && (
                              <span aria-hidden className="font-pixel text-sm text-text-muted">
                                ×{skill.usedIn.length}
                              </span>
                            )}
                            <span className="sr-only">
                              : {skill.description}
                              {skill.usedIn && ` ${usedInLabel}: ${skill.usedIn.join(", ")}.`}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Dialogue-style description box (item buttons carry the same text for screen readers) */}
                <div
                  aria-hidden
                  className="rounded-2xl border-2 border-line-strong bg-background p-4 shadow-[inset_0_0_0_4px_#07100b,inset_0_0_0_5px_rgba(163,230,186,0.1)] sm:p-5 lg:col-span-2"
                >
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface sm:h-16 sm:w-16">
                      <SkillIcon
                        icon={item.icon}
                        accent={pocket.accent}
                        color={item.color}
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-pixel text-lg" style={{ color: pocket.accent }}>
                        {item.name}
                      </p>
                      <TypedText
                        key={`${pocket.id}-${item.name}`}
                        text={item.description}
                        className="mt-1 text-sm leading-relaxed text-text-high/90"
                      />
                      {item.usedIn && (
                        <p className="mt-3 font-mono text-[11px] text-moss">
                          {usedInLabel}:{" "}
                          <span className="text-text-muted">{item.usedIn.join(" · ")}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p
            aria-hidden
            className="mt-4 hidden justify-center gap-6 font-pixel text-xs text-text-muted [@media(hover:hover)]:flex"
          >
            <span>← → switch pocket</span>
            <span>↑ ↓ choose item</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
