"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Sparkles } from "lucide-react";

const tabs = [
  { label: "대시보드", href: "/" },
  { label: "분석", href: "/analytics" },
  { label: "템플릿", href: "/templates" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 z-40 bg-[var(--sidebar)]/70 backdrop-blur-xl flex items-center justify-between px-10">
      <div className="flex items-center gap-12">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] w-5 h-5" />
          <input
            className="bg-[var(--surface-container)] border-none rounded-xl pl-10 pr-4 py-2 w-72 focus:ring-1 focus:ring-primary/40 text-sm placeholder-[var(--on-surface-variant)]/50 text-white outline-none"
            placeholder="템플릿 검색..."
            type="text"
          />
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-8">
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

      <div className="flex items-center gap-6">
        {/* Sparks Counter */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--tertiary-container)]/10 border border-[var(--tertiary)]/20 rounded-xl">
          <Sparkles className="w-4 h-4 text-[var(--tertiary)]" fill="currentColor" />
          <span className="text-[var(--tertiary)] text-xs font-bold">1,240 Sparks</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer text-[var(--on-surface-variant)] hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-[var(--sidebar)]" />
        </div>

        {/* Upgrade */}
        <button className="bg-[var(--surface-container)] text-white font-bold py-2 px-6 rounded-xl hover:bg-[var(--surface-container-high)] transition-all border border-white/5">
          업그레이드
        </button>
      </div>
    </header>
  );
}
