"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Copy, Check, Crown, Tag, Lightbulb } from "lucide-react";
import { getResultsForTopic } from "@/data/mock-generator";
import type { GeneratorResult } from "@/types";

function TypingText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
}

function ResultCard({
  result,
  index,
  show,
}: {
  result: GeneratorResult;
  index: number;
  show: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(result.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result.title]);

  if (!show) return null;

  return (
    <div
      className="glass-panel rounded-2xl p-5 space-y-4 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--on-surface-variant)]/60">
              #{index + 1}
            </span>
            {result.isBestPick && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary-container)]/30 text-primary text-[10px] font-bold">
                <Crown className="w-3 h-3" /> Best Pick
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            <TypingText text={result.title} speed={25} />
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-[var(--surface-container-high)] transition-colors text-[var(--on-surface-variant)]"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* CTR Score */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold tracking-wider text-[var(--on-surface-variant)]/80">
          <span>예상 CTR</span>
          <span className="text-primary">{result.ctr}%</span>
        </div>
        <div className="h-1.5 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
          <div
            className="h-full primary-gradient rounded-full neon-glow-purple transition-all duration-1000"
            style={{ width: `${Math.min(result.ctr * 8, 100)}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-1 rounded-lg bg-[var(--tertiary-container)]/20 text-[var(--tertiary)] text-[10px] font-bold">
          {result.emotion}
        </span>
        {result.keywords.map((kw) => (
          <span
            key={kw}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] text-[10px]"
          >
            <Tag className="w-2.5 h-2.5" />
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GeneratorResult[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setResults([]);
    setVisibleCount(0);

    // Simulate AI generation delay
    setTimeout(() => {
      const topicData = getResultsForTopic(topic);
      setResults(topicData.results);
      setIsGenerating(false);

      // Stagger result reveals
      topicData.results.forEach((_, i) => {
        setTimeout(() => setVisibleCount((v) => v + 1), (i + 1) * 500);
      });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
        AI 타이틀 생성기
      </h1>
      <p className="text-[var(--on-surface-variant)] font-light mb-10">
        주제를 입력하면 AI가 높은 클릭률의 타이틀 후보를 생성합니다.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
                주제 / 키워드
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                placeholder="예: AI 자동화, 여행 브이로그..."
                className="w-full bg-[var(--surface-container)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--on-surface-variant)]/40 outline-none focus:ring-2 focus:ring-primary/40 border-none transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
                추가 설명 (선택)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="타이틀에 포함할 키워드나 톤을 알려주세요..."
                rows={3}
                className="w-full bg-[var(--surface-container)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--on-surface-variant)]/40 outline-none focus:ring-2 focus:ring-primary/40 border-none resize-none transition-shadow"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full primary-gradient text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? "AI가 분석 중..." : "AI로 생성하기"}
            </button>
          </div>

          {/* Tips */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2"><Lightbulb className="w-4 h-4" /> 팁</h3>
            <ul className="text-xs text-[var(--on-surface-variant)] space-y-2 leading-relaxed">
              <li>• 구체적인 키워드일수록 CTR이 높은 타이틀이 생성됩니다</li>
              <li>• 숫자를 포함하면 클릭률이 평균 36% 높아집니다</li>
              <li>• 감정을 자극하는 단어가 CTR을 크게 향상시킵니다</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 space-y-4">
          {isGenerating && (
            <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[var(--on-surface-variant)]">
                AI가 최적의 타이틀을 분석하고 있습니다...
              </p>
            </div>
          )}

          {results.length > 0 && !isGenerating && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                생성된 타이틀 ({results.length}개)
              </h2>
              {results.map((result, i) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  index={i}
                  show={i < visibleCount}
                />
              ))}
            </div>
          )}

          {results.length === 0 && !isGenerating && (
            <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
              <Sparkles className="w-12 h-12 text-[var(--outline-variant)]" />
              <p className="text-[var(--on-surface-variant)]">
                주제를 입력하고 AI로 생성하기를 클릭하세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
