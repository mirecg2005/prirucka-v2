"use client";

import React, { useState } from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { BookOpen, AlertTriangle, FileCheck2, ExternalLink, ShieldCheck, Scale, Car, Activity, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import TTSButton from "@/components/tools/TTSButton";
import InteractiveTTSWrapper from "@/components/tools/InteractiveTTSWrapper";

const dict = {
  sk: {
    title: "Pravidlá a Pokuty",
    intro: "Základné pravidlá, zákonné povinnosti a riešenie pokút.",
    
    // Zakladne pravidla
    basic_h2: "Základné Pravidlá",
    rule1_h: "Zákaz fajčenia", rule1_p: "Vo všetkých služobných vozidlách platí prísny zákaz fajčenia!",
    rule2_h: "Doklady a karty", rule2_p: "Nikdy nenechávajte doklady od vozidla a tankovacie karty vo vozidle.",
    rule3_h: "Zamykanie", rule3_p: "Pri každom opustení vozidla je užívateľ povinný ho riadne uzamknúť a vziať si kľúč.",
    rule4_h: "Čistota", rule4_p: "Udržujte čistotu. Čistenie interiéru na náklady spol. Lidl je zakázané.",
    rule5_h: "Poistenie", rule5_p: "Vozidlo je poistené. Poistenie sa nevzťahuje na súkromné veci vo vozidle.",
    rule6_h: "Parkovacia politika", rule6_p: "Pre parkovaciu politiku (PAAS) stačí predložiť Dohodu o používaní služobného vozidla a Splnomocnenie o používaní vozidla na súkromné účely.",

    fines_h2: "Riešenie Pokút",
    fines_s1_h: "Doručenie pokuty", fines_s1_p: "Pokuta je doručená spoločnosti Lidl ako držiteľovi vozidla.",
    fines_s2_h: "Identifikácia", fines_s2_p: "Oddelenie Mobility identifikuje vodiča a pošle výzvu na úhradu. (pokuty@lidl.sk).",
    fines_s3_h: "Úhrada", fines_s3_p: "Zamestnanec o úhrade pokuty bezodkladne informuje zaslaním potvrdenia o úhrade na (pokuty@lidl.sk)",

    calc_h: "Kalkulačka Pokút", calc_desc: "Odhadovaná bloková pokuta za rýchlosť (SR).",
    calc_in: "V obci (limity 50)", calc_out: "Mimo obce", calc_over: "Prekročenie o:", calc_res_lbl: "Odhadovaná pokuta",
    calc_note: "* Kalkulované podľa sadzobníka blokových pokút udelených na mieste."
  },
  en: {
    title: "Rules & Fines",
    intro: "Basic rules, legal obligations, and fine processing.",
    
    basic_h2: "Basic Rules",
    rule1_h: "No Smoking", rule1_p: "Strict no-smoking policy in all company vehicles!",
    rule2_h: "Documents & Cards", rule2_p: "Never leave vehicle docs and fuel cards in the car.",
    rule3_h: "Locking", rule3_p: "Always lock the vehicle and take the key.",
    rule4_h: "Cleanliness", rule4_p: "Keep it clean. Interior cleaning at Lidl's expense is prohibited.",
    rule5_h: "Insurance", rule5_p: "Vehicle is insured. Private belongings are not covered.",
    rule6_h: "Parking Policy", rule6_p: "For parking policy (PAAS), provide the Vehicle Use Agreement and Power of Attorney.",

    fines_h2: "Fine Resolution",
    fines_s1_h: "Delivery", fines_s1_p: "Fine delivered to Lidl as the vehicle owner.",
    fines_s2_h: "Identification", fines_s2_p: "Mobility Dept identifies the driver and sends a payment request (pokuty@lidl.sk).",
    fines_s3_h: "Payment", fines_s3_p: "The employee must immediately inform about the fine payment by sending a confirmation to (pokuty@lidl.sk)",

    calc_h: "Fine Calculator", calc_desc: "Estimated speeding block fine (SK).",
    calc_in: "Urban area (limit 50)", calc_out: "Outside urban area", calc_over: "Exceeded by:", calc_res_lbl: "Estimated Fine",
    calc_note: "* Estimated based on the tariff for on-the-spot block fines."
  }
};

export default function RulesPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);



  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-rules"
      headerAccent="purple"
      hideGlobalTTS={true}
    >
      <div className="flex items-center gap-3 mb-8 bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 shadow-sm">
        <Scale className="w-8 h-8 text-purple-600 dark:text-purple-400 no-tts" />
        <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-10">
        
        {/* ZAKLADNE PRAVIDLA */}
        <section id="tts-basic-rules">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider text-sm flex items-center gap-2">
              <BookOpen className="w-5 h-5 no-tts" /> {t.basic_h2}
            </h2>
            <div className="scale-75 origin-right no-tts"><TTSButton contentId="tts-basic-rules" /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">🚭</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule1_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule1_p}</p>
            </InteractiveTTSWrapper>
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">📄</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule2_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule2_p}</p>
            </InteractiveTTSWrapper>
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">🔑</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule3_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule3_p}</p>
            </InteractiveTTSWrapper>
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">🧼</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule4_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule4_p}</p>
            </InteractiveTTSWrapper>
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">🛡️</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule5_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule5_p}</p>
            </InteractiveTTSWrapper>
            <InteractiveTTSWrapper className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center">
              <span className="text-3xl mb-2 no-tts block">🅿️</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule6_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule6_p}</p>
            </InteractiveTTSWrapper>
          </div>
        </section>



        {/* POKUTY & KALKULACKA */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider text-sm flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 no-tts" /> {t.fines_h2}
            </h2>
            <div className="scale-75 origin-right no-tts"><TTSButton contentId="tts-fines-content" /></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            
            <div id="tts-fines-content" className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <ol className="relative border-l-2 border-blue-200 dark:border-blue-800 space-y-6 ml-3 mb-6">
                <li className="ml-6 relative">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[37px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">1</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.fines_s1_h}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.fines_s1_p}</p>
                </li>
                <li className="ml-6 relative">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[37px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">2</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.fines_s2_h}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.fines_s2_p}</p>
                </li>
                <li className="ml-6 relative">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[37px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">3</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.fines_s3_h}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.fines_s3_p}</p>
                </li>
              </ol>
            </div>



          </div>
        </section>

      </div>
    </SectionLayout>
  );
}
