"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick: () => void;
  color: "red" | "blue" | "slate";
}

const stylesMap = {
  red: {
    bg: "from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700",
    hoverBg: "hover:from-red-400 hover:to-rose-500 dark:hover:from-red-500 dark:hover:to-rose-600",
    shadow: "shadow-red-500/30",
    iconBg: "bg-white/20 text-white",
  },
  blue: {
    bg: "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
    hoverBg: "hover:from-blue-400 hover:to-indigo-500 dark:hover:from-blue-500 dark:hover:to-indigo-600",
    shadow: "shadow-blue-500/30",
    iconBg: "bg-white/20 text-white",
  },
  slate: {
    bg: "from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800",
    hoverBg: "hover:from-slate-400 hover:to-slate-600 dark:hover:from-slate-500 dark:hover:to-slate-700",
    shadow: "shadow-slate-500/30",
    iconBg: "bg-white/20 text-white",
  },
};

export default function QuickActionCard({ title, subtitle, icon: Icon, onClick, color }: QuickActionCardProps) {
  const s = stylesMap[color];

  return (
    <button 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.bg} ${s.hoverBg} p-5 flex items-center gap-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950 shadow-lg ${s.shadow} hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] cursor-pointer w-full min-h-[100px]`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 backdrop-blur-sm ${s.iconBg}`}>
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>

      <div className="flex flex-col relative z-10">
        <h3 className="font-extrabold text-white text-lg md:text-xl leading-tight mb-1 drop-shadow-sm">
          {title}
        </h3>
        <p className="text-white/90 text-sm leading-snug font-medium">
          {subtitle}
        </p>
      </div>
    </button>
  );
}
