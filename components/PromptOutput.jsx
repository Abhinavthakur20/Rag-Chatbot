"use client";

export default function PromptOutput({ prompts = [], onRefine }) {
  async function copyPrompt(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  }

  if (!prompts.length) {
    return (
      <div className="glass-panel rounded-[2rem] border border-dashed border-white/10 p-8 text-center text-zinc-400">
        Your generated prompts will land here with quality scores, techniques, and quick refinement actions.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {prompts.map((item, index) => (
        <article
          key={item.id || `${item.prompt}-${index}`}
          className="glass-panel rounded-[2rem] border border-white/10 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-violet-200/70">
                Variation {index + 1}
              </div>
              <div className="mt-2 text-sm text-zinc-300">{item.notes}</div>
            </div>
            <div className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-100">
              Quality {item.qualityScore}/100
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-100">
            {item.prompt}
          </div>

          {item.negativePrompt ? (
            <div className="mt-3 rounded-3xl border border-rose-200/15 bg-rose-500/5 p-4 text-sm leading-7 text-rose-100">
              <div className="text-[11px] uppercase tracking-[0.2em] text-rose-200/70">Negative Prompt</div>
              <div className="mt-2">{item.negativePrompt}</div>
            </div>
          ) : null}

          {item.why ? (
            <div className="mt-3 rounded-3xl border border-cyan-200/15 bg-cyan-500/5 p-4 text-sm leading-7 text-cyan-100">
              <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/70">Why It Works</div>
              <div className="mt-2">{item.why}</div>
            </div>
          ) : null}

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300"
              style={{ width: `${Math.min(item.qualityScore || 0, 100)}%` }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(item.techniques || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copyPrompt(item.prompt)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-violet-300/40 hover:bg-violet-400/10"
            >
              Copy to clipboard
            </button>
            <button
              type="button"
              onClick={() => onRefine?.(item.prompt)}
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Refine this
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
