import type { GeneratorTopic } from "@/types";

export const mockGeneratorTopics: GeneratorTopic[] = [
  {
    topic: "AI",
    results: [
      {
        id: "ai-1",
        title: '"ChatGPT 끝났다" - 2025년 진짜 써야 할 AI 도구 5가지',
        ctr: 13.2,
        emotion: "호기심",
        keywords: ["AI", "ChatGPT", "생산성"],
        isBestPick: true,
      },
      {
        id: "ai-2",
        title: "AI로 월 500만원 벌기: 현실적인 로드맵 공개",
        ctr: 11.8,
        emotion: "기대감",
        keywords: ["AI", "수익화", "부업"],
      },
      {
        id: "ai-3",
        title: "개발자가 말하는 AI의 한계 (솔직 리뷰)",
        ctr: 9.5,
        emotion: "신뢰",
        keywords: ["AI", "개발", "리뷰"],
      },
      {
        id: "ai-4",
        title: "이 AI 기능, 아직도 모르세요? 숨겨진 활용법",
        ctr: 8.7,
        emotion: "놀라움",
        keywords: ["AI", "팁", "활용"],
      },
      {
        id: "ai-5",
        title: "AI 시대, 살아남는 직업 vs 사라지는 직업",
        ctr: 10.3,
        emotion: "긴장감",
        keywords: ["AI", "미래", "직업"],
      },
    ],
  },
  {
    topic: "여행",
    results: [
      {
        id: "travel-1",
        title: "현지인만 아는 도쿄 숨은 맛집 TOP 7 (관광객 없음)",
        ctr: 11.5,
        emotion: "기대감",
        keywords: ["도쿄", "맛집", "여행"],
        isBestPick: true,
      },
      {
        id: "travel-2",
        title: "100만원으로 유럽 일주? 가능합니다 (완벽 가이드)",
        ctr: 10.2,
        emotion: "놀라움",
        keywords: ["유럽", "가성비", "여행"],
      },
      {
        id: "travel-3",
        title: "비행기 좌석 업그레이드 받는 확실한 방법 3가지",
        ctr: 9.8,
        emotion: "호기심",
        keywords: ["항공", "팁", "업그레이드"],
      },
      {
        id: "travel-4",
        title: "제주도 vs 오키나와: 같은 돈으로 어디가 더 좋을까?",
        ctr: 8.9,
        emotion: "비교",
        keywords: ["제주도", "오키나와", "비교"],
      },
      {
        id: "travel-5",
        title: "혼자 여행 처음이라면 꼭 봐야 할 영상",
        ctr: 7.6,
        emotion: "공감",
        keywords: ["혼자여행", "초보", "가이드"],
      },
    ],
  },
  {
    topic: "default",
    results: [
      {
        id: "def-1",
        title: "이것만 알면 고수 됩니다 — 완벽 가이드 [2025]",
        ctr: 10.5,
        emotion: "기대감",
        keywords: ["가이드", "고수", "2025"],
        isBestPick: true,
      },
      {
        id: "def-2",
        title: '"아직도 이렇게 하세요?" 전문가가 알려주는 진짜 방법',
        ctr: 9.8,
        emotion: "호기심",
        keywords: ["전문가", "방법", "팁"],
      },
      {
        id: "def-3",
        title: "초보자 필수 시청 — 실수하기 전에 보세요",
        ctr: 8.4,
        emotion: "긴급함",
        keywords: ["초보", "실수", "필수"],
      },
      {
        id: "def-4",
        title: "돈 아끼면서 퀄리티 높이는 현실적인 방법",
        ctr: 7.9,
        emotion: "공감",
        keywords: ["가성비", "퀄리티", "현실적"],
      },
      {
        id: "def-5",
        title: "TOP 5 추천 리스트 (직접 사용 후기)",
        ctr: 7.2,
        emotion: "신뢰",
        keywords: ["TOP5", "추천", "후기"],
      },
    ],
  },
];

export function getResultsForTopic(topic: string): GeneratorTopic {
  const normalized = topic.toLowerCase().trim();
  const match = mockGeneratorTopics.find((t) =>
    normalized.includes(t.topic.toLowerCase())
  );
  return match || mockGeneratorTopics[mockGeneratorTopics.length - 1];
}
