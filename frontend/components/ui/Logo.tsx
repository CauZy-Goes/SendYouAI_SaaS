import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogoVariant = "full" | "icon" | "wordmark";

interface LogoProps {
  /** visual variant — full (icon+text), icon only, or wordmark only */
  variant?: LogoVariant;
  /** pixel height — width is auto-calculated from aspect ratio */
  height?: number;
  /** wraps in a Link if provided */
  href?: string;
  /** extra CSS class */
  className?: string;
}

// ─── Aspect ratios per variant (derived from the 1029×567px source image) ────
const ASPECT = 1029 / 567; // ≈ 1.815 — full logo

// ─── Component ────────────────────────────────────────────────────────────────

export default function Logo({
  variant = "full",
  height = 36,
  href,
  className = "",
}: LogoProps) {
  const width = Math.round(height * ASPECT);

  const img = (
    <Image
      src="/logo.png"
      alt="SendYouAI — Envie. Converse. Conecte. Automatize."
      width={width}
      height={height}
      priority
      style={{ objectFit: "contain", width: "auto" }}
      className={className}
    />
  );

  if (href) {
    return (
      <Link href={href} aria-label="SendYouAI — página inicial">
        {img}
      </Link>
    );
  }

  return img;
}
