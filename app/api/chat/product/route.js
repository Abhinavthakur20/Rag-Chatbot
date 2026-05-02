import { buildChatPrompt, buildRetrievalQuery } from "@/lib/promptBuilder";
import { generateTextStream } from "@/lib/grok";
import { retrieveRelevantContext, serializeContext } from "@/lib/rag";
import { PRODUCT_SYSTEM_PROMPT } from "@/lib/systemPrompts";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      messages = [],
      currentPrompt = "",
      selections = {}
    } = body || {};

    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage?.content?.trim()) {
      return new Response("A user message is required.", { status: 400 });
    }

    const query = buildRetrievalQuery({
      selections,
      currentPrompt,
      messages,
      mode: "product"
    });

    const contextItems = await retrieveRelevantContext(query, 4);
    const ragContext = serializeContext(contextItems);
    const prompt = buildChatPrompt({
      ragContext,
      selections,
      messages,
      currentPrompt,
      mode: "product"
    });

    const systemPrompt = `
${PRODUCT_SYSTEM_PROMPT}

=== CURRENT USER SELECTIONS ===
Product Category: ${selections.productCategory || "Not selected"}
Shot Type: ${selections.shotType || "Not selected"}
Mood: ${selections.mood || "Not selected"}
Environment: ${selections.environment || "Not selected"}
Lighting: ${selections.lighting || "Not selected"}
Tool: ${selections.tool || "Not selected"}
Aspect Ratio: ${selections.aspectRatio || "Not selected"}

Use these as defaults for every prompt unless user specifies otherwise.
`.trim();

    const streamResult = await generateTextStream({
      prompt,
      systemInstruction: systemPrompt
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const text = chunk.text();

            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform"
      }
    });
  } catch (error) {
    const message = error.message?.includes("public.documents")
      ? "Supabase table `documents` is missing. Run the SQL setup from README, or keep using built-in fallback knowledge."
      : error.message || "Chat request failed.";
    return new Response(message, { status: 500 });
  }
}
