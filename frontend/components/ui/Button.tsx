"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
  /** Icon or element placed before children */
  leadingIcon?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Button({
  variant = "primary",
  loading = false,
  leadingIcon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[`btn btn--${variant}`, className].filter(Boolean).join(" ")}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span className="sr-only">Carregando…</span>
        </>
      ) : (
        <>
          {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
