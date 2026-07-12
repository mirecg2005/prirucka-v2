"use client";

import React, { useState } from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { Wrench, Settings, PhoneCall, ShieldCheck, AlertOctagon, Car, Activity, Droplet, AlertTriangle, Key, Play, Pause, Square, Volume2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTTS } from "@/context/TTSContext";

const dict = {
  sk: {
    title: "Servis a Údržba",
    intro: "Prehľad pravidelných servisných intervalov, údržby, pneuservisu a riešenia porúch.",
    
    // Breakdown
    break_h2: "Náhla Porucha",
    break_p1: "Ak je vozidlo nepojazdné, postupujte podľa inštrukcií nižšie.",
    break_contact_h: "NONSTOP Hotlinka Ayvens / LeasePlan:",
    break_call_sk: "Slovensko", break_call_abroad: "Zahraničie",
    break_p2: "Zabezpečíme odťah a náhradné vozidlo.",
    break_flat: "Defekt",
    break_flat_1: "Cez víkend: Oprava v najbližšom pneuservise (úhrada súkromne, preplatenie cez Concur).",
    break_flat_2: "V zahraničí / Nepojazdné: Kontaktujte asistenčnú službu Kooperativa.",
    break_flat_4: "Poškodený disk: Asistencia a riešiť ako poistnú udalosť.",
    break_keys: "Zabuchnuté kľúče",
    break_keys_1: "Otvoriť cez MyBMW app.",
    break_keys_2: "Kľúčová služba (Kooperativa).",
    break_keys_3: "Urgentne: Odd. Mobility / Ayvens.",
    break_lost: "Strata kľúčov",
    break_lost_1: "Zložiť EČV, otvoriť cez appku.",
    break_lost_2: "Komunikovať s odd. Mobility.",
    break_lost_3: "Prevoz do BMW, blokácia kľúča.",

    // Maint
    maint_h2: "Údržba Vozidla",
    
    maint_tp_h: "Tlak v Pneumatikách",
    maint_tp_impact: "Vplyv na spotrebu a životnosť:",
    maint_tp_under: "Podhustené: Spotreba +3%, Životnosť -25%",
    maint_tp_ok: "Správny tlak: Spotreba Optimálna, Životnosť 100%",
    maint_tp_over: "Prehustené: Spotreba +1%, Životnosť -15%",
    maint_tp_where: "Kde nájsť správne hodnoty?",
    maint_tp_where_val: "Štítok na stĺpiku dverí, viečku nádrže alebo MyBMW / iDrive.",
    maint_tp_reset: "BMW systém reset: Po dofúkaní reštartovať (reinitialize) systém v iDrive.",
    maint_tp_guide: "Správny tlak v pneumatikách je kľúčový pre bezpečnosť a spotrebu. Podhustené pneumatiky zvyšujú spotrebu paliva o 3 percentá a znižujú životnosť pneumatiky o 25 percent. Prehustené pneumatiky zvyšujú spotrebu o 1 percento a znižujú životnosť o 15 percent. Správne hodnoty nájdete na štítku na stĺpiku dverí vodiča, alebo vo vnútri viečka palivovej nádrže. Pri vozidlách BMW môžete tlak skontrolovať aj priamo v systéme iDrive alebo v aplikácii MyBMW. Nezabudnite, že po každom dofúkaní pneumatík musíte v systéme iDrive spustiť resetovanie, takzvanú reinicializáciu systému.",
    maint_tp_listen: "Prehrať zvukový návod",
    maint_tp_proc_h: "Postup kontroly a hustenia",
    maint_tp_proc_1: "Merať na studených pneumatikách (pred jazdou).",
    maint_tp_proc_2: "Odskrutkovať čiapočku z ventilu.",
    maint_tp_proc_3: "Pevne pritlačiť tlakomer na ventil a odčítať hodnotu.",
    maint_tp_proc_4: "Porovnať s odporúčanou hodnotou.",
    maint_tp_proc_5: "V prípade potreby dofúkať na kompresore.",
    maint_tp_proc_6: "Naskrutkovať čiapočku späť. Zopakovať pre všetky 4 pneu.",
    maint_tp_proc_7: "BMW systém reset: V iDrive: Moje vozidlo -> Stav vozidla -> Tlak v pneu -> Spustiť reset.",
    maint_tp_tip_h: "Tip: Pomoc na stanici Shell",
    maint_tp_tip_desc: "Ak si nie ste istí, obsluha na ČS Shell vám ochotne pomôže s kontrolou a dofúkaním.",

    maint_lights_h: "Výstražné Kontrolky",
    maint_lights_oil_h: "Červená olejnička (Nízky tlak oleja)",
    maint_lights_oil_s: "Okamžite zastaviť motor!",
    maint_lights_oil_d: "Nízky tlak motorového oleja. Okamžite bezpečne zastavte vozidlo a vypnite motor! Skontrolujte hladinu oleja a v prípade potreby ho doplňte. Ak kontrolka svieti aj po doplnení, motor neštartujte a bezodkladne kontaktujte asistenčnú službu Ayvens (0850 888 777).",
    maint_lights_temp_h: "Červený teplomer (Prehriatie zmesi)",
    maint_lights_temp_s: "Okamžite zastaviť motor!",
    maint_lights_temp_d: "Prehriatie motora alebo kritický nedostatok chladiacej kvapaliny. Bezpečne zastavte vozidlo, vypnite motor a nechajte ho vychladnúť. Nikdy neotvárajte viečko chladiacej nádržky, kým je motor horúci (hrozí obarenie!). Doplňte chladiacu zmes alebo čistú vodu.",
    maint_lights_brakes_h: "Červený výkričník (Brzdový systém)",
    maint_lights_brakes_s: "Okamžite zastaviť / Nebezpečná jazda!",
    maint_lights_brakes_d: "Problém s brzdovým systémom alebo zatiahnutá ručná brzda. Najskôr skontrolujte, či je ručná brzda úplne uvoľnená. Ak svieti aj po uvoľnení brzdy za jazdy, môže ísť o nedostatok brzdovej kvapaliny. Pokračovať v jazde je nebezpečné, volajte odťahovú službu Ayvens.",
    maint_lights_batt_h: "Červená batéria (Porucha dobíjania)",
    maint_lights_batt_s: "Dojazd na bezpečné miesto",
    maint_lights_batt_d: "Porucha alternátora. Akumulátor sa nedobíja. Vozidlo spotrebováva elektrickú energiu len z batérie. Môžete prejsť krátku vzdialenosť na bezpečné miesto (odstavnú plochu), no motor čoskoro samovoľne zhasne. Odporúča sa vypnúť rádio, klímu a vyhrievanie sedadiel.",
    maint_lights_eng_h: "Žltá kontrolka motora (MIL / Emisie)",
    maint_lights_eng_s: "Dojazd do servisu so zvýšenou opatrnosťou",
    maint_lights_eng_d: "Chyba v elektronike riadenia motora alebo emisnom systéme. Auto sa môže prepnúť do núdzového režimu s obmedzeným výkonom. Jazda je možná, ale je nutné sa bezodkladne objednať do servisu TODOS (pre VW) alebo BMW partnera.",
    maint_lights_tpms_h: "Žltý výkričník v pneu (Tlak v pneumatikách)",
    maint_lights_tpms_s: "Dofúkať pneu na najbližšej stanici",
    maint_lights_tpms_d: "Zistený pokles tlaku v pneumatike. Čo najskôr zastavte na najbližšej ČS Shell/OMV, skontrolujte defekt a dohustite ich. Po každom dofúkaní resetujte tlak v systéme iDrive.",
    maint_lights_adblue_h: "Žltá fľaša (Nízka hladina AdBlue)",
    maint_lights_adblue_s: "Doplniť AdBlue na stanici Shell / OMV",
    maint_lights_adblue_d: "Hladina AdBlue kvapaliny je nízka. Čo najskôr dolejte AdBlue zo stojana pomocou palivovej karty. Upozornenie: Ak hladina klesne na nulu a vypnete motor, vozidlo už nenaštartujete (zákonné zablokovanie).",
    
    maint_fluids_h: "Voda do ostrekovačov",
    maint_fluids_p: "DL dostupné na oddelení mobility. LC dostupné u technikov skladu. V servise sa nedopĺňajú na náklady firmy.",
    maint_adblue_h: "AdBlue",
    maint_adblue_p: "Dopĺňať na Shell/OMV kartou. V servise je dopĺňanie prísne zakázané!",
    maint_bolt_h: "Poistný šrób",
    maint_bolt_p: "Nástavec sa zvyčajne nachádza v kufri. Ak chýba a BestDrive nevie povoliť kolesá, treba objednať nový v servise BMW.",

    // Service booking
    sec1_title: "Objednávka do servisu",
    sec1_desc: "Pre objednanie servisu, prezutia, opravy alebo výmeny skla volajte Ayvens:",
    sk_contact: "Slovensko (08:00 - 17:00)",
    abroad_contact: "Zahraničie",
    call: "Volať",
    sec2_title: "Čelné sklo",
    sec2_desc: "Vždy riešiť cez Ayvens v autosklo Hornet.",
    sec3_title: "Servisní partneri",
    bmw: "BMW & MINI:", bmw_partners: "BMW Servis, Marco Car, Bosch",
    vw: "Volkswagen:", vw_partners: "Todos, Dexter, Marco Car",
  },
  en: {
    title: "Service & Maintenance",
    intro: "Overview of regular service intervals, maintenance, tires, and breakdowns.",
    
    break_h2: "Sudden Breakdown",
    break_p1: "If the vehicle is immobile, follow the instructions below.",
    break_contact_h: "NONSTOP Hotline Ayvens / LeasePlan:",
    break_call_sk: "Slovakia", break_call_abroad: "Abroad",
    break_p2: "We will arrange towing and a replacement vehicle.",
    break_flat: "Flat Tire",
    break_flat_1: "Weekend: Nearest tire service (reimburse via Concur).",
    break_flat_2: "Abroad / Immobile: Kooperativa assistance.",
    break_flat_4: "Damaged rim: Assistance and resolve as insurance claim.",
    break_keys: "Locked Keys",
    break_keys_1: "Open via MyBMW app.",
    break_keys_2: "Locksmith (Kooperativa).",
    break_keys_3: "Urgent: Mobility Dept / Ayvens.",
    break_lost: "Lost Keys",
    break_lost_1: "Remove plates, open via app.",
    break_lost_2: "Communicate with Mobility Dept.",
    break_lost_3: "Transport to BMW, block key.",

    maint_h2: "Vehicle Maintenance",
    
    maint_tp_h: "Tire Pressure",
    maint_tp_impact: "Impact on fuel and lifespan:",
    maint_tp_under: "Under-inflated: Fuel +3%, Lifespan -25%",
    maint_tp_ok: "Correct: Optimal fuel, 100% Lifespan",
    maint_tp_over: "Over-inflated: Fuel +1%, Lifespan -15%",
    maint_tp_where: "Where to find correct values?",
    maint_tp_where_val: "Door pillar label, fuel cap, or MyBMW / iDrive.",
    maint_tp_reset: "BMW system reset: Reinitialize system in iDrive after inflation.",
    maint_tp_guide: "Correct tire pressure is crucial for safety and fuel consumption. Under-inflated tires increase fuel consumption by 3 percent and reduce tire life by 25 percent. Over-inflated tires increase consumption by 1 percent and reduce life by 15 percent. You can find the correct values on the label on the driver's door pillar, or inside the fuel filler flap. For BMW vehicles, you can also check the pressure directly in the iDrive system or in the MyBMW app. Do not forget that after every tire inflation you must run a reset, a so-called reinitialization of the system, in the iDrive.",
    maint_tp_listen: "Play audio guide",
    maint_tp_proc_h: "Checking & Inflation Procedure",
    maint_tp_proc_1: "Measure on cold tires (before driving).",
    maint_tp_proc_2: "Unscrew the valve cap.",
    maint_tp_proc_3: "Firmly press the pressure gauge onto the valve and read the value.",
    maint_tp_proc_4: "Compare with the recommended value.",
    maint_tp_proc_5: "Inflate with a compressor if necessary.",
    maint_tp_proc_6: "Screw the cap back on. Repeat for all 4 tires.",
    maint_tp_proc_7: "BMW system reset: In iDrive: My Vehicle -> Vehicle Status -> Tire Pressure -> Perform Reset.",
    maint_tp_tip_h: "Tip: Help at Shell station",
    maint_tp_tip_desc: "If you are unsure, the staff at Shell stations will gladly help you with checking and inflating.",

    maint_lights_h: "Warning Lights",
    maint_lights_oil_h: "Red Oil Pressure Warning",
    maint_lights_oil_s: "Stop engine immediately!",
    maint_lights_oil_d: "Low engine oil pressure. Pull over safely and shut off the engine immediately! Check the oil level and top up if necessary. If the light remains on after topping up, do not start the engine and contact Ayvens assistance (0850 888 777).",
    maint_lights_temp_h: "Red Coolant Temp Warning",
    maint_lights_temp_s: "Stop engine immediately!",
    maint_lights_temp_d: "Engine overheating or critical coolant shortage. Pull over safely, turn off the engine and let it cool down. Never open the coolant tank cap while the engine is hot (risk of scalding!). Top up with coolant or clean water.",
    maint_lights_brakes_h: "Red Brake System Warning",
    maint_lights_brakes_s: "Stop immediately / Dangerous driving!",
    maint_lights_brakes_d: "Brake system issue or handbrake engaged. First, check if the handbrake is fully released. If the light stays on during driving, it indicates low brake fluid. Continuing to drive is dangerous, call Ayvens towing assistance.",
    maint_lights_batt_h: "Red Battery/Charging Warning",
    maint_lights_batt_s: "Drive to a safe spot",
    maint_lights_batt_d: "Alternator fault. The battery is not charging. The car runs only on battery power. You can drive a short distance to a safe area, but the engine will soon die. It is recommended to turn off the radio, AC, and seat heaters.",
    maint_lights_eng_h: "Yellow Engine Management Indicator",
    maint_lights_eng_s: "Drive to service with caution",
    maint_lights_eng_d: "Engine management or emission control system fault. The vehicle may enter limp mode with reduced power. Driving is allowed, but you must book a service appointment at TODOS (VW) or BMW dealer without delay.",
    maint_lights_tpms_h: "Yellow Tire Pressure Warning (TPMS)",
    maint_lights_tpms_s: "Inflate tires at the nearest station",
    maint_lights_tpms_d: "Tire pressure loss detected. Pull over at the nearest Shell/OMV station, inspect tires for punctures, and inflate them to the recommended pressure. Remember: Reset tire pressure in the iDrive system after each inflation.",
    maint_lights_adblue_h: "Yellow AdBlue Level Warning",
    maint_lights_adblue_s: "Refill AdBlue at Shell / OMV station",
    maint_lights_adblue_d: "AdBlue level is low. Refill AdBlue at Shell or OMV pump as soon as possible using the fuel card. Warning: If AdBlue runs out and you turn off the engine, you will not be able to restart the vehicle (legal lock).",
    
    maint_fluids_h: "Washer Fluid",
    maint_fluids_p: "DL available at mobility dept. LC available from warehouse technicians. Service will not top up at company expense.",
    maint_adblue_h: "AdBlue",
    maint_adblue_p: "Refill at Shell/OMV with card. Service refill strictly prohibited!",
    maint_bolt_h: "Locking Wheel Nut",
    maint_bolt_p: "Adapter usually in the trunk. If missing and BestDrive cannot loosen wheels, order a new one at BMW.",

    sec1_title: "Service Booking",
    sec1_desc: "To book service, tire change, repair or windshield replacement, call Ayvens:",
    sk_contact: "Slovakia (08:00 - 17:00)",
    abroad_contact: "Abroad",
    call: "Call",
    sec2_title: "Windshield",
    sec2_desc: "Always resolve via Ayvens at Hornet Auto Glass.",
    sec3_title: "Service Partners",
    bmw: "BMW & MINI:", bmw_partners: "BMW Service, Marco Car, Bosch",
    vw: "Volkswagen:", vw_partners: "Todos, Dexter, Marco Car",
  }
};

export default function ServicePage() {
  const { language } = useLanguage();
  const t = dict[language as keyof typeof dict];
  const { state: ttsState, play: ttsPlay, pause: ttsPause, resume: ttsResume, stop: ttsStop, currentText } = useTTS();

  const [activePlayer, setActivePlayer] = useState<"guide" | "proc" | null>(null);

  // Sync active player with global TTS state
  React.useEffect(() => {
    if (ttsState === "idle") {
      setActivePlayer(null);
    }
  }, [ttsState]);

  const handlePlay = () => {
    if (ttsState === "paused" && activePlayer === "guide") {
      ttsResume();
      return;
    }
    
    let textToSpeak = t.maint_tp_guide;
    ttsPlay(textToSpeak);
    setActivePlayer("guide");
  };

  const handleProcPlay = () => {
    if (ttsState === "paused" && activePlayer === "proc") {
      ttsResume();
      return;
    }
    
    const stepLabel = language === 'sk' ? 'Krok' : 'Step';
    // Simplified into one utterance for the global wrapper
    let textToSpeak = `${t.maint_tp_proc_h}. ... ${stepLabel} 1. ${t.maint_tp_proc_1} ... ${stepLabel} 2. ${t.maint_tp_proc_2} ... ${stepLabel} 3. ${t.maint_tp_proc_3} ... ${stepLabel} 4. ${t.maint_tp_proc_4} ... ${stepLabel} 5. ${t.maint_tp_proc_5} ... ${stepLabel} 6. ${t.maint_tp_proc_6}. ... ${stepLabel} 7. ${t.maint_tp_proc_7}.`;
    
    ttsPlay(textToSpeak);
    setActivePlayer("proc");
  };

  const isGuidePlaying = activePlayer === "guide" && ttsState === "playing";
  const isGuidePaused = activePlayer === "guide" && ttsState === "paused";
  
  const isProcPlaying = activePlayer === "proc" && ttsState === "playing";
  const isProcPaused = activePlayer === "proc" && ttsState === "paused";

  const handlePause = () => { ttsPause(); };
  const handleStop = () => { ttsStop(); };

  const handleProcPause = () => {
    ttsPause();
  };

  const handleProcStop = () => {
    ttsStop();
  };

  return (
    <SectionLayout 
      title={t.title} 
      contentId="content-service"
      headerAccent="yellow"
    >
      <div className="flex items-center gap-3 mb-8 bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/50 shadow-sm">
        <Wrench className="w-8 h-8 text-yellow-600 dark:text-yellow-400 no-tts" />
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          {t.intro}
        </p>
      </div>

      <div className="space-y-8">
        
        {/* 1. PORUCHA */}
        <div id="porucha">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 uppercase tracking-wider text-sm">{t.break_h2}</h2>
          
          {/* Hlavný kontakt pre poruchy */}
          <div className="group bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md mb-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
              <AlertOctagon className="w-48 h-48 no-tts drop-shadow-2xl" />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] text-red-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                🚨 {t.break_contact_h}
              </span>
              <p className="text-sm font-medium text-red-50 mt-4 mb-6 drop-shadow-md">{t.break_p1} {t.break_p2}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-red-200 uppercase tracking-wide">{t.break_call_sk}</p>
                    <p className="text-lg font-black mt-1 text-white drop-shadow-sm">0850 888 777</p>
                  </div>
                  <a href="tel:0850888777" className="bg-white text-red-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
                  </a>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-red-200 uppercase tracking-wide">{t.break_call_abroad}</p>
                    <p className="text-lg font-black mt-1 text-white drop-shadow-sm">+421 904 333 230</p>
                  </div>
                  <a href="tel:+421904333230" className="bg-white text-red-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown specific issues v modernych kartach */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                <Settings className="w-6 h-6 no-tts" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-800 dark:text-white mb-4">{t.break_flat}</h4>
              <ul className="text-xs space-y-3 text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex gap-3"><span className="text-rose-500 text-lg leading-none">•</span> {t.break_flat_1}</li>
                <li className="flex gap-3"><span className="text-rose-500 text-lg leading-none">•</span> {t.break_flat_2}</li>
                <li className="flex gap-3"><span className="text-rose-500 text-lg leading-none">•</span> {t.break_flat_4}</li>
              </ul>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                <Car className="w-6 h-6 no-tts" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-800 dark:text-white mb-4">{t.break_keys}</h4>
              <ul className="text-xs space-y-3 text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex gap-3"><span className="text-amber-500 text-lg leading-none">•</span> {t.break_keys_1}</li>
                <li className="flex gap-3"><span className="text-amber-500 text-lg leading-none">•</span> {t.break_keys_2}</li>
                <li className="flex gap-3"><span className="text-amber-500 text-lg leading-none">•</span> {t.break_keys_3}</li>
              </ul>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                <Key className="w-6 h-6 no-tts" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-800 dark:text-white mb-4">{t.break_lost}</h4>
              <ul className="text-xs space-y-3 text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex gap-3"><span className="text-slate-500 text-lg leading-none">•</span> {t.break_lost_1}</li>
                <li className="flex gap-3"><span className="text-slate-500 text-lg leading-none">•</span> {t.break_lost_2}</li>
                <li className="flex gap-3"><span className="text-slate-500 text-lg leading-none">•</span> {t.break_lost_3}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. UDRZBA */}
        <div id="udrzba">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-wider text-sm">{t.maint_h2}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Tlak v pneu */}
            <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-indigo-100/50 dark:border-slate-700/50 md:col-span-2 relative overflow-hidden backdrop-blur-md hover:shadow-2xl transition-all duration-300">
              <h3 className="font-extrabold text-xl mb-5 text-slate-800 dark:text-white flex items-center gap-3 drop-shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner"><AlertOctagon className="w-5 h-5 no-tts" /></div>
                {t.maint_tp_h}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                
                {/* Lavy stlpec: Hodnoty a audio */}
                <div className="flex flex-col h-full">
                  <div className="space-y-3 mb-5">
                    <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                      <div className="w-3 h-3 rounded-full bg-rose-500 flex-shrink-0 shadow-sm shadow-rose-500/50"></div>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{t.maint_tp_under}</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm shadow-emerald-500/50"></div>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{t.maint_tp_ok}</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                      <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0 shadow-sm shadow-amber-500/50"></div>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{t.maint_tp_over}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-800/20 p-4 text-xs rounded-2xl border border-indigo-200/50 dark:border-indigo-700/30 text-indigo-900 dark:text-indigo-200 mb-5 shadow-inner">
                    <span className="font-extrabold">{t.maint_tp_where}</span> {t.maint_tp_where_val}<br/><br/>
                    <strong className="text-indigo-700 dark:text-indigo-300">Info: </strong> {t.maint_tp_reset}
                  </div>

                  {/* Interaktivny audio navod */}
                  <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-4 text-white mt-auto shadow-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-extrabold flex items-center gap-2"><Volume2 className="w-4 h-4" /> {t.maint_tp_listen}</span>
                      {(isGuidePlaying || isGuidePaused) && (
                        <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-full font-bold">
                          {isGuidePlaying ? 'Prehráva sa' : 'Pozastavené'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {isGuidePlaying ? (
                        <button onClick={handlePause} className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-inner">
                          <Pause className="w-5 h-5" />
                        </button>
                      ) : (
                        <button onClick={handlePlay} className="flex-1 bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                          <Play className="w-5 h-5" />
                        </button>
                      )}
                      <button onClick={handleStop} disabled={!isGuidePlaying && !isGuidePaused} className="w-14 bg-white/10 hover:bg-rose-500/90 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-inner">
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pravy stlpec: Postup a Tip */}
                <div className="bg-white/60 dark:bg-slate-900/60 p-5 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
                  <h4 className="font-extrabold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.maint_tp_proc_h}</h4>
                  <ol className="list-decimal pl-4 text-xs space-y-3 text-slate-700 dark:text-slate-300 font-medium">
                    <li>{t.maint_tp_proc_1}</li>
                    <li>{t.maint_tp_proc_2}</li>
                    <li>{t.maint_tp_proc_3}</li>
                    <li>{t.maint_tp_proc_4}</li>
                    <li>{t.maint_tp_proc_5}</li>
                    <li>{t.maint_tp_proc_6}</li>
                    <li className="font-extrabold text-indigo-600 dark:text-indigo-400">{t.maint_tp_proc_7}</li>
                  </ol>

                  {/* Audio pre Postup */}
                  <div className="mt-5 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-4 text-white shadow-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold flex items-center gap-2"><Volume2 className="w-4 h-4" /> {language === 'sk' ? 'Prečítať postup' : 'Read steps'}</span>
                      {(isProcPlaying || isProcPaused) && (
                        <span className="text-[10px] uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-full font-bold">
                          {isProcPlaying ? (language === 'sk' ? 'Prehráva sa' : 'Playing') : (language === 'sk' ? 'Pozastavené' : 'Paused')}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {isProcPlaying ? (
                        <button onClick={handleProcPause} className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-inner">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={handleProcPlay} className="flex-1 bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={handleProcStop} disabled={!isProcPlaying && !isProcPaused} className="w-12 bg-white/10 hover:bg-rose-500/90 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl flex items-center justify-center transition-all shadow-inner">
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/10 border border-yellow-200/50 dark:border-yellow-700/30 rounded-xl text-xs shadow-inner">
                    <strong className="text-yellow-800 dark:text-yellow-500 text-sm">{t.maint_tp_tip_h}</strong><br/>
                    <span className="text-yellow-700 dark:text-yellow-400/90 font-medium block mt-1.5">{t.maint_tp_tip_desc}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Kontrolky - Interaktívna DB */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 md:col-span-2 relative overflow-hidden backdrop-blur-md">
              <h3 className="font-extrabold text-xl mb-5 text-slate-800 dark:text-white flex items-center gap-3 drop-shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner"><Activity className="w-5 h-5 no-tts" /></div>
                {t.maint_lights_h}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Cervene */}
                <div className="space-y-5">
                  <div className="border-l-4 border-red-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-500 animate-pulse"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16c0-3 3-5 7-5h5l4-3M15 11v3M6 16v3h9v-3" /><circle cx="20" cy="7" r="1" fill="currentColor" /></svg></div>
                      {t.maint_lights_oil_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 bg-red-50 dark:bg-red-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_oil_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_oil_d}</p>
                  </div>

                  <div className="border-l-4 border-red-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-500 animate-pulse"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.5a2.5 2.5 0 1 1-4 0V4a2 2 0 0 1 4 0zM10 7h4M10 10h4" /><path d="M4 20c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1" /></svg></div>
                      {t.maint_lights_temp_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 bg-red-50 dark:bg-red-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_temp_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_temp_d}</p>
                  </div>

                  <div className="border-l-4 border-red-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-500 animate-pulse"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="6" /><path d="M12 9v4M12 15h.01M4.5 7.5c-2 2.5-2 6.5 0 9M19.5 7.5c2 2.5 2 6.5 0 9" /></svg></div>
                      {t.maint_lights_brakes_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 bg-red-50 dark:bg-red-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_brakes_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_brakes_d}</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-500 animate-pulse"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M6 7V5h3v2M15 7V5h3v2M7 12h2M14 12h4M16 10v4" /></svg></div>
                      {t.maint_lights_batt_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 bg-red-50 dark:bg-red-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_batt_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_batt_d}</p>
                  </div>
                </div>

                {/* Zlte */}
                <div className="space-y-5">
                  <div className="border-l-4 border-amber-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-500"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h3V7h4v2h3V7h4v2h3v3h2v3h-2v2h-3v2H9v-2H6v-2H2V9zm2 3v2h2v-2H4zm11 0v2h3v-2h-3z" /></svg></div>
                      {t.maint_lights_eng_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 bg-amber-50 dark:bg-amber-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_eng_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_eng_d}</p>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-500"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11c0-4 4-7 8-7s8 3 8 7c0 3-1 4.5-3 5.5l-1-1c1.5-.7 2-2 2-4.5 0-3-2.7-5-6-5s-6 2-6 5c0 2.5.5 3.8 2 4.5l-1 1c-2-1-3-2.5-3-5.5zm3 5.5c2 1 6 1 8 0" /><path d="M12 7v4M12 13h.01" /></svg></div>
                      {t.maint_lights_tpms_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 bg-amber-50 dark:bg-amber-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_tpms_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_tpms_d}</p>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 bg-white/80 dark:bg-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-3 mb-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-500"><svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10h6v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8zM11 10V6h2v4M10 6h4M7 16c2 1 4 1 6 0M7 14c2 1 4 1 6 0" /></svg></div>
                      {t.maint_lights_adblue_h}
                    </h4>
                    <p className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 bg-amber-50 dark:bg-amber-900/20 inline-block px-2 py-1 rounded-md">{t.maint_lights_adblue_s}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">{t.maint_lights_adblue_d}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center text-center backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Droplet className="w-7 h-7 no-tts" />
              </div>
              <h4 className="font-extrabold text-base mb-2 text-slate-800 dark:text-white">{t.maint_fluids_h}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.maint_fluids_p}</p>
            </div>
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center text-center backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <ShieldCheck className="w-7 h-7 no-tts" />
              </div>
              <h4 className="font-extrabold text-base mb-2 text-slate-800 dark:text-white">{t.maint_adblue_h}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.maint_adblue_p}</p>
            </div>
            <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center text-center backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 text-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Wrench className="w-7 h-7 no-tts" />
              </div>
              <h4 className="font-extrabold text-base mb-2 text-slate-800 dark:text-white">{t.maint_bolt_h}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.maint_bolt_p}</p>
            </div>
          </div>
        </div>

        {/* 3. SERVIS & OPRAVA (Povodna sekcia) */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-wider text-sm">{t.sec1_title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-500 group-hover:scale-110">
                <Wrench className="w-48 h-48 no-tts drop-shadow-2xl" />
              </div>
              <div className="relative z-10">
                <span className="bg-white/20 text-[10px] text-blue-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                  🔧 Ayvens Servis
                </span>
                <p className="text-sm font-medium text-blue-50 mt-4 mb-6 leading-relaxed drop-shadow-md">{t.sec1_desc}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner group/btn hover:bg-white/20 transition-colors">
                    <div>
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{t.sk_contact}</p>
                      <p className="text-lg font-black mt-1 text-white drop-shadow-sm">0850 888 777</p>
                    </div>
                    <a href="tel:0850888777" className="bg-white text-blue-700 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      <PhoneCall className="w-4 h-4 no-tts" /> {t.call}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-extrabold text-lg flex items-center gap-3 mb-3 text-slate-800 dark:text-white">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 rounded-xl flex items-center justify-center shadow-inner"><ShieldCheck className="w-5 h-5 no-tts" /></div>
                  {t.sec2_title}
                </h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.sec2_desc}</p>
              </div>

              <div className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-extrabold text-lg flex items-center gap-3 mb-5 text-slate-800 dark:text-white">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 text-orange-500 rounded-xl flex items-center justify-center shadow-inner"><Wrench className="w-5 h-5 no-tts" /></div>
                  {t.sec3_title}
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-700 shadow-inner">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider mb-1">{t.bmw}</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{t.bmw_partners}</span>
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-700 shadow-inner">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider mb-1">{t.vw}</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{t.vw_partners}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SectionLayout>
  );
}
