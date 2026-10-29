"use client";

import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  KvkSection,
  PactSection,
  SaveSection,
  StrategySection,
} from "@/components/Sections";
import { FaqSection } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { LockedGuide } from "@/components/LockedGuide";
import { useLang } from "@/i18n/LanguageContext";
import { usePlayer } from "@/i18n/PlayerContext";

export default function GuidePage() {
  const { t } = useLang();
  const { player } = usePlayer();

  return (
    <>
      <a href="#main" className="sr-skip">
        {t.a11y.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        {player ? (
          <>
            <KvkSection />
            <SaveSection />
            <StrategySection />
            <PactSection />
            <FaqSection />
          </>
        ) : (
          <LockedGuide />
        )}
      </main>
      <Footer />
    </>
  );
}
