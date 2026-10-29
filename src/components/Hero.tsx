"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { usePlayer } from "@/i18n/PlayerContext";
import { LANGS } from "@/i18n/translations";
import {
  Embers,
  IconArrowRight,
  IconCrest,
  IconLock,
  IconSeal,
  IconSword,
  Reveal,
  useCountUp,
  useInView,
} from "./ui";

function Stat({
  value,
  suffix,
  label,
  lang,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  lang: string;
  start: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <div>
      <p className="font-display text-3xl font-black tracking-wide text-gold-400 sm:text-4xl">
        {n.toLocaleString(lang)}
        <span className="text-gold-600">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] tracking-[0.18em] text-mist-500 uppercase">
        {label}
      </p>
    </div>
  );
}

function PlayerPortal() {
  const { t } = useLang();
  const { login } = usePlayer();
  const [name, setName] = useState("");
  const [alliance, setAlliance] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name, alliance);
  };

  return (
    <div className="card-dark corners p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400">
          <IconSword size={20} />
        </span>
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.12em] text-bone-100 uppercase">
            {t.login.playerTitle}
          </h3>
          <p className="mt-0.5 text-xs leading-snug text-mist-500">
            {t.login.playerDesc}
          </p>
        </div>
      </div>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="portal-name"
              className="font-display mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-mist-300 uppercase"
            >
              {t.login.nameLabel} <span className="text-gold-500">*</span>
            </label>
            <input
              id="portal-name"
              type="text"
              required
              maxLength={80}
              autoComplete="off"
              placeholder={t.faq.namePh}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field !py-2.5 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="portal-alliance"
              className="font-display mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-mist-300 uppercase"
            >
              {t.login.allianceLabel}
            </label>
            <input
              id="portal-alliance"
              type="text"
              maxLength={80}
              autoComplete="off"
              placeholder={t.faq.alliancePh}
              value={alliance}
              onChange={(e) => setAlliance(e.target.value)}
              className="field !py-2.5 text-sm"
            />
          </div>
        </div>
        <button type="submit" className="btn-gold w-full justify-center !py-3">
          {t.login.enter}
          <IconArrowRight size={14} />
        </button>
      </form>
    </div>
  );
}

function AdminPortal() {
  const { t } = useLang();
  return (
    <div className="card-dark corners flex flex-col justify-between border-dashed p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400">
          <IconLock size={20} />
        </span>
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.12em] text-bone-100 uppercase">
            {t.login.adminTitle}
          </h3>
          <p className="mt-0.5 text-xs leading-snug text-mist-500">
            {t.login.adminDesc}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <a href="/admin" className="btn-ghost w-full justify-center !py-3">
          <IconCrest size={15} />
          {t.login.adminGo}
        </a>
        <p className="font-display mt-3 text-center text-[10px] font-bold tracking-[0.24em] text-gold-700 uppercase">
          {t.login.adminNote}
        </p>
      </div>
    </div>
  );
}

function LanguageRow() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="mt-7 flex flex-wrap items-center gap-2">
      <span className="font-display mr-1 text-[10px] font-bold tracking-[0.24em] text-mist-500 uppercase">
        {t.login.langLine}
      </span>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          aria-pressed={lang === l.code}
          aria-label={l.label}
          title={l.label}
          onClick={() => setLang(l.code)}
          className={`flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors ${
            lang === l.code
              ? "border-gold-500 bg-gold-500/15 text-gold-300"
              : "border-slatec-600 text-mist-400 hover:border-gold-700 hover:text-gold-400"
          }`}
        >
          <span aria-hidden="true" className="text-sm leading-none">
            {l.flag}
          </span>
          {l.code}
        </button>
      ))}
    </div>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const { player, logout } = usePlayer();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const { ref: statsRef, inView: statsIn } = useInView<HTMLDivElement>(0.3);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedRef.current || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -10, ry: px * 13 });
  };

  const marqueeItems = Array.from({ length: 6 });

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-0"
    >
      {/* ambient light field */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-32 left-[-10%] h-[480px] w-[620px] rounded-full bg-gold-500/[0.07] blur-[110px]" />
        <div className="absolute top-[20%] right-[-12%] h-[520px] w-[560px] rounded-full bg-slatec-500/25 blur-[120px]" />
        <div className="absolute bottom-[-18%] left-[30%] h-[380px] w-[700px] rounded-full bg-gold-600/[0.05] blur-[100px]" />
      </div>
      <Embers />

      {/* ghost numeral */}
      <div
        aria-hidden="true"
        className="font-display pointer-events-none absolute -top-6 right-[-2%] z-0 text-[30vw] leading-none font-black text-ghost opacity-50 lg:text-[22vw]"
      >
        1330
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
        {/* copy column */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 border border-gold-700/60 bg-gold-500/[0.06] px-4 py-2">
              <IconSword size={15} className="text-gold-400" />
              <span className="kicker !text-[0.66rem]">{t.hero.eyebrow}</span>
            </p>
          </Reveal>

          <h1 className="font-display mt-7 text-4xl leading-[1.1] font-black tracking-wide text-bone-100 sm:text-5xl xl:text-[3.9rem]">
            <span className="mask-line">
              <span style={{ animationDelay: "0.15s" }}>{t.hero.titleA}</span>
            </span>
            <span className="mask-line text-gold-400">
              <span style={{ animationDelay: "0.4s" }}>{t.hero.titleB}</span>
            </span>
          </h1>

          <Reveal delay={480}>
            <p className="mt-6 max-w-xl leading-relaxed text-mist-400">
              {t.hero.sub}
            </p>
          </Reveal>

          {/* secure access: dual portals or signed-in bar */}
          <Reveal delay={600}>
            {player ? (
              <div className="mt-8 space-y-4">
                <div className="corners flex flex-wrap items-center gap-x-4 gap-y-2 border border-gold-600/60 bg-gold-500/[0.07] px-4 py-3">
                  <IconSword size={16} className="shrink-0 text-gold-400" />
                  <span className="text-sm text-mist-300">
                    {t.login.welcome}{" "}
                    <strong className="font-semibold text-bone-100">
                      {player.name}
                    </strong>
                    {player.alliance ? (
                      <span className="text-gold-400"> · {player.alliance}</span>
                    ) : null}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="ml-auto text-xs tracking-wider text-mist-500 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                  >
                    {t.login.logout}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#strategy" className="btn-gold">
                    {t.hero.ctaStrategy}
                    <IconArrowRight size={15} />
                  </a>
                  <a href="#faq" className="btn-ghost">
                    <IconSeal size={15} />
                    {t.hero.ctaDoubt}
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <PlayerPortal />
                <AdminPortal />
              </div>
            )}
          </Reveal>

          <Reveal delay={680}>
            <LanguageRow />
          </Reveal>

          <Reveal delay={760}>
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slatec-600/60 pt-8 sm:grid-cols-4"
            >
              {t.hero.stats.map((s) => (
                <Stat
                  key={s.l}
                  value={s.n}
                  suffix={s.sfx}
                  label={s.l}
                  lang={lang}
                  start={statsIn}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* 3D crown stage */}
        <div className="relative">
          <div
            onPointerMove={onMove}
            onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
            className="tilt-stage relative mx-auto aspect-square w-full max-w-[520px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full bg-gold-500/[0.12] blur-[70px]"
            />
            <div
              className="tilt-body relative h-full"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              <div aria-hidden="true" className="ring-conic absolute -inset-4" />
              <div className="floaty absolute inset-[6%]">
                <img
                  src="/images/hero-crown.jpg"
                  alt={t.hero.crownLabel}
                  className="img-melt h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="tilt-pop absolute inset-x-0 -bottom-3 flex justify-center">
                <span className="pill border-gold-600/80 bg-obsidian-900/85 text-gold-300">
                  <span
                    className="h-1.5 w-1.5 rotate-45 bg-gold-400"
                    aria-hidden="true"
                  />
                  {t.hero.crownLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* oath marquee */}
      <div className="marquee relative z-10 mt-16 border-y border-gold-700/30 bg-obsidian-900/70 py-3.5">
        <div className="marquee-track">
          {marqueeItems.map((_, i) => (
            <span key={i} className="flex items-center gap-14">
              <span className="font-display text-xs font-bold tracking-[0.42em] whitespace-nowrap text-gold-500/90 uppercase">
                {t.hero.marquee}
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="shrink-0 text-gold-700"
              >
                <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
