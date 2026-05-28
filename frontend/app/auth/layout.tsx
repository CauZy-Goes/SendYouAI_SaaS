import type { Metadata } from "next";
import type { ReactNode } from "react";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: "%s | SendYouAI",
    default: "Autenticação | SendYouAI",
  },
  description: "Acesse ou crie sua conta no SendYouAI — a plataforma de automação de mensagens com inteligência artificial.",
  robots: { index: false },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-root">
      <div className="auth-card">
        {children}
      </div>
    </main>
  );
}
