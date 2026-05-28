"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./landing.css";
import Logo from "@/components/ui/Logo";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: <WhatsAppIcon />,
    title: "Integração WhatsApp",
    description:
      "Conecte seu número em minutos e comece a responder clientes automaticamente com IA, 24 horas por dia.",
  },
  {
    icon: <BrainIcon />,
    title: "Múltiplos modelos de IA",
    description:
      "Escolha entre GPT-4o, Claude, Gemini e outros. Troque de modelo a qualquer momento sem reconfigurar nada.",
  },
  {
    icon: <FlowIcon />,
    title: "Fluxos personalizados",
    description:
      "Crie roteiros de conversa inteligentes que se adaptam ao perfil e ao histórico de cada cliente.",
  },
  {
    icon: <AnalyticsLpIcon />,
    title: "Analytics em tempo real",
    description:
      "Acompanhe volume de mensagens, tempo de resposta e satisfação dos clientes em dashboards detalhados.",
  },
  {
    icon: <ShieldLpIcon />,
    title: "Segurança de ponta",
    description:
      "Dados criptografados em trânsito e em repouso. Conformidade com a LGPD e total controle dos seus dados.",
  },
  {
    icon: <ApiIcon />,
    title: "API aberta",
    description:
      "Integre com seu CRM, ERP ou qualquer sistema via REST API. Webhooks e SDKs disponíveis para desenvolvedores.",
  },
];

const STEPS: Step[] = [
  {
    number: "01",
    title: "Crie sua conta",
    description: "Cadastre-se gratuitamente em menos de 2 minutos, sem cartão de crédito.",
  },
  {
    number: "02",
    title: "Conecte seu WhatsApp",
    description: "Escaneie o QR code para vincular seu número em segundos.",
  },
  {
    number: "03",
    title: "Escolha sua IA",
    description: "Selecione o modelo de inteligência artificial ideal para o seu negócio.",
  },
  {
    number: "04",
    title: "Comece a automatizar",
    description: "Seu assistente já está respondendo. Monitore e ajuste em tempo real.",
  },
];

const STATS: Stat[] = [
  { value: "+5k", label: "Empresas ativas" },
  { value: "98%", label: "Satisfação dos clientes" },
  { value: "2min", label: "Tempo médio de setup" },
  { value: "24/7", label: "Disponibilidade" },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg, #185FA5, #0C447C)",
  "linear-gradient(135deg, #059669, #047857)",
  "linear-gradient(135deg, #7C3AED, #5B21B6)",
  "linear-gradient(135deg, #D97706, #B45309)",
  "linear-gradient(135deg, #DC2626, #B91C1C)",
];

const AVATAR_INITIALS = ["CR", "AL", "MB", "DS", "PF"];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".lp-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lp-reveal--visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={["lp-nav", scrolled && "lp-nav--scrolled"].filter(Boolean).join(" ")}
      aria-label="Navegação principal"
    >
      {/* Logo */}
      <Logo href="/" height={150} />

      {/* Links */}
      <ul className="lp-nav__links" role="list">
        <li><a href="#funcionalidades" className="lp-nav__link">Funcionalidades</a></li>
        <li><a href="#como-funciona" className="lp-nav__link">Como funciona</a></li>
        <li><a href="#precos" className="lp-nav__link">Preços</a></li>
      </ul>

      {/* Actions */}
      <div className="lp-nav__actions">
        <Link href="/auth/login" className="lp-nav__btn-ghost">Entrar</Link>
        <Link href="/auth/cadastro" className="lp-nav__btn-primary">Começar grátis</Link>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="lp-hero" aria-label="Introdução">
      {/* Background orbs */}
      <div className="lp-hero__orb lp-hero__orb--1" aria-hidden="true" />
      <div className="lp-hero__orb lp-hero__orb--2" aria-hidden="true" />
      <div className="lp-hero__orb lp-hero__orb--3" aria-hidden="true" />

      <div className="lp-hero__content">
        {/* Badge */}
        <div className="lp-hero__badge animate-fade-in-up">
          <span className="lp-hero__badge-dot" aria-hidden="true" />
          Novo: Suporte ao Gemini 1.5 Pro 🚀
        </div>

        {/* Title */}
        <h1 className="lp-hero__title animate-fade-in-up animation-delay-100">
          Automatize mensagens com{" "}
          <span className="lp-hero__title-gradient">Inteligência Artificial</span>
        </h1>

        {/* Subtitle */}
        <p className="lp-hero__subtitle animate-fade-in-up animation-delay-200">
          SendYouAI conecta sua empresa ao WhatsApp e responde clientes automaticamente
          usando o modelo de IA da sua escolha — sem código, sem complicação.
        </p>

        {/* CTAs */}
        <div className="lp-hero__actions animate-fade-in-up animation-delay-300">
          <Link href="/auth/cadastro" className="lp-hero__btn-primary">
            Começar gratuitamente
            <ArrowRightIcon />
          </Link>
          <a href="#como-funciona" className="lp-hero__btn-secondary">
            <PlayIcon />
            Ver como funciona
          </a>
        </div>

        {/* Social proof */}
        <div className="lp-hero__social-proof animate-fade-in-up animation-delay-300">
          <div className="lp-hero__avatars" aria-label="Usuários ativos">
            {AVATAR_INITIALS.map((initials, i) => (
              <div
                key={i}
                className="lp-hero__avatar-item"
                style={{ background: AVATAR_COLORS[i] }}
                aria-hidden="true"
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="lp-stars" aria-label="Avaliação 5 estrelas">
            {"★★★★★"}
          </div>
          <p className="lp-hero__social-text">
            <strong>+5.000 empresas</strong> já automatizando com SendYouAI
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section id="funcionalidades" className="lp-section">
      <div className="lp-container">
        <header className="lp-section-header lp-section-header--center lp-reveal">
          <span className="lp-section-badge">⚡ Funcionalidades</span>
          <h2 className="lp-section-title">Tudo que você precisa em um só lugar</h2>
          <p className="lp-section-subtitle">
            Da automação ao analytics, o SendYouAI oferece um ecossistema completo
            para transformar o atendimento da sua empresa.
          </p>
        </header>

        <div className="lp-features-grid">
          {FEATURES.map((feature, i) => (
            <article
              key={i}
              className={`lp-feature-card lp-reveal lp-reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="lp-feature-card__icon-wrap" aria-hidden="true">
                {feature.icon}
              </div>
              <div>
                <h3 className="lp-feature-card__title">{feature.title}</h3>
                <p className="lp-feature-card__desc">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="lp-stats lp-reveal">
          {STATS.map((stat, i) => (
            <div key={i} className="lp-stat">
              <div className="lp-stat__value">{stat.value}</div>
              <div className="lp-stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="lp-section lp-section--gray">
      <div className="lp-container">
        <header className="lp-section-header lp-section-header--center lp-reveal">
          <span className="lp-section-badge">🗺 Como funciona</span>
          <h2 className="lp-section-title">Configure em menos de 5 minutos</h2>
          <p className="lp-section-subtitle">
            Sem necessidade de conhecimento técnico. Do cadastro ao primeiro atendimento
            automatizado em poucos passos.
          </p>
        </header>

        <div className="lp-steps">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`lp-step lp-reveal lp-reveal-delay-${i + 1}`}
            >
              <div className="lp-step__number" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="lp-step__title">{step.title}</h3>
              <p className="lp-step__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="lp-cta" aria-labelledby="cta-title">
      <div className="lp-cta__orb-1" aria-hidden="true" />
      <div className="lp-cta__orb-2" aria-hidden="true" />

      <div className="lp-cta__content">
        <div className="lp-cta__eyebrow animate-fade-in-up">
          <span aria-hidden="true">🎉</span>
          Venha fazer parte
        </div>

        <h2 id="cta-title" className="lp-cta__title animate-fade-in-up animation-delay-100">
          Pronto para transformar seu{" "}
          <span>atendimento com IA?</span>
        </h2>

        <p className="lp-cta__subtitle animate-fade-in-up animation-delay-200">
          Junte-se a milhares de empresas que já estão economizando tempo e
          encantando clientes com o SendYouAI. Comece agora — é gratuito.
        </p>

        <div className="lp-cta__actions animate-fade-in-up animation-delay-300">
          <Link href="/auth/cadastro" className="lp-cta__btn-primary">
            Criar minha conta grátis
            <ArrowRightIcon color="#185FA5" />
          </Link>
          <Link href="/auth/login" className="lp-cta__btn-secondary">
            Já tenho uma conta
          </Link>
        </div>

        <p className="lp-cta__note animate-fade-in-up animation-delay-300">
          Sem cartão de crédito · Cancele quando quiser · Dados protegidos pela LGPD
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lp-footer">
      <Logo href="/" height={96} className="lp-footer__logo-img" />

      <ul className="lp-footer__links" role="list">
        {["Termos de Uso", "Privacidade", "LGPD", "Suporte", "Blog"].map((link) => (
          <li key={link}>
            <a href="#" className="lp-footer__link">{link}</a>
          </li>
        ))}
      </ul>

      <p className="lp-footer__copy">
        © {currentYear} SendYouAI. Todos os direitos reservados.
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="lp-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function ArrowRightIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M16.5 14.5c-.28.5-1.3 1-1.8 1.05-.48.05-.97.07-2.97-.97-2.44-1.26-4.02-3.74-4.14-3.91-.12-.17-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.15 0 .36-.06.56.43.2.49.68 1.67.74 1.79.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.11-.24.23-.1.46.14.23.62.99 1.33 1.6.92.81 1.69 1.06 1.93 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.56-.22 1.07z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 2a4.5 4.5 0 0 1 4.377 3.5M9.5 2a4.5 4.5 0 0 0-4.5 4.5c0 .757.187 1.47.516 2.097M9.5 2v0M14.5 22a4.5 4.5 0 0 1-4.377-3.5M14.5 22a4.5 4.5 0 0 0 4.5-4.5c0-.757-.187-1.47-.516-2.097M14.5 22v0M5.016 8.597A4.5 4.5 0 0 0 2 12.5a4.5 4.5 0 0 0 3.5 4.403M5.016 8.597A4.5 4.5 0 0 1 9.5 6h5a4.5 4.5 0 0 1 4.484 3.597M5.016 8.597v0M18.984 9.597A4.5 4.5 0 0 1 22 13.5a4.5 4.5 0 0 1-3.5 4.403M18.984 9.597A4.5 4.5 0 0 0 14.5 12h-5a4.5 4.5 0 0 0-4.484 4.403"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 8v4M18.5 8v4M12 12v4M5.5 12h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsLpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 16l3-4 3 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldLpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
