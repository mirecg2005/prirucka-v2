"use client";

import React, { useState, useEffect } from "react";
import { Share2, X, Copy, CheckCircle, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [appUrl, setAppUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Použijeme celý odkaz (href) namiesto len domény (origin), 
      // aby sa správne zachytil aj podpriečinok ako /prirucka-v2/
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lidl Príručka vodiča",
          text: "Nainštaluj si aplikáciu Lidl Príručka vodiča priamo do mobilu!",
          url: appUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-card border border-border rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <h3 className="font-bold flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Zdieľať aplikáciu
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center">
              <p className="text-sm text-center text-muted-foreground mb-6">
                Naskenujte tento QR kód fotoaparátom iného telefónu, alebo pošlite odkaz priamo kolegovi.
              </p>

              {/* QR Code (Using external API for simplicity and no dependencies) */}
              <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200 mb-6">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`}
                  alt="QR Kód aplikácie"
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  <Share2 className="w-5 h-5" />
                  Zdieľať odkaz
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Skopírované!" : "Kopírovať odkaz"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
