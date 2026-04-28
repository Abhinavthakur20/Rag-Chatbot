"use client";

export default function Navbar({ title = "RagBot Prompt Forge", onTogglePanel }) {
  return (
    <header className="h-[52px] border-b border-[var(--border)] px-5">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
        <div />
        <div className="text-sm font-normal text-[var(--text-secondary)]">{title}</div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onTogglePanel}
            aria-label="Toggle history panel"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-all duration-150 ease-in hover:bg-[var(--bg-hover)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
