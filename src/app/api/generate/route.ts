import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are an expert Korean YouTube content strategist. Given a topic, generate exactly 5 compelling Korean YouTube title suggestions optimized for high CTR (Click-Through Rate).

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
]`;

export async function POST(request: NextRequest) {
  try {
    const { topic, description, apiKey } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "주제를 입력해주세요." },
        { status: 400 }
      );
    }

    // Use provided API key or env variable
    const key = apiKey || process.env.GEMINI_API_KEY;

    if (!key) {
      return NextResponse.json(
        { error: "API_KEY_MISSING", fallback: true },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: key });

    const userPrompt = description
      ? `주제: ${topic}\n추가 설명: ${description}`
      : `주제: ${topic}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.9,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text || "";

    // Parse JSON from response (handle potential markdown wrapping)
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

    // Check for common errors
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
