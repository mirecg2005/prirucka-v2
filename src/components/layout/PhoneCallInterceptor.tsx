"use client";

import React, { useEffect, useState } from "react";
import { PhoneCall, X } from "lucide-react";

export default function PhoneCallInterceptor() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const target = (e.target as Element).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('tel:')) {
        e.preventDefault();
        const number = href.replace('tel:', '');
        setPhoneNumber(number);
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  if (!phoneNumber) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center relative">
          <button 
            onClick={() => setPhoneNumber(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
            <PhoneCall className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Naozaj volať?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Prajete si vytočiť číslo <br/>
            <strong className="text-lg text-slate-800 dark:text-white mt-1 block">{phoneNumber}</strong>
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setPhoneNumber(null)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Zrušiť
            </button>
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => setPhoneNumber(null)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Volať
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
