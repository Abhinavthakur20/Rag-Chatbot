"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const STORAGE_KEY = "ragbot-builder-context";

const initialSelections = {
  contentType: "",
  mood: "",
  character: "",
  characterDetails: {
    hairColor: "",
    ageRange: "",
    expression: ""
  },
  environment: "",
  tool: "",
  style: "Cinematic",
  aspectRatio: "9:16",
  quality: "High"
};

export default function CompanionshipPage() {
  const router = useRouter();
  const [selections, setSelections] = useState(initialSelections);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [variations, setVariations] = useState(3);
  const [resetVersion, setResetVersion] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelections((previous) => ({
          ...previous,
          ...parsed.selections,
          characterDetails: {
            ...previous.characterDetails,
            ...parsed.selections?.characterDetails
          }
        }));
        setNegativePrompt(parsed.negativePrompt || "");
        setVariations(parsed.variations || 3);
      } catch (storageError) {
        console.error("Failed to restore builder context", storageError);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selections,
        negativePrompt,
        variations
      })
    );
  }, [selections, negativePrompt, variations]);

  function updateSelection(key, value) {
    setSelections((previous) => ({
      ...previous,
      [key]: value
    }));
  }

  function updateCharacterDetail(key, value) {
    setSelections((previous) => ({
      ...previous,
      characterDetails: {
        ...previous.characterDetails,
        [key]: value
      }
    }));
  }

  function resetWorkspace() {
    setSelections(initialSelections);
    setNegativePrompt("");
    setVariations(3);
    setResetVersion((value) => value + 1);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("ragbot-chat-history-v2");
  }

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileSidebarOpen]);

  return (
    <main className="h-screen w-full overflow-hidden bg-[var(--bg-secondary)] text-[var(--text-primary)] p-6 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]"></div>
        <svg className="absolute w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0 200 H 200 V 400 H 400 V 100 H 600 V 300 H 1000" fill="none" stroke="#6366f1" strokeWidth="1" />
          <path d="M1000 800 H 800 V 600 H 600 V 900 H 400 V 700 H 0" fill="none" stroke="#6366f1" strokeWidth="1" />
        </svg>
      </div>

      <button
        onClick={() => router.push("/")}
        className="fixed right-0 top-[35%] z-[60] flex flex-col items-center gap-3 rounded-l-2xl border border-r-0 border-[var(--border)] bg-[var(--bg-primary)] py-4 px-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:pr-4 group"
      >
        <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors [writing-mode:vertical-lr] rotate-180 font-bold tracking-widest uppercase">
          Switch Mode
        </span>
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-[var(--text-muted)] group-hover:bg-[rgba(201,100,66,0.1)] group-hover:text-[var(--accent)] transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6-4v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
      </button>

      <div className="flex h-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-sm">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          selections={selections}
          negativePrompt={negativePrompt}
          variations={variations}
          onUpdateSelection={updateSelection}
          onUpdateCharacterDetail={updateCharacterDetail}
          onUpdateNegativePrompt={setNegativePrompt}
          onUpdateVariations={setVariations}
          onReset={resetWorkspace}
        />

        <ChatInterface
          selections={selections}
          negativePrompt={negativePrompt}
          variations={variations}
          resetVersion={resetVersion}
          onToggleSidebar={() => setIsMobileSidebarOpen((value) => !value)}
          apiEndpoint="/api/chat"
          title="Companionship Ads"
          mode="companionship"
        />
      </div>
    </main>
  );
}
