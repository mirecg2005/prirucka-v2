"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import TTSGlobalPlayer from "./TTSGlobalPlayer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error('SW registration failed:', err);
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      {/* 
        Main content area needs padding to avoid overlap with fixed Header (h-16) and BottomNav (h-16).
        pb-safe accounts for iOS home indicator
      */}
      <main className="flex-1 pt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] overflow-x-hidden">
        {children}
      </main>

      <TTSGlobalPlayer />
      <BottomNav />
    </div>
  );
}
