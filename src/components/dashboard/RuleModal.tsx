"use client";

import React, { useEffect } from "react";
import { X, ShieldAlert, Play, Pause, Square, Volume2 } from "lucide-react";
import { useTTS } from "@/context/TTSContext";

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule: {
    id: string;
    title: string;
    content: string;
  } | null;
  autoPlay?: boolean;
}

export default function RuleModal({ isOpen, onClose, rule, autoPlay }: RuleModalProps) {
  const { state: ttsState, play, stop, pause, resume, currentText } = useTTS();
  
  // Clean up TTS when modal closes
  useEffect(() => {
    if (!isOpen) {
      stop();
    }
  }, [isOpen, stop]);

  // Handle autoPlay when opened
  useEffect(() => {
    if (isOpen && rule && autoPlay && ttsState === "idle") {
      // Small timeout to ensure modal is rendered
      const timer = setTimeout(() => {
        play(rule.content);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, rule, autoPlay, play, ttsState]);

  if (!isOpen || !rule) return null;

  const isPlaying = ttsState === "playing";
  const isPaused = ttsState === "paused";

  const handlePlayToggle = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      play(rule.content);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3 pr-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white leading-tight">
              {rule.title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {rule.content}
        </div>

        {/* Footer / TTS Controls */}
        <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 border-t border-indigo-100 dark:border-indigo-900/50 flex flex-col items-center gap-3 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Hlasový asistent
          </span>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={handlePlayToggle}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>

            {(isPlaying || isPaused) && (
              <button 
                onClick={stop}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all active:scale-95"
              >
                <Square className="w-5 h-5 fill-current" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
