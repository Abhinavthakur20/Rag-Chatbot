"use client";

import { useEffect, useRef, useState } from "react";
import { toolRules } from "@/data/knowledge";
import { Orbitron } from "next/font/google";

const brandFont = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
});

const productCategories = [
  "Perfume & Fragrance", "Skincare & Beauty",
  "Watches & Jewelry", "Shoes & Footwear",
  "Coffee & Beverages", "Food & Snacks",
  "Tech & Gadgets", "Earbuds & Audio",
  "Clothing & Fashion", "Supplements"
];

const shotTypes = [
  "Hero Shot", "Lifestyle Shot", "Flat Lay",
  "360 Spin", "Macro Detail", "Floating",
  "Splash / Liquid", "Hands Holding Product",
  "Before & After"
];

const productMoods = [
  "Luxury & Premium", "Bold & Energetic",
  "Soft & Minimal", "Dark & Dramatic",
  "Warm & Cozy", "Fresh & Clean",
  "Cinematic & Epic", "Playful & Fun"
];

const productEnvironments = [
  "Studio White", "Studio Black",
  "Marble Surface", "Wooden Table",
  "Outdoor Nature", "Urban Street",
  "Luxury Interior", "Abstract Background",
  "Water & Splash", "Smoke & Fog"
];

const lightingStyles = [
  "Soft Box", "Rim Light", "God Rays",
  "Neon Colored Gels", "Golden Hour",
  "Studio Strobe", "Candlelight", "Backlit"
];

const productRatios = [
  "1:1", "9:16", "16:9", "4:5", "3:2"
];

export default function ProductSidebar({
  isMobileOpen = false,
  onCloseMobile,
  selections,
  onUpdateSelection,
  onReset
}) {
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
        className={`fixed left-0 top-0 z-40 flex h-full w-[260px] flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-primary)] p-4 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className={`${brandFont.className} text-lg font-bold tracking-widest text-white uppercase`}>Vivid</h1>
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">Product Ads</p>
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
            label="Product Category"
            value={selections.productCategory}
            onChange={(value) => onUpdateSelection("productCategory", value)}
            options={productCategories}
            placeholder="Select Category"
          />
          <SelectField
            label="Shot Type"
            value={selections.shotType}
            onChange={(value) => onUpdateSelection("shotType", value)}
            options={shotTypes}
            placeholder="Select Shot Type"
          />
          <SelectField
            label="Mood / Feel"
            value={selections.mood}
            onChange={(value) => onUpdateSelection("mood", value)}
            options={productMoods}
            placeholder="Select Mood"
          />
          <SelectField
            label="Environment"
            value={selections.environment}
            onChange={(value) => onUpdateSelection("environment", value)}
            options={productEnvironments}
            placeholder="Select Environment"
          />
          <SelectField
            label="Lighting"
            value={selections.lighting}
            onChange={(value) => onUpdateSelection("lighting", value)}
            options={lightingStyles}
            placeholder="Select Lighting"
          />
          <SelectField
            label="AI Tool"
            value={selections.tool}
            onChange={(value) => onUpdateSelection("tool", value)}
            options={toolRules.map((r) => r.tool)}
            placeholder="Select Tool"
          />
          <SelectField
            label="Aspect Ratio"
            value={selections.aspectRatio}
            onChange={(value) => onUpdateSelection("aspectRatio", value)}
            options={productRatios}
            placeholder="Select Ratio"
          />
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
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </label>
  );
}

function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = value || placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-[34px] w-full items-center justify-between rounded-lg border bg-[var(--bg-tertiary)] px-2.5 text-left text-xs transition-[border-color,box-shadow] duration-150 ease-in ${
          isOpen
            ? "border-[#7c6af7] shadow-[0_0_0_2px_rgba(124,106,247,0.15)]"
            : "border-[var(--border)] hover:border-[var(--border-hover)]"
        }`}
      >
        <span className={value ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
          {selectedLabel}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 text-[var(--text-secondary)] transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-[var(--border-hover)] bg-[var(--bg-tertiary)] shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`block w-full px-2.5 py-2 text-left text-xs transition-colors ${
              !value
                ? "bg-[rgba(124,106,247,0.15)] text-[#7c6af7]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {placeholder}
          </button>
          <div className="max-h-52 overflow-y-auto py-1">
            {options.map((option) => {
              const isSelected = String(value) === String(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-2.5 py-2 text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-[rgba(124,106,247,0.15)] text-[#7c6af7]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
