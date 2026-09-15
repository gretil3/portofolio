"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle, RotateCw, X } from "lucide-react";
import BrowserBar from "./BrowserBar";

interface LiveDemoDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  embedUrl: string;
  liveUrl?: string;
}

const actionClass =
  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-high";

export default function LiveDemoDialog({
  open,
  onClose,
  title,
  embedUrl,
  liveUrl,
}: LiveDemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} live demo`}
      onClose={onClose}
      onClick={(e) => {
        // The content fills the dialog, so a click on the dialog itself landed on the backdrop.
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto h-[min(90dvh,960px)] max-h-none w-[min(1440px,calc(100vw-1.5rem))] max-w-none flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-text-high shadow-2xl shadow-black/60 transition duration-300 ease-out backdrop:bg-background/80 backdrop:backdrop-blur-sm open:flex starting:open:scale-95 starting:open:opacity-0"
    >
      <BrowserBar url={embedUrl}>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          aria-label="Reload demo"
          className={actionClass}
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
        <a
          href={liveUrl ?? embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className={actionClass}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button type="button" onClick={onClose} aria-label="Close demo" className={actionClass}>
          <X className="h-4 w-4" />
        </button>
      </BrowserBar>
      {open && <DemoFrame key={reloadKey} url={embedUrl} title={title} />}
    </dialog>
  );
}

function DemoFrame({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex-1 bg-background">
      {!loaded && (
        <div
          role="status"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-text-muted"
        >
          <LoaderCircle aria-hidden className="h-6 w-6 animate-spin text-fern" />
          Loading live demo…
        </div>
      )}
      <iframe
        src={url}
        title={`${title} live demo`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="clipboard-write; fullscreen"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
