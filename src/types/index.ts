export interface ThumbnailData {
  id: string;
  title: string;
  category: string;
  categoryColor: "purple" | "orange" | "blue";
  ctr: number;
  keywordLevel: "보통" | "높음" | "매우 높음" | "폭발적";
  keywordPercent: number;
  imageUrl: string;
}

export interface StatsData {
  avgCtr: number;
  ctrChange: number;
  generatedTitles: number;
  usedSparks: number;
  totalSparks: number;
  aiStatus: string;
  aiStatusDetail: string;
}

export interface TrendData {
  id: string;
  keyword: string;
  volume: number;
  change: number;
  category: string;
}

export interface TemplateData {
  id: string;
  pattern: string;
  example: string;
  category: string;
  ctr: number;
  tags: string[];
}

export interface GeneratorResult {
  id: string;
  title: string;
  ctr: number;
  emotion: string;
  keywords: string[];
  isBestPick?: boolean;
}

export interface GeneratorTopic {
  topic: string;
  results: GeneratorResult[];
}

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
