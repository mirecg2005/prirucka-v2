import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/layout/AppShell";
import { LanguageProvider } from "@/i18n/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Príručka pre Vodičov",
  description: "Základná príručka pre vodičov flotily.",
  manifest: "/prirucka-v2/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    title: "Príručka",
    statusBarStyle: "black-translucent",
  },
};

import { TTSProvider } from "@/context/TTSContext";
import { FontSizeProvider } from "@/context/FontSizeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <FontSizeProvider>
              <TTSProvider>
                <AppShell>{children}</AppShell>
              </TTSProvider>
            </FontSizeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
