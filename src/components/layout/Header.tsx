"use client";

import React, { useState } from "react";
import { Moon, Sun, QrCode } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ShareModal from "./ShareModal";
import InstallButton from "./InstallButton";
import { useLanguage } from "@/i18n/LanguageContext";
import lidlLogo from "../../../public/lidl-logo.png";

import { useFontSize } from "@/context/FontSizeContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { fontSize, cycleFontSize } = useFontSize();

  const toggleLanguage = () => {
    setLanguage(language === 'sk' ? 'en' : 'sk');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Originálne Lidl Logo */}
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Image src={lidlLogo} alt="Lidl Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold text-[15px] leading-tight text-foreground tracking-tight">Lidl</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{t('app.title')}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="h-8 px-2 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-foreground font-bold text-xs uppercase transition-colors"
            aria-label="Prepnúť jazyk / Switch language"
          >
            {language}
          </button>
          
          {/* Font Size Toggle */}
          <button 
            onClick={cycleFontSize}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors font-serif font-bold"
            aria-label="Zmeniť veľkosť písma"
            title="Zmeniť veľkosť písma"
          >
            <span className="text-sm">a</span>
            <span className="text-lg">A</span>
            {fontSize !== "normal" && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </button>

          <InstallButton />

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
