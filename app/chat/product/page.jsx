"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSidebar from "@/components/ProductSidebar";
import ChatInterface from "@/components/ChatInterface";

const STORAGE_KEY = "ragbot-product-context";

const initialProductSelections = {
  productCategory: "",
  shotType: "",
  mood: "",
  environment: "",
  lighting: "",
  tool: "",
  aspectRatio: "1:1"
};

export default function ProductPage() {
  const router = useRouter();
  const [selections, setSelections] = useState(initialProductSelections);
  const [resetVersion, setResetVersion] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelections((previous) => ({
          ...previous,
          ...parsed.selections
        }));
      } catch (storageError) {
        console.error("Failed to restore product context", storageError);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selections })
    );
  }, [selections]);

  function updateSelection(key, value) {
    setSelections((previous) => ({
      ...previous,
      [key]: value
    }));
  }

  function resetWorkspace() {
    setSelections(initialProductSelections);
    setResetVersion((value) => value + 1);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("ragbot-product-chat-v1");
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
        <span className="text-xs text-[var(--text-muted)] group-hover:text-[#7c6af7] transition-colors [writing-mode:vertical-lr] rotate-180 font-bold tracking-widest uppercase">
          Switch Mode
        </span>
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-[var(--text-muted)] group-hover:bg-[#7c6af715] group-hover:text-[#7c6af7] transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6-4v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
      </button>

      <div className="flex h-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-sm">
        <ProductSidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          selections={selections}
          onUpdateSelection={updateSelection}
          onReset={resetWorkspace}
        />

        <ChatInterface
          selections={selections}
          resetVersion={resetVersion}
          onToggleSidebar={() => setIsMobileSidebarOpen((value) => !value)}
          apiEndpoint="/api/chat/product"
          title="Product Ads"
          storageKey="ragbot-product-chat-v1"
          mode="product"
        />
      </div>
    </main>
  );
}
