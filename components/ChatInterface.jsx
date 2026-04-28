"use client";

import { useEffect, useMemo, useState } from "react";
import ChatArea from "@/components/ChatArea";
import RightPanel from "@/components/RightPanel";

const STORAGE_KEY = "ragbot-chat-history-v2";

export default function ChatInterface({
  selections = {},
  negativePrompt = "",
  variations = 3,
  resetVersion = 0
}) {
  const starterMessages = useMemo(
    () => [
      {
        id: "welcome",
        role: "assistant",
        kind: "text",
        content:
          "Share a rough idea and I will turn it into production-ready prompts with cinematic structure and tool-specific syntax."
      }
    ],
    []
  );

  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed);
        }
      } catch (storageError) {
        console.error("Failed to restore chat history", storageError);
      }
    }
  }, []);

  useEffect(() => {
    setMessages(starterMessages);
    setInput("");
    setCurrentPrompt("");
    setError("");
    setSavedPrompts([]);
  }, [resetVersion, starterMessages]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const promptMessages = messages.filter((message) => message.kind === "prompts");
    const flattened = promptMessages.flatMap((message) =>
      (message.prompts || []).map((item) => ({
        title: item.prompt?.slice(0, 64) || "Saved Prompt",
        tag: `${selections.tool || "Tool"} • ${selections.style || "Style"}`,
        text: item.prompt || ""
      }))
    );
    setSavedPrompts(flattened.slice(0, 20));
  }, [messages, selections.tool, selections.style]);

  async function handleGenerate() {
    const roughPrompt = input.trim();
    const fallbackRequest = "Generate prompt options using the current selections.";

    if (!roughPrompt && !hasSelection(selections)) {
      setError("Add a quick idea or choose at least one control before generating.");
      return;
    }

    const userMessage = {
      id: createId(),
      role: "user",
      kind: "text",
      content: roughPrompt || fallbackRequest
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          selections,
          roughPrompt,
          negativePrompt,
          variations
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prompt generation failed.");
      }

      const firstPrompt = data.prompts?.[0]?.prompt || "";
      setCurrentPrompt(firstPrompt);

      setMessages((previous) => [
        ...previous,
        {
          id: createId(),
          role: "assistant",
          kind: "prompts",
          content: `Generated ${data.prompts?.length || 0} variation${data.prompts?.length === 1 ? "" : "s"} for your current setup.`,
          prompts: data.prompts || []
        }
      ]);
    } catch (requestError) {
      setError(requestError.message || "Prompt generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleAsk() {
    if (!input.trim() || isStreaming || isGenerating) {
      return;
    }

    const userMessage = {
      id: createId(),
      role: "user",
      kind: "text",
      content: input.trim()
    };
    const nextMessages = [...messages, userMessage];
    const promptContext = currentPrompt || userMessage.content;

    setMessages(nextMessages);
    setInput("");
    setCurrentPrompt(promptContext);
    setError("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: serializeMessages(nextMessages),
          currentPrompt: promptContext,
          selections
        })
      });

      if (!response.ok || !response.body) {
        const message = await response.text();
        throw new Error(message || "Unable to stream chat response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = "";
      const assistantId = createId();

      setMessages((previous) => [
        ...previous,
        { id: assistantId, role: "assistant", kind: "text", content: "" }
      ]);

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        streamedText += decoder.decode(value, { stream: true });
        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantId ? { ...message, content: streamedText } : message
          )
        );
      }
    } catch (requestError) {
      setError(requestError.message || "Something went wrong while streaming the response.");
    } finally {
      setIsStreaming(false);
    }
  }

  function usePromptInChat(prompt) {
    setCurrentPrompt(prompt);
    setInput(`Refine this prompt and make it feel more intentional:\n\n${prompt}`);
  }

  async function copyText(text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (copyError) {
      console.error("Clipboard copy failed", copyError);
    }
  }

  return (
    <div className="relative flex min-h-0 flex-1">
      <div className={`flex min-w-0 flex-1 transition-all duration-300 ${isPanelOpen ? "pr-[300px]" : ""}`}>
        <ChatArea
          title="RagBot Prompt Forge"
          messages={messages}
          input={input}
          isGenerating={isGenerating}
          isStreaming={isStreaming}
          onInputChange={setInput}
          onSubmit={handleAsk}
          onGenerate={handleGenerate}
          onTogglePanel={() => setIsPanelOpen((value) => !value)}
          onCopyMessage={copyText}
          onUsePrompt={usePromptInChat}
        />
      </div>

      <RightPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        messages={messages}
        savedPrompts={savedPrompts}
        onCopySaved={copyText}
      />

      {error ? (
        <div className="pointer-events-none absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-md border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-2 text-xs text-[var(--text-secondary)]">
          {error}
        </div>
      ) : null}
    </div>
  );
}

function serializeMessages(messages) {
  return messages.map((message) => {
    if (message.kind === "prompts") {
      const promptText = (message.prompts || [])
        .map((item, index) => `Variation ${index + 1}: ${item.prompt}`)
        .join("\n");

      return {
        role: message.role,
        content: `${message.content}\n${promptText}`.trim()
      };
    }

    return {
      role: message.role,
      content: message.content
    };
  });
}

function hasSelection(selections) {
  return [
    selections.contentType,
    selections.mood,
    selections.character,
    selections.environment,
    selections.tool,
    selections.style
  ].some(Boolean);
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
