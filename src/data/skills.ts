import {
  BookOpen,
  Blocks,
  Brain,
  Bug,
  Cpu,
  Database,
  Gauge,
  HeartHandshake,
  Languages,
  MessagesSquare,
  Network,
  Plug,
  Rocket,
  Scale,
  ScanEye,
  SquareCode,
  Target,
  Telescope,
  Timer,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import type { SkillPocket } from "@/types/skill";
import {
  claude,
  docker,
  fastApi,
  gemini,
  github,
  googleColab,
  huggingFace,
  kaggle,
  openCv,
  python,
  react,
  scikitLearn,
  streamlit,
  tailwindCss,
  typescript,
  vercel,
} from "./brandIcons";

// Short project names, matching the Featured and Archive sections.
const NBA = "NBA Rookie Predictor";
const KRATT = "Kratt";
const OWI = "OWI";
const BONE = "Bone Fracture Detector";
const CIVICEYE = "CivicEye";
const SENTIMENT = "Market Sentiment Analyser";
const VOICE = "Voice-Aware Agent";
const DOMU = "Domu";
const LAKU = "laku.ai";
const PORTFOLIO = "This portfolio";

export const skillPockets: SkillPocket[] = [
  {
    id: "tech",
    label: "Tech Skills",
    icon: Cpu,
    accent: "#6fcf8f",
    items: [
      {
        name: "Python",
        icon: python,
        description:
          "My main language: ML pipelines, computer-vision feature extraction, NLP models, and the APIs that serve them.",
        usedIn: [NBA, BONE, KRATT, SENTIMENT, VOICE],
      },
      {
        name: "TypeScript",
        icon: typescript,
        description:
          "Typed frontends and servers, including one API contract shared by client and server so both sides agree on the data.",
        usedIn: [OWI, CIVICEYE, PORTFOLIO],
      },
      {
        name: "scikit-learn",
        icon: scikitLearn,
        description:
          "Classical ML: Logistic Regression, Decision Trees, Random Forests, and TF-IDF baselines, tuned with stratified cross-validation.",
        usedIn: [NBA, BONE, SENTIMENT],
      },
      {
        name: "OpenCV",
        icon: openCv,
        description:
          "Classical computer vision: Sobel and Canny edges, Hough transforms, and watershed segmentation that turn an X-ray into 42 features.",
        usedIn: [BONE],
      },
      {
        name: "Hugging Face",
        icon: huggingFace,
        description:
          "Fine-tuning BERT-family transformers (BERT, DistilBERT, FinBERT) for text classification, with trained models served from the Hub.",
        usedIn: [KRATT, SENTIMENT],
      },
      {
        name: "React",
        icon: react,
        description:
          "Component-based interfaces on the web, and on mobile with React Native and Expo.",
        usedIn: [CIVICEYE, OWI, DOMU, KRATT, PORTFOLIO],
      },
      {
        name: "FastAPI",
        icon: fastApi,
        description: "Python backends that put a machine-learning model behind a clean HTTP API.",
        usedIn: [KRATT],
      },
      {
        name: "Streamlit",
        icon: streamlit,
        description: "Turning trained models into interactive demos anyone can try in the browser.",
        usedIn: [NBA, BONE, SENTIMENT],
      },
      {
        name: "Tailwind CSS",
        icon: tailwindCss,
        description: "Utility-first styling for building consistent interfaces quickly.",
        usedIn: [CIVICEYE, OWI, PORTFOLIO],
      },
      {
        name: "Docker",
        icon: docker,
        description:
          "Packaging a backend with its ML model baked in, so a cold start doesn't re-download a 1 GB model.",
        usedIn: [KRATT],
      },
    ],
  },
  {
    id: "fundamentals",
    label: "Fundamentals",
    icon: Blocks,
    accent: "#8ecae6",
    items: [
      {
        name: "Model Evaluation",
        icon: Gauge,
        description:
          "Stratified k-fold validation, ROC-AUC, Macro F1, and train/test gap checks. On the NBA predictor I cut a Decision Tree's overfitting gap from 37 points to 3.4.",
        usedIn: [NBA, SENTIMENT],
      },
      {
        name: "Data Preprocessing",
        icon: Database,
        description:
          "Cleaning, scaling, and shaping raw data into features a model can learn from, like hand-crafting 42 features per X-ray.",
        usedIn: [BONE, NBA, KRATT],
      },
      {
        name: "API Design",
        icon: Plug,
        description:
          "Writing the request/response contract first, validating every response, and returning errors people can actually read.",
        usedIn: [OWI, KRATT],
      },
      {
        name: "Testing & Debugging",
        icon: Bug,
        description:
          "Automated tests, strict type checks, and health checks that show what's really running before blaming the model.",
        usedIn: [OWI, KRATT],
      },
      {
        name: "Software Engineering",
        icon: Workflow,
        description:
          "Taking a project from requirements to release as a team: role-based design, version control, and CI checks on pull requests.",
        usedIn: [CIVICEYE, KRATT],
      },
      {
        name: "Deployment",
        icon: Rocket,
        description:
          "Getting projects live on Vercel, Streamlit Cloud, and Firebase Hosting, so people can use them instead of just reading about them.",
        usedIn: [NBA, BONE, KRATT, OWI, CIVICEYE, SENTIMENT],
      },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    icon: HeartHandshake,
    accent: "#f4a3a8",
    items: [
      {
        name: "Teamwork",
        icon: Users,
        description:
          "Working with a recurring team on hackathon and course projects, splitting backend, ML, and app work between us.",
        usedIn: [KRATT, CIVICEYE, OWI],
      },
      {
        name: "Communication",
        icon: MessagesSquare,
        description:
          "Writing READMEs with architecture diagrams, API contracts, and setup steps, so teammates can run a project without asking.",
        usedIn: [KRATT, OWI],
      },
      {
        name: "Honest Scoping",
        icon: Scale,
        description:
          "Saying clearly what's finished and what isn't, like marking a project 'concept stage' or 'work in progress' instead of overselling it.",
        usedIn: [OWI, LAKU, DOMU, VOICE],
      },
      {
        name: "Working Under Pressure",
        icon: Timer,
        description: "Shipping on a deadline: Kratt was built for UNESCO Youth Hackathon 2026.",
        usedIn: [KRATT],
      },
      {
        name: "User-Centered Thinking",
        icon: Target,
        description:
          "Designing around the person using the tool: Kratt makes you guess before it reveals a score, and OWI admits when it finds no evidence.",
        usedIn: [KRATT, OWI],
      },
      {
        name: "Self-Directed Learning",
        icon: BookOpen,
        description:
          "Picking up a new domain with each project, from computer vision to NLP to speech recognition.",
        usedIn: [BONE, SENTIMENT, VOICE],
      },
    ],
  },
  {
    id: "interests",
    label: "Interests",
    icon: Telescope,
    accent: "#d9f99d",
    usedInLabel: "Explored in",
    items: [
      {
        name: "Machine Learning",
        icon: Brain,
        description:
          "Building end-to-end ML projects: from raw data to a tuned, evaluated model that people can actually use.",
        usedIn: [NBA, BONE],
      },
      {
        name: "Computer Vision",
        icon: ScanEye,
        description: "Getting machines to understand images, from edge detection to segmentation.",
        usedIn: [BONE],
      },
      {
        name: "Natural Language Processing",
        icon: Languages,
        description:
          "Working with text: classifying sentiment, spotting bot comments, and checking claims against evidence.",
        usedIn: [SENTIMENT, KRATT, OWI],
      },
      {
        name: "Deep Learning",
        icon: Network,
        description:
          "Neural networks and transformers: fine-tuning BERT-family models and using speaker embeddings for voice recognition.",
        usedIn: [KRATT, SENTIMENT, VOICE],
      },
    ],
  },
  {
    id: "toolkit",
    label: "Toolkit",
    icon: Wrench,
    accent: "#e0a96d",
    items: [
      {
        name: "Claude",
        icon: claude,
        description:
          "AI pair-programmer for prototyping, refactoring, and talking through design decisions.",
        usedIn: [PORTFOLIO],
      },
      {
        name: "Gemini",
        icon: gemini,
        description: "Research and prompt prototyping, including in Google AI Studio.",
      },
      {
        name: "VS Code",
        icon: SquareCode,
        color: "#3b9ae1",
        description: "My everyday editor for Python, TypeScript, and notebooks.",
      },
      {
        name: "Google Colab",
        icon: googleColab,
        description: "Cloud notebooks with free GPUs for training and fine-tuning experiments.",
      },
      {
        name: "GitHub",
        icon: github,
        description: "Where every project lives: version control, forks, and team collaboration.",
      },
      {
        name: "Vercel",
        icon: vercel,
        description: "Deploying web apps straight from a GitHub repository.",
        usedIn: [NBA, OWI, CIVICEYE, PORTFOLIO],
      },
      {
        name: "Kaggle",
        icon: kaggle,
        description: "Datasets and notebooks for machine-learning practice.",
        usedIn: [BONE],
      },
    ],
  },
];
