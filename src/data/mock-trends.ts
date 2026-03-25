import type { TrendData } from "@/types";

export const mockTrends: TrendData[] = [
  { id: "1", keyword: "AI 자동화", volume: 95, change: 23.5, category: "TECH" },
  { id: "2", keyword: "부업 추천", volume: 88, change: 15.2, category: "LIFESTYLE" },
  { id: "3", keyword: "RTX 5090", volume: 82, change: 45.0, category: "GAMING" },
  { id: "4", keyword: "다이어트 식단", volume: 78, change: -3.1, category: "HEALTH" },
  { id: "5", keyword: "주식 투자 전략", volume: 75, change: 8.7, category: "FINANCE" },
  { id: "6", keyword: "캠핑 장비", volume: 70, change: 12.4, category: "LIFESTYLE" },
  { id: "7", keyword: "프로그래밍 입문", volume: 68, change: 5.3, category: "TECH" },
  { id: "8", keyword: "여행 브이로그", volume: 65, change: -1.8, category: "VLOG" },
  { id: "9", keyword: "홈트레이닝", volume: 62, change: 9.1, category: "HEALTH" },
  { id: "10", keyword: "맛집 탐방", volume: 58, change: 2.0, category: "VLOG" },
];

export const categoryPerformance = [
  { category: "TECH", avgCtr: 9.2, color: "#cfbdff" },
  { category: "GAMING", avgCtr: 11.5, color: "#a78bfa" },
  { category: "LIFESTYLE", avgCtr: 6.8, color: "#ffb59f" },
  { category: "HEALTH", avgCtr: 5.4, color: "#86efac" },
  { category: "FINANCE", avgCtr: 7.1, color: "#fbbf24" },
  { category: "VLOG", avgCtr: 4.9, color: "#67e8f9" },
];

// 7 days × 24 hours posting time heatmap (0-100 intensity)
export const postingTimeData: number[][] = [
  // Mon
  [10,5,3,2,2,5,15,25,35,40,50,55,60,55,50,45,55,70,85,90,80,65,45,25],
  // Tue
  [8,4,3,2,2,4,12,22,32,38,48,52,58,52,48,42,52,68,82,88,78,62,42,22],
  // Wed
  [12,6,4,2,3,6,18,28,38,45,55,60,65,58,52,48,58,75,90,95,85,70,48,28],
  // Thu
  [9,5,3,2,2,5,14,24,34,42,52,56,62,55,50,44,54,72,88,92,82,68,46,24],
  // Fri
  [15,8,5,3,4,8,20,30,40,48,58,65,70,65,55,50,60,78,92,98,90,75,55,32],
  // Sat
  [20,15,10,8,6,8,12,18,30,45,60,70,75,72,68,65,70,80,95,100,92,80,60,35],
  // Sun
  [18,12,8,6,5,6,10,15,28,42,58,68,72,70,65,62,68,78,92,96,88,76,55,30],
];

export const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];
export const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}시`);
