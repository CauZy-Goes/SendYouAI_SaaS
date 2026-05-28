"use client";

import { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PasswordStrength = "none" | "weak" | "fair" | "good" | "strong";

interface PasswordStrengthResult {
  score: number;        // 0–4
  level: PasswordStrength;
  label: string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Evaluates password strength based on length and character variety.
 * Returns score (0-4), semantic level, and a display label.
 */
export function usePasswordStrength(password: string): PasswordStrengthResult {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers  = /\d/.test(password);
  const hasSymbols  = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const varietyScore = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
  const lengthBonus  = password.length >= 12 ? 1 : 0;
  const rawScore     = isLongEnough ? Math.min(4, varietyScore + lengthBonus) : Math.min(1, password.length > 0 ? 1 : 0);

  const map: Record<number, Omit<PasswordStrengthResult, "score">> = {
    0: { level: "none",   label: "" },
    1: { level: "weak",   label: "Fraca" },
    2: { level: "fair",   label: "Razoável" },
    3: { level: "good",   label: "Boa" },
    4: { level: "strong", label: "Forte" },
  };

  return { score: rawScore, ...map[rawScore] };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PasswordStrengthMeterProps {
  password: string;
}

const BARS = 4;

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, level, label } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="password-strength animate-fade-in" aria-live="polite" aria-atomic="true">
      <div className="password-strength__bars" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={BARS}>
        {Array.from({ length: BARS }).map((_, i) => (
          <div
            key={i}
            className={[
              "password-strength__bar",
              i < score && `password-strength__bar--${level}`,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>
      {label && (
        <span className="password-strength__label">
          Força da senha: <strong>{label}</strong>
        </span>
      )}
    </div>
  );
}
