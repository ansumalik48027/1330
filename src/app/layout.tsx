import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { PlayerProvider } from "@/i18n/PlayerContext";

/* Playfair Display: royal display serif with full latin + cyrillic coverage */
const display = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-displayvar",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "greek"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KvK Event Guide — KingShot Server 1330",
  description:
    "United Kingdom 1330: The Road to KvK Victory. Official community event guide for the Kingdom vs Kingdom war — reserves, strategy, alliance pact and doubt submission.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${manrope.variable}`}>
        <LanguageProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
