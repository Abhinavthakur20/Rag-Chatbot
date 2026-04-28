"use client";

export default function MessageBubble({
  message,
  onCopy,
  onUsePrompt,
  onRegenerate,
  onThumbsUp,
  onThumbsDown
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[18px_18px_4px_18px] border border-[var(--border)] bg-[var(--bg-tertiary)] px-3.5 py-2.5 text-sm leading-[1.6] text-[var(--text-primary)]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full text-sm leading-[1.8] text-[var(--text-primary)]">
      <MarkdownText content={message.content || ""} />

      {message.kind === "prompts" && Array.isArray(message.prompts) ? (
        <div className="mt-3 space-y-2">
          {message.prompts.map((item, index) => (
            <div
              key={item.id || `${item.prompt}-${index}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-3"
            >
              <div className="mb-2 text-[11px] text-[var(--text-secondary)]">
                Variation {index + 1} • Quality {item.qualityScore || 0}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-[1.7]">{item.prompt}</p>
              <div className="mt-2 flex gap-1.5">
                <ActionButton onClick={() => onCopy?.(item.prompt)}>Copy</ActionButton>
                <ActionButton onClick={() => onUsePrompt?.(item.prompt)}>Refine</ActionButton>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!message.hideActions ? (
        <div className="mt-2 flex gap-1.5">
          <ActionButton onClick={() => onCopy?.(message.content)}>Copy</ActionButton>
          <ActionButton onClick={() => onRegenerate?.(message)}>Regenerate</ActionButton>
          <ActionButton onClick={() => onThumbsUp?.(message)}>👍</ActionButton>
          <ActionButton onClick={() => onThumbsDown?.(message)}>👎</ActionButton>
        </div>
      ) : null}
    </div>
  );
}

function ActionButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[26px] items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-tertiary)] px-2.5 text-[11px] text-[var(--text-muted)] transition-all duration-150 ease-in hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]"
    >
      {children}
    </button>
  );
}

function MarkdownText({ content }) {
  const lines = String(content || "").split("\n");
  const parts = [];
  let buffer = [];
  let inCode = false;

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        parts.push({ type: "code", value: buffer.join("\n"), key: `c-${index}` });
        buffer = [];
      } else if (buffer.length) {
        parts.push({ type: "text", value: buffer.join("\n"), key: `t-${index}` });
        buffer = [];
      }
      inCode = !inCode;
      return;
    }
    buffer.push(line);
  });

  if (buffer.length) {
    parts.push({ type: inCode ? "code" : "text", value: buffer.join("\n"), key: "tail" });
  }

  if (!parts.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {parts.map((part) =>
        part.type === "code" ? (
          <pre
            key={part.key}
            className="overflow-x-auto rounded-md border border-[var(--border)] bg-[#2d2d2d] px-4 py-3 font-mono text-[13px] leading-6"
          >
            <code>{part.value}</code>
          </pre>
        ) : (
          <p key={part.key} className="whitespace-pre-wrap">
            {renderInline(part.value)}
          </p>
        )
      )}
    </div>
  );
}

function renderInline(text) {
  const result = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("`")) {
      result.push(
        <code
          key={`${match.index}-code`}
          className="rounded bg-[var(--bg-tertiary)] px-1.5 py-[1px] text-[13px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      result.push(
        <strong key={`${match.index}-strong`} className="font-semibold text-[var(--text-primary)]">
          {token.slice(2, -2)}
        </strong>
      );
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}
