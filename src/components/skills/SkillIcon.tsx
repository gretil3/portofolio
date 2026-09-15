import type { SkillIconSource } from "@/types/skill";

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const SURFACE_LUMINANCE = luminance("#0e1a14");

// Brand colors too dark for the night background (GitHub, Vercel) fall back to light text.
function readableOnSurface(hex: string) {
  const contrast = (luminance(hex) + 0.05) / (SURFACE_LUMINANCE + 0.05);
  return contrast >= 2.5 ? hex : "var(--text-high)";
}

interface SkillIconProps {
  icon: SkillIconSource;
  /** Tint for non-brand icons. */
  accent: string;
  color?: string;
  className?: string;
}

export default function SkillIcon({ icon, accent, color, className }: SkillIconProps) {
  if ("path" in icon) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: color ?? readableOnSurface(icon.hex) }}
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon aria-hidden className={className} style={{ color: color ?? accent }} />;
}
