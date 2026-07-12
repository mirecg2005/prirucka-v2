"use client";

import React, { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Skontrolujeme, či ide o iOS zariadenie (Apple nepodporuje priamu inštaláciu cez tlačidlo)
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const isWebKit = !!ua.match(/WebKit/i);
    const isIOSDevice = isIPad || isIPhone;
    setIsIOS(isIOSDevice && isWebKit && !ua.match(/CriOS/i));

    // Odchytíme inštalačný event na Androide/Chrome
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Zabráni okamžitému zobrazeniu
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Sme na Androide/Chrome - ukážeme natívny systémový dialóg
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Sme na iOS alebo je appka už nainštalovaná -> ukážeme nápovedu
      setShowModal(true);
    }
  };

  return (
    <>
      <button 
        onClick={handleInstallClick}
        className="w-10 h-10 flex items-center justify-center rounded-full text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors mr-1 shadow-sm"
        aria-label="Nainštalovať aplikáciu"
      >
        <Download className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-card border border-border rounded-2xl shadow-2xl z-[101] overflow-hidden p-6 text-center"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Inštalácia aplikácie</h3>
              
              {isIOS ? (
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  <p className="mb-2">Apple (iPhone) zatiaľ nepodporuje inštaláciu jedným kliknutím.</p>
                  <p>
                    Kliknite dole v prehliadači Safari na ikonu <strong>Zdieľať</strong> (štvorec so šípkou nahor) a následne z ponuky vyberte možnosť <strong>Pridať na plochu</strong> (Add to Home Screen).
                  </p>
                </div>
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  <p>
                    Aplikácia už je pravdepodobne nainštalovaná, alebo váš prehliadač nepodporuje túto rýchlu skratku. 
                  </p>
                  <p className="mt-2">
                    Skúste otvoriť menu vášho prehliadača (tri bodky vpravo hore) a nájsť možnosť <strong>Pridať na plochu</strong> alebo <strong>Inštalovať</strong>.
                  </p>
                </div>
              )}
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                Rozumiem
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
