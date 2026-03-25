"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThumbnailCard } from "@/components/dashboard/thumbnail-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { AIChip } from "@/components/dashboard/ai-chip";
import { mockThumbnails } from "@/data/mock-thumbnails";
import { mockStats } from "@/data/mock-stats";
import { getHistory, type HistoryEntry } from "@/lib/history";
import { Clock, Sparkles, ArrowRight, GitCompareArrows } from "lucide-react";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animations";

function SkeletonCard() {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="h-4 bg-[var(--surface-container-high)] rounded-lg w-2/3" />
      <div className="h-3 bg-[var(--surface-container-high)] rounded-lg w-1/2" />
      <div className="h-2 bg-[var(--surface-container-high)] rounded-full w-full" />
      <div className="flex gap-2">
        <div className="h-5 bg-[var(--surface-container-high)] rounded-lg w-16" />
        <div className="h-5 bg-[var(--surface-container-high)] rounded-lg w-12" />
      </div>
    </div>
  );
}

function HistoryCard({ entry }: { entry: HistoryEntry }) {
  const date = new Date(entry.timestamp);
  const timeAgo = getTimeAgo(date);
  const bestTitle = entry.results.find((r) => r.isBestPick) || entry.results[0];

  return (
    <div className="glass-panel rounded-2xl p-5 space-y-3 hover:border-primary/20 transition-colors">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          {entry.topic}
        </span>
        <span className="text-[10px] text-[var(--on-surface-variant)]/50 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeAgo}
        </span>
      </div>
      {bestTitle && (
        <p className="text-sm font-bold text-white leading-snug">
          {bestTitle.title}
        </p>
      )}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[var(--on-surface-variant)]">
          {entry.results.length}개 생성됨
        </span>
        {bestTitle && (
          <span className="text-[10px] text-primary font-bold">
            Best CTR: {bestTitle.ctr}%
          </span>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history on client only — use requestAnimationFrame to avoid sync setState lint
  useEffect(() => {
    const data = getHistory();
    requestAnimationFrame(() => {
      setHistory(data);
      setMounted(true);
    });
  }, []);

  return (
    <PageTransition>
      {/* Quick Actions */}
      <section className="mb-10">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StaggerItem>
            <button
              onClick={() => router.push("/generator")}
              className="w-full glass-panel rounded-2xl p-5 text-left hover:border-primary/20 transition-all group"
            >
              <Sparkles className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-1">AI 타이틀 생성</h3>
              <p className="text-[10px] text-[var(--on-surface-variant)]">
                키워드로 고클릭 타이틀 생성
              </p>
            </button>
          </StaggerItem>
          <StaggerItem>
            <button
              onClick={() => router.push("/ab-test")}
              className="w-full glass-panel rounded-2xl p-5 text-left hover:border-primary/20 transition-all group"
            >
              <GitCompareArrows className="w-6 h-6 text-[var(--tertiary)] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-1">A/B 테스트</h3>
              <p className="text-[10px] text-[var(--on-surface-variant)]">
                두 타이틀 비교 분석
              </p>
            </button>
          </StaggerItem>
          <StaggerItem>
            <button
              onClick={() => router.push("/templates")}
              className="w-full glass-panel rounded-2xl p-5 text-left hover:border-primary/20 transition-all group"
            >
              <ArrowRight className="w-6 h-6 text-[var(--secondary)] mb-3 group-hover:translate-x-1 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-1">템플릿 라이브러리</h3>
              <p className="text-[10px] text-[var(--on-surface-variant)]">
                검증된 타이틀 패턴
              </p>
            </button>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Recent History */}
      {mounted && history.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-[var(--on-surface)] mb-6">
            최근 생성 기록
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice(0, 6).map((entry) => (
              <StaggerItem key={entry.id}>
                <HistoryCard entry={entry} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Loading skeleton before mount */}
      {!mounted && (
        <section className="mb-12">
          <div className="h-6 bg-[var(--surface-container-high)] rounded-lg w-40 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
              최근 생성된 카피라이팅
            </h1>
            <p className="text-[var(--on-surface-variant)] font-light text-sm lg:text-base">
              AI가 분석한 고성과 콘텐츠 프리뷰입니다.
            </p>
          </div>
        </div>

        {/* Bento Grid - Staggered */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockThumbnails.map((thumb) => (
            <StaggerItem key={thumb.id}>
              <ThumbnailCard data={thumb} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Performance Insights */}
      <section className="mt-12 lg:mt-20">
        <h2 className="font-heading text-2xl font-bold text-[var(--on-surface)] mb-8">
          주간 성과 인사이트
        </h2>
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
          staggerDelay={0.1}
        >
          <StaggerItem>
            <StatCard
              label="평균 노출 클릭률"
              value={`${mockStats.avgCtr}%`}
              trend={{
                value: `지난주 대비 ${mockStats.ctrChange}% 상승`,
                positive: true,
              }}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="생성된 타이틀"
              value={String(mockStats.generatedTitles)}
              detail="Total this month"
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="사용된 Sparks"
              value={mockStats.usedSparks.toLocaleString()}
              progress={{
                value: mockStats.usedSparks,
                total: mockStats.totalSparks,
              }}
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              label="AI 최적화 상태"
              value={mockStats.aiStatus}
              detail={mockStats.aiStatusDetail}
              accent
            />
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* AI Chip */}
      <AIChip />
    </PageTransition>
  );
}
