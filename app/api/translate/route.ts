import { NextRequest, NextResponse } from "next/server";

const LANGUAGE_CODES: Record<string, string> = {
  en: "en",
  hi: "hi",
  mr: "mr",
  ta: "ta",
  te: "te",
  bn: "bn",
  gu: "gu",
  kn: "kn",
  ml: "ml",
  pa: "pa",
};

const LANGUAGE_NAMES: Record<string, string> = {
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  bn: "Bengali",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  en: "English",
};

// ✅ chunking for long forms
function chunkText(text: string, chunkSize = 2500) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// ✅ Keep this list broad for compatibility (some keys/projects vary)
const GEMINI_MODELS = [
  "gemini-3-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

async function geminiTranslate(text: string, targetLangCode: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const languageName = LANGUAGE_NAMES[targetLangCode] || targetLangCode;
  const chunks = chunkText(text, 2500);

  for (const model of GEMINI_MODELS) {
    try {
      let finalTranslated = "";

      for (const chunk of chunks) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a translation engine.

Task: Translate the TEXT into ${languageName}.
Rules:
- Output ONLY the translated text.
- No explanations.
- No quotes.
- Keep the same formatting (lines, bullets, numbers).

TEXT:
${chunk}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          }),
        });

        const data = await res.json();

        const translated =
          data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!res.ok || !translated) {
          throw new Error(
            `Gemini failed with model ${model}: ${data?.error?.message || "Unknown error"}`
          );
        }

        finalTranslated += translated + "\n";
      }

      return {
        success: true as const,
        translatedText: finalTranslated.trim(),
        method: "gemini",
        model,
      };
    } catch (err) {
      console.log(`Gemini model failed: ${model}`, err);
      continue;
    }
  }

  throw new Error("All Gemini models failed");
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json(
        { error: "No target language provided" },
        { status: 400 }
      );
    }

    const langCode = LANGUAGE_CODES[targetLanguage];
    if (!langCode) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    // ✅ If English, return as-is
    if (langCode === "en") {
      return NextResponse.json({
        success: true,
        originalText: text,
        translatedText: text,
        language: targetLanguage,
        method: "none",
        message: "Already English",
      });
    }

    const result = await geminiTranslate(text, langCode);

    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText: result.translatedText,
      language: targetLanguage,
      method: `${result.method}:${result.model}`,
    });
  } catch (error: any) {
    console.error("Gemini translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate", details: error?.message },
      { status: 500 }
    );
  }
}
