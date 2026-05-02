import { Orbitron } from "next/font/google";

const brandFont = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar({
  title = "Vivid Prompt Forge",
  onTogglePanel,
  onToggleSidebar
}) {
  return (
    <header className="h-[52px] border-b border-[var(--border)] px-3 sm:px-5">
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Vivid Logo" className="h-8 w-8" />
          <span className={`${brandFont.className} text-sm font-bold tracking-widest text-white uppercase`}>
            Vivid
          </span>
        </div>
        <div className="truncate text-center text-xs font-normal text-[var(--text-secondary)] sm:text-sm">
          {title}
        </div>
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open controls"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all duration-150 ease-in hover:bg-[var(--bg-hover)] md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
              <path d="M4 21v-7m0-4V3m8 18v-11m0-4V3m8 18v-5m0-4V3M1 14h6m2-11h6m2 8h6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onTogglePanel}
            aria-label="Toggle history panel"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all duration-150 ease-in hover:bg-[var(--bg-hover)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
