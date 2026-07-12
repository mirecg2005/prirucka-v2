"use client";

import React from "react";
import { Home, Search, AlertTriangle, Phone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { id: "home", route: "/", icon: Home, labelKey: "nav.home" as const },
    { id: "search", route: "#search", icon: Search, labelKey: "nav.search" as const },
    { id: "emergency", route: "/section/accident", icon: AlertTriangle, labelKey: "nav.emergency" as const },
    { id: "contacts", route: "/section/contacts", icon: Phone, labelKey: "nav.contacts" as const },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] bg-card border-t border-border z-50 pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="flex h-16 w-full max-w-md mx-auto items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.route;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.route === "#search") {
                  // Simulate click on the search input if on homepage
                  document.getElementById("main-search")?.focus();
                } else {
                  router.push(item.route);
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
