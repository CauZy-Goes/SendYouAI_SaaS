import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthFormPanelProps {
  children: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Right-hand white panel that wraps the form content.
 * Keeps form layout separate from page-level logic.
 */
export default function AuthFormPanel({ children }: AuthFormPanelProps) {
  return <div className="auth-form-panel">{children}</div>;
}
