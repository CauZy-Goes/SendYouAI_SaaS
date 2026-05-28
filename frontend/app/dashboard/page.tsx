import { redirect } from "next/navigation";

/** /dashboard → redireciona para /dashboard/configuracoes por enquanto */
export default function DashboardPage() {
  redirect("/dashboard/configuracoes");
}
