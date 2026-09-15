import type { LucideIcon } from "lucide-react";
import type { BrandIcon } from "@/data/brandIcons";

export type SkillIconSource = LucideIcon | BrandIcon;

export interface SkillItem {
  name: string;
  icon: SkillIconSource;
  /** Overrides the icon tint (brand color for logos, pocket accent otherwise). */
  color?: string;
  description: string;
  /** Projects on this site that show the skill; the count doubles as the item's quantity. */
  usedIn?: string[];
}

export interface SkillPocket {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Tints the bag's front pocket, the pocket tab, and the item cursor. */
  accent: string;
  /** Heading for the usedIn line, e.g. "Explored in". Defaults to "Used in". */
  usedInLabel?: string;
  items: SkillItem[];
}
