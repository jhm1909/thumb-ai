"use client";

import { TrendingUp, TrendingDown, Flame, BarChart3, Clock } from "lucide-react";
import {
  mockTrends,
  categoryPerformance,
  postingTimeData,
  dayLabels,
} from "@/data/mock-trends";

function TrendChart() {
  const maxVolume = Math.max(...mockTrends.map((t) => t.volume));
  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Flame className="w-5 h-5 text-[var(--tertiary)]" /> 인기 키워드 트렌드</h3>
      <div className="space-y-3">
        {mockTrends.map((trend, i) => (
          <div key={trend.id} className="flex items-center gap-4">
            <span className="text-xs font-bold text-[var(--on-surface-variant)]/60 w-5 text-right">
              {i + 1}
            </span>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">
                  {trend.keyword}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-bold ${
                    trend.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trend.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(trend.change)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
                <div
                  className="h-full primary-gradient rounded-full neon-glow-purple transition-all duration-700"
                  style={{ width: `${(trend.volume / maxVolume) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded bg-[var(--primary-container)]/20">
              {trend.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryPerfChart() {
  const maxCtr = Math.max(...categoryPerformance.map((c) => c.avgCtr));
  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-white flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> 카테고리별 평균 CTR</h3>
      <div className="space-y-4">
        {categoryPerformance.map((cat) => (
          <div key={cat.category} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">{cat.category}</span>
              <span className="text-[var(--on-surface-variant)] font-bold">
                {cat.avgCtr}%
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(cat.avgCtr / maxCtr) * 100}%`,
                  backgroundColor: cat.color,
                  boxShadow: `0 0 10px ${cat.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeHeatmap() {
  const maxVal = Math.max(...postingTimeData.flat());
  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> 최적 포스팅 시간</h3>
      <p className="text-xs text-[var(--on-surface-variant)]">
        색이 진할수록 높은 참여율을 나타냅니다
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex ml-8 mb-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="flex-1 text-center text-[8px] text-[var(--on-surface-variant)]/60"
              >
                {i % 3 === 0 ? `${i}` : ""}
              </div>
            ))}
          </div>
          {/* Grid */}
          {postingTimeData.map((row, dayIdx) => (
            <div key={dayIdx} className="flex items-center gap-1 mb-1">
              <span className="text-[10px] font-bold text-[var(--on-surface-variant)] w-6 text-right">
                {dayLabels[dayIdx]}
              </span>
              <div className="flex flex-1 gap-0.5">
                {row.map((val, hourIdx) => {
                  const intensity = val / maxVal;
                  return (
                    <div
                      key={hourIdx}
                      className="flex-1 aspect-square rounded-sm transition-colors cursor-pointer hover:ring-1 hover:ring-white/30"
                      style={{
                        backgroundColor: `rgba(207, 189, 255, ${intensity * 0.9 + 0.05})`,
                      }}
                      title={`${dayLabels[dayIdx]} ${hourIdx}시: ${val}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animations";

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
          트렌드 분석
        </h1>
        <p className="text-[var(--on-surface-variant)] font-light mb-10 text-sm lg:text-base">
          실시간 트렌드와 카테고리별 성과를 분석합니다.
        </p>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StaggerItem>
            <TrendChart />
          </StaggerItem>
          <StaggerItem>
            <CategoryPerfChart />
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="mt-8" staggerDelay={0.2}>
          <StaggerItem>
            <TimeHeatmap />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
