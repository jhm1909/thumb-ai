export interface ABComparison {
  id: string;
  titleA: string;
  titleB: string;
  scoreA: number;
  scoreB: number;
  winner: "A" | "B";
  reasoning: string;
  metrics: {
    label: string;
    scoreA: number;
    scoreB: number;
  }[];
}

export const mockComparisons: ABComparison[] = [
  {
    id: "ab-1",
    titleA: "AI가 바꾸는 미래, 지금 준비하지 않으면 늦습니다",
    titleB: "2025년 AI 트렌드 TOP 5 총정리",
    scoreA: 11.2,
    scoreB: 9.8,
    winner: "A",
    reasoning:
      "타이틀 A가 긴급함과 감정적 호소를 사용하여 더 높은 클릭률을 보입니다. '늦습니다'라는 표현이 FOMO를 자극합니다.",
    metrics: [
      { label: "감정 자극", scoreA: 92, scoreB: 65 },
      { label: "호기심 유발", scoreA: 78, scoreB: 82 },
      { label: "명확성", scoreA: 85, scoreB: 90 },
      { label: "긴급함", scoreA: 95, scoreB: 40 },
      { label: "SEO 최적화", scoreA: 70, scoreB: 88 },
    ],
  },
  {
    id: "ab-2",
    titleA: "직장인이 몰래 하는 부업 3가지",
    titleB: "월 300만원 부업 실제 후기 공개합니다",
    scoreA: 10.5,
    scoreB: 12.1,
    winner: "B",
    reasoning:
      "구체적인 수입 금액(300만원)과 '실제 후기'라는 신뢰 요소가 더 높은 CTR을 만듭니다.",
    metrics: [
      { label: "감정 자극", scoreA: 75, scoreB: 88 },
      { label: "호기심 유발", scoreA: 85, scoreB: 80 },
      { label: "명확성", scoreA: 70, scoreB: 92 },
      { label: "긴급함", scoreA: 60, scoreB: 55 },
      { label: "SEO 최적화", scoreA: 72, scoreB: 85 },
    ],
  },
];
