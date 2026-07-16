"use client";

import React, { useRef } from "react";
import { useTTS } from "@/context/TTSContext";

interface InteractiveTTSWrapperProps {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

export default function InteractiveTTSWrapper({ children, className = "", text }: InteractiveTTSWrapperProps) {
  const { interactiveMode, play, stop, state } = useTTS();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactiveMode) return;
    
    // Prevent underlying links or accordions from triggering if we are just reading
    e.preventDefault();
    e.stopPropagation();

    let textToRead = text;

    if (!textToRead && wrapperRef.current) {
      // Extract text from the wrapper, excluding .no-tts elements
      const clone = wrapperRef.current.cloneNode(true) as HTMLElement;
      const noTtsElements = clone.querySelectorAll('.no-tts, button');
      noTtsElements.forEach(el => el.remove());
      
      // Add a period at the end of block elements so textContent doesn't merge them without spaces
      let html = clone.innerHTML;
      html = html.replace(/<\/(h1|h2|h3|h4|h5|h6|p|li)>/gi, ". </$1>");
      clone.innerHTML = html;
      
      textToRead = clone.textContent || clone.innerText || "";
    }

    if (textToRead && textToRead.trim().length > 0) {
      // Stop anything currently playing
      if (state === "playing" || state === "paused") {
        stop();
      }
      play(textToRead.trim());
    }
  };

  if (!interactiveMode) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={wrapperRef}
      onClick={handleClick}
      className={`${className} cursor-pointer transition-all duration-300 ring-2 ring-blue-400 dark:ring-blue-500 shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/30 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group`}
      title="Kliknite pre prečítanie"
    >
      {/* Visual indicator that this is readable */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-70 group-hover:opacity-100 no-tts"></div>
      {children}
    </div>
  );
}
