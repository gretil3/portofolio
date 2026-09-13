"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Link2, Mail, Send, Sprout, Terminal } from "lucide-react";
import SectionHeading from "./SectionHeading";

const EMAIL = "david.sinambela@example.com";

const ROOTS = [
  { d: "M600 0C600 80 560 120 520 180S420 300 380 420 300 540 240 600", width: 2.2 },
  { d: "M600 0C605 90 650 140 700 200S800 320 840 430 920 540 980 600", width: 2.2 },
  { d: "M600 0C598 120 600 220 590 320S560 480 570 600", width: 1.8 },
  { d: "M520 180C470 200 380 210 300 260S160 340 60 360", width: 1.4 },
  { d: "M700 200C760 230 860 240 950 290S1100 360 1180 380", width: 1.4 },
  { d: "M380 420C340 430 280 470 200 480", width: 1 },
  { d: "M840 430C890 450 960 480 1040 500", width: 1 },
  { d: "M590 320C620 360 660 390 700 450", width: 1 },
];

const pillClass =
  "inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-fern/50 hover:text-text-high";

const fieldClass =
  "w-full rounded-lg border border-line-strong bg-background/60 px-4 py-2.5 text-sm text-text-high outline-none transition focus:border-fern focus:ring-2 focus:ring-fern/25";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-to-b from-transparent via-soil/60 to-soil px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <svg
        aria-hidden
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMin slice"
        className="roots pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="root-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="600">
            <stop offset="0%" stopColor="#e0a96d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e0a96d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ROOTS.map((root, i) => (
          <motion.path
            key={root.d}
            d={root.d}
            fill="none"
            stroke="url(#root-fade)"
            strokeWidth={root.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.4, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[65%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          section="contact"
          title="Let's build something."
          description="Open to new opportunities and interesting collaborations. Reach out directly or drop a message below."
          align="center"
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-text-high transition-colors hover:border-fern/50 hover:bg-surface-hover"
          >
            {copied ? <Check className="h-4 w-4 text-fern" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Email"}
          </button>
          <a href={`mailto:${EMAIL}`} className={pillClass}>
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/example"
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass}
          >
            <Link2 className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/gretil3"
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass}
          >
            <Terminal className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl space-y-4 rounded-2xl border border-line-strong bg-surface/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-text-muted">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={fieldClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-text-muted">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-fern px-6 py-3 font-semibold text-background transition-colors hover:bg-firefly disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          <div aria-live="polite" className="min-h-5">
            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.p
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-fern"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="inline-flex"
                  >
                    <Sprout aria-hidden className="h-4 w-4" />
                  </motion.span>
                  Thanks — I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-amber"
                >
                  Something went wrong. Please try emailing directly.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
