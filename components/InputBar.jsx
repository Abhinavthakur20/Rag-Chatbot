"use client";

import { useEffect, useRef } from "react";

export default function InputBar({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Describe what you want to generate...",
  mode = "companionship"
}) {
  const isProduct = mode === "product";
  const accentColor = isProduct ? "#7c6af7" : "var(--accent)";
  const shadowColor = isProduct ? "rgba(124,106,247,0.15)" : "rgba(201,100,66,0.15)";
  const accentHover = isProduct ? "#6956e6" : "var(--accent-hover)";
  const textareaRef = useRef(null);
  const canSend = !disabled && value.trim().length > 0;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        onSubmit?.();
      }
    }
  }

  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-3 pb-4 pt-3 sm:px-4 sm:pb-5">
      <div className="relative mx-auto max-w-[680px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="max-h-[200px] min-h-12 w-full resize-none overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 pr-12 text-sm leading-[1.5] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-[border-color] duration-150 ease-in focus:border-current focus:shadow-[0_0_0_2px_var(--shadow)]"
          style={{
            "--shadow": shadowColor,
            borderColor: value.trim() ? accentColor : "var(--border)"
          }}
        />

        <button
          type="button"
          disabled={!canSend}
          onClick={() => onSubmit?.()}
          aria-label="Send"
          className={`absolute bottom-2.5 right-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-md border-0 text-white transition-all duration-150 ease-in ${
            canSend
              ? "opacity-100 hover:brightness-110"
              : "cursor-not-allowed bg-[var(--bg-hover)] text-[var(--text-muted)]"
          }`}
          style={{
            backgroundColor: canSend ? accentColor : undefined
          }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8z" />
          </svg>
        </button>
      </div>

      <div className="mt-2 px-2 text-center text-[10px] text-[var(--text-muted)] sm:text-[11px]">
        RagBot can make mistakes. Verify important prompts.
      </div>
    </div>
  );
}
