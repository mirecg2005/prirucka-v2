"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Wrench, Droplet, FileText, PhoneCall, ShieldAlert, ShieldCheck, ChevronRight, BookOpen, Mic, AlertCircle, Scale, Globe, Receipt, Car, Smartphone, MapPin } from "lucide-react";
import SectionCard from "@/components/dashboard/SectionCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import EmergencyBanner from "@/components/dashboard/EmergencyBanner";
import Fuse from "fuse.js";
import { allSearchIndex } from "@/data/searchIndex";
import { useLanguage } from "@/i18n/LanguageContext";
import RuleModal from "@/components/dashboard/RuleModal";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [autoPlayRule, setAutoPlayRule] = useState(false);

  const { language, t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) setSpeechSupported(false);
    }
  }, []);

  const fuse = useMemo(() => new Fuse(allSearchIndex, {
    keys: ["title", "keywords", "content"],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2,
  }), []);

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'sk-SK';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      
      // Auto-read logic:
      const results = fuse.search(transcript);
      if (results.length > 0) {
        const topResult: any = results[0].item;
        if (topResult.type === "rule") {
          setSelectedRule(topResult);
          setAutoPlayRule(true);
          setQuery(""); // clear query to hide search results
        } else if (topResult.type === "section") {
          router.push(topResult.route);
          setQuery("");
        }
      }
    };
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  const searchResults = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);

  return (
    <div className="flex flex-col p-4 space-y-6">
      
      {/* Search Bar */}
      <div className="relative group z-20">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          id="main-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-12 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-base"
          placeholder={t('search.placeholder')}
        />
        
        {speechSupported && (
          <button
            onClick={startListening}
            className={`absolute inset-y-0 right-3 flex items-center justify-center transition-colors ${
              isListening ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-primary"
            }`}
            aria-label="Hlasové vyhľadávanie"
          >
            <Mic className="h-5 w-5" />
          </button>
        )}
        
        {/* Search Results Dropdown */}
        {query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {searchResults.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto divide-y divide-border">
                {searchResults.map((item: any) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.type === "rule") {
                          setSelectedRule(item);
                          setQuery(""); // Close search dropdown
                        } else {
                          router.push(item.route);
                        }
                      }}
                      className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors focus:outline-none focus:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        {item.type === "rule" ? (
                          <ShieldAlert className="w-4 h-4 text-indigo-500 shrink-0" />
                        ) : (
                          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span className="font-semibold text-foreground">{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                {t('search.empty')} "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Zatemnenie pozadia pri hľadaní */}
      {query && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10" onClick={() => setQuery("")}></div>
      )}

      <div className="relative z-0 space-y-8 pb-10">
        
        {/* Rýchle Akcie a Núdzové Situácie */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <QuickActionCard 
                title={language === 'sk' ? 'Mám nehodu' : 'I had an accident'} 
                subtitle={language === 'sk' ? 'Okamžitý postup krok za krokom.' : 'Immediate step-by-step procedure.'} 
                icon={AlertCircle} 
                color="red" 
                onClick={() => router.push('/section/accident')} 
             />
             <QuickActionCard 
                title={language === 'sk' ? 'Servis, Poruchy a Údržba' : 'Service, Breakdowns & Maintenance'} 
                subtitle={language === 'sk' ? 'Objednávky, asistencia, kontrolky.' : 'Booking, assistance, indicators.'} 
                icon={Wrench} 
                color="blue" 
                onClick={() => router.push('/section/service')} 
             />
          </div>
        </div>

        {/* Informačné Kategórie */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
             <SectionCard title={language === 'sk' ? 'Základné Pravidlá' : 'Basic Rules'} icon={BookOpen} accentColor="blue" onClick={() => router.push('/section/rules')} />
             <SectionCard title={language === 'sk' ? 'Zákonné Pravidlá a Pokuty' : 'Legal Rules & Fines'} icon={Scale} accentColor="yellow" onClick={() => router.push('/section/rules#legal')} />
             <SectionCard title={language === 'sk' ? 'Tankovanie (aj Zahraničie)' : 'Fueling (& Abroad)'} icon={Droplet} accentColor="green" onClick={() => router.push('/section/fuel')} />
             
             <SectionCard title={language === 'sk' ? 'Poistné Udalosti' : 'Insurance Claims'} icon={ShieldCheck} accentColor="green" onClick={() => router.push('/section/insurance')} />
             <SectionCard title={language === 'sk' ? 'Kniha Jázd' : 'Logbook'} icon={FileText} accentColor="purple" onClick={() => router.push('/section/logbook')} />
             <SectionCard title={language === 'sk' ? 'Nové Vozidlo' : 'New Vehicle'} icon={Car} accentColor="orange" onClick={() => router.push('/section/new-vehicle')} />
             <SectionCard title="MY BMW" icon={Smartphone} accentColor="blue" onClick={() => router.push('/section/my-bmw')} />
             <SectionCard title={language === 'sk' ? 'Miesto zaparkovania' : 'Parking'} icon={MapPin} accentColor="purple" onClick={() => router.push('/section/parking')} />
             
             <SectionCard title={language === 'sk' ? 'Dôležité Kontakty' : 'Important Contacts'} icon={PhoneCall} accentColor="red" onClick={() => router.push('/section/contacts')} />
          </div>
        </div>
      </div>
      
      {/* Modálne okno pre pravidlá z vyhľadávania */}
      <RuleModal 
        isOpen={!!selectedRule} 
        onClose={() => {
          setSelectedRule(null);
          setAutoPlayRule(false);
        }} 
        rule={selectedRule} 
        autoPlay={autoPlayRule}
      />
    </div>
  );
}
