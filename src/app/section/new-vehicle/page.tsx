"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Car, FileSignature, CheckCircle, Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "Nové Vozidlo",
    intro: "Pridelenie, objednanie a odovzdanie služobného vozidla.",
    
    return_h: "Pred odovzdaním (výmenou) vozidla",
    return_p: "Zamestnanec je povinný:",
    return_l1: "Nahlásiť na poistnú udalosť všetky poškodenia vozidla.",
    return_l2: "Ukončiť a odoslať všetky elektronické knihy jázd (EKJ).",
    return_l3: "Dohodnúť si termín odovzdania (výmeny vozidla) na DL s mobilitou / na LC s určeným zamestnancom z Transportlogistik.",
    
    assign_h: "Pridelenie Vozidla",
    assign_p: "Služobné vozidlo sa prideľuje zamestnancovi na základe jeho pracovnej pozície a interných smerníc.",
    assign_l1: "Nárok na vozidlo a jeho kategória sú určené pracovnou pozíciou. Používanie na súkromné účely vyžaduje podpísanú dohodu.",
    assign_l2: "Pridelenie aj odovzdanie vozidla sa vždy zaznamenáva do preberacieho protokolu.",
    
    order_h: "Objednanie Nového Vozidla",
    order_p: "Proces objednania je plne v kompetencii oddelenia Mobility a riadi sa schváleným modelom obmeny.",
    order_l1: "Objednávka sa riadi vekom aktuálneho vozidla a platným mesačným modelom obmeny.",
    order_l2: "Nárok na objednanie nového vozidla nie je zo strany zamestnanca automaticky nárokovateľný.",
    order_subtitle: "Proces objednania:",
    order_l3: "Objednáva sa cez objednávkový formulár.",
    order_l4: "Objednáva sa cez Schwarz/BMW konfigurátor.",
  },
  en: {
    title: "New Vehicle",
    intro: "Allocation, ordering, and handover of a company vehicle.",
    
    return_h: "Before Handover (Exchange) of the Vehicle",
    return_p: "The employee is obliged to:",
    return_l1: "Report all vehicle damages to the insurance company.",
    return_l2: "Close and submit all electronic logbooks (EKJ).",
    return_l3: "Agree on a handover (exchange) date with Mobility at DL / designated Transport Logistics employee at LC.",
    
    assign_h: "Vehicle Allocation",
    assign_p: "A company vehicle is allocated to an employee based on their job position and internal guidelines.",
    assign_l1: "Entitlement to a vehicle and its category are determined by the job position. Private use requires a signed agreement.",
    assign_l2: "Both allocation and handover of the vehicle are always recorded in a handover protocol.",
    
    order_h: "Ordering a New Vehicle",
    order_p: "The ordering process is fully managed by the Mobility Department and follows the approved replacement model.",
    order_l1: "Ordering depends on the age of the current vehicle and the valid monthly replacement model.",
    order_l2: "The employee does not have an automatic right to order a new vehicle.",
    order_subtitle: "Ordering Process:",
    order_l3: "Ordered via the order form.",
    order_l4: "Ordered via the Schwarz/BMW configurator.",
  }
};

export default function NewVehiclePage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout title={t.title} contentId="content-new-vehicle" headerAccent="orange">
      <div className="flex items-center gap-4 mb-10 bg-gradient-to-r from-orange-500/10 to-transparent p-5 rounded-2xl border-l-4 border-orange-500 shadow-sm backdrop-blur-sm">
        <div className="w-12 h-12 bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center shadow-inner">
          <Car className="w-6 h-6 no-tts" />
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {t.intro}
        </p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-orange-300 before:to-transparent">
        
        {/* Objednanie */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <FileSignature className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-indigo-500/20 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t.order_h}</h2>
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-full">Krok 1</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">{t.order_p}</p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1 text-xs uppercase tracking-wider">Plán obmeny / Replacement plan</strong>
                <p className="text-sm text-slate-700 dark:text-slate-300">{t.order_l1}</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                <strong className="text-indigo-600 dark:text-indigo-400 block mb-1 text-xs uppercase tracking-wider">Nenárokovateľnosť / No automatic right</strong>
                <p className="text-sm text-slate-700 dark:text-slate-300">{t.order_l2}</p>
              </div>
            </div>

            <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white">{t.order_subtitle}</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <span className="bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shrink-0">FE6 (MP)</span>
                <p className="text-indigo-900 dark:text-indigo-300 text-xs font-medium">{t.order_l3}</p>
              </div>
              <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <span className="bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shrink-0">FE5 až FE1</span>
                <p className="text-indigo-900 dark:text-indigo-300 text-xs font-medium">{t.order_l4}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Odovzdanie vozidla */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t.return_h}</h2>
              <span className="text-[10px] uppercase tracking-wider font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">Krok 2</span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">{t.return_p}</p>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-3.5 h-3.5 text-orange-500" /></div>
                <span>{t.return_l1}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-3.5 h-3.5 text-orange-500" /></div>
                <span>{t.return_l2}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-3.5 h-3.5 text-orange-500" /></div>
                <span>{t.return_l3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pridelenie */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <Info className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t.assign_h}</h2>
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Krok 3</span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">{t.assign_p}</p>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Podmienky / Conditions</span>
                <span>{t.assign_l1}</span>
              </li>
              <li className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Protokol / Protocol</span>
                <span>{t.assign_l2}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
