"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  Zap,
  Library,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "홈", href: "/", icon: Home },
  { label: "프로젝트", href: "/generator", icon: FolderKanban },
  { label: "AI 설정", href: "/analytics", icon: Zap },
  { label: "라이브러리", href: "/templates", icon: Library },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[var(--sidebar)] border-r border-white/5 z-50 flex flex-col p-6 space-y-8 antialiased tracking-tight">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" fill="currentColor" />
        </div>
        <span className="text-xl font-heading font-bold tracking-tighter text-white">
          Thumb AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[var(--surface-container)] text-white font-semibold"
                  : "text-[var(--on-surface-variant)] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--surface-container-high)] flex items-center justify-center text-primary font-bold text-sm">
            AI
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">크리에이티브 모드</span>
            <span className="text-[10px] text-[var(--on-surface-variant)] uppercase tracking-wider">
              프로 아키텍트
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
