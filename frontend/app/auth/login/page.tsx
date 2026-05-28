"use client";

import { useState, useCallback, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthSidePanel from "@/components/auth/AuthSidePanel";
import AuthFormPanel from "@/components/auth/AuthFormPanel";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from "@/components/ui/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateLoginForm(values: LoginFormState): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "E-mail é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!values.password) {
    errors.password = "Senha é obrigatória.";
  } else if (values.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  return errors;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      // Clear field error on change
      if (errors[name as keyof LoginFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validateLoginForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        // TODO: integrate with API — POST /auth/login
        await new Promise((resolve) => setTimeout(resolve, 1200));
        router.push("/dashboard");
      } catch {
        setErrors({ general: "E-mail ou senha incorretos. Tente novamente." });
      } finally {
        setIsLoading(false);
      }
    },
    [form, router]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <AuthSidePanel
        title="Bem-vindo de volta!"
        description="Acesse sua conta e continue automatizando suas mensagens com inteligência artificial."
        activeStep={0}
      />

      <AuthFormPanel>
        {/* Header */}
        <div className="animate-fade-in-up" style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--color-primary-900)",
              letterSpacing: "-0.02em",
              marginBottom: "0.375rem",
            }}
          >
            Entrar na conta
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)" }}>
            Não tem conta?{" "}
            <Link
              href="/auth/cadastro"
              style={{
                color: "var(--color-primary-700)",
                fontWeight: 600,
                textDecoration: "none",
              }}
              className="hover-underline"
            >
              Criar gratuitamente →
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
              marginBottom: "1.25rem",
            }}
          >
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="animate-fade-in-up animation-delay-100"
        >
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <InputField
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Sua senha"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leadingIcon={<LockIcon />}
              trailingAction={
                <button
                  type="button"
                  className="form-input-action"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
              <Link
                href="/auth/recuperar-senha"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-primary-700)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <Button type="submit" variant="primary" loading={isLoading} style={{ marginTop: "0.5rem" }}>
            Entrar
          </Button>
        </form>

        {/* Divider */}
        <div className="auth-divider animate-fade-in-up animation-delay-200">
          <div className="auth-divider__line" />
          <span className="auth-divider__text">ou continue com</span>
          <div className="auth-divider__line" />
        </div>

        {/* Google sign-in */}
        <div className="animate-fade-in-up animation-delay-300">
          <Button
            type="button"
            variant="secondary"
            leadingIcon={<GoogleIcon />}
            onClick={() => {/* TODO: OAuth Google */}}
          >
            Entrar com Google
          </Button>
        </div>
      </AuthFormPanel>
    </>
  );
}
