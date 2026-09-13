"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Link2, Mail, Send, Terminal } from "lucide-react";

const EMAIL = "david.sinambela@example.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

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
    <section id="contact" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-sm tracking-wide text-accent-soft">
            {"// get in touch"}
          </p>
          <h2 className="font-sans text-3xl font-semibold text-text-high sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-muted">
            Open to new opportunities and interesting collaborations. Reach out
            directly or drop a message below.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 bg-surface px-5 py-2.5 text-sm font-medium text-text-high transition hover:border-emerald-800/60 hover:bg-surface-hover"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent-soft" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Email"}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-emerald-800/60 hover:text-text-high"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-emerald-800/60 hover:text-text-high"
          >
            <Link2 className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/gretil3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-emerald-800/60 hover:text-text-high"
          >
            <Terminal className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl space-y-4 rounded-2xl border border-emerald-900/40 bg-surface p-6 sm:p-8"
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
                className="w-full rounded-lg border border-emerald-900/40 bg-background px-4 py-2.5 text-sm text-text-high outline-none transition focus:border-accent-soft"
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
                className="w-full rounded-lg border border-emerald-900/40 bg-background px-4 py-2.5 text-sm text-text-high outline-none transition focus:border-accent-soft"
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
              className="w-full resize-none rounded-lg border border-emerald-900/40 bg-background px-4 py-2.5 text-sm text-text-high outline-none transition focus:border-accent-soft"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-text-high transition hover:bg-accent-soft disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4" />
          </button>

          {status === "sent" && (
            <p className="text-sm text-accent-soft">
              Thanks — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-amber">
              Something went wrong. Please try emailing directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
