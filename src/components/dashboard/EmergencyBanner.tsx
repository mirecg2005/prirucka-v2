"use client";

import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

interface EmergencyBannerProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function EmergencyBanner({ title, subtitle, onClick }: EmergencyBannerProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-red-600 hover:bg-red-500 active:bg-red-500 text-white rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg hover:shadow-red-500/40 active:shadow-lg active:shadow-red-500/40 hover:border-red-400 active:border-red-400 border border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 touch-manipulation cursor-pointer group"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="flex items-center gap-3 text-left">
        <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
          <AlertTriangle className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="font-bold text-lg tracking-wide">{title}</h2>
          <p className="text-sm font-medium text-red-100">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="w-6 h-6 text-red-200" />
    </button>
  );
}
