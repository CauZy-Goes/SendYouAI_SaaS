import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../dashboard.css";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: "%s | SendYouAI",
    default: "Dashboard | SendYouAI",
  },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      {/* Sidebar — user data would come from session/context in production */}
      <DashboardSidebar
        initials="CS"
        userName="Carlos Silva"
        userEmail="carlos@sendyouai.com"
      />

      {/* Main content area */}
      <div className="dashboard-main">{children}</div>
    </div>
  );
}
