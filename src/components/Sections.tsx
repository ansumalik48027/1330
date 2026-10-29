"use client";

import type { ReactElement } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { PACT_COPY } from "@/i18n/translations";
import {
  ALLIANCES,
  KINGDOM,
  UNITY_QUOTES,
  formatPower,
} from "@/data/kingdom1330";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconCrest,
  IconCross,
  IconGem,
  IconHarvest,
  IconMithril,
  IconShield,
  IconSpeed,
  IconSword,
  IconTroops,
  IconWarn,
  Reveal,
  SectionHead,
  useInView,
  type IconProps,
} from "./ui";

/* ================================================================== */
/* Section 2 — What is KvK                                             */
/* ================================================================== */

export function KvkSection() {
  const { t } = useLang();
  return (
    <section id="kvik" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          {/* sticky intro column */}
          <div className="self-start lg:sticky lg:top-28">
            <SectionHead kicker={t.kvk.kicker} title={t.kvk.title} />
            <Reveal delay={140}>
              <p className="font-display mt-5 text-sm font-semibold tracking-[0.2em] text-gold-500 uppercase">
                {t.kvk.sub}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 leading-relaxed text-mist-400">{t.kvk.body}</p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {t.kvk.pooled.map((p) => (
                  <span
                    key={p}
                    className="pill border-slatec-500/70 bg-slatec-800/70 text-mist-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rotate-45 bg-gold-500"
                      aria-hidden="true"
                    />
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={340}>
              <figure className="corners mt-10 border border-slatec-600/60 bg-obsidian-800/60">
                <img
                  src="/images/kvk-battle.jpg"
                  alt={t.kvk.caption}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="flex items-center gap-2.5 border-t border-slatec-600/60 px-4 py-3 text-xs tracking-wider text-mist-500 uppercase">
                  <IconSword size={14} className="shrink-0 text-gold-500" />
                  {t.kvk.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* stage spine */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[9px] w-px bg-gradient-to-b from-gold-600/80 via-gold-700/40 to-transparent"
            />
            <div className="space-y-8 pl-10">
              {t.kvk.stages.map((s, i) => (
                <Reveal key={s.t} delay={i * 130}>
                  <article className="card-dark corners group relative p-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 -left-[35px] h-4 w-4 -translate-y-1/2 rotate-45 border border-gold-500 bg-obsidian-950 transition-colors group-hover:bg-gold-500"
                    />
                    <div className="flex items-baseline gap-5">
                      <span
                        aria-hidden="true"
                        className="font-display text-5xl leading-none font-black text-ghost transition-colors duration-300 group-hover:text-gold-600/60"
                      >
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl font-bold tracking-wide text-bone-100 sm:text-2xl">
                        {s.t}
                      </h3>
                    </div>
                    <p className="mt-4 leading-relaxed text-mist-400">{s.d}</p>
                    <p className="mt-5 inline-flex items-center gap-2 border border-gold-700/60 bg-gold-500/[0.06] px-3.5 py-2 text-xs tracking-wider text-gold-300">
                      <IconSword size={13} className="shrink-0 text-gold-500" />
                      {s.c}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Section 3 — Critical Guidelines, what to SAVE                       */
/* ================================================================== */

const SAVE_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  mithril: IconMithril,
  speed: IconSpeed,
  troops: IconTroops,
  gem: IconGem,
  resources: IconHarvest,
  shield: IconShield,
  ap: IconBolt,
  rule: IconCheck,
};

export function SaveSection() {
  const { t } = useLang();
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="save"
      className="relative border-y border-slatec-600/40 bg-obsidian-900/50 py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 bg-gold-500/[0.04] blur-[100px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead kicker={t.save.kicker} title={t.save.title} />
        <Reveal delay={140}>
          <p className="font-display mt-4 text-sm font-bold tracking-[0.24em] text-gold-500 uppercase">
            {t.save.subtitle}
          </p>
        </Reveal>

        {/* warning banner */}
        <Reveal delay={200}>
          <div className="corners mt-11 flex items-start gap-5 border border-gold-600/50 bg-gold-500/[0.06] p-5 sm:p-7">
            <span className="pulse-ring grid h-12 w-12 shrink-0 rotate-45 place-items-center border border-gold-500/70 text-gold-400">
              <IconWarn size={20} className="-rotate-45" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold tracking-[0.08em] text-gold-300 uppercase sm:text-xl">
                {t.save.warnTitle}
              </h3>
              <p className="mt-2 leading-relaxed text-mist-400">
                {t.save.warnBody}
              </p>
            </div>
          </div>
        </Reveal>

        {/* must-save materials */}
        <div
          ref={ref}
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {t.save.items.map((it, i) => {
            const Icon = SAVE_ICONS[it.icon] ?? IconGem;
            return (
              <Reveal key={it.t} delay={i * 110}>
                <article className="card-dark corners group flex h-full flex-col p-6">
                  <span className="grid h-14 w-14 rotate-45 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400 transition-all duration-300 group-hover:shadow-[0_0_24px_-6px_rgba(212,175,55,0.7)] group-hover:text-gold-300">
                    <Icon size={26} className="-rotate-45" />
                  </span>
                  <h3 className="font-display mt-6 text-lg leading-snug font-bold tracking-wide text-bone-100">
                    {it.t}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-400">
                    {it.d}
                  </p>
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-[11px] tracking-[0.16em] uppercase">
                      <span className="text-mist-500">{t.save.levelLabel}</span>
                      <span className="font-display font-bold text-gold-400">
                        ≥ {it.level}%
                      </span>
                    </div>
                    <div className="bar-track mt-2.5">
                      <div
                        className="bar-fill"
                        style={{
                          width: inView ? `${it.level}%` : "0%",
                          transitionDelay: `${i * 130}ms`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Section 4 — Event Strategy & Participation Rules                    */
/* ================================================================== */

export function StrategySection() {
  const { t } = useLang();
  return (
    <section id="strategy" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead kicker={t.strategy.kicker} title={t.strategy.title} lead={t.strategy.lead} />

        <div className="mt-14">
          {t.strategy.rules.map((r, i) => (
            <Reveal key={r.t} delay={i * 100}>
              <div className="group grid gap-4 border-t border-slatec-600/50 px-2 py-8 transition-colors duration-300 last:border-b hover:bg-slatec-800/20 sm:grid-cols-[110px_1fr] sm:gap-8">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none font-black text-ghost transition-colors duration-300 group-hover:text-gold-600/70"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-wide text-bone-100 sm:text-2xl">
                    {r.t}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-mist-400">
                    {r.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="corners h-full border border-gold-600/50 bg-gold-500/[0.04] p-7">
              <h3 className="font-display flex items-center gap-3 text-lg font-bold tracking-[0.14em] text-gold-300 uppercase">
                <IconCheck size={20} className="text-gold-500" />
                {t.strategy.doTitle}
              </h3>
              <ul className="mt-6 space-y-4">
                {t.strategy.do.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-mist-300">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-gold-500" />
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="corners h-full border border-blood-500/50 bg-blood-500/[0.05] p-7">
              <h3 className="font-display flex items-center gap-3 text-lg font-bold tracking-[0.14em] text-blood-400 uppercase">
                <IconCross size={20} className="text-blood-400" />
                {t.strategy.dontTitle}
              </h3>
              <ul className="mt-6 space-y-4">
                {t.strategy.dont.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-mist-300">
                    <IconCross size={16} className="mt-0.5 shrink-0 text-blood-400" />
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Section 5 — Alliance Pact & Pledge                                  */
/* ================================================================== */

export function PactSection() {
  const { t, lang } = useLang();
  const copy = PACT_COPY[lang];
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const maxPower = Math.max(
    ...ALLIANCES.map((a) => a.power ?? 0),
  );

  const kingdomStats = [
    { label: copy.kingdomPower, value: formatPower(KINGDOM.power, lang) },
    { label: copy.warsFought, value: KINGDOM.allianceCount.toLocaleString(lang) },
    { label: copy.governors, value: KINGDOM.playerCount.toLocaleString(lang) },
    { label: copy.activeGovernors, value: KINGDOM.activePlayers.toLocaleString(lang) },
  ];

  return (
    <section id="pact" className="relative overflow-hidden py-24 lg:py-32">
      <img
        src="/images/pact-banner.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-950/75 to-obsidian-950"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={t.pact.kicker}
          title={t.pact.title}
          lead={t.pact.lead}
          align="center"
        />

        {/* Official Kingdom 1330 intelligence */}
        <Reveal delay={120}>
          <div className="corners mx-auto mt-12 max-w-4xl border border-gold-700/50 bg-obsidian-900/80 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold-600/70 bg-obsidian-950 text-gold-400">
                  <IconCrest size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.12em] text-bone-100 uppercase">
                    {copy.kingdomLabel} · {KINGDOM.name}
                  </p>
                  <p className="text-[11px] tracking-wider text-mist-500 uppercase">
                    ID {KINGDOM.kid} · {copy.sourceLabel}
                  </p>
                </div>
              </div>
              <a
                href={KINGDOM.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-slatec-600 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-gold-400 uppercase transition-colors hover:border-gold-500 hover:text-gold-300"
              >
                {copy.sourceLink}
                <IconArrowRight size={12} />
              </a>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slatec-600/50 pt-4 text-center sm:grid-cols-4">
              {kingdomStats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-xl font-black tracking-wide text-gold-400">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <h3 className="font-display mt-14 text-center text-xs font-bold tracking-[0.32em] text-gold-500 uppercase">
          {copy.alliancesLabel}
        </h3>

        <div ref={ref} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALLIANCES.map((a, i) => {
            const ranked = a.rank !== null && a.power !== null;
            return (
              <Reveal key={a.tag} delay={i * 80}>
                <article className="card-dark corners h-full p-6">
                  <div className="flex items-start gap-4">
                    <span className="font-display grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-600/80 bg-obsidian-900 text-sm font-bold tracking-widest text-gold-300 shadow-[inset_0_0_16px_rgba(212,175,55,0.15)]">
                      {a.tag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display truncate text-lg font-bold tracking-wide text-bone-100">
                        {a.name}
                      </h4>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-[10px] tracking-wider uppercase">
                        <span
                          className={`pill !px-2 !py-0.5 ${
                            ranked
                              ? "border-gold-600/70 text-gold-300"
                              : "border-slatec-500 text-mist-500"
                          }`}
                        >
                          {ranked
                            ? `#${a.rank} · ${copy.rankedLabel}`
                            : copy.unrankedLabel}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-slatec-600/50 pt-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-mist-500">{copy.leaderLabel}</span>
                      <span className="truncate font-semibold text-bone-100">
                        {a.leader ?? "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-mist-500">{copy.membersLabel}</span>
                      <span className="font-semibold text-bone-100">
                        {a.members.toLocaleString(lang)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-mist-500">{copy.levelLabel}</span>
                      <span className="font-semibold text-bone-100">
                        {a.level !== null ? `Lv ${a.level}` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-mist-500">{copy.powerLabel}</span>
                      <span className="font-display font-bold text-gold-400">
                        {a.power !== null ? formatPower(a.power, lang) : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="bar-track mt-4 !h-[5px]">
                    <div
                      className="bar-fill"
                      style={{
                        width:
                          inView && a.power
                            ? `${Math.max(6, Math.round((a.power / maxPower) * 100))}%`
                            : "0%",
                        transitionDelay: `${i * 90}ms`,
                      }}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 text-center text-[11px] tracking-wider text-mist-500">
            {copy.liveNote} ·{" "}
            <a
              href={KINGDOM.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 underline-offset-2 hover:text-gold-300 hover:underline"
            >
              mightpulse.com/kingdom/1330
            </a>
          </p>
        </Reveal>

        {/* Unity quotes */}
        <Reveal delay={160}>
          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="font-display text-center text-xs font-bold tracking-[0.32em] text-gold-500 uppercase">
              {copy.quotesTitle}
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {UNITY_QUOTES.map((quote) => (
                <figure
                  key={quote}
                  className="corners border border-slatec-600/60 bg-obsidian-800/70 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-display block text-3xl leading-none font-black text-gold-600/80 select-none"
                  >
                    “
                  </span>
                  <blockquote className="font-display mt-1 text-base leading-snug font-medium text-bone-100">
                    {quote}
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="font-display mt-16 text-center text-2xl font-black tracking-[0.18em] text-gold-400 uppercase sm:text-3xl">
            {copy.motto}
          </p>
          <div className="gold-rule mx-auto mt-4 h-px max-w-sm" aria-hidden="true" />
        </Reveal>

        <Reveal delay={280}>
          <figure className="mx-auto mt-10 max-w-3xl text-center">
            <blockquote className="font-display text-lg leading-relaxed font-medium text-mist-300 sm:text-xl">
              {t.pact.quote}
            </blockquote>
            <figcaption className="font-display mt-6 text-xs font-bold tracking-[0.3em] text-gold-400 uppercase">
              {t.pact.sign}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
