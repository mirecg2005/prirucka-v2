"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import TTSButton from "@/components/tools/TTSButton";

interface SectionLayoutProps {
  title: string;
  children: React.ReactNode;
  contentId: string;
  headerAccent?: "blue" | "red" | "yellow" | "gray" | "cyan" | "green" | "purple" | "orange" | "indigo";
  hideGlobalTTS?: boolean;
}

const headerGradients = {
  blue: "from-blue-500/10 via-background/80 to-background",
  red: "from-red-500/10 via-background/80 to-background",
  yellow: "from-amber-500/10 via-background/80 to-background",
  gray: "from-slate-500/10 via-background/80 to-background",
  cyan: "from-cyan-500/10 via-background/80 to-background",
  green: "from-emerald-500/10 via-background/80 to-background",
  purple: "from-purple-500/10 via-background/80 to-background",
  orange: "from-orange-500/10 via-background/80 to-background",
  indigo: "from-indigo-500/10 via-background/80 to-background",
};

export default function SectionLayout({ 
  title, 
  children, 
  contentId, 
  headerAccent = "gray",
  hideGlobalTTS = false
}: SectionLayoutProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Ozdobný Header */}
      <div className={`pt-6 pb-4 px-4 bg-gradient-to-b ${headerGradients[headerAccent]} backdrop-blur-lg border-b border-white/5 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] mb-6`}>
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-foreground shadow-sm hover:bg-white/80 dark:hover:bg-slate-700 transition-all focus:outline-none active:scale-95"
            aria-label="Naspäť"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="flex-1 font-black text-xl leading-tight text-center tracking-tight text-slate-800 dark:text-white drop-shadow-sm">
            {title}
          </h1>

          {!hideGlobalTTS && <TTSButton contentId={contentId} />}
        </div>
      </div>

      {/* Hlavný Obsah (so špecifickým ID pre TTS) */}
      <div id={contentId} className="px-4 space-y-6">
        {children}
      </div>
    </div>
  );
}
