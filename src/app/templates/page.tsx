"use client";

import { useState } from "react";
import { Crown, Tag, ArrowRight } from "lucide-react";
import { mockTemplates, templateCategories } from "@/data/mock-templates";
import Link from "next/link";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animations";

function TemplateCard({
  template,
}: {
  template: (typeof mockTemplates)[0];
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4 group hover:border hover:border-primary/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <span className="px-2 py-1 rounded-lg bg-[var(--primary-container)]/20 text-primary text-[10px] font-bold">
          {template.category}
        </span>
        <div className="flex items-center gap-1 text-xs font-bold text-primary">
          <Crown className="w-3 h-3" />
          {template.ctr}% CTR
        </div>
      </div>

      {/* Pattern */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-white leading-snug font-mono">
          {template.pattern}
        </h3>
        <p className="text-xs text-[var(--on-surface-variant)] italic">
          예시: {template.example}
        </p>
      </div>

      {/* CTR Bar */}
      <div className="space-y-1">
        <div className="h-1 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
          <div
            className="h-full primary-gradient rounded-full neon-glow-purple"
            style={{ width: `${Math.min(template.ctr * 8, 100)}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] text-[10px]"
          >
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </span>
        ))}
      </div>

      {/* Apply Button */}
      <Link
        href="/generator"
        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[var(--surface-container-high)] text-sm font-medium text-white hover:bg-[var(--surface-bright)] transition-colors opacity-0 group-hover:opacity-100"
      >
        AI 생성기에 적용 <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? mockTemplates
      : mockTemplates.filter((t) => t.category === activeCategory);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
          템플릿 라이브러리
        </h1>
        <p className="text-[var(--on-surface-variant)] font-light mb-10 text-sm lg:text-base">
          검증된 고성과 타이틀 패턴을 활용하세요.
        </p>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {templateCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-[var(--primary-foreground)]"
                  : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <StaggerItem key={template.id}>
              <TemplateCard template={template} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
