"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type FontSize = "normal" | "large" | "xl" | "xxl";

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");

  useEffect(() => {
    const saved = localStorage.getItem("app-font-size") as FontSize;
    if (saved && ["normal", "large", "xl", "xxl"].includes(saved)) {
      setFontSizeState(saved);
      document.documentElement.setAttribute("data-font-size", saved);
    } else {
      document.documentElement.setAttribute("data-font-size", "normal");
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("app-font-size", size);
    document.documentElement.setAttribute("data-font-size", size);
  };

  const cycleFontSize = () => {
    if (fontSize === "normal") setFontSize("large");
    else if (fontSize === "large") setFontSize("xl");
    else if (fontSize === "xl") setFontSize("xxl");
    else setFontSize("normal");
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, cycleFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error("useFontSize must be used within FontSizeProvider");
  return context;
}
