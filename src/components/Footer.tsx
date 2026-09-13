import { TreePine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-soil px-6 pb-8 pt-10 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber/20 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-text-muted sm:flex-row">
        <p className="inline-flex items-center gap-2 font-mono">
          <TreePine aria-hidden className="h-4 w-4 text-moss" />
          David Sinambela © {new Date().getFullYear()}
        </p>
        <p>Grown with Next.js, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
