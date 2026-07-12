"use client";

import React, { useState } from "react";
import { Moon, Sun, QrCode } from "lucide-react";
import { useTheme } from "next-themes";
import ShareModal from "./ShareModal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'sk' ? 'en' : 'sk');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Originálne Lidl Logo */}
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <img src="/lidl-logo.png" alt="Lidl Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold text-[15px] leading-tight text-foreground tracking-tight">Lidl</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{t('app.title')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="h-8 px-2 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-foreground font-bold text-xs uppercase transition-colors mr-1"
            aria-label="Prepnúť jazyk / Switch language"
          >
            {language}
          </button>

          <button 
            onClick={() => setIsShareOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Zdieľať aplikáciu"
          >
            <QrCode className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Prepnúť tmavý režim"
          >
            <Sun className="w-5 h-5 hidden dark:block" strokeWidth={1.5} />
            <Moon className="w-5 h-5 block dark:hidden" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
}
