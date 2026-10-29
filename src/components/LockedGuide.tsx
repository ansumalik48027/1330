"use client";

import { useLang } from "@/i18n/LanguageContext";
import { IconLock } from "./ui";

/** Veil shown in place of guide sections 02–06 while no player is signed in. */
export function LockedGuide() {
  const { t } = useLang();
  const sealed = [
    t.header.nav.kvk,
    t.header.nav.save,
    t.header.nav.strategy,
    t.header.nav.pact,
    t.header.nav.faq,
  ];

  return (
    <section className="relative py-28 lg:py-36" aria-label={t.login.lockedTitle}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-[360px] w-[720px] -translate-x-1/2 bg-gold-500/[0.05] blur-[110px]"
      />
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <span className="pulse-ring mx-auto grid h-20 w-20 rotate-45 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400">
          <IconLock size={30} className="-rotate-45" />
        </span>
        <h2 className="font-display mt-10 text-3xl font-black tracking-wide text-bone-100 sm:text-4xl">
          {t.login.lockedTitle}
        </h2>
        <p className="mt-4 leading-relaxed text-mist-400">{t.login.lockedSub}</p>

        <ul className="mx-auto mt-9 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
          {sealed.map((label) => (
            <li
              key={label}
              className="flex items-center gap-2.5 border border-slatec-600/40 bg-obsidian-800/40 px-4 py-2.5 text-left text-sm text-mist-500"
            >
              <IconLock size={13} className="shrink-0 text-gold-700" />
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>

        <a href="#top" className="btn-gold mt-10">
          {t.login.enterCta}
        </a>
      </div>
    </section>
  );
}
