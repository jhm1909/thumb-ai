import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const PLATFORM_PROMPTS: Record<string, string> = {
  youtube: `You are an expert Korean YouTube content strategist. Given a topic, generate exactly 5 compelling Korean YouTube title suggestions optimized for high CTR (Click-Through Rate).

For each title, provide:
1. title: The Korean title (creative, emotional, click-worthy)
2. ctr: Estimated CTR percentage (7.0~14.0 range, realistic)
3. emotion: The primary emotion the title targets (e.g., 호기심, 긴급함, 놀라움, 공감, 분노, 기대감)
4. keywords: Array of 2-3 relevant Korean keywords
5. isBestPick: true for the single best title, false for others

RULES:
- Use Korean numbers, emotive words, and proven YouTube title patterns
- Include at least one title with numbers (e.g., "5가지", "TOP 10")
- Include at least one question-style title
- Make titles 15-40 characters for optimal mobile display
- Return ONLY valid JSON array, no markdown, no explanation

Example output format:
[
  {"title": "개발자가 절대 말 안 하는 연봉 비밀 5가지", "ctr": 12.3, "emotion": "호기심", "keywords": ["개발자", "연봉"], "isBestPick": true},
  ...
]`,

  instagram: `You are an expert Korean Instagram content strategist. Given a topic, generate exactly 5 compelling Korean Instagram caption first-lines optimized for engagement.

For each caption, provide:
1. title: The Korean first line (hook line that appears before "...더 보기")
2. ctr: Estimated engagement rate (3.0~8.0 range, realistic)
3. emotion: The primary emotion (e.g., 공감, 영감, 유머, 놀라움, 동기부여)
4. keywords: Array of 2-3 Korean hashtags (without #)
5. isBestPick: true for the single best, false for others

RULES:
- First line must hook within 125 characters
- Use conversational, relatable Korean tone
- Include emoji sparingly (max 1-2 per title)
- At least one question-style hook
- Return ONLY valid JSON array`,

  tiktok: `You are an expert Korean TikTok content strategist. Given a topic, generate exactly 5 compelling Korean TikTok captions optimized for virality.

For each caption, provide:
1. title: The Korean caption (short, punchy, trend-aware)
2. ctr: Estimated view-through rate (5.0~12.0 range, realistic)
3. emotion: The primary emotion (e.g., 충격, 웃음, 공감, 호기심, 긴급함)
4. keywords: Array of 2-3 trending Korean keywords
5. isBestPick: true for the single best, false for others

RULES:
- Keep under 150 characters
- Use Gen-Z Korean slang and trending expressions
- Start with a strong hook (첫 3초가 중요!)
- At least one "POV:" or "이거 실화?" style title
- Return ONLY valid JSON array`,
};

const COMPARE_PROMPT = `You are an expert Korean content strategist. Compare these two titles and determine which one would achieve higher CTR (Click-Through Rate).

Title A: {titleA}
Title B: {titleB}

Analyze both titles and return a JSON object with:
1. scoreA: CTR score for Title A (7.0~14.0)
2. scoreB: CTR score for Title B (7.0~14.0)
3. winner: "A" or "B"
4. reasoning: Korean explanation of why the winner is better (2-3 sentences)
5. metrics: Array of 5 comparison metrics, each with:
   - label: metric name in Korean (감정 자극, 호기심 유발, 명확성, 긴급함, SEO 최적화)
   - scoreA: score 0-100 for Title A
   - scoreB: score 0-100 for Title B

Return ONLY valid JSON object, no markdown, no explanation.`;

export async function POST(request: NextRequest) {
  try {
    const { topic, description, apiKey, platform, mode } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "주제를 입력해주세요." },
        { status: 400 }
      );
    }

    const key = apiKey || process.env.GEMINI_API_KEY;

    if (!key) {
      return NextResponse.json(
        { error: "API_KEY_MISSING", fallback: true },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: key });

    // Compare mode
    if (mode === "compare") {
      const comparePrompt = COMPARE_PROMPT
        .replace("{titleA}", topic)
        .replace("{titleB}", description);

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: comparePrompt,
        config: { temperature: 0.7, maxOutputTokens: 1024 },
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: "AI 응답을 파싱할 수 없습니다." },
          { status: 500 }
        );
      }

      const comparison = JSON.parse(jsonMatch[0]);
      comparison.id = `ab-${Date.now()}`;
      comparison.titleA = topic;
      comparison.titleB = description;

      return NextResponse.json({ comparison });
    }

    // Generate mode
    const systemPrompt = PLATFORM_PROMPTS[platform || "youtube"] || PLATFORM_PROMPTS.youtube;

    const userPrompt = description
      ? `주제: ${topic}\n추가 설명: ${description}`
      : `주제: ${topic}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.9,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text || "";

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "AI 응답을 파싱할 수 없습니다. 다시 시도해주세요." },
        { status: 500 }
      );
    }

    const results = JSON.parse(jsonMatch[0]).map(
      (
        item: {
          title: string;
          ctr: number;
          emotion: string;
          keywords: string[];
          isBestPick?: boolean;
        },
        index: number
      ) => ({
        id: `gen-${Date.now()}-${index}`,
        title: item.title,
        ctr: item.ctr,
        emotion: item.emotion,
        keywords: item.keywords || [],
        isBestPick: item.isBestPick || false,
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Gemini API error:", error);

    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    if (message.includes("API_KEY_INVALID") || message.includes("401")) {
      return NextResponse.json(
        { error: "API 키가 유효하지 않습니다. 설정에서 확인해주세요." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: `AI 생성 중 오류: ${message}` },
      { status: 500 }
    );
  }
}
