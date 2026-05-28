"use client";

import { useState, useCallback, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthSidePanel from "@/components/auth/AuthSidePanel";
import AuthFormPanel from "@/components/auth/AuthFormPanel";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter";
import { EmailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon, GoogleIcon } from "@/components/ui/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateRegisterForm(values: RegisterFormState): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "Nome é obrigatório.";
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = "Nome deve ter pelo menos 2 caracteres.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Sobrenome é obrigatório.";
  }

  if (!values.email.trim()) {
    errors.email = "E-mail é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!values.password) {
    errors.password = "Senha é obrigatória.";
  } else if (values.password.length < 8) {
    errors.password = "A senha deve ter pelo menos 8 caracteres.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirme sua senha.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem.";
  }

  return errors;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CadastroPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      // Clear field error on change
      if (errors[name as keyof RegisterFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!termsAccepted) {
        setErrors({ general: "Aceite os termos de uso para continuar." });
        return;
      }

      const validationErrors = validateRegisterForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        // TODO: integrate with API — POST /auth/register
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/auth/login?registered=true");
      } catch {
        setErrors({ general: "Não foi possível criar sua conta. Tente novamente." });
      } finally {
        setIsLoading(false);
      }
    },
    [form, router, termsAccepted]
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <AuthSidePanel
        title="Comece agora, é grátis."
        description="Crie sua conta em segundos e automatize suas conversas com inteligência artificial."
        activeStep={1}
      />

      <AuthFormPanel>
        {/* Header */}
        <div className="animate-fade-in-up" style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--color-primary-900)",
              letterSpacing: "-0.02em",
              marginBottom: "0.375rem",
            }}
          >
            Criar sua conta
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)" }}>
            Já tem uma conta?{" "}
            <Link
              href="/auth/login"
              style={{
                color: "var(--color-primary-700)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Entrar →
            </Link>
          </p>
        </div>

        {/* General error */}
        {errors.general && (
          <div
            role="alert"
            className="animate-fade-in"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "var(--color-error)",
              fontSize: "0.8125rem",
              marginBottom: "1rem",
            }}
          >
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
          className="animate-fade-in-up animation-delay-100"
        >
          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <InputField
              label="Nome"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Carlos"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              leadingIcon={<UserIcon />}
            />
            <InputField
              label="Sobrenome"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Silva"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <InputField
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            leadingIcon={<EmailIcon />}
          />

          {/* Password with strength meter */}
          <div>
            <InputField
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Mín. 8 caracteres"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leadingIcon={<LockIcon />}
              trailingAction={
                <button
                  type="button"
                  className="form-input-action"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            <PasswordStrengthMeter password={form.password} />
          </div>

          <InputField
            label="Confirmar senha"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            leadingIcon={<LockIcon />}
            trailingAction={
              <button
                type="button"
                className="form-input-action"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Ocultar confirmação" : "Mostrar confirmação"}
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {/* Terms checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.625rem",
              cursor: "pointer",
              marginTop: "0.125rem",
            }}
          >
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{
                marginTop: "2px",
                accentColor: "var(--color-primary-700)",
                width: "15px",
                height: "15px",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.5 }}>
              Concordo com os{" "}
              <Link
                href="/termos"
                style={{ color: "var(--color-primary-700)", fontWeight: 600, textDecoration: "none" }}
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                href="/privacidade"
                style={{ color: "var(--color-primary-700)", fontWeight: 600, textDecoration: "none" }}
              >
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          <Button type="submit" variant="primary" loading={isLoading} style={{ marginTop: "0.25rem" }}>
            Criar conta gratuitamente
          </Button>
        </form>

        {/* Divider */}
        <div className="auth-divider animate-fade-in-up animation-delay-200">
          <div className="auth-divider__line" />
          <span className="auth-divider__text">ou cadastre-se com</span>
          <div className="auth-divider__line" />
        </div>

        {/* Google register */}
        <div className="animate-fade-in-up animation-delay-300">
          <Button
            type="button"
            variant="secondary"
            leadingIcon={<GoogleIcon />}
            onClick={() => {/* TODO: OAuth Google */}}
          >
            Cadastrar com Google
          </Button>
        </div>
      </AuthFormPanel>
    </>
  );
}
