import { redirect } from "next/navigation";

/**
 * /auth → redireciona para /auth/login
 * A página antiga auth_page.tsx foi substituída pela estrutura modular.
 */
export default function AuthIndexPage() {
  redirect("/auth/login");
}
