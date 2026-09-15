"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS_PER_TICK = 2;
const TICK_MS = 18;

function MoreArrow({ visible }: { visible: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 7 4"
      shapeRendering="crispEdges"
      fill="currentColor"
      className={`ml-1.5 inline-block h-2 w-3.5 align-middle text-firefly ${visible ? "animate-blink" : "invisible"}`}
    >
      <path d="M0 0h7v1H0zM1 1h5v1H1zM2 2h3v1H2zM3 3h1v1H3z" />
    </svg>
  );
}

interface TypedTextProps {
  text: string;
  className?: string;
}

/** Types text out like a game dialogue box. Give it a new `key` to replay. */
export default function TypedText({ text, className }: TypedTextProps) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let count = 0;
    const id = setInterval(() => {
      count += CHARS_PER_TICK;
      setTyped(count);
      if (count >= text.length) clearInterval(id);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [text, reduceMotion]);

  const shown = reduceMotion ? text.length : Math.min(typed, text.length);

  return (
    <p className={`grid ${className ?? ""}`}>
      {/* Invisible full copy reserves the final height, so the box doesn't grow while typing. */}
      <span className="invisible col-start-1 row-start-1">
        {text}
        <MoreArrow visible={false} />
      </span>
      <span className="col-start-1 row-start-1">
        {text.slice(0, shown)}
        <MoreArrow visible={shown >= text.length} />
      </span>
    </p>
  );
}
