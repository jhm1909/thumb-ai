"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Sparkles, Menu } from "lucide-react";

const tabs = [
  { label: "대시보드", href: "/" },
  { label: "분석", href: "/analytics" },
  { label: "템플릿", href: "/templates" },
];

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 lg:h-20 z-40 bg-[var(--sidebar)]/70 backdrop-blur-xl flex items-center justify-between px-4 lg:px-10">
      <div className="flex items-center gap-4 lg:gap-12">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-[var(--on-surface-variant)] hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo (mobile only) */}
        <span className="lg:hidden text-lg font-heading font-bold text-white tracking-tighter">
          Thumb AI
        </span>

        {/* Search (desktop only) */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] w-5 h-5" />
          <input
            className="bg-[var(--surface-container)] border-none rounded-xl pl-10 pr-4 py-2 w-72 focus:ring-1 focus:ring-primary/40 text-sm placeholder-[var(--on-surface-variant)]/50 text-white outline-none"
            placeholder="템플릿 검색..."
            type="text"
          />
        </div>

        {/* Tabs (desktop only) */}
        <nav className="hidden lg:flex items-center gap-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative py-2 font-medium transition-colors ${
                  isActive ? "text-white" : "text-[var(--on-surface-variant)] hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        {/* Sparks Counter (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 bg-[var(--tertiary-container)]/10 border border-[var(--tertiary)]/20 rounded-xl">
          <Sparkles className="w-4 h-4 text-[var(--tertiary)]" fill="currentColor" />
          <span className="text-[var(--tertiary)] text-xs font-bold">1,240</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer text-[var(--on-surface-variant)] hover:text-white transition-colors">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-[var(--sidebar)]" />
        </div>

        {/* Upgrade (desktop only) */}
        <button className="hidden lg:block bg-[var(--surface-container)] text-white font-bold py-2 px-6 rounded-xl hover:bg-[var(--surface-container-high)] transition-all border border-white/5">
          업그레이드
        </button>
      </div>
    </header>
  );
}
