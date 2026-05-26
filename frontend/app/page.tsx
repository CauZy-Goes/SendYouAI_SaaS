"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "cadastro">("login");

  return (
    <main className="min-h-screen bg-[#E6F1FB] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden shadow-xl border border-[#B5D4F4]">
        {/* Painel lateral azul */}
        <div className="hidden md:flex w-[42%] bg-[#185FA5] flex-col justify-between p-12 relative overflow-hidden">
          {/* Círculos decorativos */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#378ADD] opacity-30" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#0C447C] opacity-50" />

          {/* Logo */}
          <span className="relative z-10 font-bold text-xl text-white tracking-tight">
            Send<span className="text-[#85B7EB]">You</span>AI
          </span>

          {/* Copy */}
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white leading-snug mb-3">
              Sua IA, do seu jeito.
            </h2>
            <p className="text-sm text-[#B5D4F4] leading-relaxed">
              Integre inteligência artificial ao seu fluxo de trabalho com
              segurança e velocidade.
            </p>
          </div>

          {/* Dots */}
          <div className="relative z-10 flex gap-2 items-center">
            <div className="w-5 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-[#378ADD]" />
            <div className="w-2 h-2 rounded-full bg-[#378ADD]" />
          </div>
        </div>

        {/* Formulário */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          {/* Tabs */}
          <div className="flex border-b border-[#E6F1FB] mb-8">
            <button
              onClick={() => setTab("login")}
              className={`pb-3 mr-6 text-sm font-medium relative transition-colors ${
                tab === "login" ? "text-[#185FA5]" : "text-[#888780]"
              }`}
            >
              Entrar
              {tab === "login" && (
                <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[#185FA5] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setTab("cadastro")}
              className={`pb-3 text-sm font-medium relative transition-colors ${
                tab === "cadastro" ? "text-[#185FA5]" : "text-[#888780]"
              }`}
            >
              Criar conta
              {tab === "cadastro" && (
                <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[#185FA5] rounded-full" />
              )}
            </button>
          </div>

          {/* Login */}
          {tab === "login" && (
            <div>
              <h1 className="text-xl font-semibold text-[#042C53] mb-1">
                Bem-vindo de volta
              </h1>
              <p className="text-xs text-[#888780] mb-7">
                Acesse sua conta para continuar
              </p>

              <div className="mb-4">
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>

              <div className="mb-2">
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>

              <div className="text-right mb-5">
                <a href="#" className="text-xs text-[#378ADD] hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              <button className="w-full h-11 bg-[#185FA5] hover:bg-[#0C447C] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition">
                Entrar
              </button>

              <div className="flex items-center gap-3 my-5 text-xs text-[#B4B2A9]">
                <div className="flex-1 h-px bg-[#E6F1FB]" />
                ou continue com
                <div className="flex-1 h-px bg-[#E6F1FB]" />
              </div>

              <button className="w-full h-11 border border-[#B5D4F4] rounded-xl text-sm font-medium text-[#185FA5] hover:bg-[#E6F1FB] transition flex items-center justify-center gap-2">
                <GoogleIcon />
                Entrar com Google
              </button>

              <p className="text-center text-xs text-[#888780] mt-5">
                Não tem conta?{" "}
                <button
                  onClick={() => setTab("cadastro")}
                  className="text-[#185FA5] font-medium hover:underline"
                >
                  Criar agora
                </button>
              </p>
            </div>
          )}

          {/* Cadastro */}
          {tab === "cadastro" && (
            <div>
              <h1 className="text-xl font-semibold text-[#042C53] mb-1">
                Criar sua conta
              </h1>
              <p className="text-xs text-[#888780] mb-7">
                Rápido e gratuito para começar
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Carlos"
                    className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    placeholder="Silva"
                    className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="mín. 8 caracteres"
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>

              <button className="w-full h-11 bg-[#185FA5] hover:bg-[#0C447C] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition">
                Criar conta
              </button>

              <div className="flex items-center gap-3 my-5 text-xs text-[#B4B2A9]">
                <div className="flex-1 h-px bg-[#E6F1FB]" />
                ou continue com
                <div className="flex-1 h-px bg-[#E6F1FB]" />
              </div>

              <button className="w-full h-11 border border-[#B5D4F4] rounded-xl text-sm font-medium text-[#185FA5] hover:bg-[#E6F1FB] transition flex items-center justify-center gap-2">
                <GoogleIcon />
                Cadastrar com Google
              </button>

              <p className="text-center text-xs text-[#888780] mt-5">
                Já tem conta?{" "}
                <button
                  onClick={() => setTab("login")}
                  className="text-[#185FA5] font-medium hover:underline"
                >
                  Entrar
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
