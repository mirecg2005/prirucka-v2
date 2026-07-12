"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Droplet, CheckCircle2, XCircle, AlertTriangle, Globe, ExternalLink, CreditCard } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "Tankovanie",
    intro: "Pravidlá používania palivových kariet (Shell / OMV)",
    allowed_title: "Povolené úkony",
    allowed_badge: "Dovolené",
    allowed_1: "Tankovanie štandardných pohonných hmôt (Nafta/Benzín).",
    allowed_2: "Doplnenie kvapaliny do ostrekovačov (len z karty na to určenej).",
    allowed_3: "Umývanie vozidla (program povolený zamestnávateľom).",
    forbidden_title: "Zakázané úkony",
    forbidden_badge: "Prísny zákaz",
    forbidden_1: "Prémiové palivá (V-Power, MaxxMotion a pod.) pokiaľ nie sú vyslovene schválené.",
    forbidden_2: "Nákup tovaru v predajni (občerstvenie, káva, cigarety, alkohol).",
    forbidden_3: "Platba za iné služby nesúvisiace s prevádzkou auta.",
    loss_title: "Strata palivovej karty",
    loss_badge: "Kritická udalosť",
    loss_desc: "V prípade straty alebo krádeže karty okamžite kontaktujte oddelenie Mobility alebo správcu (Ayvens), aby kartu zablokovali.",
    abroad_title: "Tankovanie v zahraničí",
    abroad_badge: "Mimo SR",
    abroad_desc: "Ak máte pridelenú medzinárodnú tankovaciu kartu, platia rovnaké pravidlá ako na Slovensku. Vždy preferujte bezhotovostné platby prostredníctvom pridelenej karty.",
    partners_title: "Partnerské stanice v zahraničí",
    omv_title: "OMV (Karta Routex)",
    omv_desc: "Akceptačnú sieť, kde Vašu Routex kartu môžete použiť, nájdete na oficiálnej stránke (Site Finder).",
    omv_btn: "Navštíviť www.routex.com",
    shell_title: "SHELL",
    shell_desc: "Prosíme vás, aby ste použili vyhľadávač čerpacích staníc. Prednastavený filter je vrátane partnerských staníc.",
    shell_btn: "Otvoriť vyhľadávač Shell"
  },
  en: {
    title: "Refueling",
    intro: "Rules for using fuel cards (Shell / OMV)",
    allowed_title: "Allowed actions",
    allowed_badge: "Permitted",
    allowed_1: "Refueling standard fuels (Diesel/Petrol).",
    allowed_2: "Topping up washer fluid (only from the designated card).",
    allowed_3: "Car wash (program approved by the employer).",
    forbidden_title: "Forbidden actions",
    forbidden_badge: "Strictly prohibited",
    forbidden_1: "Premium fuels (V-Power, MaxxMotion, etc.) unless explicitly approved.",
    forbidden_2: "Purchasing goods in the store (snacks, coffee, cigarettes, alcohol).",
    forbidden_3: "Payment for other services unrelated to car operation.",
    loss_title: "Fuel card loss",
    loss_badge: "Critical event",
    loss_desc: "In case of loss or theft of the card, immediately contact the Mobility department or the administrator (Ayvens) to block the card.",
    abroad_title: "Refueling abroad",
    abroad_badge: "Outside SR",
    abroad_desc: "If you have an international fuel card, the same rules apply as in Slovakia. Always prefer cashless payments using the assigned card.",
    partners_title: "Partner stations abroad",
    omv_title: "OMV (Routex Card)",
    omv_desc: "The acceptance network where you can use your Routex card can be found on the official website (Site Finder).",
    omv_btn: "Visit www.routex.com",
    shell_title: "SHELL",
    shell_desc: "Please use the gas station finder. The preset filter includes partner stations.",
    shell_btn: "Open Shell finder"
  }
};

export default function FuelPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-fuel"
      headerAccent="green"
    >
      <div className="flex items-center gap-3 mb-6 bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
        <Droplet className="w-8 h-8 text-emerald-600 dark:text-emerald-400 no-tts" />
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          {t.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Povolené úkony */}
        <div className="bg-emerald-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <CheckCircle2 className="w-40 h-40 no-tts" />
          </div>
          <div className="relative z-10">
            <span className="bg-emerald-400/30 text-[10px] text-emerald-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-emerald-400/20">
              ✔️ {t.allowed_badge}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-4">{t.allowed_title}</h3>
            
            <ul className="space-y-3 text-sm text-emerald-50">
              <li className="flex items-start gap-2 bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-emerald-300 mt-0.5 font-bold no-tts">✓</span>
                <span>{t.allowed_1}</span>
              </li>
              <li className="flex items-start gap-2 bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-emerald-300 mt-0.5 font-bold no-tts">✓</span>
                <span>{t.allowed_2}</span>
              </li>
              <li className="flex items-start gap-2 bg-emerald-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-emerald-300 mt-0.5 font-bold no-tts">✓</span>
                <span>{t.allowed_3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Zakázané úkony */}
        <div className="bg-rose-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <XCircle className="w-40 h-40 no-tts" />
          </div>
          <div className="relative z-10">
            <span className="bg-rose-400/30 text-[10px] text-rose-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-rose-400/20">
              ❌ {t.forbidden_badge}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-4">{t.forbidden_title}</h3>
            
            <ul className="space-y-3 text-sm text-rose-50">
              <li className="flex items-start gap-2 bg-rose-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-rose-300 mt-0.5 font-bold no-tts">✗</span>
                <span>{t.forbidden_1}</span>
              </li>
              <li className="flex items-start gap-2 bg-rose-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-rose-300 mt-0.5 font-bold no-tts">✗</span>
                <span>{t.forbidden_2}</span>
              </li>
              <li className="flex items-start gap-2 bg-rose-700/50 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-rose-300 mt-0.5 font-bold no-tts">✗</span>
                <span>{t.forbidden_3}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Zahraničie */}
        <div id="abroad" className="bg-blue-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white md:col-span-2 scroll-mt-24">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Globe className="w-40 h-40 no-tts" />
          </div>
          <div className="relative z-10">
            <span className="bg-blue-400/30 text-[10px] text-blue-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-blue-400/20">
              🌍 {t.abroad_badge}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-2">{t.abroad_title}</h3>
            <p className="text-sm text-blue-100 mb-5 max-w-2xl">{t.abroad_desc}</p>
            
            <h4 className="text-sm font-bold text-blue-200 mb-3 uppercase tracking-wider">{t.partners_title}</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-700/50 p-4 rounded-xl backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">{t.omv_title}</h4>
                  <p className="text-xs text-blue-100/80 mb-3">{t.omv_desc}</p>
                </div>
                <a href="http://www.routex.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 font-bold px-3 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors w-full">
                  <ExternalLink className="w-4 h-4 no-tts" />
                  {t.omv_btn}
                </a>
              </div>

              <div className="bg-blue-700/50 p-4 rounded-xl backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1">{t.shell_title}</h4>
                  <p className="text-xs text-blue-100/80 mb-3">{t.shell_desc}</p>
                </div>
                <a href="https://www.shell.sk/firemni-zakaznici/rozsiahla-siet.html" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 font-bold px-3 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors w-full">
                  <ExternalLink className="w-4 h-4 no-tts" />
                  {t.shell_btn}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Strata karty */}
        <div className="bg-amber-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white md:col-span-2">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <CreditCard className="w-40 h-40 no-tts" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-amber-500/50 p-3 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center border border-amber-400/30">
               <AlertTriangle className="w-6 h-6 text-white no-tts" />
            </div>
            <div>
              <span className="bg-amber-400/30 text-[10px] text-amber-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-amber-400/20 inline-block mb-2">
                ⚠️ {t.loss_badge}
              </span>
              <h3 className="text-lg font-bold mb-1">{t.loss_title}</h3>
              <p className="text-sm text-amber-50 leading-relaxed">
                {t.loss_desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </SectionLayout>
  );
}
