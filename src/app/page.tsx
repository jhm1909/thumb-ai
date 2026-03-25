import { ThumbnailCard } from "@/components/dashboard/thumbnail-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { AIChip } from "@/components/dashboard/ai-chip";
import { mockThumbnails } from "@/data/mock-thumbnails";
import { mockStats } from "@/data/mock-stats";

export default function DashboardPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
              최근 생성된 카피라이팅
            </h1>
            <p className="text-[var(--on-surface-variant)] font-light">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockThumbnails.map((thumb) => (
            <ThumbnailCard key={thumb.id} data={thumb} />
          ))}
        </div>
      </section>

      {/* Performance Insights */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-bold text-[var(--on-surface)] mb-8">
          주간 성과 인사이트
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            label="평균 노출 클릭률"
            value={`${mockStats.avgCtr}%`}
            trend={{
              value: `지난주 대비 ${mockStats.ctrChange}% 상승`,
              positive: true,
            }}
          />
          <StatCard
            label="생성된 타이틀"
            value={String(mockStats.generatedTitles)}
            detail="Total this month"
          />
          <StatCard
            label="사용된 Sparks"
            value={mockStats.usedSparks.toLocaleString()}
            progress={{
              value: mockStats.usedSparks,
              total: mockStats.totalSparks,
            }}
          />
          <StatCard
            label="AI 최적화 상태"
            value={mockStats.aiStatus}
            detail={mockStats.aiStatusDetail}
            accent
          />
        </div>
      </section>

      {/* AI Chip */}
      <AIChip />
    </>
  );
}
