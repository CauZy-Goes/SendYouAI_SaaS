"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  HomeIcon,
  MessageIcon,
  AnalyticsIcon,
  SettingsIcon,
  LogOutIcon,
} from "@/components/ui/DashboardIcons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  /** Name initials for avatar fallback */
  initials?: string;
  userName?: string;
  userEmail?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Início",         href: "/dashboard",                icon: <HomeIcon /> },
  { label: "Conversas",      href: "/dashboard/conversas",       icon: <MessageIcon />, badge: "12" },
  { label: "Analytics",      href: "/dashboard/analytics",       icon: <AnalyticsIcon /> },
  { label: "Configurações",  href: "/dashboard/configuracoes",   icon: <SettingsIcon /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardSidebar({
  initials = "U",
  userName = "Usuário",
  userEmail = "usuario@email.com",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__header">
        <Logo href="/dashboard" height={96} />
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav" aria-label="Navegação principal">
        <span className="sidebar__section-label">Menu</span>

        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "sidebar__nav-item",
                isActive && "sidebar__nav-item--active",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="sidebar__nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="sidebar__badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User info */}
      <div className="sidebar__footer">
        <div className="sidebar__user" role="button" tabIndex={0} aria-label="Opções do usuário">
          <div className="sidebar__avatar" aria-hidden="true">
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar__user-name" title={userName}>
              {userName}
            </div>
            <div
              className="sidebar__user-email"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={userEmail}
            >
              {userEmail}
            </div>
          </div>
          <LogOutIcon size={14} />
        </div>
      </div>
    </aside>
  );
}
