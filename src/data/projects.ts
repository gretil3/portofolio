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
    liveUrl: "https://predicting-nba-rookie-career-longev.vercel.app/",
    sourceUrl: "https://github.com/gretil3/NBA-Rookie-Predictor",
  },
  {
    title: "Bone Fracture Detector",
    description:
      "A web app that flags bone fractures in X-ray images using classical computer vision instead of a neural network — a deliberate choice to keep the result lightweight, fast on CPU, and easy to explain feature-by-feature.",
    highlights: [
      "4-stage OpenCV pipeline (Sobel, Canny, Hough Transform, Watershed) extracts 42 hand-crafted features per X-ray",
      "Random Forest classifier trained on the Kaggle Bone Fracture Multi-Region X-ray dataset",
      "No GPU or deep learning required — the full pipeline runs in real time through a Streamlit interface",
    ],
    techStack: ["Python", "OpenCV", "scikit-learn", "Streamlit"],
    image: "/projects/bone-fracture-detector.svg",
    liveUrl: "https://bone-fracture-detection4.streamlit.app/",
    sourceUrl: "https://github.com/gretil3/Bone-Fracture-Detection-Using-OpenCV",
  },
  {
    title: "CivicEye",
    description:
      "A role-based civic engagement platform connecting volunteers with municipal and organizational staff. Volunteers report issues, claim field tasks, and earn redeemable points; staff triage reports, assign tasks, and track community activity through analytics — originally built as a team project for a Software Engineering course.",
    highlights: [
      "Role-based access (volunteer vs. staff) with dedicated dashboards, report triage, and task-assignment flows",
      "Photo-upload civic reporting, a community forum, and a points-and-rewards system to drive engagement",
      "React 19 + TypeScript on Vite, with InsForge (Postgres) handling auth, storage, and row-level security",
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "InsForge"],
    image: "/projects/civiceye.svg",
    liveUrl: "https://civic-eye-azure.vercel.app/",
    sourceUrl: "https://github.com/gretil3/CivicEye-Updated",
  },
];

export const archiveProjects: ArchiveProjectProps[] = [
  {
    year: "2026",
    title: "Kratt — YouTube Bot-Comment Detector",
    tech: "FastAPI / BERT / React Native",
    url: "https://github.com/gretil3/kratt",
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
];
