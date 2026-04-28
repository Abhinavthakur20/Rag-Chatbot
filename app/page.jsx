"use client";

import { useEffect, useState } from "react";
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

export default function HomePage() {
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
    <main className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <div className="flex min-h-screen">
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
        />
      </div>
    </main>
  );
}
