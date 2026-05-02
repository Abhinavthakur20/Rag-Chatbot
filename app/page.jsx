"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Orbitron } from "next/font/google";

const titleFont = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
});

export default function ModeSelectionPage() {
  const router = useRouter();
  const [hoveredMode, setHoveredMode] = useState(null);

  const modes = [
    {
      id: "companionship",
      title: "COMPANIONSHIP ADS",
      description: "Generate emotional, cinematic prompts for mental health support app campaigns.",
      icon: "❤️",
      iconBg: "rgba(255, 71, 0, 0.1)",
      iconColor: "#ff4700",
      tags: ["Instagram", "TikTok", "YouTube", "Facebook"],
      path: "/chat/companionship",
      accent: "#ff4700",
    },
    {
      id: "product",
      title: "PRODUCT ADS",
      description: "Create high-end cinematic prompts for product photography and lifestyle ads.",
      icon: "📷",
      iconBg: "rgba(124, 106, 247, 0.1)",
      iconColor: "#7c6af7",
      tags: ["Hero Shot", "Lifestyle", "Cinematic", "360°"],
      path: "/chat/product",
      accent: "#7c6af7",
    },
  ];

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] font-sans selection:bg-indigo-500/30 p-6 md:p-8">
      {/* Futuristic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]"></div>
        
        {/* Circuit lines */}
        <svg className="absolute w-full h-full opacity-[0.05]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0 200 H 200 V 400 H 400 V 100 H 600 V 300 H 1000" fill="none" stroke="#6366f1" strokeWidth="1" />
          <path d="M1000 800 H 800 V 600 H 600 V 900 H 400 V 700 H 0" fill="none" stroke="#6366f1" strokeWidth="1" />
        </svg>

        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="z-10 flex w-full max-w-4xl flex-col items-center h-full justify-center py-4">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 md:mb-10 px-4 text-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.svg" alt="Vivid Logo" className="h-8 w-auto brightness-200" />
            <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">Vivid</span>
          </div>

          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10">
            <span className="text-indigo-400 text-[10px]">✦</span>
            <span className="text-[9px] font-bold tracking-widest text-indigo-300 uppercase">AI-Powered Creative Assistant</span>
          </div>

          {/* Main Title */}
          <h1 className={`${titleFont.className} mb-4 text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-3xl uppercase`}>
            WHAT ARE YOU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">CREATING TODAY?</span>
          </h1>

          {/* Description */}
          <p className="max-w-md text-xs md:text-sm text-gray-400 leading-relaxed">
            Generate high-quality prompts in seconds. <br className="hidden md:block" />
            Designed to spark ideas and save you time.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-6">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => router.push(mode.path)}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              className="group relative flex flex-col p-6 md:p-8 rounded-[24px] bg-white/[0.03] border border-white/10 shadow-2xl cursor-pointer transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover Accent Background */}
              <div
                className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                style={{ backgroundColor: mode.accent }}
              ></div>

              {/* Icon Box */}
              <div
                className="relative flex items-center justify-center w-12 h-12 mb-6 rounded-xl transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: mode.iconBg }}
              >
                {mode.id === 'companionship' ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={mode.iconColor}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={mode.iconColor} strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-base font-bold tracking-wide text-white uppercase group-hover:text-indigo-400 transition-colors">
                {mode.title}
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-gray-400">
                {mode.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                {mode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold transition-all border border-white/5 bg-white/5 text-gray-500 group-hover:text-gray-300"
                    style={{
                      borderColor: hoveredMode === mode.id ? `${mode.accent}30` : undefined,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow Button */}
              <div
                className="absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-sm transition-all duration-300 group-hover:border-transparent group-hover:shadow-lg"
                style={{
                  backgroundColor: hoveredMode === mode.id ? mode.accent : undefined,
                  boxShadow: hoveredMode === mode.id ? `0 10px 25px -5px ${mode.accent}50` : undefined,
                }}
              >
                <svg
                  className="w-4 h-4 transition-colors duration-300 transform group-hover:translate-x-0.5 text-gray-500 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Meta */}
        <div className="mt-10 md:mt-12 text-[9px] uppercase tracking-[0.3em] text-gray-600">
          Infinite Creativity
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-8deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(15deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        
        h1 {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          letter-spacing: -0.02em;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
