"use client";

import { useMemo, useState } from "react";

export default function RightPanel({
  isOpen,
  onClose,
  messages = [],
  savedPrompts = [],
  onCopySaved
}) {
  const [activeTab, setActiveTab] = useState("history");
  const historyItems = useMemo(
    () => messages.filter((item) => item.role === "user" && item.content).slice().reverse(),
    [messages]
  );

  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-full overflow-hidden border-l border-[var(--border)] bg-[var(--bg-primary)] transition-all duration-300 ease-in ${
        isOpen ? "w-full sm:w-[300px] opacity-100" : "w-0 opacity-0"
      }`}
    >
      <div className="flex h-[52px] items-center justify-between border-b border-[var(--border)] px-4">
        <div className="text-[13px] font-medium text-[var(--text-primary)]">History</div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-all duration-150 ease-in hover:bg-[var(--bg-hover)]"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      <div className="flex border-b border-[var(--border)] px-3">
        <Tab
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
          label="Chat History"
        />
        <Tab
          active={activeTab === "saved"}
          onClick={() => setActiveTab("saved")}
          label="Saved Prompts"
        />
      </div>

      {activeTab === "history" ? (
        <div className="flex-1 overflow-y-auto p-2">
          {historyItems.map((item, index) => (
            <button
              key={item.id || `${index}-${item.content}`}
              type="button"
              className={`mb-1 block w-full truncate rounded-lg px-2.5 py-2 text-left text-xs transition-all duration-150 ease-in ${
                index === 0
                  ? "bg-[rgba(201,100,66,0.1)] text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {item.content}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-2">
          {savedPrompts.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="mb-1 flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-all duration-150 ease-in hover:bg-[var(--bg-hover)]"
            >
              <div className="min-w-0">
                <div className="truncate text-xs text-[var(--text-secondary)]">{item.title}</div>
                <div className="mt-1 text-[10px] text-[var(--text-muted)]">{item.tag}</div>
              </div>
              <button
                type="button"
                onClick={() => onCopySaved?.(item.text)}
                aria-label="Copy prompt"
                className="text-base text-[var(--text-muted)] transition-colors duration-150 ease-in hover:text-[var(--accent)]"
              >
                ⧉
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

function Tab({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 px-3 py-2 text-xs transition-all duration-150 ease-in ${
        active
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-transparent text-[var(--text-muted)]"
      }`}
    >
      {label}
    </button>
  );
}
