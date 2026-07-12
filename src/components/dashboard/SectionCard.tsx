"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  accentColor?: "blue" | "red" | "yellow" | "gray" | "green" | "purple" | "indigo" | "orange" | "cyan";
}

const stylesMap = {
  blue: {
    bg: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-slate-900",
    border: "border-blue-200 dark:border-blue-800/50",
    iconBg: "bg-white dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-blue-200/50 dark:shadow-blue-900/30",
    hoverBorder: "group-hover:border-blue-400 dark:group-hover:border-blue-500/50",
    glow: "bg-blue-400/20",
  },
  red: {
    bg: "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-slate-900",
    border: "border-red-200 dark:border-red-800/50",
    iconBg: "bg-white dark:bg-red-900/50 text-red-600 dark:text-red-400 shadow-red-200/50 dark:shadow-red-900/30",
    hoverBorder: "group-hover:border-red-400 dark:group-hover:border-red-500/50",
    glow: "bg-red-400/20",
  },
  yellow: {
    bg: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-slate-900",
    border: "border-yellow-200 dark:border-yellow-800/50",
    iconBg: "bg-white dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 shadow-yellow-200/50 dark:shadow-yellow-900/30",
    hoverBorder: "group-hover:border-yellow-400 dark:group-hover:border-yellow-500/50",
    glow: "bg-yellow-400/20",
  },
  green: {
    bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-slate-900",
    border: "border-green-200 dark:border-green-800/50",
    iconBg: "bg-white dark:bg-green-900/50 text-green-600 dark:text-green-400 shadow-green-200/50 dark:shadow-green-900/30",
    hoverBorder: "group-hover:border-green-400 dark:group-hover:border-green-500/50",
    glow: "bg-green-400/20",
  },
  purple: {
    bg: "from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-slate-900",
    border: "border-purple-200 dark:border-purple-800/50",
    iconBg: "bg-white dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 shadow-purple-200/50 dark:shadow-purple-900/30",
    hoverBorder: "group-hover:border-purple-400 dark:group-hover:border-purple-500/50",
    glow: "bg-purple-400/20",
  },
  indigo: {
    bg: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-slate-900",
    border: "border-indigo-200 dark:border-indigo-800/50",
    iconBg: "bg-white dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-indigo-200/50 dark:shadow-indigo-900/30",
    hoverBorder: "group-hover:border-indigo-400 dark:group-hover:border-indigo-500/50",
    glow: "bg-indigo-400/20",
  },
  orange: {
    bg: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-slate-900",
    border: "border-orange-200 dark:border-orange-800/50",
    iconBg: "bg-white dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 shadow-orange-200/50 dark:shadow-orange-900/30",
    hoverBorder: "group-hover:border-orange-400 dark:group-hover:border-orange-500/50",
    glow: "bg-orange-400/20",
  },
  cyan: {
    bg: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-slate-900",
    border: "border-cyan-200 dark:border-cyan-800/50",
    iconBg: "bg-white dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 shadow-cyan-200/50 dark:shadow-cyan-900/30",
    hoverBorder: "group-hover:border-cyan-400 dark:group-hover:border-cyan-500/50",
    glow: "bg-cyan-400/20",
  },
  gray: {
    bg: "from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900",
    border: "border-slate-200 dark:border-slate-700",
    iconBg: "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-slate-200/50 dark:shadow-slate-900/30",
    hoverBorder: "group-hover:border-slate-400 dark:group-hover:border-slate-600",
    glow: "bg-slate-400/20",
  },
};

export default function SectionCard({ title, icon: Icon, onClick, accentColor = "gray" }: SectionCardProps) {
  const s = stylesMap[accentColor] || stylesMap.gray;

  return (
    <button 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border ${s.border} ${s.hoverBorder} bg-gradient-to-br ${s.bg} p-5 min-h-[130px] flex flex-col items-center justify-center text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-950 shadow-sm hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] active:translate-y-0 active:shadow-md cursor-pointer`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Ambient glow inside card on hover */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none ${s.glow}`}></div>

      {/* Glassmorphism subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 dark:from-white/10 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        {/* Icon Container with pop effect */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-md ${s.iconBg}`}>
          <Icon className="w-7 h-7 transition-colors duration-300" strokeWidth={1.75} />
        </div>
        
        {/* Title */}
        <span className="text-[13px] md:text-[15px] font-bold text-slate-700 dark:text-slate-200 transition-colors leading-tight group-hover:text-slate-900 dark:group-hover:text-white max-w-full truncate px-1">
          {title}
        </span>
      </div>
    </button>
  );
}
