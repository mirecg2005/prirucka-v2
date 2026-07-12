"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface TTSButtonProps {
  contentId: string;
}

export default function TTSButton({ contentId }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chunksRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);
  const isPausedRef = useRef(false);

  const stopPlaying = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    isSpeakingRef.current = false;
    isPausedRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    currentIndexRef.current = 0;
  };

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn("TTS nie je podporované.");
    }
    return () => {
      stopPlaying();
    };
  }, []);

  const extractText = () => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return [];

    const clone = contentElement.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("button, .no-tts").forEach((el) => el.remove());
    
    // Pridáme špeciálny oddeľovač nakoniec každého blokového elementu (bez zničenia vnútorného HTML)
    clone.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li").forEach(el => {
      el.insertAdjacentText("beforeend", " |PAUSE| ");
    });

    const textToSpeak = clone.textContent || "";
    // Rozdelíme text podľa našich páuz, odstránime prázdne a získame presné "kúsky" (chunks)
    return textToSpeak.split("|PAUSE|").map(s => s.trim()).filter(s => s.length > 0);
  };

  const playNextChunk = () => {
    if (!synthRef.current) return;
    if (isPausedRef.current) return; // Ak je pauza, nepokračuj v reťazci
    
    if (currentIndexRef.current >= chunksRef.current.length) {
      // Sme na konci
      stopPlaying();
      return;
    }

    const chunk = chunksRef.current[currentIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = language === 'en' ? "en-US" : "sk-SK";
    utterance.rate = 0.8; // Ešte pomalšie
    
    utterance.onend = () => {
      // Keď dočíta chunk, počkáme 1.2 sekundy (1200ms) a pustíme ďalší!
      currentIndexRef.current++;
      
      if (!isSpeakingRef.current) return; // Ak to medzitým stopol
      
      setTimeout(() => {
        if (isSpeakingRef.current && !isPausedRef.current) {
          playNextChunk();
        }
      }, 1200); // REÁLNA DLHÁ PAUZA (1.2s)
    };

    utterance.onerror = (e) => {
      console.error("TTS Error", e);
      stopPlaying();
    };

    synthRef.current.speak(utterance);
  };

  const startPlaying = () => {
    if (!synthRef.current) return;

    // Zrušíme čokoľvek, čo hralo pred tým
    synthRef.current.cancel();
    
    chunksRef.current = extractText();
    currentIndexRef.current = 0;
    
    isSpeakingRef.current = true;
    isPausedRef.current = false;
    
    setIsPlaying(true);
    setIsPaused(false);
    
    playNextChunk();
  };

  const pausePlaying = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const resumePlaying = () => {
    if (!synthRef.current) return;
    synthRef.current.resume();
    isPausedRef.current = false;
    setIsPaused(false);
    
    // Ak to bolo pauznuté medzi chunkami (v setTimeoute), treba ručne zavolať playNextChunk
    if (!synthRef.current.speaking && isSpeakingRef.current) {
        playNextChunk();
    }
  };



  // UI
  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-full p-1 shadow-sm">
      
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
          className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors border-l border-border rounded-l-none"
          aria-label="Čítať odznova"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
