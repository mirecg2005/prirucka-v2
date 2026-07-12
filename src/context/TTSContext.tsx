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
  
  // Reference to hold available voices
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  
  // Load voices when they are ready
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getBestVoice = (lang: string) => {
    const voices = voicesRef.current;
    if (!voices.length) return null;
    
    // If Slovak, prefer 'sk-SK', fallback to 'cs-CZ' (Czech sounds very close)
    if (lang === 'sk') {
      const skVoice = voices.find(v => v.lang === 'sk-SK' || v.lang === 'sk_SK');
      if (skVoice) return skVoice;
      
      const czVoice = voices.find(v => v.lang === 'cs-CZ' || v.lang === 'cs_CZ');
      if (czVoice) return czVoice;
    } else {
      // English
      const enGB = voices.find(v => v.lang === 'en-GB' && v.name.includes('Google'));
      if (enGB) return enGB;
      const enUS = voices.find(v => v.lang === 'en-US');
      if (enUS) return enUS;
    }
    
    // Default fallback
    return voices.find(v => v.lang.startsWith(lang)) || voices[0];
  };

  // The actual play function
  const play = useCallback((text: string, forceLanguage?: 'sk' | 'en') => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Stop anything currently playing
    window.speechSynthesis.cancel();
    
    // Phonetic replacements for better Slovak output
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
        .replace(/\.([^\s\.])/g, '. $1') // Vynútenie medzery za bodkou, ak chýba
        .replace(/\./g, '. ... ') // Dlhšia pauza na konci vety (viac zdôrazňuje)
        .replace(/!/g, '! ... ') // Dlhšia pauza po výkričníku
        .replace(/\(/g, ', ') // Zátvorky číta prirodzenejšie s pauzou
        .replace(/\)/g, ', ');
    }

    setCurrentText(processedText);
    setState("playing");

    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.lang = targetLang === 'sk' ? 'sk-SK' : 'en-US';
    
    // Best voice selection
    const bestVoice = getBestVoice(targetLang);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    // Set rate slower for clearer and more emphasized instructions
    utterance.rate = 0.75;
    
    utterance.onend = () => {
      setState("idle");
      setCurrentText("");
    };
    
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setState("idle");
    };

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setState("idle");
    setCurrentText("");
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setState("playing");
  }, []);

  // Ensure we cancel speech if the component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
