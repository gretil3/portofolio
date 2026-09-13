export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/30 px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-text-muted sm:flex-row">
        <p className="font-mono">David Sinambela © {new Date().getFullYear()}</p>
        <p>Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
