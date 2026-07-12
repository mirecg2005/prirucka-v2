"use client";

import React from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Phone, ShieldAlert, Wrench, Car, Briefcase, HeartPulse, ShieldCheck, Mail, PhoneCall } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
  sk: {
    title: "Dôležité kontakty",
    intro: "Zoznam všetkých dôležitých kontaktov a asistenčných služieb.",
    warning_title: "Dôležité upozornenie",
    warning_desc: "Dodržujte postup nahlasovania a primárne využívajte nonstop kontakt spoločnosti Ayvens. Kontakty na poisťovňu využívajte len v krajných prípadoch, ak sa neviete dovolať na Ayvens linku.",
    ayvens_badge: "Najdôležitejšie číslo",
    ayvens_title: "Ayvens / LeasePlan Nonstop",
    ayvens_desc: "Technická porucha, defekt, odťah, pravidelný servis, výmena čelného skla, náhradné vozidlo.",
    ayvens_sk: "Slovensko (08:00 - 17:00)",
    ayvens_world: "Zahraničie / Nonstop poruchy",
    marsh_badge: "Poistné udalosti",
    marsh_title: "MARSH - Hlásenie škôd",
    marsh_desc: "Hlásenie poistných udalostí a nehôd (Pondelok - Piatok: 09:00 - 17:00).",
    lidl_badge: "Lidl Interná správa",
    lidl_title: "Oddelenie Mobility Lidl",
    lidl_desc: "Výmena a objednanie vozidiel, tankovacie karty, schvaľovanie nadlimitných opráv, autolekárničky.",
    lidl_email_desc: "Vždy v kópii pri škodových udalostiach",
    emergency_badge: "Záchranné zložky",
    emergency_title: "Štátne Núdzové Linky",
    emergency_desc: "Vážne zranenia, požiar, stret s lesnou zverou alebo nehoda s nutnou účasťou polície.",
    police_sk: "Polícia Slovensko",
    koop_badge: "Záložný odťah (Kooperativa)",
    koop_title: "Asistenčná služba Kooperativa",
    koop_desc: "Využite len v krajných prípadoch, ak sa nemôžete dovolať na hlavnú linku Ayvens.",
    koop_sk: "Slovensko (skrátená linka)",
    call: "Volať",
    email: "E-mail"
  },
  en: {
    title: "Important Contacts",
    intro: "List of all important contacts and assistance services.",
    warning_title: "Important notice",
    warning_desc: "Follow the reporting procedure and primarily use the Ayvens nonstop contact. Use insurance contacts only in extreme cases if you cannot reach the Ayvens line.",
    ayvens_badge: "Most important number",
    ayvens_title: "Ayvens / LeasePlan Nonstop",
    ayvens_desc: "Technical breakdown, flat tire, towing, regular service, windshield replacement, replacement vehicle.",
    ayvens_sk: "Slovakia (08:00 - 17:00)",
    ayvens_world: "Abroad / Non-stop breakdown",
    marsh_badge: "Insurance claims",
    marsh_title: "MARSH - Claims reporting",
    marsh_desc: "Reporting insurance claims and accidents (Monday - Friday: 09:00 - 17:00).",
    lidl_badge: "Lidl Internal administration",
    lidl_title: "Lidl Mobility Department",
    lidl_desc: "Vehicle replacement and ordering, fuel cards, approval of over-limit repairs, first aid kits.",
    lidl_email_desc: "Always in copy for damage events",
    emergency_badge: "Emergency services",
    emergency_title: "State Emergency Lines",
    emergency_desc: "Serious injuries, fire, collision with wildlife or accident requiring police presence.",
    police_sk: "Police Slovakia",
    koop_badge: "Backup towing (Kooperativa)",
    koop_title: "Kooperativa Assistance Service",
    koop_desc: "Use only in extreme cases if you cannot reach the main Ayvens line.",
    koop_sk: "Slovakia (short line)",
    call: "Call",
    email: "E-mail"
  }
};

export default function ContactsPage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-contacts"
      headerAccent="cyan"
    >
      <div className="flex items-center gap-3 mb-6 bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-xl border border-cyan-100 dark:border-cyan-900/50">
        <Phone className="w-8 h-8 text-cyan-600 dark:text-cyan-400 no-tts" />
        <p className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
          {t.intro}
        </p>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-transparent p-5 rounded-2xl border-l-4 border-red-500 shadow-sm backdrop-blur-sm mb-8">
        <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 no-tts" />
          {t.warning_title}
        </h3>
        <p className="text-sm text-red-700 dark:text-red-400 font-medium">
          {t.warning_desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ayvens */}
        <div className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
            <Wrench className="w-48 h-48 no-tts drop-shadow-2xl" />
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-blue-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              🔥 {t.ayvens_badge}
            </span>
            <h3 className="text-2xl font-extrabold mt-4 mb-2 drop-shadow-md">{t.ayvens_title}</h3>
            <p className="text-xs text-blue-100/90 mb-6 font-medium leading-relaxed">{t.ayvens_desc}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.ayvens_sk}</p>
                  <p className="text-lg font-black mt-1 text-white drop-shadow-sm">0850 888 777</p>
                </div>
                <a href="tel:0850888777" className="bg-white text-blue-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
                </a>
              </div>
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.ayvens_world}</p>
                  <p className="text-lg font-black mt-1 text-white drop-shadow-sm">+421 904 333 230</p>
                </div>
                <a href="tel:+421904333230" className="bg-white text-blue-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Marsh */}
        <div className="group bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
            <Car className="w-48 h-48 no-tts drop-shadow-2xl" />
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-purple-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              🛡️ {t.marsh_badge}
            </span>
            <h3 className="text-2xl font-extrabold mt-4 mb-2 drop-shadow-md">{t.marsh_title}</h3>
            <p className="text-xs text-purple-100/90 mb-6 font-medium leading-relaxed">{t.marsh_desc}</p>
            
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
              <div>
                <p className="text-[10px] font-bold text-purple-200 uppercase tracking-wide">Slovensko</p>
                <p className="text-lg font-black mt-1 text-white drop-shadow-sm">+421 902 966 689</p>
              </div>
              <a href="tel:+421902966689" className="bg-white text-purple-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
              </a>
            </div>
          </div>
        </div>

        {/* Mobility */}
        <div className="group bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
            <Briefcase className="w-48 h-48 no-tts drop-shadow-2xl" />
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-emerald-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              🏢 {t.lidl_badge}
            </span>
            <h3 className="text-2xl font-extrabold mt-4 mb-2 drop-shadow-md">{t.lidl_title}</h3>
            <p className="text-xs text-emerald-100/90 mb-6 font-medium leading-relaxed">{t.lidl_desc}</p>
            
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
              <div>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">{t.lidl_email_desc}</p>
                <p className="text-lg font-black mt-1 text-white drop-shadow-sm">mobilita@lidl.sk</p>
              </div>
              <a href="mailto:mobilita@lidl.sk" className="bg-white text-emerald-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <Mail className="w-4 h-4 no-tts" /> {t.email}
              </a>
            </div>
          </div>
        </div>

        {/* Záchranné zložky */}
        <div className="group bg-gradient-to-br from-red-500 to-rose-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
            <HeartPulse className="w-48 h-48 no-tts drop-shadow-2xl" />
          </div>
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-red-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              🚨 {t.emergency_badge}
            </span>
            <h3 className="text-2xl font-extrabold mt-4 mb-2 drop-shadow-md">{t.emergency_title}</h3>
            <p className="text-xs text-red-100/90 mb-6 font-medium leading-relaxed">{t.emergency_desc}</p>
            
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
              <div>
                <p className="text-[10px] font-bold text-red-200 uppercase tracking-wide">{t.police_sk}</p>
                <p className="text-lg font-black mt-1 text-white drop-shadow-sm">158</p>
              </div>
              <a href="tel:158" className="bg-white text-red-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
              </a>
            </div>
          </div>
        </div>

        {/* Kooperativa */}
        <div className="bg-slate-600 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white md:col-span-2">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <ShieldCheck className="w-40 h-40 no-tts" />
          </div>
          <div className="relative z-10">
            <span className="bg-slate-500/50 text-[10px] text-slate-100 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-slate-500/30">
              🛟 {t.koop_badge}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-1">{t.koop_title}</h3>
            <p className="text-xs text-slate-300 mb-4">{t.koop_desc}</p>
            
            <div className="flex items-center justify-between bg-slate-700/50 p-3 rounded-xl backdrop-blur-sm md:w-1/2">
              <div>
                <p className="text-[10px] font-semibold text-slate-300">{t.koop_sk}</p>
                <p className="text-sm font-bold mt-0.5 text-white">18 118</p>
              </div>
              <a href="tel:18118" className="bg-white text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 no-tts" /> {t.call}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
