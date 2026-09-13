export const FOREST_SECTIONS = [
  { id: "top", label: "Canopy", depth: "+30m" },
  { id: "skills", label: "Undergrowth", depth: "+20m" },
  { id: "projects", label: "Understory", depth: "+12m" },
  { id: "archive", label: "Forest floor", depth: "0m" },
  { id: "contact", label: "Roots", depth: "-3m" },
] as const;

export type ForestSectionId = (typeof FOREST_SECTIONS)[number]["id"];

export const SECTION_IDS: readonly ForestSectionId[] = FOREST_SECTIONS.map((s) => s.id);

export function getForestSection(id: ForestSectionId) {
  return FOREST_SECTIONS.find((s) => s.id === id) ?? FOREST_SECTIONS[0];
}

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 320;

export const TREELINE_VIEWBOX = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`;

// Seeded so server and client render identical paths (no hydration mismatch).
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

function pinePath(x: number, h: number, w: number) {
  const top = VIEW_HEIGHT - h;
  const tiers = 4;
  let d = "";
  for (let t = 0; t < tiers; t++) {
    const tierTop = top + h * 0.2 * t;
    const tierBottom = Math.min(VIEW_HEIGHT, tierTop + h * 0.38);
    const half = (w / 2) * (0.45 + 0.55 * ((t + 1) / tiers));
    d += `M${round(x)} ${round(tierTop)}L${round(x + half)} ${round(tierBottom)}L${round(x - half)} ${round(tierBottom)}Z`;
  }
  const trunk = Math.max(2, w * 0.05);
  d += `M${round(x - trunk)} ${round(top + h * 0.9)}H${round(x + trunk)}V${VIEW_HEIGHT}H${round(x - trunk)}Z`;
  return d;
}

function treelinePath(seed: number, count: number, minHeight: number, maxHeight: number) {
  const rand = mulberry32(seed);
  const step = VIEW_WIDTH / count;
  let d = "";
  for (let i = 0; i <= count; i++) {
    const x = i * step + (rand() - 0.5) * step * 0.7;
    const h = minHeight + rand() * (maxHeight - minHeight);
    const w = h * (0.4 + rand() * 0.16);
    d += pinePath(x, h, w);
  }
  return `${d}M0 ${VIEW_HEIGHT - 4}H${VIEW_WIDTH}V${VIEW_HEIGHT}H0Z`;
}

export const TREELINES = {
  far: treelinePath(7, 30, 80, 190),
  mid: treelinePath(19, 18, 120, 240),
  near: treelinePath(42, 10, 180, 310),
};
