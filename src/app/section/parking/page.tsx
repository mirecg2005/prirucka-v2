"use client";

import React, { useState, useEffect } from "react";
import SectionLayout from "@/components/layout/SectionLayout";
import { MapPin, Camera, Navigation, Trash2, Map } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ParkingLocation {
  lat: number;
  lng: number;
  timestamp: number;
  note: string;
}

export default function ParkingPage() {
  const { language } = useLanguage();
  const [location, setLocation] = useState<ParkingLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const t = {
    sk: {
      title: "Kde som zaparkoval?",
      intro: "Uložte si aktuálnu polohu vozidla, aby ste ho neskôr ľahko našli. Ideálne do cudzích miest a veľkých parkovísk.",
      btn_save: "Uložiť polohu auta",
      btn_nav: "Navigovať k autu",
      btn_delete: "Zmazať polohu",
      lbl_note: "Poznámka k parkovaniu (napr. 4. poschodie, sekcia B):",
      lbl_saved: "Uložená poloha:",
      err_geo: "Nepodarilo sa získať polohu. Skontrolujte povolenia.",
      loading: "Získavam polohu...",
      placeholder: "Sektor D, miesto 145...",
      lbl_note_short: "Poznámka:",
    },
    en: {
      title: "Where did I park?",
      intro: "Save your vehicle's current location to easily find it later. Ideal for unfamiliar cities and large car parks.",
      btn_save: "Save car location",
      btn_nav: "Navigate to car",
      btn_delete: "Clear location",
      lbl_note: "Parking note (e.g., 4th floor, Section B):",
      lbl_saved: "Saved location:",
      err_geo: "Failed to get location. Check permissions.",
      loading: "Getting location...",
      placeholder: "Sector D, spot 145...",
      lbl_note_short: "Note:",
    }
  }[language] || {
    title: "Kde som zaparkoval?",
    intro: "Uložte si aktuálnu polohu vozidla, aby ste ho neskôr ľahko našli. Ideálne do cudzích miest a veľkých parkovísk.",
    btn_save: "Uložiť polohu auta",
    btn_nav: "Navigovať k autu",
    btn_delete: "Zmazať polohu",
    lbl_note: "Poznámka k parkovaniu (napr. 4. poschodie, sekcia B):",
    lbl_saved: "Uložená poloha:",
    err_geo: "Nepodarilo sa získať polohu. Skontrolujte povolenia.",
    loading: "Získavam polohu...",
    placeholder: "Sektor D, miesto 145...",
    lbl_note_short: "Poznámka:",
  };

  useEffect(() => {
    const saved = localStorage.getItem("parking_location");
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError(t.err_geo);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          note: noteInput
        };
        setLocation(newLoc);
        localStorage.setItem("parking_location", JSON.stringify(newLoc));
        setNoteInput("");
        setLoading(false);
      },
      (err) => {
        setError(t.err_geo);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const deleteLocation = () => {
    localStorage.removeItem("parking_location");
    setLocation(null);
  };

  const openMap = () => {
    if (!location) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <SectionLayout title={t.title} contentId="content-parking" headerAccent="purple">
      <div className="flex items-center gap-3 mb-8 bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 shadow-sm">
        <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400 no-tts flex-shrink-0" />
        <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
          {t.intro}
        </p>
      </div>

      {!location ? (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Map className="w-12 h-12 text-purple-500" />
          </div>
          
          <label className="w-full text-left mb-4">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">{t.lbl_note}</span>
            <input 
              type="text" 
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder={t.placeholder}
            />
          </label>

          <button 
            onClick={saveLocation}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">{t.loading}</span>
            ) : (
              <>
                <MapPin className="w-6 h-6" />
                {t.btn_save}
              </>
            )}
          </button>
          
          {error && <p className="text-red-500 text-sm mt-4 font-bold">{error}</p>}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10 backdrop-blur-md">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <MapPin className="w-48 h-48 drop-shadow-2xl" />
          </div>
          
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] text-purple-50 uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              {t.lbl_saved} {new Date(location.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
            
            {location.note && (
              <div className="mt-6 mb-2">
                <p className="text-xs text-purple-200 uppercase tracking-wider font-bold mb-1">{t.lbl_note_short}</p>
                <p className="text-xl font-black drop-shadow-sm">{location.note}</p>
              </div>
            )}
            
            <p className="text-xs text-purple-200 mt-4 mb-6">
              GPS: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={openMap}
                className="w-full bg-white text-purple-700 font-extrabold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Navigation className="w-6 h-6" />
                {t.btn_nav}
              </button>
              
              <button 
                onClick={deleteLocation}
                className="w-full bg-black/20 hover:bg-black/30 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/10"
              >
                <Trash2 className="w-4 h-4" />
                {t.btn_delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionLayout>
  );
}
