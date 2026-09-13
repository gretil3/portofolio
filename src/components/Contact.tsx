"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check, Copy, Link2, Mail, Terminal } from "lucide-react";
import SectionHeading from "./SectionHeading";

const EMAIL = "sinambeladavid087@gmail.com";

const ACCOUNTS = [
  {
    label: "GitHub",
    href: "https://github.com/gretil3",
    icon: Terminal,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/david-sinambela-754a89324/",
    icon: Link2,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dvd_snmbela4/",
    icon: Camera,
  },
] as const;

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
  "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-5 py-2.5 text-sm font-medium text-text-muted backdrop-blur-sm transition-colors hover:border-fern/50 hover:text-text-high";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
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
          description="Open to new opportunities and interesting collaborations. Reach out on any of these."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button type="button" onClick={copyEmail} className={pillClass}>
            {copied ? <Check className="h-4 w-4 text-fern" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Email"}
          </button>
          <a href={`mailto:${EMAIL}`} className={pillClass}>
            <Mail className="h-4 w-4" />
            Email
          </a>
          {ACCOUNTS.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={pillClass}>
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
