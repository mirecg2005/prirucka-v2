"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

type LightColor = "red" | "yellow" | "green" | "blue";

interface WarningLight {
  id: string;
  name: string;
  color: LightColor;
  description: string;
  action: string;
  iconId: string;
  label: string;
}

const lightsData: WarningLight[] = [
  {
    id: "oil",
    name: "Červená olejnička (Nízky tlak oleja)",
    color: "red",
    description: "Nízky tlak motorového oleja.",
    action: "Okamžite bezpečne zastavte vozidlo a vypnite motor! Skontrolujte hladinu oleja a v prípade potreby ho doplňte. Ak kontrolka svieti aj po doplnení, motor neštartujte a bezodkladne kontaktujte asistenčnú službu.",
    iconId: "oil",
    label: "OIL"
  },
  {
    id: "temp",
    name: "Červený teplomer (Prehriatie)",
    color: "red",
    description: "Prehriatie motora alebo kritický nedostatok chladiacej kvapaliny.",
    action: "Bezpečne zastavte vozidlo, vypnite motor a nechajte ho vychladnúť. Nikdy neotvárajte viečko chladiacej nádržky, kým je motor horúci (hrozí obarenie!). Doplňte chladiacu zmes alebo čistú vodu.",
    iconId: "temp",
    label: "TEMP"
  },
  {
    id: "brakes",
    name: "Červený výkričník (Brzdový systém)",
    color: "red",
    description: "Problém s brzdovým systémom alebo zatiahnutá ručná brzda.",
    action: "Najskôr skontrolujte, či je ručná brzda úplne uvoľnená. Ak svieti za jazdy, môže ísť o nedostatok brzdovej kvapaliny. Pokračovať v jazde je nebezpečné, volajte odťah.",
    iconId: "brakes",
    label: "BRAKE"
  },
  {
    id: "battery",
    name: "Červená batéria (Porucha dobíjania)",
    color: "red",
    description: "Porucha alternátora. Akumulátor sa nedobíja.",
    action: "Vozidlo spotrebováva energiu len z batérie. Môžete prejsť krátku vzdialenosť na bezpečné miesto, no motor čoskoro samovoľne zhasne. Odporúča sa vypnúť rádio, klímu a vyhrievanie sedadiel.",
    iconId: "battery",
    label: "BATT"
  },
  {
    id: "engine",
    name: "Žltá kontrolka motora (MIL / Emisie)",
    color: "yellow",
    description: "Chyba v elektronike riadenia motora alebo emisnom systéme.",
    action: "Auto sa môže prepnúť do núdzového režimu s obmedzeným výkonom. Jazda je možná, ale je nutné sa bezodkladne objednať do servisu.",
    iconId: "engine",
    label: "CHECK"
  },
  {
    id: "tpms",
    name: "Žltý výkričník v pneu (TPMS)",
    color: "yellow",
    description: "Zistený pokles tlaku v pneumatike.",
    action: "Zastavte na najbližšej čerpacej stanici, skontrolujte pneu a dohustite ich. Po každom dofúkaní resetujte tlak v systéme iDrive.",
    iconId: "tpms",
    label: "TPMS"
  },
  {
    id: "adblue",
    name: "Žltá fľaša (Nízka hladina AdBlue)",
    color: "yellow",
    description: "Hladina AdBlue kvapaliny je nízka.",
    action: "Čo najskôr dolejte AdBlue zo stojana pomocou palivovej karty. Ak hladina klesne na nulu a vypnete motor, vozidlo už nenaštartujete (zákonné zablokovanie).",
    iconId: "adblue",
    label: "AdBlue"
  }
];

export default function WarningLights() {
  const [filter, setFilter] = useState<LightColor | "all">("all");

  const filteredLights = lightsData.filter(light => filter === "all" || light.color === filter);

  const getIconSvg = (id: string, color: LightColor) => {
    const cls = `w-12 h-12 mb-1 ${color === 'red' ? 'text-red-600 dark:text-red-500' : 'text-amber-500 dark:text-amber-400'}`;
    
    switch (id) {
      case "oil":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 16c0-3 3-5 7-5h5l4-3M15 11v3M6 16v3h9v-3" />
            <circle cx="20" cy="7" r="1" fill="currentColor" />
          </svg>
        );
      case "temp":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 4v10.5a2.5 2.5 0 1 1-4 0V4a2 2 0 0 1 4 0zM10 7h4M10 10h4" />
            <path d="M4 20c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1" />
          </svg>
        );
      case "brakes":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="6" />
            <path d="M12 9v4M12 15h.01M4.5 7.5c-2 2.5-2 6.5 0 9M19.5 7.5c2 2.5 2 6.5 0 9" />
          </svg>
        );
      case "battery":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M6 7V5h3v2M15 7V5h3v2M7 12h2M14 12h4M16 10v4" />
          </svg>
        );
      case "engine":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9h3V7h4v2h3V7h4v2h3v3h2v3h-2v2h-3v2H9v-2H6v-2H2V9zm2 3v2h2v-2H4zm11 0v2h3v-2h-3z" />
          </svg>
        );
      case "tpms":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11c0-4 4-7 8-7s8 3 8 7c0 3-1 4.5-3 5.5l-1-1c1.5-.7 2-2 2-4.5 0-3-2.7-5-6-5s-6 2-6 5c0 2.5.5 3.8 2 4.5l-1 1c-2-1-3-2.5-3-5.5zm3 5.5c2 1 6 1 8 0" />
            <path d="M12 7v4M12 13h.01" />
          </svg>
        );
      case "adblue":
        return (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 10h6v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-8zM11 10V6h2v4M10 6h4M7 16c2 1 4 1 6 0M7 14c2 1 4 1 6 0" />
          </svg>
        );
      default:
        return <Info className="w-10 h-10 shrink-0 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtre */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground border border-border"}`}
        >
          Všetky
        </button>
        <button 
          onClick={() => setFilter("red")}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${filter === "red" ? "bg-red-600 text-white" : "bg-muted text-red-600 border border-border"}`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-current"></div> Červené (Kritické)
        </button>
        <button 
          onClick={() => setFilter("yellow")}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${filter === "yellow" ? "bg-amber-500 text-white" : "bg-muted text-amber-600 border border-border"}`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-current"></div> Žlté (Varovania)
        </button>
      </div>

      {/* Zoznam */}
      <div className="grid gap-4">
        {filteredLights.map((light) => (
          <div key={light.id} className={`border rounded-xl p-5 transition-all shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 ${light.color === 'red' ? 'bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50' : 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50'}`}>
            <div className={`p-4 rounded-xl flex flex-col items-center justify-center shrink-0 border-2 bg-background ${light.color === 'red' ? 'border-red-200 dark:border-red-800' : 'border-amber-200 dark:border-amber-800'}`}>
              {getIconSvg(light.iconId, light.color)}
              <span className={`text-[10px] font-black uppercase tracking-wider ${light.color === 'red' ? 'text-red-600 dark:text-red-500' : 'text-amber-600 dark:text-amber-500'}`}>
                {light.label}
              </span>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg mb-1">{light.name}</h3>
              <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{light.description}</p>
              <div className="bg-background/80 rounded-lg p-3 border border-border">
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1 block">Čo robiť:</span>
                <p className="text-sm font-semibold">{light.action}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredLights.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Žiadne kontrolky v tejto kategórii.
          </div>
        )}
      </div>
    </div>
  );
}
