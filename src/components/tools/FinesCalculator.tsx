"use client";

import React, { useState } from "react";
import { Calculator, AlertCircle, Euro } from "lucide-react";

export default function FinesCalculator() {
  const [zone, setZone] = useState<"in" | "out">("in");
  const [excessSpeed, setExcessSpeed] = useState<number>(0);

  const calculateFine = () => {
    if (excessSpeed === 0) return 0;
    if (zone === "in") {
      if (excessSpeed <= 6) return 0; // Tolerancia
      if (excessSpeed <= 10) return 20;
      if (excessSpeed <= 15) return 40;
      if (excessSpeed <= 20) return 60;
      if (excessSpeed <= 25) return 90;
      if (excessSpeed <= 30) return 140;
      if (excessSpeed <= 35) return 200;
      if (excessSpeed <= 40) return 280;
      if (excessSpeed <= 45) return 360;
      if (excessSpeed <= 50) return 440;
      return "440+ (Správne konanie)";
    } else {
      if (excessSpeed <= 6) return 0;
      if (excessSpeed <= 15) return 20;
      if (excessSpeed <= 25) return 40;
      if (excessSpeed <= 30) return 60;
      if (excessSpeed <= 35) return 120;
      if (excessSpeed <= 40) return 160;
      if (excessSpeed <= 45) return 200;
      if (excessSpeed <= 50) return 300;
      if (excessSpeed <= 55) return 400;
      return "400+ (Správne konanie)";
    }
  };

  const fine = calculateFine();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="bg-muted p-4 border-b border-border flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full text-primary">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-foreground">Kalkulačka pokút za rýchlosť</h3>
      </div>
      
      <div className="p-5 space-y-6">
        {/* Typ zóny */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Miesto priestupku</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setZone("in")}
              className={`py-3 px-4 rounded-lg font-medium border transition-all ${
                zone === "in" 
                  ? "bg-primary text-primary-foreground border-primary shadow-md" 
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              V obci
            </button>
            <button
              onClick={() => setZone("out")}
              className={`py-3 px-4 rounded-lg font-medium border transition-all ${
                zone === "out" 
                  ? "bg-primary text-primary-foreground border-primary shadow-md" 
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              Mimo obce
            </button>
          </div>
        </div>

        {/* Prekročenie rýchlosti */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prekročenie o</label>
            <span className="text-2xl font-black text-foreground">{excessSpeed} <span className="text-base font-semibold text-muted-foreground">km/h</span></span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="60" 
            step="1"
            value={excessSpeed} 
            onChange={(e) => setExcessSpeed(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60+</span>
          </div>
        </div>

        {/* Výsledok */}
        <div className="bg-muted rounded-xl p-4 flex items-center justify-between border border-border">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <AlertCircle className="w-5 h-5" />
            Odhadovaná pokuta
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400 flex items-center gap-1">
            {fine === 0 ? (
              <span className="text-green-600 dark:text-green-500">Bez pokuty</span>
            ) : typeof fine === 'number' ? (
              <>{fine} <Euro className="w-5 h-5" strokeWidth={3} /></>
            ) : (
              <span className="text-lg">{fine}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
