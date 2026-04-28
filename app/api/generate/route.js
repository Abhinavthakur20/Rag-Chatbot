import { NextResponse } from "next/server";
import { generateText } from "@/lib/grok";
import { GENERATION_SYSTEM_PROMPT } from "@/lib/systemPrompts";
import { buildGenerationPrompt, buildRetrievalQuery, parseGenerationResponse } from "@/lib/promptBuilder";
import { retrieveRelevantContext, serializeContext } from "@/lib/rag";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      selections = {},
      roughPrompt = "",
      negativePrompt = "",
      variations = 1
    } = body || {};

    const hasMeaningfulSelection = [
      selections.contentType,
      selections.mood,
      selections.character,
      selections.environment,
      selections.tool,
      selections.style,
      selections.aspectRatio,
      selections.quality,
      selections.characterDetails?.hairColor,
      selections.characterDetails?.ageRange,
      selections.characterDetails?.expression
    ].some((value) => Boolean(String(value || "").trim()));

    if (!roughPrompt.trim() && !hasMeaningfulSelection) {
      return NextResponse.json(
        {
          error: "Add a rough idea or choose at least one creative direction before generating."
        },
        { status: 400 }
      );
    }

    const query = buildRetrievalQuery({
      selections,
      roughPrompt,
      negativePrompt
    });

    const contextItems = await retrieveRelevantContext(query, 5);
    const ragContext = serializeContext(contextItems);
    const prompt = buildGenerationPrompt({
      ragContext,
      selections,
      roughPrompt,
      negativePrompt,
      variations
    });

    const text = await generateText({
      prompt,
      systemInstruction: GENERATION_SYSTEM_PROMPT
    });

    const prompts = parseGenerationResponse(text, Number(variations) || 1);

    return NextResponse.json({
      prompts,
      context: contextItems
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Prompt generation failed."
      },
      { status: 500 }
    );
  }
}
