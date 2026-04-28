export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-xl rounded-[2rem] border border-white/10 px-8 py-10 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-violet-200/70">404</div>
        <h1 className="mt-3 text-3xl font-semibold text-white">This page does not exist.</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          Head back to the main prompt chat workspace and start a new generation flow.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white"
        >
          Open workspace
        </a>
      </div>
    </main>
  );
}
