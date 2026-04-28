"use client";

import {
  aspectRatios,
  characters,
  contentTypes,
  environments,
  moods,
  qualityLevels,
  styles
} from "@/lib/promptBuilder";
import { toolRules } from "@/data/knowledge";

export default function Sidebar({
  isMobileOpen = false,
  onCloseMobile,
  selections,
  negativePrompt,
  variations,
  onUpdateSelection,
  onUpdateCharacterDetail,
  onUpdateNegativePrompt,
  onUpdateVariations,
  onReset
}) {
  const showCharacterInput = selections.character && selections.character !== "Select Character";

  return (
    <>
      <div
        onClick={onCloseMobile}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-200 md:hidden ${
          isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMobileOpen}
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-primary)] p-4 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-[18px] font-semibold text-[var(--text-primary)]">RagBot</h1>
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">Prompt Forge</p>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close controls"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-all duration-150 ease-in hover:bg-[var(--bg-hover)] md:hidden"
          >
            ✕
          </button>
        </div>

        <div className="my-4 border-t border-[var(--border)]" />

        <button
          type="button"
          onClick={onReset}
          className="flex h-9 w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-3 text-left text-[13px] text-[var(--text-secondary)] transition-all duration-150 ease-in hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]"
        >
          <span>+</span>
          <span>New Chat</span>
        </button>

        <div className="mb-2 mt-4 border-t border-[var(--border)] pt-2">
          <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Settings</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <SelectField
            label="Content Type"
            value={selections.contentType}
            onChange={(value) => onUpdateSelection("contentType", value)}
            options={contentTypes}
            placeholder="Select Content Type"
          />
          <SelectField
            label="Mood"
            value={selections.mood}
            onChange={(value) => onUpdateSelection("mood", value)}
            options={moods}
            placeholder="Select Mood"
          />
          <SelectField
            label="Character"
            value={selections.character}
            onChange={(value) => onUpdateSelection("character", value)}
            options={characters}
            placeholder="Select Character"
          />
          {showCharacterInput ? (
            <input
              value={selections.characterDetails?.expression || ""}
              onChange={(event) => onUpdateCharacterDetail("expression", event.target.value)}
              placeholder="e.g. blonde, early 20s..."
              className="animate-slideDown h-[30px] rounded-md border border-[var(--border)] bg-[var(--bg-tertiary)] px-2 text-[11px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          ) : null}
          <SelectField
            label="Environment"
            value={selections.environment}
            onChange={(value) => onUpdateSelection("environment", value)}
            options={environments}
            placeholder="Select Environment"
          />
          <SelectField
            label="Tool"
            value={selections.tool}
            onChange={(value) => onUpdateSelection("tool", value)}
            options={toolRules.map((rule) => rule.tool)}
            placeholder="Select Tool"
          />
          <SelectField
            label="Style"
            value={selections.style}
            onChange={(value) => onUpdateSelection("style", value)}
            options={styles}
            placeholder="Select Style"
          />
          <SelectField
            label="Ratio"
            value={selections.aspectRatio}
            onChange={(value) => onUpdateSelection("aspectRatio", value)}
            options={aspectRatios}
            placeholder="Select Ratio"
          />
        </div>

        <div className="mb-2 mt-4 border-t border-[var(--border)] pt-2">
          <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Advanced</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <SelectField
            label="Quality"
            value={selections.quality}
            onChange={(value) => onUpdateSelection("quality", value)}
            options={qualityLevels}
            placeholder="Select Quality"
          />

          <label className="relative block">
            <span className="mb-[3px] block text-[10px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
              Variations
            </span>
            <select
              value={String(variations)}
              onChange={(event) => onUpdateVariations(Number(event.target.value))}
              className="select-chevron h-[34px] w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-2.5 text-xs text-[var(--text-primary)] transition-[border-color] duration-150 ease-in hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
            >
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </label>

          <label className="relative block">
            <span className="mb-[3px] block text-[10px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
              Negative Prompt
            </span>
            <textarea
              value={negativePrompt}
              onChange={(event) => onUpdateNegativePrompt(event.target.value)}
              placeholder="watermark, blur, text overlay..."
              className="min-h-[52px] w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-2.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-[border-color] duration-150 ease-in hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
            />
          </label>
        </div>

        <div className="mt-auto border-t border-[var(--border)] pt-3">
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-[var(--text-muted)] transition-colors duration-150 ease-in hover:text-[var(--text-secondary)]"
          >
            <span>⚙</span>
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <label className="relative block">
      <span className="mb-[3px] block text-[10px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="select-chevron h-[34px] w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-2.5 text-xs text-[var(--text-primary)] transition-[border-color] duration-150 ease-in hover:border-[var(--border-hover)] focus:border-[var(--border-hover)]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
