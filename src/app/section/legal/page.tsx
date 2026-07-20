"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Scale, AlertTriangle, Zap, Activity, ShieldCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import InteractiveTTSWrapper from "@/components/tools/InteractiveTTSWrapper";
import TTSButton from "@/components/tools/TTSButton";

const dict = {
  sk: {
    title: "Zákonné Pravidlá",
    intro: "Zákonné povinnosti a pravidlá cestnej premávky v SR.",
    
    legal_h2: "Zákonné Povinnosti (SR)",
    pdf_link: "Zákon o cestnej premávke (PDF)",
    
    docs_h: "Potrebné doklady",
    docs_intro: "Pred jazdou sa uistite, že máte pri sebe:",
    doc_1: "Vodičský preukaz", doc_2: "Osvedčenie (OEV časť I., malý TP)", doc_3: "Potvrdenie o PZP", doc_4: "Doklad o STK a EK", doc_5: "Občiansky preukaz",
    lights_h: "Pozor:", lights_p: "Povinnosť celodenného svietenia (stretávacie alebo denné LED).",
    
    speed_h: "Rýchlosť", speed_city: "Obec:", speed_city_val: "50", speed_out: "Mimo obce:", speed_out_val: "90", speed_hwy: "Diaľnica:", speed_hwy_val: "130", speed_unit: "km/h",
    
    alc_h: "Alkohol", alc_p: "Nulová tolerancia pred aj počas jazdy.",
    phone_h: "Mobilný Telefón", phone_ok: "Povolené: Hands-free", phone_no: "Zakázané: Držanie v ruke, písanie.",
    
    equip_h: "Povinná výbava (kufor)",
    equip_1: "Autolekárnička", equip_2: "Výstražný trojuholník", equip_3: "Reflexná vesta", equip_4: "Rezervné koleso/sada",

    acc_lanes_h: "Jazda v pruhoch", acc_zip_h: "Zipsovanie", acc_zip_p: "Striedavé radenie pri zbiehaní pruhov.", acc_rescue_h: "Záchranárska ulička", acc_rescue_p: "Ľavý pruh vľavo, ostatné vpravo. Stred voľný.",
    acc_vulnerable_h: "Zraniteľní účastníci", acc_cyc_h: "Cyklisti", acc_cyc_p: "Odstup: nad 50km/h min 1.5m, inak 1m.", acc_ped_h: "Chodci", acc_ped_p: "Prednosť na priechode (okrem električiek).",
    
    acc_hwy_h: "Diaľnice & Zima", acc_hwy_title: "Diaľnice", acc_hwy_p: "Povinná elektronická známka, min. 80 km/h.", check_vignette: "Overiť eznamka.sk",
    acc_win_title: "Zimná prevádzka", acc_win_p: "Zimné pneu povinné pri súvislej vrstve snehu/ľadu. Očistené okná a EČV.",
  },
  en: {
    title: "Legal Rules",
    intro: "Legal duties and traffic rules in Slovakia.",
    
    legal_h2: "Legal Duties (SK)",
    pdf_link: "Road Traffic Act (PDF)",
    
    docs_h: "Required Documents",
    docs_intro: "Make sure you have:",
    doc_1: "Driver's license", doc_2: "Vehicle registration (Part 1)", doc_3: "Proof of insurance (PZP)", doc_4: "MOT/Emission test", doc_5: "ID card",
    lights_h: "Attention:", lights_p: "Mandatory daytime running lights.",
    
    speed_h: "Speed Limits", speed_city: "City:", speed_city_val: "50", speed_out: "Outside:", speed_out_val: "90", speed_hwy: "Highway:", speed_hwy_val: "130", speed_unit: "km/h",
    
    alc_h: "Alcohol", alc_p: "Zero tolerance before and during driving.",
    phone_h: "Mobile Phone", phone_ok: "Allowed: Hands-free", phone_no: "Prohibited: Holding, typing.",
    
    equip_h: "Mandatory Equipment",
    equip_1: "First aid kit", equip_2: "Warning triangle", equip_3: "Reflective vest", equip_4: "Spare wheel/kit",

    acc_lanes_h: "Driving in Lanes", acc_zip_h: "Zipper merging", acc_zip_p: "Alternate merging where lanes converge.", acc_rescue_h: "Rescue lane", acc_rescue_p: "Left lane moves left, others right. Center clear.",
    acc_vulnerable_h: "Vulnerable Users", acc_cyc_h: "Cyclists", acc_cyc_p: "Distance: over 50km/h min 1.5m, otherwise 1m.", acc_ped_h: "Pedestrians", acc_ped_p: "Right of way on pedestrian crossings (except trams).",
    
    acc_hwy_h: "Highways & Winter", acc_hwy_title: "Highways", acc_hwy_p: "Mandatory e-vignette, min. 80 km/h.", check_vignette: "Check eznamka.sk",
    acc_win_title: "Winter Operation", acc_win_p: "Winter tires mandatory if snow/ice. Clean windows/plates.",
  }
};

export default function LegalPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-legal"
      headerAccent="yellow"
      hideGlobalTTS={true}
    >
      <div className="flex items-center gap-3 mb-8 bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/50 shadow-sm">
        <Scale className="w-8 h-8 text-yellow-600 dark:text-yellow-400 no-tts flex-shrink-0" />
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-10">
        <section id="legal" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider text-sm flex items-center gap-2">
              <Scale className="w-5 h-5 no-tts" /> {t.legal_h2}
            </h2>
            <div className="flex items-center gap-2">
              <a href="https://mzv.gov.cz/file/420675/Zakon_SR_c._8_2009_Z.z.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-bold transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800/50">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 no-tts" /> {t.pdf_link}
              </a>
              <div className="scale-75 origin-right no-tts"><TTSButton contentId="legal" /></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-rose-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white md:col-span-1">
              <div className="absolute right-[-20px] top-[-20px] opacity-10">
                <AlertTriangle className="w-40 h-40 no-tts" />
              </div>
              <div className="relative z-10">
                <span className="bg-rose-400/30 text-[10px] text-rose-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-rose-400/20">
                  🚫 {t.alc_h} & {t.phone_h}
                </span>
                <div className="mt-4 mb-4">
                  <p className="text-3xl font-black text-white mb-1 leading-none">0,0 ‰</p>
                  <p className="text-xs text-rose-100">{t.alc_p}</p>
                </div>
                <div className="bg-rose-700/50 p-3 rounded-xl backdrop-blur-sm text-xs">
                  <div className="flex items-center gap-2 mb-1 text-green-300 font-bold"><span className="no-tts">✓</span> {t.phone_ok}</div>
                  <div className="flex items-center gap-2 text-rose-200 font-bold"><span className="no-tts">✗</span> {t.phone_no}</div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white md:col-span-2">
              <div className="absolute right-[-20px] top-[-20px] opacity-10">
                <Zap className="w-40 h-40 no-tts" />
              </div>
              <div className="relative z-10">
                <span className="bg-indigo-400/30 text-[10px] text-indigo-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-indigo-400/20">
                  🏎️ {t.speed_h}
                </span>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-indigo-700/50 p-3 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold mb-1">{t.speed_city}</span>
                    <span className="text-2xl font-black">{t.speed_city_val}</span>
                    <span className="text-[9px] text-indigo-300">{t.speed_unit}</span>
                  </div>
                  <div className="bg-indigo-700/50 p-3 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold mb-1">{t.speed_out}</span>
                    <span className="text-2xl font-black">{t.speed_out_val}</span>
                    <span className="text-[9px] text-indigo-300">{t.speed_unit}</span>
                  </div>
                  <div className="bg-indigo-700/50 p-3 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center text-center border-2 border-indigo-400/30">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold mb-1">{t.speed_hwy}</span>
                    <span className="text-2xl font-black">{t.speed_hwy_val}</span>
                    <span className="text-[9px] text-indigo-300">{t.speed_unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InteractiveTTSWrapper className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-sm mb-3 flex items-center text-slate-800 dark:text-white">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500 no-tts" /> {t.docs_h}
              </h3>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t.doc_1}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t.doc_2}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t.doc_3}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t.doc_4}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t.doc_5}</li>
              </ul>
              <div className="mt-3 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-600">
                <strong>{t.lights_h}</strong> {t.lights_p}
              </div>
            </InteractiveTTSWrapper>

            <InteractiveTTSWrapper className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-sm mb-3 flex items-center text-slate-800 dark:text-white">
                <Activity className="w-4 h-4 mr-2 text-amber-500 no-tts" /> {t.equip_h}
              </h3>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_1}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_2}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_3}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_4}</li>
              </ul>
            </InteractiveTTSWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InteractiveTTSWrapper className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white flex items-center"><Activity className="w-4 h-4 mr-2 text-indigo-500 no-tts" /> {t.acc_lanes_h}</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{t.acc_zip_h}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{t.acc_zip_p}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{t.acc_rescue_h}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{t.acc_rescue_p}</p>
                </div>
              </div>
            </InteractiveTTSWrapper>

            <InteractiveTTSWrapper className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white flex items-center"><Activity className="w-4 h-4 mr-2 text-emerald-500 no-tts" /> {t.acc_vulnerable_h}</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{t.acc_cyc_h}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{t.acc_cyc_p}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{t.acc_ped_h}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{t.acc_ped_p}</p>
                </div>
              </div>
            </InteractiveTTSWrapper>

            <InteractiveTTSWrapper className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-2">
              <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white flex items-center"><Activity className="w-4 h-4 mr-2 text-amber-500 no-tts" /> {t.acc_hwy_h}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">{t.acc_hwy_title}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">{t.acc_hwy_p}</p>
                  <a href="https://eznamka.sk" target="_blank" rel="noreferrer" className="inline-block text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded font-bold transition-colors no-tts">
                    <ExternalLink className="w-3 h-3 inline mr-1" />{t.check_vignette}
                  </a>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">{t.acc_win_title}</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{t.acc_win_p}</p>
                </div>
              </div>
            </InteractiveTTSWrapper>
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
