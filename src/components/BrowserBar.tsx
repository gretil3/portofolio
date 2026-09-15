interface BrowserBarProps {
  url: string;
  children?: React.ReactNode;
}

export default function BrowserBar({ url, children }: BrowserBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-background/70 px-3.5 py-2">
      <div aria-hidden className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-firefly/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-fern/70" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted">
        <span aria-hidden className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-firefly/70 motion-reduce:animate-none" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-firefly" />
        </span>
        <span className="truncate">{new URL(url).host}</span>
      </div>
      {children}
    </div>
  );
}
