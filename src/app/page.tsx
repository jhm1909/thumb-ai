"use client";

import { ThumbnailCard } from "@/components/dashboard/thumbnail-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { AIChip } from "@/components/dashboard/ai-chip";
import { mockThumbnails } from "@/data/mock-thumbnails";
import { mockStats } from "@/data/mock-stats";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animations";

export default function DashboardPage() {
  return (
    <PageTransition>
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
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-[var(--surface-container-high)] text-sm font-medium hover:bg-[var(--surface-bright)] transition-colors">
              전체보기
            </button>
            <button className="px-4 py-2 rounded-xl bg-[var(--surface-container-high)] text-sm font-medium hover:bg-[var(--surface-bright)] transition-colors">
              필터
            </button>
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
