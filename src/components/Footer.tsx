"use client";

import { useLang } from "@/i18n/LanguageContext";
import { IconArrowRight, IconCrest } from "./ui";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { href: "#kvik", label: t.header.nav.kvk },
    { href: "#save", label: t.header.nav.save },
    { href: "#strategy", label: t.header.nav.strategy },
    { href: "#pact", label: t.header.nav.pact },
    { href: "#faq", label: t.header.nav.faq },
  ];

  return (
    <footer className="relative border-t border-slatec-600/40 bg-obsidian-900/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold-600/70 bg-obsidian-950 text-gold-400">
              <IconCrest size={22} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[13px] font-bold tracking-[0.14em] text-bone-100 uppercase">
                {t.header.brand}
              </p>
              <p className="font-display mt-0.5 text-[9px] font-bold tracking-[0.26em] text-gold-500">
                {t.header.server}
              </p>
            </div>
          </div>
          <p className="font-display mt-5 text-sm tracking-[0.12em] text-mist-400 italic">
            {t.footer.tagline}
          </p>
          <div className="gold-rule mt-5 h-px w-40" aria-hidden="true" />
        </div>

        <nav aria-label={t.footer.guideTitle}>
          <p className="font-display text-[11px] font-bold tracking-[0.26em] text-gold-500 uppercase">
            {t.footer.guideTitle}
          </p>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-mist-400 transition-colors hover:text-gold-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.26em] text-gold-500 uppercase">
            {t.footer.leadership}
          </p>
          <a
            href="/admin"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bone-100 transition-colors hover:text-gold-300"
          >
            {t.footer.leadership}
            <IconArrowRight
              size={14}
              className="text-gold-500 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-mist-500">
            {t.footer.note}
          </p>
        </div>
      </div>

      <div className="border-t border-slatec-600/30 py-5">
        <p className="text-center text-xs tracking-wider text-mist-500">
          {t.footer.rights} · {year}
        </p>
      </div>
    </footer>
  );
}
