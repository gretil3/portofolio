import type { ArchiveProjectProps, ProjectProps } from "@/types/project";

export const featuredProjects: ProjectProps[] = [
  {
    title: "NBA Rookie Longevity Predictor",
    description:
      "An interactive sports-analytics app that predicts whether an NBA rookie's career will last 5+ years, straight from their rookie-season box score stats. Built two models end-to-end through a shared 12-step pipeline — preprocessing, stratified 5-fold tuning, evaluation — to see where a linear model and a tree-based model agree and disagree on the same players.",
    highlights: [
      "Tuned Logistic Regression vs. Decision Tree, compared head-to-head (74.7% vs. 75.4% ROC-AUC)",
      "Position-aware sliders drive real-time predictions with confidence scores and feature-importance breakdowns",
      "Cut Decision Tree overfitting from a 37-point train/test gap down to 3.4 points via depth and leaf-count tuning",
    ],
    techStack: ["Python", "scikit-learn", "Streamlit", "pandas", "Matplotlib"],
    image: "/projects/nba-rookie-predictor.svg",
    embedUrl: "https://predicting-nba-rookie-career-longev.vercel.app/",
    liveUrl: "https://predicting-nba-rookie-career-longev.vercel.app/",
    sourceUrl: "https://github.com/gretil3/NBA-Rookie-Predictor",
  },
  {
    title: "Kratt",
    description:
      "A media-literacy tool built by a team of four for UNESCO Youth Hackathon 2026. Paste a YouTube link and Kratt estimates how much of the comment section is likely bot activity — broken down into ads & spam, copy-paste, low-effort filler, and genuine — so the score comes with a reason, not just a number.",
    highlights: [
      "Every comment lands in exactly one category: spam rules and near-duplicate checks run first, then a fine-tuned BERT model separates genuine from low-effort comments",
      "Built to train the reader, not just score: users guess before the reveal, see the flagged comments as evidence, and get a source-evaluation checklist",
      "FastAPI backend ships as a Docker image with the model baked in and falls back to rules-only scoring if BERT can't load; the React Native (Expo) app runs on mobile and web",
    ],
    techStack: ["Python", "FastAPI", "BERT", "React Native", "Expo", "Docker"],
    image: "/projects/kratt.svg",
    embedUrl: "https://kratt-5433f.web.app/",
    liveUrl: "https://kratt-5433f.web.app/",
    sourceUrl: "https://github.com/gretil3/kratt",
  },
  {
    title: "OWI — Online Web Investigator",
    description:
      "A fact-checking tool for Indonesian political claims. Paste a claim or an article link and OWI checks it against open evidence — fact-check archives, official releases, court rulings, and verified reporting — then returns a verdict (true, false, misleading, opinion, or unverifiable) with the evidence behind it. When it finds nothing, it says so instead of guessing. Built as a team: I'm a co-builder and co-developer, and I share the data scraping work.",
    disclaimer:
      "Work in progress: this is the project I'm currently working on. The evidence database is still being built, so features and results will keep changing.",
    highlights: [
      "Each check becomes a case file: verdict, confidence, extracted claim, named entities, and a timeline of the claim against its evidence",
      "Shows its reasoning with LIME word weights that highlight which words pushed the verdict",
      "Client and server share one typed API contract, and every response is validated so a broken payload shows an error instead of a blank page",
    ],
    techStack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Framer Motion", "Express"],
    image: "/projects/owi.svg",
    embedUrl: "https://owi-seven.vercel.app/",
    liveUrl: "https://owi-seven.vercel.app/",
    sourceUrl: "https://github.com/gretil3/owi",
  },
];

export const archiveProjects: ArchiveProjectProps[] = [
  {
    year: "2026",
    title: "Bone Fracture Detector",
    tech: "Python / OpenCV / scikit-learn",
    url: "https://github.com/gretil3/Bone-Fracture-Detection-Using-OpenCV",
    demoUrl: "https://bone-fracture-detection4.streamlit.app/",
  },
  {
    year: "2026",
    title: "CivicEye — Civic Reporting Platform",
    tech: "React / TypeScript / Vite",
    url: "https://github.com/gretil3/CivicEye-Updated",
    demoUrl: "https://civic-eye-updated.vercel.app/",
  },
  {
    year: "2026",
    title: "Voice-Aware Conversational Agent",
    tech: "Python / SpeechBrain / LLM",
    url: "https://github.com/gretil3/voice_recogition",
  },
  {
    year: "2026",
    title: "Market Sentiment Analyser",
    tech: "Python / DistilBERT / Streamlit",
    url: "https://github.com/gretil3/Sentiment-Market-Analysis-NLP",
    demoUrl: "https://twitter-sentiment-nlp-tfidf.streamlit.app/",
  },
  {
    year: "2026",
    title: "laku.ai — Marketplace Analyst for UMKM Sellers",
    tech: "Prototype / UI",
    url: "https://github.com/gretil3/laku.ai",
  },
  {
    year: "2026",
    title: "Domu — Media-Literacy Reading Check (prototype)",
    tech: "React 19 / Vite",
    url: "https://github.com/gretil3/Domu",
  },
  {
    year: "2026",
    title: "Mr. Coffee — Static Website",
    tech: "HTML / CSS",
    url: "https://github.com/gretil3/Mr-Coffee-Website",
  },
  {
    year: "2026",
    title: "Portfolio — This Website",
    tech: "Next.js / TypeScript / Tailwind CSS",
    url: "https://github.com/gretil3/portofolio",
  },
  {
    year: "2026",
    title: "CivicEye — Original Version",
    tech: "React / TypeScript / Vite",
    url: "https://github.com/gretil3/CivicEye",
    demoUrl: "https://civic-eye-azure.vercel.app/",
    forkedFrom: "geraldadli/CivicEye",
  },
  {
    year: "2026",
    title: "Superhoop — Smart Basketball Arcade",
    tech: "React / TypeScript / Arduino",
    url: "https://github.com/gretil3/superhoop",
    demoUrl: "https://superhoop-381x.vercel.app/",
    forkedFrom: "MakiKainan/superhoop",
  },
  {
    year: "2026",
    title: "C vs Python — Performance Study",
    tech: "Python / C / Jupyter",
    url: "https://github.com/gretil3/C-vs-Python-Study",
    forkedFrom: "phuuun/C-vs-Python-Study",
  },
];
