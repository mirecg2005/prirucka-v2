"use client";

import React from "react";
import { useTTS } from "@/context/TTSContext";
import { Volume2, X, Pause, Play } from "lucide-react";

export default function TTSGlobalPlayer() {
  const { state, stop, pause, resume } = useTTS();

  if (state === "idle") return null;

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl shadow-slate-900/50 border border-slate-700/50 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-full">
            <Volume2 className="w-5 h-5 text-indigo-400" />
            <div className="absolute inset-0 border-2 border-indigo-400 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Audio Sprievodca
            </span>
            <span className="text-sm font-medium">
              Prehráva sa obsah...
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {state === "playing" ? (
            <button 
              onClick={pause}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
              title="Pauza"
            >
              <Pause className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button 
              onClick={resume}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
              title="Pokračovať"
            >
              <Play className="w-5 h-5 fill-current ml-1" />
            </button>
          )}
          
          <button 
            onClick={stop}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
            title="Zavrieť"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
