"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Square, RotateCcw, Gauge } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { applyPhoneticRules } from "@/utils/phoneticDictionary";

interface TTSButtonProps {
  contentId: string;
}

const SPEED_OPTIONS = [0.6, 0.8, 1.0, 1.2];

export default function TTSButton({ contentId }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(1); // default 0.8x
  const { language } = useLanguage();
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const currentIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);
  const isPausedRef = useRef(false);
  const speedRef = useRef(SPEED_OPTIONS[1]);
  const highlightedRef = useRef<HTMLElement | null>(null);

  // Odstránenie highlight z aktuálneho elementu
  const clearHighlight = useCallback(() => {
    if (highlightedRef.current) {
      highlightedRef.current.classList.remove("tts-highlight");
      highlightedRef.current = null;
    }
  }, []);

  // Pridanie highlight na element + auto-scroll
  const highlightElement = useCallback((el: HTMLElement) => {
    clearHighlight();
    el.classList.add("tts-highlight");
    highlightedRef.current = el;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [clearHighlight]);

  const stopPlaying = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    clearHighlight();
    isSpeakingRef.current = false;
    isPausedRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    currentIndexRef.current = 0;
    setCurrentChunkIndex(0);
  }, [clearHighlight]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn("TTS nie je podporované.");
    } else {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopPlaying();
    };
  }, [stopPlaying]);

  // Nájdenie najlepšieho hlasu (Bod 6 — prioritizácia Premium hlasov)
  const getBestVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();
    if (!voices.length) return null;

    if (lang === 'sk') {
      // Preferujeme Enhanced/Premium slovenský hlas
      const premiumSk = voices.find(v => 
        (v.lang === 'sk-SK' || v.lang === 'sk_SK') && 
        (v.name.toLowerCase().includes('enhanced') || v.name.toLowerCase().includes('premium') || v.name.toLowerCase().includes('natural'))
      );
      if (premiumSk) return premiumSk;
      
      const skVoice = voices.find(v => v.lang === 'sk-SK' || v.lang === 'sk_SK');
      if (skVoice) return skVoice;
      
      // Fallback na češtinu (veľmi blízka)
      const czVoice = voices.find(v => v.lang === 'cs-CZ' || v.lang === 'cs_CZ');
      if (czVoice) return czVoice;
    } else {
      // Angličtina — preferujeme Google Enhanced alebo Apple Siri
      const premiumEn = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.toLowerCase().includes('enhanced') || v.name.toLowerCase().includes('premium') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google'))
      );
      if (premiumEn) return premiumEn;
      
      const enGB = voices.find(v => v.lang === 'en-GB');
      if (enGB) return enGB;
      const enUS = voices.find(v => v.lang === 'en-US');
      if (enUS) return enUS;
    }
    return voices.find(v => v.lang.startsWith(lang)) || voices[0];
  }, []);

  // Extrahovanie čitateľných elementov z DOM (nie klonovaním, ale priamo)
  const extractReadableElements = useCallback((): HTMLElement[] => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return [];

    // Vyberieme všetky blokové elementy, ktoré obsahujú text
    const allBlocks = contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span.sr-only");
    const readable: HTMLElement[] = [];

    allBlocks.forEach(el => {
      const htmlEl = el as HTMLElement;
      // Preskočíme elementy s no-tts alebo vnorené v no-tts
      if (htmlEl.closest(".no-tts") || htmlEl.classList.contains("no-tts")) return;
      // Preskočíme prázdne elementy
      const text = htmlEl.textContent?.trim();
      if (!text || text.length === 0) return;
      // Preskočíme tlačidlá
      if (htmlEl.closest("button")) return;
      
      readable.push(htmlEl);
    });

    return readable;
  }, [contentId]);

  const playNextChunk = useCallback(() => {
    if (!synthRef.current) return;
    if (isPausedRef.current) return;
    
    if (currentIndexRef.current >= elementsRef.current.length) {
      stopPlaying();
      return;
    }

    const el = elementsRef.current[currentIndexRef.current];
    
    // Karaoke highlight (Bod 1)
    // sr-only elementy nezvýrazňujeme vizuálne
    if (!el.classList.contains("sr-only")) {
      highlightElement(el);
    }

    // Extrahujeme text z elementu (bez vnorených no-tts)
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".no-tts, button").forEach(child => child.remove());
    let rawText = clone.textContent?.trim() || "";
    
    // Fonetické náhrady (Bod 2)
    const textToSpeak = applyPhoneticRules(rawText, language);
    
    if (!textToSpeak) {
      currentIndexRef.current++;
      setCurrentChunkIndex(prev => prev + 1);
      playNextChunk();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'en' ? "en-US" : "sk-SK";
    utterance.rate = speedRef.current; // Bod 4 — dynamická rýchlosť
    
    const bestVoice = getBestVoice(language);
    if (bestVoice) utterance.voice = bestVoice;
    
    utterance.onend = () => {
      currentIndexRef.current++;
      setCurrentChunkIndex(currentIndexRef.current);
      
      if (!isSpeakingRef.current) return;
      
      setTimeout(() => {
        if (isSpeakingRef.current && !isPausedRef.current) {
          playNextChunk();
        }
      }, 1000); // 1s pauza medzi blokmi
    };

    utterance.onerror = (e) => {
      console.error("TTS Error", e);
      stopPlaying();
    };

    synthRef.current.speak(utterance);
  }, [language, stopPlaying, highlightElement, getBestVoice]);

  const startPlaying = useCallback(() => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    
    elementsRef.current = extractReadableElements();
    currentIndexRef.current = 0;
    setCurrentChunkIndex(0);
    setTotalChunks(elementsRef.current.length);
    
    isSpeakingRef.current = true;
    isPausedRef.current = false;
    
    setIsPlaying(true);
    setIsPaused(false);
    
    playNextChunk();
  }, [extractReadableElements, playNextChunk]);

  const pausePlaying = useCallback(() => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resumePlaying = useCallback(() => {
    if (!synthRef.current) return;
    synthRef.current.resume();
    isPausedRef.current = false;
    setIsPaused(false);
    
    if (!synthRef.current.speaking && isSpeakingRef.current) {
        playNextChunk();
    }
  }, [playNextChunk]);

  // Bod 4 — Prepínanie rýchlosti
  const cycleSpeed = useCallback(() => {
    const nextIndex = (speedIndex + 1) % SPEED_OPTIONS.length;
    setSpeedIndex(nextIndex);
    speedRef.current = SPEED_OPTIONS[nextIndex];
  }, [speedIndex]);

  // UI
  return (
    <div className="flex items-center gap-1.5 bg-card border border-border rounded-full p-1 shadow-sm">
      
      {/* Tlačidlo Play / Pause */}
      {!isPlaying ? (
        <button
          onClick={startPlaying}
          className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
          aria-label="Prečítať nahlas"
        >
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </button>
      ) : isPaused ? (
        <button
          onClick={resumePlaying}
          className="w-9 h-9 rounded-full flex items-center justify-center text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
          aria-label="Pokračovať v čítaní"
        >
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </button>
      ) : (
        <button
          onClick={pausePlaying}
          className="w-9 h-9 rounded-full flex items-center justify-center text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label="Pozastaviť čítanie"
        >
          <Pause className="w-4 h-4 fill-current" />
        </button>
      )}

      {/* Tlačidlo Stop */}
      {isPlaying && (
        <button
          onClick={stopPlaying}
          className="w-9 h-9 rounded-full flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Zastaviť"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      )}

      {/* Tlačidlo Odznova (Replay) */}
      {isPlaying && isPaused && (
        <button
          onClick={startPlaying}
          className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label="Čítať odznova"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      {/* Bod 4 — Tlačidlo rýchlosti */}
      {isPlaying && (
        <button
          onClick={cycleSpeed}
          className="h-7 px-2 rounded-full flex items-center justify-center gap-1 text-[10px] font-bold text-muted-foreground hover:bg-muted transition-colors border border-border"
          aria-label="Zmeniť rýchlosť"
          title="Zmeniť rýchlosť čítania"
        >
          <Gauge className="w-3 h-3" />
          {SPEED_OPTIONS[speedIndex]}x
        </button>
      )}

    </div>
  );
}
