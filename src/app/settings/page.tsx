"use client";

import { useState, useEffect } from "react";
import { Save, Trash2, Key, Languages, MessageSquare, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getSettings, saveSettings, clearHistory, type AppSettings } from "@/lib/history";
import { PageTransition } from "@/components/motion/animations";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    apiKey: "",
    tone: "clickbait",
    language: "ko",
  });
  const [showKey, setShowKey] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    setMounted(true);
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    toast.success("설정이 저장되었습니다.");
  };

  const handleClearHistory = () => {
    clearHistory();
    toast.success("생성 기록이 모두 삭제되었습니다.");
  };

  const toneOptions = [
    { value: "formal", label: "정중한", desc: "전문적이고 신뢰감 있는 톤" },
    { value: "casual", label: "캐주얼", desc: "친근하고 편안한 대화체" },
    { value: "clickbait", label: "클릭베이트", desc: "호기심과 클릭을 유도하는 자극적 톤" },
  ] as const;

  if (!mounted) return null;

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--on-surface)] mb-2 italic">
          설정
        </h1>
        <p className="text-[var(--on-surface-variant)] font-light mb-10 text-sm lg:text-base">
          AI 엔진과 앱 환경을 설정합니다.
        </p>

        <div className="space-y-6">
          {/* API Key */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Gemini API 키
            </h2>
            <p className="text-xs text-[var(--on-surface-variant)]">
              Google AI Studio에서 발급받은 API 키를 입력하세요. 키가 없으면 모의 데이터가 사용됩니다.
            </p>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={settings.apiKey}
                onChange={(e) =>
                  setSettings({ ...settings, apiKey: e.target.value })
                }
                placeholder="AIza..."
                className="w-full bg-[var(--surface-container)] rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-[var(--on-surface-variant)]/40 outline-none focus:ring-2 focus:ring-primary/40 border-none transition-shadow font-mono"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] hover:text-white transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Tone */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              AI 톤 설정
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {toneOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setSettings({ ...settings, tone: opt.value })
                  }
                  className={`p-4 rounded-xl text-left transition-all duration-200 ${
                    settings.tone === opt.value
                      ? "bg-primary/20 border border-primary/30 text-white"
                      : "bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:text-white"
                  }`}
                >
                  <span className="text-sm font-bold block mb-1">
                    {opt.label}
                  </span>
                  <span className="text-[10px] opacity-70">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              타이틀 생성 언어
            </h2>
            <div className="flex gap-3">
              {[
                { value: "ko" as const, label: "한국어" },
                { value: "en" as const, label: "English" },
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() =>
                    setSettings({ ...settings, language: lang.value })
                  }
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                    settings.language === lang.value
                      ? "bg-primary text-[var(--primary-foreground)]"
                      : "bg-[var(--surface-container)] text-[var(--on-surface-variant)] hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 primary-gradient text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Save className="w-5 h-5" />
              설정 저장
            </button>
            <button
              onClick={handleClearHistory}
              className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              기록 삭제
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
