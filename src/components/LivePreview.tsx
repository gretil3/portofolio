"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

// Embedded sites lay out at a desktop viewport, then get scaled down to fit the frame.
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;

interface LivePreviewProps {
  url: string;
  title: string;
  poster: string;
}

export default function LivePreview({ url, title, poster }: LivePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Mount the iframe shortly before it scrolls in, then keep it running.
  const nearView = useInView(ref, { once: true, margin: "600px 0px" });
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / VIEWPORT_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-surface">
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      {nearView && scale > 0 && (
        <iframe
          src={url}
          title={`${title} live preview`}
          inert
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          style={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT, transform: `scale(${scale})` }}
          className={`absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
