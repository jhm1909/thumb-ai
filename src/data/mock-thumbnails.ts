import type { ThumbnailData } from "@/types";

export const mockThumbnails: ThumbnailData[] = [
  {
    id: "1",
    title: '"이 기술이 당신의 직업을 바꿀 것입니다" - AI 혁명 실전 가이드',
    category: "TECH & FUTURE",
    categoryColor: "purple",
    ctr: 8.4,
    keywordLevel: "매우 높음",
    keywordPercent: 92,
    imageUrl: "/thumbnails/tech-ai.jpg",
  },
  {
    id: "2",
    title: "미니멀리스트로 살면서 연봉 1억 달성한 비결 (광고 아님)",
    category: "LIFESTYLE",
    categoryColor: "orange",
    ctr: 6.2,
    keywordLevel: "보통",
    keywordPercent: 45,
    imageUrl: "/thumbnails/lifestyle.jpg",
  },
  {
    id: "3",
    title: "2025년 최고의 가성비 그래픽카드 TOP 5 공개",
    category: "GAMING",
    categoryColor: "blue",
    ctr: 12.1,
    keywordLevel: "폭발적",
    keywordPercent: 100,
    imageUrl: "/thumbnails/gaming.jpg",
  },
];
