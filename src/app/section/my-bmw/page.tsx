"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Smartphone, PlayCircle, Download, Activity, Key } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "MY BMW",
    intro: "Vaše digitálne prepojenie s vozidlom.",
    
    app_h: "Aplikácia My BMW",
    app_p: "Aplikácia je vaše digitálne prepojenie s vozidlom. Ponúka funkcie pre plánovanie jázd, kontrolu stavu vozidla a vzdialené ovládanie. Je nápomocná pri vypisovaní elektronickej knihy jázd (EKJ).",
    
    feat_h: "Kľúčové funkcie",
    feat_1_title: "Kontrola stavu vozidla",
    feat_1_desc: "Hladina oleja, stav pneumatík, potreba servisu, dojazd.",
    feat_2_title: "Vzdialené ovládanie",
    feat_2_desc: "Odomknutie / zamknutie dverí, spustenie nezávislej ventilácie pred jazdou.",
    
    install_h: "Inštalácia a Návod",
    install_p: "Stiahnite si aplikáciu My BMW do svojho telefónu a spárujte ju so svojím vozidlom naskenovaním QR kódu na obrazovke iDrive.",
    video_btn: "Prehrať Video Návod (YouTube)",
  },
  en: {
    title: "MY BMW",
    intro: "Your digital connection to the vehicle.",
    
    app_h: "My BMW App",
    app_p: "The app is your digital connection to the vehicle. It offers features for trip planning, checking vehicle status, and remote control. It is helpful when filling out the electronic logbook (EKJ).",
    
    feat_h: "Key Features",
    feat_1_title: "Vehicle Status Check",
    feat_1_desc: "Oil level, tire condition, service requirements, range.",
    feat_2_title: "Remote Control",
    feat_2_desc: "Unlock / lock doors, start auxiliary ventilation before driving.",
    
    install_h: "Installation and Guide",
    install_p: "Download the My BMW app to your phone and pair it with your vehicle by scanning the QR code on the iDrive screen.",
    video_btn: "Play Video Guide (YouTube)",
  }
};

export default function MyBmwPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout title={t.title} contentId="content-my-bmw" headerAccent="blue">
      {/* Intro hero section s telefonom */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white p-8 rounded-3xl shadow-2xl mb-8 relative overflow-hidden border border-white/10 backdrop-blur-md">
        {/* Glow efekty v pozadi */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-20">
          <Smartphone className="w-56 h-56 no-tts drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">{t.app_h}</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-[85%] font-medium">
            {t.app_p}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Klucove funkcie */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest">{t.feat_h}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="group bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/90 dark:hover:bg-slate-800/80">
              <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Activity className="w-6 h-6 no-tts" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.feat_1_title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.feat_1_desc}</p>
              </div>
            </div>

            <div className="group bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/90 dark:hover:bg-slate-800/80">
              <div className="w-12 h-12 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Key className="w-6 h-6 no-tts" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t.feat_2_title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.feat_2_desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instalacia a Video */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
              <Download className="w-5 h-5 no-tts" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
              {t.install_h}
            </h3>
          </div>
          
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {t.install_p}
          </p>
          
          <a 
            href="https://www.youtube.com/watch?v=L1-eobVkAWw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border-2 border-transparent hover:border-blue-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500">
                <PlayCircle className="w-6 h-6 animate-pulse group-hover:animate-none" /> 
                <span className="drop-shadow-md">{t.video_btn}</span>
              </div>
            </div>
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://img.youtube.com/vi/L1-eobVkAWw/maxresdefault.jpg" 
              onError={(e) => { e.currentTarget.src = "https://img.youtube.com/vi/L1-eobVkAWw/hqdefault.jpg"; }}
              alt="My BMW App Video" 
              className="w-full h-auto object-cover aspect-video transform transition-transform duration-700 group-hover:scale-105"
            />
          </a>
        </div>
      </div>
    </SectionLayout>
  );
}
