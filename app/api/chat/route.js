import { buildChatPrompt, buildRetrievalQuery } from "@/lib/promptBuilder";
import { generateTextStream } from "@/lib/grok";
import { retrieveRelevantContext, serializeContext } from "@/lib/rag";
import { CHAT_SYSTEM_PROMPT } from "@/lib/systemPrompts";

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
      messages
    });

    const contextItems = await retrieveRelevantContext(query, 4);
    const ragContext = serializeContext(contextItems);
    const prompt = buildChatPrompt({
      ragContext,
      selections,
      messages,
      currentPrompt
    });

    const streamResult = await generateTextStream({
      prompt,
      systemInstruction: CHAT_SYSTEM_PROMPT
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
    return new Response(error.message || "Chat request failed.", { status: 500 });
  }
}
