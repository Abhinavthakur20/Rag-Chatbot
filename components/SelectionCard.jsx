"use client";

export default function SelectionCard({
  label,
  description,
  selected = false,
  onClick,
  children
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      data-active={selected}
      className={`selection-ring glass-panel rounded-3xl p-4 text-left transition duration-200 ${
        selected
          ? "border-violet-300/50 bg-violet-500/10 shadow-glow"
          : "border-white/10 hover:-translate-y-0.5 hover:border-violet-400/30"
      }`}
    >
      <div className="relative z-10 flex h-full flex-col gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{label}</div>
          {description ? <div className="mt-1 text-sm text-zinc-400">{description}</div> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
