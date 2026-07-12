"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { FileText, Calendar, Info, AlertTriangle, BookOpen } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "Kniha jázd (EKJ)",
    intro: "Správne a včasné vedenie knihy jázd je kľúčovou povinnosťou každého vodiča.",
    sec1_title: "Základné Pravidlá a Povinnosti",
    rule1_title: "Povinné vedenie:",
    rule1_desc: "Každý užívateľ je povinný viesť EKJ.",
    rule2_title: "Aktivácia:",
    rule2_desc: "Aktivácia vozidla a kariet v systéme prebehne do 3 týždňov od prebratia vozidla.",
    rule3_title: "Súkromné vs. Služobné jazdy:",
    rule3_desc: "Dôsledne rozlišujte medzi súkromnými a služobnými jazdami. Cesta medzi bydliskom a prácou je vždy súkromná.",
    rule4_title: "Voľné dni:",
    rule4_desc: "Počas dovolenky a dní pracovného voľna musia byť všetky kilometre vykázané ako súkromné.",
    sec2_title: "Dôležité Termíny",
    date1: "Spracovanie jázd: Vždy spätne za uplynulý mesiac, najneskôr do konca nasledujúceho mesiaca.",
    date2: "Nahrávanie tankovaní (SK): Prebieha automaticky 2. pracovný deň nasledujúceho mesiaca.",
    date3: "Nahrávanie tankovaní (Zahraničie): Synchronizujte až po 20. dni nasledujúceho mesiaca.",
    sec3_title: "Riešenie Problémov",
    sec3_desc: "Akékoľvek problémy s knihou jázd nahláste okamžite cez IT ticket na oddelenie Mobility."
  },
  en: {
    title: "Logbook (EKJ)",
    intro: "Proper and timely maintenance of the logbook is a key responsibility of every driver.",
    sec1_title: "Basic Rules and Duties",
    rule1_title: "Mandatory logging:",
    rule1_desc: "Every user is obliged to maintain an EKJ (Electronic Logbook).",
    rule2_title: "Activation:",
    rule2_desc: "Vehicle and card activation in the system will take place within 3 weeks of taking over the vehicle.",
    rule3_title: "Private vs. Business trips:",
    rule3_desc: "Strictly distinguish between private and business trips. The commute between home and work is always private.",
    rule4_title: "Days off:",
    rule4_desc: "During holidays and days off, all mileage must be reported as private.",
    sec2_title: "Important Deadlines",
    date1: "Trip processing: Always retroactively for the past month, no later than the end of the following month.",
    date2: "Refueling upload (SK): Runs automatically on the 2nd working day of the following month.",
    date3: "Refueling upload (Abroad): Synchronize only after the 20th day of the following month.",
    sec3_title: "Troubleshooting",
    sec3_desc: "Report any issues with the logbook immediately via IT ticket to the Mobility department."
  }
};

export default function LogbookPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-logbook"
      headerAccent="orange"
    >
      <div className="flex items-center gap-3 mb-8 bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl border border-orange-200 dark:border-orange-900/50 shadow-sm">
        <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400 no-tts" />
        <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Pravidlá a povinnosti */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Info className="w-48 h-48 no-tts drop-shadow-2xl" />
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-blue-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              ℹ️ {t.sec1_title}
            </span>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors shadow-inner">
                <span className="font-bold text-white block mb-2 text-sm drop-shadow-md">{t.rule1_title}</span>
                <span className="text-xs text-blue-50 leading-relaxed">{t.rule1_desc}</span>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors shadow-inner">
                <span className="font-bold text-white block mb-2 text-sm drop-shadow-md">{t.rule2_title}</span>
                <span className="text-xs text-blue-50 leading-relaxed">{t.rule2_desc}</span>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors shadow-inner">
                <span className="font-bold text-white block mb-2 text-sm drop-shadow-md">{t.rule3_title}</span>
                <span className="text-xs text-blue-50 leading-relaxed">{t.rule3_desc}</span>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors shadow-inner">
                <span className="font-bold text-white block mb-2 text-sm drop-shadow-md">{t.rule4_title}</span>
                <span className="text-xs text-blue-50 leading-relaxed">{t.rule4_desc}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Termíny */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white h-full border border-white/10 backdrop-blur-md">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <Calendar className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] text-emerald-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                📅 {t.sec2_title}
              </span>
              
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner hover:bg-white/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"><span className="text-xs font-bold text-white no-tts">✓</span></div>
                  <span className="text-emerald-50 text-xs leading-relaxed">{t.date1}</span>
                </li>
                <li className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner hover:bg-white/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"><span className="text-xs font-bold text-white no-tts">✓</span></div>
                  <span className="text-emerald-50 text-xs leading-relaxed">{t.date2}</span>
                </li>
                <li className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner hover:bg-white/20 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"><span className="text-xs font-bold text-white no-tts">✓</span></div>
                  <span className="text-emerald-50 text-xs leading-relaxed">{t.date3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Problémy */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white h-full border border-white/10 backdrop-blur-md">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <AlertTriangle className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div>
                <span className="bg-white/20 text-[10px] text-amber-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                  ⚠️ {t.sec3_title}
                </span>
                <p className="mt-6 text-sm text-amber-50 leading-relaxed font-bold drop-shadow-md">
                  {t.sec3_desc}
                </p>
              </div>
              <div className="mt-auto pt-8">
                <div className="bg-white/20 hover:bg-white/30 transition-colors cursor-pointer p-4 rounded-2xl border border-white/20 flex justify-center items-center gap-3 text-white font-bold text-sm shadow-lg backdrop-blur-md">
                  <FileText className="w-5 h-5 no-tts drop-shadow-md" />
                  Zadajte IT Ticket
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SectionLayout>
  );
}
