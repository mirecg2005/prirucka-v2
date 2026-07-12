"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { ShieldAlert, FileText, CarFront, PhoneCall, Globe, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "Poistné Udalosti",
    intro: "Aktuálne máme vozidlá poistené cez poisťovňu Kooperativa.",
    green_title: "Zelené karty (poistné) 2026",
    green_desc: "Stiahnite si alebo zdieľajte aktuálne elektronické zelené karty pre služobné vozidlá.",
    green_note: "Stiahnutie je možné len zo služobných zariadení.",
    green_btn: "Otvoriť Zelené karty",
    kasko_title: "Havarijné poistenie KASKO",
    kasko_desc: "Všetky služobné vozidlá majú uzatvorené havarijné poistenie KASKO. Toto poistenie kryje škody na vlastnom vozidle spôsobené haváriou, živelnou udalosťou, vandalizmom alebo odcudzením.",
    report_title: "Hlásenie udalosti",
    report_desc: "Všetky poistné udalosti je nutné bezodkladne hlásiť maklérovi MARSH a v kópii vždy informovať oddelenie Mobility.",
    phone: "Telefón (MARSH):",
    email1: "Email (MARSH):",
    email2: "Email (Mobility - kópia):",
    abroad_title: "Zahraničie",
    abroad_p1: "V prípade udalosti v zahraničí sa postupuje individuálne. Bezodkladne kontaktujte MARSH pre inštrukcie.",
    abroad_p2: "Skontrolujte si platnosť a územný rozsah poistenia na vašej Zelenej karte (zoznam povolených krajín). Cesta do nepovolenej krajiny je zakázaná."
  },
  en: {
    title: "Insurance Claims",
    intro: "Currently, our vehicles are insured through Kooperativa.",
    green_title: "Green Cards (Insurance) 2026",
    green_desc: "Download or share the current electronic green cards for company vehicles.",
    green_note: "Downloading is only possible from company devices.",
    green_btn: "Open Green Cards",
    kasko_title: "KASKO Comprehensive",
    kasko_desc: "All company vehicles have KASKO comprehensive insurance. This covers damage to your own vehicle caused by an accident, natural disaster, vandalism, or theft.",
    report_title: "Reporting a Claim",
    report_desc: "All insurance claims must be immediately reported to the MARSH broker, with a copy always sent to Mobility.",
    phone: "Phone (MARSH):",
    email1: "Email (MARSH):",
    email2: "Email (Mobility - copy):",
    abroad_title: "Abroad",
    abroad_p1: "In the event of a claim abroad, contact the MARSH broker immediately for exact instructions.",
    abroad_p2: "Check the validity and territorial scope of insurance on your Green Card. Travel to an unlisted country is strictly prohibited."
  }
};

export default function InsurancePage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-insurance"
      headerAccent="indigo"
    >
      <div className="flex items-center gap-3 mb-8 bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 shadow-sm">
        <ShieldAlert className="w-8 h-8 text-indigo-600 dark:text-indigo-400 no-tts" />
        <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Zelené karty */}
          <div className="group bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <FileText className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] text-emerald-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                📄 {t.green_title}
              </span>
              <p className="text-sm font-medium text-emerald-50 mt-5 mb-6 drop-shadow-md">{t.green_desc}</p>
              
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md flex items-start gap-3 mb-6 shadow-inner border border-white/10">
                <AlertTriangle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5 no-tts drop-shadow-sm" />
                <p className="text-xs text-emerald-50 font-bold leading-relaxed">{t.green_note}</p>
              </div>

              <a 
                href="https://drive.google.com/drive/folders/1eEH9Dm1rRDRtth9gDw3ZTUYFUW9koLcT?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-white text-emerald-700 font-extrabold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <FileText className="w-5 h-5 no-tts" />
                {t.green_btn}
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Havarijné */}
            <div className="group bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white h-full border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <CarFront className="w-48 h-48 no-tts drop-shadow-2xl" />
              </div>
              <div className="relative z-10">
                <span className="bg-white/20 text-[10px] text-purple-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                  🛡️ {t.kasko_title}
                </span>
                <p className="text-sm text-purple-50 mt-5 leading-relaxed font-medium drop-shadow-md">{t.kasko_desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hlásenie */}
          <div className="group bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
              <PhoneCall className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] text-blue-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                📞 {t.report_title}
              </span>
              <p className="text-sm text-blue-50 mt-5 mb-6 font-bold leading-relaxed drop-shadow-md">
                {t.report_desc}
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-inner border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.phone}</span>
                  <a href="tel:+421902966689" className="text-sm font-black text-white hover:text-blue-200 drop-shadow-sm transition-colors">+421 902 966 689</a>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-inner border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.email1}</span>
                  <a href="mailto:autoskody@marsh.com" className="text-sm font-bold text-white hover:text-blue-200 drop-shadow-sm transition-colors">autoskody@marsh.com</a>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md flex justify-between items-center shadow-inner border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.email2}</span>
                  <a href="mailto:mobilita@lidl.sk" className="text-sm font-bold text-white hover:text-blue-200 drop-shadow-sm transition-colors">mobilita@lidl.sk</a>
                </div>
              </div>
            </div>
          </div>

          {/* Zahraničie */}
          <div className="group bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
              <Globe className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] text-slate-200 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                🌍 {t.abroad_title}
              </span>
              
              <div className="mt-6 space-y-4">
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md shadow-inner border border-white/10 hover:bg-white/20 transition-colors">
                  <p className="text-xs font-medium text-slate-100 leading-relaxed drop-shadow-sm">{t.abroad_p1}</p>
                </div>
                <div className="bg-rose-500/20 p-5 rounded-2xl backdrop-blur-md shadow-inner border border-rose-500/30 hover:bg-rose-500/30 transition-colors">
                  <p className="text-xs font-medium text-rose-50 leading-relaxed drop-shadow-sm">{t.abroad_p2}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SectionLayout>
  );
}
