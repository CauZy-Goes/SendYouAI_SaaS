"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // lógica de cadastro aqui
    console.log(form);
  }

  return (
    <main className="min-h-screen bg-[#E6F1FB] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden shadow-xl border border-[#B5D4F4]">
        {/* Painel lateral azul */}
        <div className="hidden md:flex w-[42%] bg-[#185FA5] flex-col justify-between p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#378ADD] opacity-30" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#0C447C] opacity-50" />

          <span className="relative z-10 font-bold text-xl text-white tracking-tight">
            Send<span className="text-[#85B7EB]">You</span>AI
          </span>

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white leading-snug mb-3">
              Comece agora, é grátis.
            </h2>
            <p className="text-sm text-[#B5D4F4] leading-relaxed">
              Crie sua conta em segundos e tenha acesso a toda a inteligência da
              plataforma.
            </p>
          </div>

          <div className="relative z-10 flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#378ADD]" />
            <div className="w-5 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-[#378ADD]" />
          </div>
        </div>

        {/* Formulário */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          <h1 className="text-xl font-semibold text-[#042C53] mb-1">
            Criar sua conta
          </h1>
          <p className="text-xs text-[#888780] mb-7">
            Preencha os dados abaixo para começar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  Nome
                </label>
                <input
                  name="nome"
                  type="text"
                  placeholder="Carlos"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                  Sobrenome
                </label>
                <input
                  name="sobrenome"
                  type="text"
                  placeholder="Silva"
                  value={form.sobrenome}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                Senha
              </label>
              <input
                name="senha"
                type="password"
                placeholder="mín. 8 caracteres"
                value={form.senha}
                onChange={handleChange}
                className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-1.5">
                Confirmar senha
              </label>
              <input
                name="confirmarSenha"
                type="password"
                placeholder="repita a senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                className="w-full h-11 border border-[#B5D4F4] rounded-xl px-4 text-sm text-[#042C53] bg-[#F8FCFF] outline-none focus:border-[#378ADD] focus:bg-white transition placeholder-[#B4B2A9]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#185FA5] hover:bg-[#0C447C] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition mt-2"
            >
              Criar conta
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 text-xs text-[#B4B2A9]">
            <div className="flex-1 h-px bg-[#E6F1FB]" />
            ou continue com
            <div className="flex-1 h-px bg-[#E6F1FB]" />
          </div>

          <button className="w-full h-11 border border-[#B5D4F4] rounded-xl text-sm font-medium text-[#185FA5] hover:bg-[#E6F1FB] transition flex items-center justify-center gap-2">
            <GoogleIcon />
            Cadastrar com Google
          </button>

          <p className="text-center text-xs text-[#888780] mt-6">
            Já tem conta?{" "}
            <button
              onClick={() => router.push("/auth")}
              className="text-[#185FA5] font-medium hover:underline"
            >
              Entrar
            </button>
          </p>
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
