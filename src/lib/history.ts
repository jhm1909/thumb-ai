import type { GeneratorResult } from "@/types";

export interface HistoryEntry {
  id: string;
  topic: string;
  results: GeneratorResult[];
  timestamp: number;
}

const HISTORY_KEY = "thumb-ai-history";
const MAX_ENTRIES = 20;

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(
  topic: string,
  results: GeneratorResult[]
): HistoryEntry {
  const entry: HistoryEntry = {
    id: `hist-${Date.now()}`,
    topic,
    results,
    timestamp: Date.now(),
  };

  const history = getHistory();
  history.unshift(entry);

  // Keep only the most recent entries
  const trimmed = history.slice(0, MAX_ENTRIES);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));

  return entry;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Settings
const SETTINGS_KEY = "thumb-ai-settings";

export interface AppSettings {
  apiKey: string;
  tone: "formal" | "casual" | "clickbait";
  language: "ko" | "en";
}

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: "",
  tone: "clickbait",
  language: "ko",
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}
