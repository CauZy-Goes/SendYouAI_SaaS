"use client";

import { useState, useCallback, useId } from "react";
import type { Metadata } from "next";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import {
  UserCircleIcon,
  KeyIcon,
  BotIcon,
  ShieldIcon,
  CopyIcon,
  RefreshIcon,
  CheckIcon,
  AlertIcon,
  MenuIcon,
} from "@/components/ui/DashboardIcons";
import { EmailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon } from "@/components/ui/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ToastState {
  message: string;
  type: "success" | "error";
}

type AiModelId =
  | "gpt-4o"
  | "gpt-4o-mini"
  | "claude-3-5-sonnet"
  | "claude-3-haiku"
  | "gemini-1-5-pro"
  | "gemini-1-5-flash";

interface AiModel {
  id: AiModelId;
  name: string;
  provider: string;
  badge: string;
  badgeVariant: "fast" | "powerful" | "balanced";
  logo: string;
  logoBg: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AI_MODELS: AiModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    badge: "Avançado",
    badgeVariant: "powerful",
    logo: "🟢",
    logoBg: "#f0fdf4",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    badge: "Rápido",
    badgeVariant: "fast",
    logo: "⚡",
    logoBg: "#fefce8",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    badge: "Balanceado",
    badgeVariant: "balanced",
    logo: "🟠",
    logoBg: "#fff7ed",
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    badge: "Rápido",
    badgeVariant: "fast",
    logo: "⚡",
    logoBg: "#fff7ed",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    badge: "Avançado",
    badgeVariant: "powerful",
    logo: "🔵",
    logoBg: "#eff6ff",
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    badge: "Rápido",
    badgeVariant: "fast",
    logo: "⚡",
    logoBg: "#eff6ff",
  },
];

// Generates a mock API key for demonstration
function generateMockKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const segments = [8, 4, 4, 4, 12];
  return segments
    .map((len) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    )
    .join("-");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SettingsCard({
  icon,
  title,
  description,
  children,
  footer,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="settings-card animate-fade-in-up">
      <div className="settings-card__header">
        <div className="settings-card__header-icon" aria-hidden="true">
          {icon}
        </div>
        <div>
          <h2 className="settings-card__title">{title}</h2>
          <p className="settings-card__description">{description}</p>
        </div>
      </div>
      <div className="settings-card__body">{children}</div>
      {footer && <div className="settings-card__footer">{footer}</div>}
    </section>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
  hint,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-row__info">
        <span className="toggle-row__label">{label}</span>
        {hint && <span className="toggle-row__hint">{hint}</span>}
      </div>
      <label className="toggle" htmlFor={id} aria-label={label}>
        <input
          id={id}
          type="checkbox"
          className="toggle__input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle__track" />
        <span className="toggle__thumb" />
      </label>
    </div>
  );
}

function Toast({ toast }: { toast: ToastState | null }) {
  if (!toast) return null;
  return (
    <div
      className={`toast toast--${toast.type}`}
      role="status"
      aria-live="polite"
    >
      {toast.type === "success" ? <CheckIcon /> : <AlertIcon />}
      {toast.message}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConfiguracoesPage() {
  // ── Profile state ──────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "Carlos",
    lastName: "Silva",
    email: "carlos@sendyouai.com",
    phone: "+55 11 99999-9999",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // ── API key state ──────────────────────────────────────────────────────────
  const [apiKey, setApiKey] = useState("sk-syai-A3f9Kx2Lm8Qp5Wr-4Nt6Jv");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);

  // ── AI model state ─────────────────────────────────────────────────────────
  const [selectedModel, setSelectedModel] = useState<AiModelId>("gpt-4o");
  const [aiLoading, setAiLoading] = useState(false);

  // ── Notification toggles ───────────────────────────────────────────────────
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  // ── Password state ─────────────────────────────────────────────────────────
  const [passwords, setPasswords] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastState["type"] = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleProfileSave = useCallback(async () => {
    setProfileLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // TODO: PATCH /users/me
    setProfileLoading(false);
    showToast("Perfil atualizado com sucesso!");
  }, [showToast]);

  const handleCopyKey = useCallback(async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiKey]);

  const handleRegenerateKey = useCallback(async () => {
    setApiKeyLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // TODO: POST /api-keys/regenerate
    setApiKey(generateMockKey());
    setApiKeyLoading(false);
    showToast("Nova API key gerada com sucesso!");
  }, [showToast]);

  const handleAiSave = useCallback(async () => {
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // TODO: PATCH /settings/ai
    setAiLoading(false);
    showToast(`Modelo ${selectedModel} salvo como padrão!`);
  }, [selectedModel, showToast]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordSave = useCallback(async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast("As senhas não coincidem.", "error");
      return;
    }
    if (passwords.newPassword.length < 8) {
      showToast("A nova senha deve ter pelo menos 8 caracteres.", "error");
      return;
    }
    setPasswordLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // TODO: POST /auth/change-password
    setPasswordLoading(false);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showToast("Senha alterada com sucesso!");
  }, [passwords, showToast]);

  // ── Masked API key ────────────────────────────────────────────────────────

  const maskedKey = showApiKey
    ? apiKey
    : `${apiKey.slice(0, 10)}${"•".repeat(Math.max(0, apiKey.length - 14))}${apiKey.slice(-4)}`;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Top bar */}
      <header className="dashboard-topbar">
        <button className="dashboard-topbar__hamburger" aria-label="Abrir menu">
          <MenuIcon />
        </button>
        <nav className="dashboard-topbar__breadcrumb" aria-label="Breadcrumb">
          <span>Dashboard</span>
          <span aria-hidden="true">›</span>
          <span className="dashboard-topbar__breadcrumb-current">Configurações</span>
        </nav>
        <div className="dashboard-topbar__actions">
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-white)",
            }}
            aria-label="Avatar do usuário"
          >
            CS
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="dashboard-content">
        {/* Page header */}
        <div className="settings-header animate-fade-in-up">
          <h1 className="settings-title">Configurações</h1>
          <p className="settings-subtitle">
            Gerencie suas informações, API key e preferências de inteligência artificial.
          </p>
        </div>

        {/* ── 1. Perfil ────────────────────────────────────────────────── */}
        <SettingsCard
          icon={<UserCircleIcon />}
          title="Perfil"
          description="Seus dados pessoais exibidos na plataforma."
          footer={
            <>
              <Button
                variant="secondary"
                className="btn--sm"
                onClick={() =>
                  setProfile({
                    firstName: "Carlos",
                    lastName: "Silva",
                    email: "carlos@sendyouai.com",
                    phone: "+55 11 99999-9999",
                  })
                }
              >
                Descartar
              </Button>
              <Button
                variant="primary"
                className="btn--sm"
                loading={profileLoading}
                onClick={handleProfileSave}
              >
                Salvar alterações
              </Button>
            </>
          }
        >
          {/* Avatar */}
          <div className="avatar-upload">
            <div className="avatar-upload__preview" aria-label="Avatar">
              CS
            </div>
            <div className="avatar-upload__info">
              <Button variant="secondary" className="btn--sm">
                Alterar foto
              </Button>
              <span className="avatar-upload__hint">JPG, PNG ou GIF — máx. 2 MB</span>
            </div>
          </div>

          {/* Name grid */}
          <div className="form-grid-2">
            <InputField
              label="Nome"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={profile.firstName}
              onChange={handleProfileChange}
              leadingIcon={<UserIcon />}
            />
            <InputField
              label="Sobrenome"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={profile.lastName}
              onChange={handleProfileChange}
            />
          </div>

          <InputField
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            value={profile.email}
            onChange={handleProfileChange}
            leadingIcon={<EmailIcon />}
          />

          <InputField
            label="Telefone / WhatsApp"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={profile.phone}
            onChange={handleProfileChange}
          />
        </SettingsCard>

        {/* ── 2. API Key ───────────────────────────────────────────────── */}
        <SettingsCard
          icon={<KeyIcon />}
          title="API Key"
          description="Use esta chave para autenticar requisições à API do SendYouAI."
        >
          {/* Key field */}
          <div className="api-key-field">
            <span className="form-label">Sua chave de API</span>
            <div className="api-key-input-row">
              <input
                id="api-key-input"
                type="text"
                readOnly
                value={maskedKey}
                className="api-key-input"
                aria-label="API key"
              />

              {/* Toggle visibility */}
              <button
                type="button"
                className="api-key-action-btn"
                onClick={() => setShowApiKey((p) => !p)}
                aria-label={showApiKey ? "Ocultar API key" : "Mostrar API key"}
                aria-pressed={showApiKey}
              >
                {showApiKey ? <EyeOffIcon /> : <EyeIcon />}
                {showApiKey ? "Ocultar" : "Mostrar"}
              </button>

              {/* Copy */}
              <button
                type="button"
                className={`api-key-action-btn ${copied ? "api-key-action-btn--copied" : ""}`}
                onClick={handleCopyKey}
                aria-label="Copiar API key"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="api-key-hint">
              <AlertIcon size={12} />
              Nunca compartilhe sua chave de API com terceiros.
            </p>
          </div>

          {/* Regenerate */}
          <div
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-50)",
              border: "1px solid var(--color-primary-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-primary-900)" }}>
                Regenerar chave
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", marginTop: "0.125rem" }}>
                A chave atual será invalidada imediatamente.
              </p>
            </div>
            <Button
              variant="secondary"
              className="btn--sm"
              loading={apiKeyLoading}
              leadingIcon={<RefreshIcon />}
              onClick={handleRegenerateKey}
            >
              Regenerar
            </Button>
          </div>

          {/* Notification toggles */}
          <div>
            <Toggle
              id="email-notifications"
              checked={emailNotifications}
              onChange={setEmailNotifications}
              label="Alertas de uso da API"
              hint="Receba e-mails quando o uso aproximar do limite."
            />
            <Toggle
              id="weekly-report"
              checked={weeklyReport}
              onChange={setWeeklyReport}
              label="Relatório semanal"
              hint="Resumo de requisições enviado toda segunda-feira."
            />
          </div>
        </SettingsCard>

        {/* ── 3. Inteligência Artificial ────────────────────────────────── */}
        <SettingsCard
          icon={<BotIcon />}
          title="Inteligência Artificial"
          description="Escolha o modelo de IA que será usado para processar as mensagens."
          footer={
            <Button
              variant="primary"
              className="btn--sm"
              loading={aiLoading}
              onClick={handleAiSave}
            >
              Salvar modelo
            </Button>
          }
        >
          <div className="ai-model-grid" role="radiogroup" aria-label="Selecionar modelo de IA">
            {AI_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={[
                    "ai-model-card",
                    isSelected && "ai-model-card--selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setSelectedModel(model.id)}
                >
                  {/* Radio indicator */}
                  <span className="ai-model-card__radio" aria-hidden="true">
                    <span className="ai-model-card__radio-dot" />
                  </span>

                  {/* Logo */}
                  <div
                    className="ai-model-card__logo"
                    style={{ background: model.logoBg }}
                    aria-hidden="true"
                  >
                    {model.logo}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="ai-model-card__name">{model.name}</p>
                    <p className="ai-model-card__provider">{model.provider}</p>
                  </div>

                  {/* Badge */}
                  <span
                    className={`ai-model-card__badge ai-model-card__badge--${model.badgeVariant}`}
                  >
                    {model.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Context settings for selected model */}
          <div className="form-grid-2">
            <div className="select-field">
              <label htmlFor="temperature-select" className="form-label">
                Criatividade (temperatura)
              </label>
              <div className="select-wrapper">
                <select id="temperature-select" className="select-input" defaultValue="0.7">
                  <option value="0.0">0.0 — Determinístico</option>
                  <option value="0.3">0.3 — Conservador</option>
                  <option value="0.7">0.7 — Balanceado</option>
                  <option value="1.0">1.0 — Criativo</option>
                  <option value="1.5">1.5 — Muito criativo</option>
                </select>
                <ChevronDownIcon />
              </div>
            </div>

            <div className="select-field">
              <label htmlFor="language-select" className="form-label">
                Idioma das respostas
              </label>
              <div className="select-wrapper">
                <select id="language-select" className="select-input" defaultValue="pt-BR">
                  <option value="pt-BR">Português (BR)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* ── 4. Segurança ─────────────────────────────────────────────── */}
        <SettingsCard
          icon={<ShieldIcon />}
          title="Segurança"
          description="Atualize sua senha e proteja o acesso à sua conta."
          footer={
            <Button
              variant="primary"
              className="btn--sm"
              loading={passwordLoading}
              onClick={handlePasswordSave}
            >
              Alterar senha
            </Button>
          }
        >
          <InputField
            label="Senha atual"
            name="currentPassword"
            type={showPasswords.current ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Sua senha atual"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            leadingIcon={<LockIcon />}
            trailingAction={
              <button
                type="button"
                className="form-input-action"
                onClick={() => setShowPasswords((p) => ({ ...p, current: !p.current }))}
                aria-label={showPasswords.current ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPasswords.current ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          <div className="form-grid-2">
            <InputField
              label="Nova senha"
              name="newPassword"
              type={showPasswords.new ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Mín. 8 caracteres"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              leadingIcon={<LockIcon />}
              trailingAction={
                <button
                  type="button"
                  className="form-input-action"
                  onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                  aria-label={showPasswords.new ? "Ocultar" : "Mostrar"}
                >
                  {showPasswords.new ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            <InputField
              label="Confirmar senha"
              name="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              leadingIcon={<LockIcon />}
              trailingAction={
                <button
                  type="button"
                  className="form-input-action"
                  onClick={() => setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))}
                  aria-label={showPasswords.confirm ? "Ocultar" : "Mostrar"}
                >
                  {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
          </div>
        </SettingsCard>

        {/* ── 5. Zona de Perigo ─────────────────────────────────────────── */}
        <div className="danger-zone animate-fade-in-up">
          <div className="danger-zone__header">
            <h2 className="danger-zone__title">Zona de Perigo</h2>
          </div>
          <div className="danger-zone__body">
            <div className="danger-zone__item">
              <div>
                <p className="danger-zone__item-label">Desativar conta</p>
                <p className="danger-zone__item-hint">
                  Sua conta ficará inativa e poderá ser reativada a qualquer momento.
                </p>
              </div>
              <button type="button" className="btn--danger">
                Desativar
              </button>
            </div>
            <div className="danger-zone__item">
              <div>
                <p className="danger-zone__item-label">Excluir conta permanentemente</p>
                <p className="danger-zone__item-hint">
                  Todos os dados serão removidos e esta ação não poderá ser desfeita.
                </p>
              </div>
              <button type="button" className="btn--danger">
                Excluir conta
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Toast notification */}
      <Toast toast={toast} />
    </>
  );
}

// ─── Inline Chevron Icon ──────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg
      className="select-chevron"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
