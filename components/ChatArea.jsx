"use client";

import MessageBubble from "@/components/MessageBubble";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";

export default function ChatArea({
  title,
  messages,
  input,
  isGenerating,
  isStreaming,
  onInputChange,
  onSubmit,
  onGenerate,
  onTogglePanel,
  onToggleSidebar,
  onCopyMessage,
  onUsePrompt,
  mode = "companionship"
}) {
  const showEmpty = messages.length <= 1;

  return (
    <section className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-secondary)]">
      {/* Fixed Header */}
      <div className="flex-none bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <Navbar
          title={title || "Vivid Prompt Forge"}
          onTogglePanel={onTogglePanel}
          onToggleSidebar={onToggleSidebar}
        />
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-3 pt-6 sm:px-4 sm:pt-8 no-scrollbar">
        <div className="mx-auto flex w-full max-w-[680px] flex-col gap-6 pb-8">
          {showEmpty ? <EmptyState /> : null}

          {messages
            .filter((message) => message.id !== "welcome")
            .map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={onCopyMessage}
                onRegenerate={onGenerate}
                onUsePrompt={onUsePrompt}
              />
            ))}

          {isGenerating ? (
            <div className="text-sm text-[var(--text-secondary)]">Generating prompt variations...</div>
          ) : null}
          {isStreaming ? <div className="text-sm text-[var(--text-secondary)]">Thinking...</div> : null}
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="flex-none border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <InputBar
          value={input}
          onChange={onInputChange}
          onSubmit={onSubmit}
          disabled={isGenerating || isStreaming}
          mode={mode}
        />
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[var(--text-muted)]">
        <path
          fill="currentColor"
          d="M12 2l2.3 5.7L20 10l-5.7 2.3L12 18l-2.3-5.7L4 10l5.7-2.3L12 2zm7 14l1 2.5L22.5 20 20 21l-1 2.5L18 21l-2.5-1 2.5-1.5L19 16zM5 15l.8 2 2 .8-2 .7L5 21l-.8-2.5-2-.7 2-.8L5 15z"
        />
      </svg>
      <h2 className="mt-4 text-[22px] font-medium text-[var(--text-primary)]">Share a rough idea</h2>
      <p className="mt-3 max-w-[360px] text-sm leading-[1.6] text-[var(--text-secondary)]">
        I&apos;ll turn it into production-ready prompts with cinematic structure and tool-specific
        syntax.
      </p>
    </div>
  );
}
