"use client";

import React, { useState, useMemo } from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { BookOpen, AlertTriangle, FileCheck2, ExternalLink, ShieldCheck, Scale, Car, Activity, Zap, Calculator } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

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
    
    // Zakonne pravidla
    legal_h2: "Zákonné Povinnosti (SR)",
    pdf_link: "Zákon o cestnej premávke (PDF)",
    
    docs_h: "Potrebné doklady",
    docs_intro: "Pred jazdou sa uistite, že máte pri sebe:",
    doc_1: "Vodičský preukaz", doc_2: "Osvedčenie (OEV časť I)", doc_3: "Potvrdenie o PZP", doc_4: "Doklad o STK a EK", doc_5: "Občiansky preukaz",
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
    
    legal_h2: "Legal Duties (SK)",
    pdf_link: "Road Traffic Act (PDF)",
    
    docs_h: "Required Documents",
    docs_intro: "Make sure you have:",
    doc_1: "Driver's license", doc_2: "Vehicle registration (Part I)", doc_3: "Proof of insurance (PZP)", doc_4: "MOT/Emission test", doc_5: "ID card",
    lights_h: "Attention:", lights_p: "Mandatory daytime running lights.",
    
    speed_h: "Speed Limits", speed_city: "City:", speed_city_val: "50", speed_out: "Outside:", speed_out_val: "90", speed_hwy: "Highway:", speed_hwy_val: "130", speed_unit: "km/h",
    
    alc_h: "Alcohol", alc_p: "Zero tolerance before and during driving.",
    phone_h: "Mobile Phone", phone_ok: "Allowed: Hands-free", phone_no: "Prohibited: Holding, typing.",
    
    equip_h: "Mandatory Equipment",
    equip_1: "First aid kit", equip_2: "Warning triangle", equip_3: "Reflective vest", equip_4: "Spare wheel/kit",

    acc_lanes_h: "Driving in Lanes", acc_zip_h: "Zipper merging", acc_zip_p: "Alternate merging where lanes converge.", acc_rescue_h: "Rescue lane", acc_rescue_p: "Left lane moves left, others right. Center clear.",
    acc_vulnerable_h: "Vulnerable Users", acc_cyc_h: "Cyclists", acc_cyc_p: "Distance: >50km/h min 1.5m, otherwise 1m.", acc_ped_h: "Pedestrians", acc_ped_p: "Right of way on crosswalks (except trams).",
    
    acc_hwy_h: "Highways & Winter", acc_hwy_title: "Highways", acc_hwy_p: "Mandatory e-vignette, min 80 km/h.", check_vignette: "Check eznamka.sk",
    acc_win_title: "Winter Operation", acc_win_p: "Winter tires mandatory if snow/ice. Clean windows/plates.",

    fines_h2: "Fine Resolution",
    fines_s1_h: "Delivery", fines_s1_p: "Fine delivered to Lidl as the vehicle owner.",
    fines_s2_h: "Identification", fines_s2_p: "Mobility Dept identifies driver and sends request.",
    fines_s3_h: "Payment", fines_s3_p: "Employee must pay immediately and send proof.",
    fines_warn_h: "Important Warning", fines_warn_p: "Failure to pay will result in salary deduction.",

    calc_h: "Fine Calculator", calc_desc: "Estimated speeding block fine (SK).",
    calc_in: "In city (limit 50)", calc_out: "Outside", calc_over: "Exceeded by:", calc_res_lbl: "Estimated Fine",
    calc_note: "* Calculated according to on-the-spot block fine tariff."
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
    >
      <div className="flex items-center gap-3 mb-8 bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 shadow-sm">
        <Scale className="w-8 h-8 text-purple-600 dark:text-purple-400 no-tts" />
        <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-10">
        
        {/* ZAKLADNE PRAVIDLA */}
        <section>
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
            <BookOpen className="w-5 h-5 no-tts" /> {t.basic_h2}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">🚭</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule1_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule1_p}</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">📄</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule2_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule2_p}</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">🔑</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule3_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule3_p}</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">🧼</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule4_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule4_p}</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">🛡️</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule5_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule5_p}</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center group transition-all">
              <span className="text-3xl mb-2 no-tts block">🅿️</span>
              <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-white mb-1">{t.rule6_h}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.rule6_p}</p>
            </div>
          </div>
        </section>

        {/* ZAKONNE PRAVIDLA */}
        <section id="legal" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider text-sm flex items-center gap-2">
              <Scale className="w-5 h-5 no-tts" /> {t.legal_h2}
            </h2>
            <a href="https://mzv.gov.cz/file/420675/Zakon_SR_c._8_2009_Z.z.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-bold transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 no-tts" /> {t.pdf_link}
            </a>
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
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
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
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-sm mb-3 flex items-center text-slate-800 dark:text-white">
                <Activity className="w-4 h-4 mr-2 text-amber-500 no-tts" /> {t.equip_h}
              </h3>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_1}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_2}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_3}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>{t.equip_4}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* POKUTY & KALKULACKA */}
        <section>
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 no-tts" /> {t.fines_h2}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <ol className="relative border-l-2 border-blue-200 dark:border-blue-800 space-y-6 ml-3 mb-6">
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[13px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">1</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.fines_s1_h}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.fines_s1_p}</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[13px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">2</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.fines_s2_h}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.fines_s2_p}</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-[13px] font-bold text-[10px] ring-4 ring-slate-50 dark:ring-slate-900">3</span>
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
