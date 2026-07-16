"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { ShieldAlert, PhoneCall, FileText, Camera } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AccidentPage() {
  const { t } = useLanguage();

  return (
    <SectionLayout 
      title={t('accident.title')} 
      contentId="content-accident"
      headerAccent="red"
    >
      <div className="text-sm font-medium text-muted-foreground mb-4">
        {t('accident.intro')}
      </div>

      {/* Krok 1 */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
        <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
          <span className="sr-only">{t('accident.step.1')}</span>
          <span className="no-tts bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">1</span>
          {t('accident.step1.title')}
        </h2>
        <ul className="space-y-3 text-sm text-foreground/90">
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5 no-tts">•</span>
            <span>{t('accident.step1.bullet1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5 no-tts">•</span>
            <span>{t('accident.step1.bullet2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5 no-tts">•</span>
            <span>{t('accident.step1.bullet3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5 no-tts">•</span>
            <span>{t('accident.step1.bullet4')}</span>
          </li>
        </ul>
      </div>

      {/* Krok 2 */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden mt-4 group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
        <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
          <span className="sr-only">{t('accident.step.2')}</span>
          <span className="no-tts bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">2</span>
          {t('accident.step2.title')}
        </h2>
        <p className="text-sm text-foreground/90 mb-4">
          {t('accident.step2.desc')}
        </p>
        <a 
          href="tel:112" 
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-black tracking-widest text-xl shadow-md transition-colors"
        >
          <PhoneCall className="w-6 h-6 no-tts" />
          112
        </a>
      </div>

      {/* Krok 3 */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden mt-4 group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
          <span className="sr-only">{t('accident.step.3')}</span>
          <span className="no-tts bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">3</span>
          {t('accident.step3.title')}
        </h2>
        <ul className="space-y-3 text-sm text-foreground/90 mb-4">
          <li className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5 no-tts" />
            <span>{t('accident.step3.bullet1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5 no-tts" />
            <span>{t('accident.step3.bullet2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5 no-tts" />
            <span>{t('accident.step3.bullet3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5 no-tts" />
            <span>{t('accident.step3.bullet4')}</span>
          </li>
        </ul>
      </div>

      {/* Krok 4 */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden mt-4 group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
        <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
          <span className="sr-only">{t('accident.step.4')}</span>
          <span className="no-tts bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">4</span>
          {t('accident.step4.title')}
        </h2>
        <p className="text-sm text-foreground/90 mb-4">
          {t('accident.step4.desc')}
        </p>
        
        <ul className="space-y-3 text-sm text-foreground/90 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold no-tts">1.</span>
            <span><strong>{t('accident.step4.doc1')}</strong> {t('accident.step4.doc1_desc')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold no-tts">2.</span>
            <span><strong>{t('accident.step4.doc2')}</strong> {t('accident.step4.doc2_desc')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold no-tts">3.</span>
            <span><strong>{t('accident.step4.doc3')}</strong> {t('accident.step4.doc3_desc')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold no-tts">4.</span>
            <span><strong>{t('accident.step4.doc4')}</strong> {t('accident.step4.doc4_desc')}</span>
          </li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
          <label className="border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 bg-card hover:bg-muted transition-colors cursor-pointer shadow-sm group no-tts">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full group-active:scale-95 transition-transform">
              <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400 no-tts" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-foreground block">{t('accident.camera.btn')}</span>
              <span className="text-[10px] text-muted-foreground block">{t('accident.camera.desc')}</span>
            </div>
            <input type="file" accept="image/*" capture="environment" className="hidden" />
          </label>
          
          <a 
            href="https://easf.eu/" 
            target="_blank" 
            rel="noreferrer"
            className="border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 bg-card hover:bg-muted transition-colors cursor-pointer shadow-sm group no-tts"
          >
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full group-active:scale-95 transition-transform">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400 no-tts" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-foreground block">{t('accident.pdf.btn')}</span>
              <span className="text-[10px] text-muted-foreground block">{t('accident.pdf.desc')}</span>
            </div>
          </a>
        </div>
      </div>

      {/* Krok 5 */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
        <h2 className="font-bold text-lg text-foreground flex items-center gap-2 mb-3">
          <span className="sr-only">{t('accident.step.5')}</span>
          <span className="no-tts bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">5</span>
          {t('accident.step5.title')}
        </h2>
        <p className="text-sm text-foreground/90 mb-4">
          {t('accident.step5.desc')}
        </p>

        {/* TTS only text pre lehoty */}
        <span className="sr-only">{t('accident.deadline.tts')}</span>

        <div className="grid grid-cols-2 gap-3 mb-5 no-tts">
          <div className="bg-muted p-3 rounded-xl border border-border text-center flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-red-500">15</span>
            <span className="text-xs font-semibold mt-1">{t('accident.deadline.sk')}</span>
          </div>
          <div className="bg-muted p-3 rounded-xl border border-border text-center flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-orange-500">30</span>
            <span className="text-xs font-semibold mt-1">{t('accident.deadline.abroad')}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4 text-center">
          {t('accident.deadline.warning')}
        </p>

        <a 
          href="tel:+421902966689" 
          className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm shadow transition-colors no-tts"
        >
          <PhoneCall className="w-5 h-5 no-tts" />
          {t('accident.marsh.btn')}
        </a>
      </div>
      
    </SectionLayout>
  );
}
