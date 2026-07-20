"use client";

import React, { useState, useMemo } from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { BookOpen, AlertTriangle, FileCheck2, ExternalLink, ShieldCheck, Scale, Car, Activity, Zap, Calculator } from "lucide-react";
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
    rule6_h: "Parkovacia politika", rule6_p: "Pre parkovaciu politiku v Bratislave (PAAS) stačí predložiť Dohodu o používaní služobného vozidla a Splnomocnenie o používaní vozidla na súkromné účely. Mimo Bratislavy je postup individuálny.",

    fines_h2: "Riešenie Pokút",
    fines_s1_h: "Doručenie pokuty", fines_s1_p: "Pokuta je doručená spoločnosti Lidl ako držiteľovi vozidla.",
    fines_s2_h: "Identifikácia", fines_s2_p: "Oddelenie Mobility identifikuje vodiča a pošle výzvu na úhradu.",
    fines_s3_h: "Úhrada", fines_s3_p: "Zamestnanec musí pokutu bezodkladne uhradiť (pokuty@lidl.sk).",
    fines_warn_h: "Dôležité upozornenie", fines_warn_p: "Ak zamestnanec pokutu neuhradí, suma mu bude stiahnutá zo mzdy.",

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
    rule6_h: "Parking Policy", rule6_p: "For Bratislava parking (PAAS), provide the Vehicle Use Agreement and Power of Attorney. Outside Bratislava, the process varies.",

    fines_h2: "Fine Resolution",
    fines_s1_h: "Delivery", fines_s1_p: "Fine delivered to Lidl as the vehicle owner.",
    fines_s2_h: "Identification", fines_s2_p: "Mobility Dept identifies driver and sends a payment request.",
    fines_s3_h: "Payment", fines_s3_p: "Employee must pay the fine immediately (pokuty@lidl.sk).",
    fines_warn_h: "Important Warning", fines_warn_p: "Failure to pay will result in salary deduction.",

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

  const [speedZone, setSpeedZone] = useState("obec");
  const [speedVal, setSpeedVal] = useState(10);

  const fineResult = useMemo(() => {
    const isObec = speedZone === 'obec';
    let fine = "0 €";
    const val = speedVal;

    if (isObec) {
      if (val <= 6) fine = "napomenutie";
      else if (val <= 10) fine = "do 20 €";
      else if (val <= 15) fine = "40 €";
      else if (val <= 20) fine = "60 €";
      else if (val <= 25) fine = "90 €";
      else if (val <= 30) fine = "140 €";
      else if (val <= 35) fine = "200 €";
      else if (val <= 40) fine = "280 €";
      else if (val <= 45) fine = "360 €";
      else if (val <= 50) fine = "440 €";
      else fine = "500 - 1000 €";
    } else {
      if (val <= 6) fine = "napomenutie";
      else if (val <= 15) fine = "do 20 €";
      else if (val <= 20) fine = "40 €";
      else if (val <= 25) fine = "60 €";
      else if (val <= 30) fine = "120 €";
      else if (val <= 35) fine = "160 €";
      else if (val <= 40) fine = "200 €";
      else if (val <= 45) fine = "300 €";
      else if (val <= 50) fine = "400 €";
      else fine = "500 - 1000 €";
    }
    return fine;
  }, [speedZone, speedVal]);

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
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
              
              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800/50">
                <h4 className="font-bold text-rose-800 dark:text-rose-400 text-xs uppercase mb-1 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 no-tts" /> {t.fines_warn_h}</h4>
                <p className="text-xs text-rose-600 dark:text-rose-300">{t.fines_warn_p}</p>
              </div>
            </div>

            {/* KALKULACKA */}
            <div className="bg-blue-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white flex flex-col justify-between">
              <div className="absolute right-[-20px] top-[-20px] opacity-10">
                <Calculator className="w-40 h-40 no-tts" />
              </div>
              <div className="relative z-10">
                <span className="bg-blue-400/30 text-[10px] text-blue-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-blue-400/20">
                  💶 {t.calc_h}
                </span>
                <p className="text-xs text-blue-100 mt-3 mb-5">{t.calc_desc}</p>
                
                <div className="flex gap-4 mb-6 bg-blue-700/50 p-2 rounded-xl backdrop-blur-sm">
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="speed-zone" value="obec" checked={speedZone === 'obec'} onChange={() => setSpeedZone('obec')} className="peer hidden" />
                    <div className="peer-checked:bg-white peer-checked:text-blue-700 text-blue-200 text-xs font-bold py-2 px-3 rounded-lg transition-colors">
                      {t.calc_in}
                    </div>
                  </label>
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="speed-zone" value="mimo" checked={speedZone === 'mimo'} onChange={() => setSpeedZone('mimo')} className="peer hidden" />
                    <div className="peer-checked:bg-white peer-checked:text-blue-700 text-blue-200 text-xs font-bold py-2 px-3 rounded-lg transition-colors">
                      {t.calc_out}
                    </div>
                  </label>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-blue-200 uppercase font-bold tracking-wider">{t.calc_over}</span>
                    <span className="text-2xl font-black text-white">{speedVal} km/h</span>
                  </div>
                  <input type="range" min="1" max="80" value={speedVal} onChange={(e) => setSpeedVal(parseInt(e.target.value))} className="w-full h-2 bg-blue-400/30 rounded-lg appearance-none cursor-pointer accent-white" />
                </div>
                
                <div className="bg-white p-4 rounded-xl text-center shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{t.calc_res_lbl}</p>
                  <p className="text-4xl font-black text-rose-600">{fineResult}</p>
                  <p className="text-[9px] text-slate-400 mt-2">{t.calc_note}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </SectionLayout>
  );
}
