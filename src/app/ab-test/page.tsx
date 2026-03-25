"use client";

import { useState } from "react";
import { GitCompareArrows, Crown, ArrowRight, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { mockComparisons, type ABComparison } from "@/data/mock-ab";
import { getSettings } from "@/lib/history";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/motion/animations";

function MetricBar({
  label,
  scoreA,
  scoreB,
}: {
  label: string;
  scoreA: number;
  scoreB: number;
}) {
  const aWins = scoreA > scoreB;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold text-[var(--on-surface-variant)]/80">
        <span>{label}</span>
        <span>
          <span className={aWins ? "text-primary" : ""}>{scoreA}</span>
          {" vs "}
          <span className={!aWins ? "text-[var(--tertiary)]" : ""}>{scoreB}</span>
        </span>
      </div>
      <div className="flex gap-1 h-1.5">
        <div className="flex-1 bg-[var(--surface-container-low)] rounded-full overflow-hidden">
          <div
            className="h-full primary-gradient rounded-full transition-all duration-700"
            style={{ width: `${scoreA}%` }}
          />
        </div>
        <div className="flex-1 bg-[var(--surface-container-low)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--tertiary)] rounded-full transition-all duration-700"
            style={{ width: `${scoreB}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ComparisonCard({ data }: { data: ABComparison }) {
  return (
    <div className="glass-panel rounded-2xl p-6 space-y-6">
      {/* Title Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title A */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            data.winner === "A"
              ? "border-primary/30 bg-primary/5"
              : "border-white/5 bg-[var(--surface-container)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary">A</span>
            {data.winner === "A" && (
              <Crown className="w-3.5 h-3.5 text-primary" />
            )}
          </div>
          <p className="text-sm font-bold text-white leading-snug">{data.titleA}</p>
          <span className="text-lg font-extrabold text-primary mt-2 block">
            {data.scoreA}% CTR
          </span>
        </div>

        {/* Title B */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            data.winner === "B"
              ? "border-[var(--tertiary)]/30 bg-[var(--tertiary)]/5"
              : "border-white/5 bg-[var(--surface-container)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[var(--tertiary)]">B</span>
            {data.winner === "B" && (
              <Crown className="w-3.5 h-3.5 text-[var(--tertiary)]" />
            )}
          </div>
          <p className="text-sm font-bold text-white leading-snug">{data.titleB}</p>
          <span className="text-lg font-extrabold text-[var(--tertiary)] mt-2 block">
            {data.scoreB}% CTR
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
          상세 비교
        </h4>
        {data.metrics.map((m) => (
          <MetricBar key={m.label} label={m.label} scoreA={m.scoreA} scoreB={m.scoreB} />
        ))}
      </div>

      {/* AI Reasoning */}
      <div className="p-4 rounded-xl bg-[var(--surface-container)] border border-white/5">
        <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">
          <span className="font-bold text-primary">AI 분석:</span> {data.reasoning}
        </p>
      </div>
    </div>
  );
}

export default function ABTestPage() {
  const [titleA, setTitleA] = useState("");
  const [titleB, setTitleB] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [result, setResult] = useState<ABComparison | null>(null);
  const [isAI, setIsAI] = useState(false);

  const handleCompare = async () => {
    if (!titleA.trim() || !titleB.trim()) {
      toast.error("두 타이틀을 모두 입력해주세요.");
      return;
    }

    setIsComparing(true);
    setResult(null);
    setIsAI(false);

    const settings = getSettings();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: titleA,
          description: titleB,
          apiKey: settings.apiKey,
          mode: "compare",
        }),
      });

      const data = await res.json();

      if (data.fallback || data.error === "API_KEY_MISSING" || data.comparison === undefined) {
        // Fallback to mock
        const mock = mockComparisons[Math.floor(Math.random() * mockComparisons.length)];
        setResult({
          ...mock,
          titleA,
          titleB,
          id: `ab-${Date.now()}`,
        });
        toast("모의 데이터로 비교되었습니다.", {
          description: "실제 AI 비교는 설정에서 API 키를 입력하세요.",
        });
      } else {
        setResult(data.comparison);
        setIsAI(true);
        toast.success("AI가 타이틀을 비교했습니다.");
      }
    } catch {
      const mock = mockComparisons[0];
      setResult({ ...mock, titleA, titleB, id: `ab-${Date.now()}` });
      toast.error("네트워크 오류. 모의 데이터를 사용합니다.");
    }

    setIsComparing(false);
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
          A/B 테스트
        </h1>
        <p className="text-[var(--on-surface-variant)] font-light mb-10 text-sm lg:text-base">
          두 타이틀을 비교하여 더 높은 클릭률을 가진 타이틀을 찾으세요.
        </p>

        {/* Input Section */}
        <div className="glass-panel rounded-2xl p-6 space-y-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest">
                타이틀 A
              </label>
              <input
                value={titleA}
                onChange={(e) => setTitleA(e.target.value)}
                type="text"
                placeholder="첫 번째 타이틀을 입력하세요..."
                className="w-full bg-[var(--surface-container)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--on-surface-variant)]/40 outline-none focus:ring-2 focus:ring-primary/40 border-none transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--tertiary)] uppercase tracking-widest">
                타이틀 B
              </label>
              <input
                value={titleB}
                onChange={(e) => setTitleB(e.target.value)}
                type="text"
                placeholder="두 번째 타이틀을 입력하세요..."
                className="w-full bg-[var(--surface-container)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--on-surface-variant)]/40 outline-none focus:ring-2 focus:ring-primary/40 border-none transition-shadow"
              />
            </div>
          </div>

          <button
            onClick={handleCompare}
            disabled={isComparing || !titleA.trim() || !titleB.trim()}
            className="w-full primary-gradient text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GitCompareArrows className="w-5 h-5" />
            {isComparing ? "AI가 비교 분석 중..." : "AI로 비교하기"}
          </button>
        </div>

        {/* Loading */}
        {isComparing && (
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center gap-4 mb-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[var(--on-surface-variant)]">
              AI가 두 타이틀을 분석하고 있습니다...
            </p>
          </div>
        )}

        {/* Result */}
        {result && !isComparing && (
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-bold text-white">비교 결과</h2>
                {isAI && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                    <Zap className="w-3 h-3" /> Gemini AI
                  </span>
                )}
              </div>
              <ComparisonCard data={result} />
            </StaggerItem>
          </StaggerContainer>
        )}

        {/* Empty state */}
        {!result && !isComparing && (
          <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center">
            <GitCompareArrows className="w-12 h-12 text-[var(--outline-variant)]" />
            <p className="text-[var(--on-surface-variant)]">
              두 타이틀을 입력하고 비교하기를 클릭하세요
            </p>
          </div>
        )}

        {/* Example comparisons */}
        {!result && !isComparing && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              예시 비교
            </h2>
            <StaggerContainer className="space-y-6">
              {mockComparisons.map((comp) => (
                <StaggerItem key={comp.id}>
                  <ComparisonCard data={comp} />
                  <button
                    onClick={() => {
                      setTitleA(comp.titleA);
                      setTitleB(comp.titleB);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-3 flex items-center gap-2 text-xs text-primary font-medium hover:underline"
                  >
                    이 타이틀로 비교해보기 <ArrowRight className="w-3 h-3" />
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
