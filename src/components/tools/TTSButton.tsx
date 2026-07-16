"use client";

import React from "react";
import { Mic, MicOff, MousePointerClick } from "lucide-react";
import { useTTS } from "@/context/TTSContext";
import { useLanguage } from "@/i18n/LanguageContext";

interface TTSButtonProps {
  contentId?: string; // Kept for backwards compatibility
}

export default function TTSButton({ contentId }: TTSButtonProps) {
  const { interactiveMode, toggleInteractiveMode, state, stop } = useTTS();
  const { language } = useLanguage();

  const handleToggle = () => {
    if (state === "playing") stop();
    toggleInteractiveMode();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 shadow-sm border ${
        interactiveMode
          ? "bg-blue-600 text-white border-blue-500 hover:bg-blue-700 shadow-blue-500/30 shadow-lg scale-105"
          : "bg-card text-muted-foreground border-border hover:bg-muted"
      }`}
      title={language === 'sk' ? 'Zapnúť dotykové čítanie' : 'Enable touch-to-read'}
    >
      {interactiveMode ? (
        <>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
          <MousePointerClick className="w-5 h-5 animate-pulse" />
          <span className="text-xs uppercase tracking-wide">
            {language === 'sk' ? 'Dotykové čítanie ZAP' : 'Touch-to-read ON'}
          </span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">
            {language === 'sk' ? 'Čítanie' : 'Read aloud'}
          </span>
        </>
      )}
    </button>
  );
}
