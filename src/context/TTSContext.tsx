"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type TTSState = "idle" | "playing" | "paused";

interface TTSContextType {
  state: TTSState;
  play: (text: string, forceLanguage?: 'sk' | 'en') => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  currentText: string;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TTSState>("idle");
  const [currentText, setCurrentText] = useState("");
  const { language } = useLanguage();
  
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  
  // Chunks ref pre stabilnejsie prehravanie na mobiloch
  const chunksRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);
  const isPausedRef = useRef(false);
  
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const loadVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = (lang: string) => {
    const voices = voicesRef.current;
    if (!voices.length) return null;
    if (lang === 'sk') {
      const skVoice = voices.find(v => v.lang === 'sk-SK' || v.lang === 'sk_SK');
      if (skVoice) return skVoice;
      const czVoice = voices.find(v => v.lang === 'cs-CZ' || v.lang === 'cs_CZ');
      if (czVoice) return czVoice;
    } else {
      const enGB = voices.find(v => v.lang === 'en-GB' && v.name.includes('Google'));
      if (enGB) return enGB;
      const enUS = voices.find(v => v.lang === 'en-US');
      if (enUS) return enUS;
    }
    return voices.find(v => v.lang.startsWith(lang)) || voices[0];
  };

  const playNextChunk = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (isPausedRef.current) return;
    
    if (currentIndexRef.current >= chunksRef.current.length) {
      // Sme na konci
      isSpeakingRef.current = false;
      setState("idle");
      setCurrentText("");
      return;
    }

    const chunk = chunksRef.current[currentIndexRef.current];
    const targetLang = language; // Or forceLanguage if we stored it
    const utterance = new SpeechSynthesisUtterance(chunk);
    
    utterance.lang = targetLang === 'sk' ? 'sk-SK' : 'en-US';
    const bestVoice = getBestVoice(targetLang);
    if (bestVoice) utterance.voice = bestVoice;
    utterance.rate = 0.8;
    
    utterance.onend = () => {
      currentIndexRef.current++;
      if (!isSpeakingRef.current) return;
      
      setTimeout(() => {
        if (isSpeakingRef.current && !isPausedRef.current) {
          playNextChunk();
        }
      }, 800); // 800ms pauza medzi vetami
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      isSpeakingRef.current = false;
      setState("idle");
    };

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const play = useCallback((text: string, forceLanguage?: 'sk' | 'en') => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    
    let processedText = text;
    const targetLang = forceLanguage || language;
    
    if (targetLang === 'sk') {
      processedText = processedText
        .replace(/BMW/g, 'Bé em vé')
        .replace(/iDrive/gi, 'aj drajv')
        .replace(/AdBlue/gi, 'Adblú')
        .replace(/\b158\b/g, 'sto päťdesiat osem')
        .replace(/\b112\b/g, 'sto dvanásť')
        .replace(/\b150\b/g, 'sto päťdesiat')
        .replace(/MARSH/g, 'Marš')
        .replace(/Marsh/g, 'Marš');
    }

    // Rozdelime text na kratsie vety pre mobily (napr. podla bodiek a novych riadkov)
    // pridali sme | ako separator, mozeme ho vyuzit aj na "..."
    const chunks = processedText
      .replace(/\.\.\./g, '|')
      .replace(/\./g, '.|')
      .replace(/!/g, '!|')
      .replace(/\n/g, '|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    chunksRef.current = chunks;
    currentIndexRef.current = 0;
    isSpeakingRef.current = true;
    isPausedRef.current = false;
    
    setCurrentText(processedText);
    setState("playing");
    
    playNextChunk();
  }, [language, playNextChunk]);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;
    isPausedRef.current = false;
    currentIndexRef.current = 0;
    setState("idle");
    setCurrentText("");
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    isPausedRef.current = true;
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    isPausedRef.current = false;
    setState("playing");
    
    if (!window.speechSynthesis.speaking && isSpeakingRef.current) {
        playNextChunk();
    }
  }, [playNextChunk]);

  return (
    <TTSContext.Provider value={{ state, play, stop, pause, resume, currentText }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const context = useContext(TTSContext);
  if (context === undefined) {
    throw new Error("useTTS must be used within a TTSProvider");
  }
  return context;
}
