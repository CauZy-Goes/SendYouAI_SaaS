import Image from "next/image";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthSidePanelProps {
  title: string;
  description: string;
  /** Zero-indexed active dot */
  activeStep?: number;
  totalSteps?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuthSidePanel({
  title,
  description,
  activeStep = 0,
  totalSteps = 3,
}: AuthSidePanelProps) {
  return (
    <aside className="auth-side-panel" aria-hidden="true">
      {/* Background orbs */}
      <div className="auth-side-panel__orb auth-side-panel__orb--1" />
      <div className="auth-side-panel__orb auth-side-panel__orb--2" />
      <div className="auth-side-panel__orb auth-side-panel__orb--3" />

      {/* Logo — white filter for dark background */}
      <div className="auth-side-panel__logo" style={{ alignSelf: "flex-start", marginTop: "-4rem" }}>
        <Image
          src="/logo.png"
          alt="SendYouAI"
          height={200}
          width={Math.round(200 * (1029 / 567))}
          style={{ filter: "brightness(0) invert(1)", objectFit: "contain", width: "auto" }}
          priority
        />
      </div>

      {/* Illustration */}
      <div className="auth-side-panel__visual">
        <div className="auth-side-panel__illustration">
          <BrandIllustration />
        </div>
      </div>

      {/* Text content */}
      <div className="auth-side-panel__content">
        <h2
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--color-white)",
            lineHeight: 1.35,
            marginBottom: "0.625rem",
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-primary-200)",
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>
      </div>

      {/* Step dots */}
      <nav className="auth-side-panel__dots" aria-label="Progresso">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className="auth-side-panel__dot"
            style={{
              width: i === activeStep ? "1.5rem" : "0.5rem",
              height: "0.5rem",
              background:
                i === activeStep
                  ? "var(--color-white)"
                  : "var(--color-primary-500)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </nav>
    </aside>
  );
}

// ─── Brand Illustration ───────────────────────────────────────────────────────

function BrandIllustration() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SendYouAI logo illustration"
    >
      {/* Chat bubble */}
      <rect
        x="8"
        y="8"
        width="52"
        height="40"
        rx="10"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
      />
      {/* Bubble tail */}
      <path
        d="M20 48 L14 58 L30 48"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Message lines */}
      <rect x="16" y="18" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
      <rect x="16" y="25" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
      <rect x="16" y="32" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
      {/* AI spark */}
      <circle cx="60" cy="56" r="12" fill="rgba(55,138,221,0.25)" stroke="rgba(133,183,235,0.5)" strokeWidth="1" />
      <path
        d="M60 49 L61.5 54.5 L67 56 L61.5 57.5 L60 63 L58.5 57.5 L53 56 L58.5 54.5 Z"
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  );
}
