"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { usePlayer } from "@/i18n/PlayerContext";
import { LANGS, type Lang } from "@/i18n/translations";
import { IconChevron, IconCrest, IconSword } from "./ui";

function LanguageSwitcher({ id }: { id: string }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const move = (dir: 1 | -1) => {
    const items = wrapRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]');
    if (!items || items.length === 0) return;
    const list = Array.from(items);
    const idx = list.indexOf(document.activeElement as HTMLLIElement);
    const next = idx === -1 ? 0 : (idx + dir + list.length) % list.length;
    list[next]?.focus();
  };

  return (
    <div className="relative" ref={wrapRef}>
      <span id={`${id}-label`} className="sr-only">
        {t.a11y.langLabel}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => move(1));
          }
        }}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-slatec-600 bg-obsidian-800/90 py-2 pr-2.5 pl-3 text-xs font-semibold tracking-wider text-bone-100 uppercase transition-colors hover:border-gold-600"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {current.flag}
        </span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.code}</span>
        <IconChevron
          size={13}
          className={`text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        id={`${id}-list`}
        role="listbox"
        aria-labelledby={`${id}-label`}
        aria-label={t.a11y.langLabel}
        className={`absolute right-0 z-50 mt-2 w-52 border border-slatec-600 bg-obsidian-900/98 p-1.5 shadow-2xl backdrop-blur-md transition-opacity ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {LANGS.map((l) => (
          <li
            key={l.code}
            role="option"
            aria-selected={l.code === lang}
            tabIndex={-1}
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLang(l.code);
                setOpen(false);
              }
            }}
            className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
              l.code === lang
                ? "bg-gold-500/15 text-gold-300"
                : "text-mist-300 hover:bg-slatec-800/70 hover:text-gold-200"
            }`}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {l.flag}
            </span>
            <span>{l.label}</span>
            {l.code === lang ? (
              <span className="ml-auto text-gold-500" aria-hidden="true">
                ✓
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const { player } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#kvik", label: t.header.nav.kvk },
    { href: "#save", label: t.header.nav.save },
    { href: "#strategy", label: t.header.nav.strategy },
    { href: "#pact", label: t.header.nav.pact },
    { href: "#faq", label: t.header.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-slatec-600/50 bg-obsidian-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* reading progress */}
      <div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
        {/* brand */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400 transition-all group-hover:border-gold-400 group-hover:text-gold-300 group-hover:shadow-[0_0_18px_-4px_rgba(212,175,55,0.6)]">
            <IconCrest size={22} />
          </span>
          <span className="leading-tight">
            <span className="font-display block text-[13px] font-bold tracking-[0.14em] text-bone-100 uppercase">
              {t.header.brand}
            </span>
            <span className="mt-0.5 inline-block border border-gold-700/70 bg-gold-500/10 px-1.5 py-px font-display text-[9px] font-bold tracking-[0.26em] text-gold-400">
              {t.header.server}
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav
          aria-label={t.a11y.mainNav}
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {player ? (
            <span
              className="hidden items-center gap-2 border border-gold-700/60 bg-gold-500/[0.07] px-3 py-1.5 text-xs text-gold-300 md:inline-flex"
              title={player.alliance || player.name}
            >
              <IconSword size={12} className="shrink-0 text-gold-500" />
              <span className="max-w-[120px] truncate font-semibold">
                {player.name}
              </span>
            </span>
          ) : null}
          <LanguageSwitcher id="lang-select-desktop" />
          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "✕" : "☰"}
            className="grid h-10 w-10 place-items-center border border-slatec-600 text-bone-100 transition-colors hover:border-gold-500 hover:text-gold-300 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-slatec-600/50 bg-obsidian-950/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav
          aria-label={t.a11y.mainNav}
          className="flex flex-col gap-1 px-5 py-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display border-l-2 border-transparent px-3 py-2 text-sm tracking-[0.14em] text-mist-300 uppercase transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
