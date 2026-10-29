/**
 * Verified Kingdom 1330 intelligence.
 * Source: MightPulse — https://mightpulse.com/kingdom/1330 (public kingdom API)
 * Kingdom name: "Free Cake!" · kid 1330
 * Snapshot values are stored statically so the guide renders without a live call.
 */

export const KINGDOM = {
  kid: 1330,
  name: "Free Cake!",
  power: 101_880_396_023,
  playerCount: 2060,
  activePlayers: 1005,
  active7d: 285,
  allianceCount: 392,
  topPower: 858_063_472,
  openedOn: "2025-11-23",
  sourceUrl: "https://mightpulse.com/kingdom/1330",
  capturedAt: "2026-10-29",
} as const;

export type Alliance = {
  tag: string;
  name: string;
  rank: number | null;
  power: number | null;
  members: number;
  level: number | null;
  leader: string | null;
};

/** Real alliances of Server 1330, ordered by official alliance power rank. */
export const ALLIANCES: Alliance[] = [
  {
    tag: "BRO",
    name: "TheBrotherhood",
    rank: 1,
    power: 27_712_246_209,
    members: 99,
    level: 11,
    leader: "Jason ᶠʳᵉˢʰ ᴮᴿᴼ",
  },
  {
    tag: "DOC",
    name: "DomOfCosmos",
    rank: 2,
    power: 26_388_072_581,
    members: 98,
    level: 11,
    leader: "TKong",
  },
  {
    tag: "NBS",
    name: "NoBullShirt",
    rank: 3,
    power: 14_614_491_663,
    members: 81,
    level: 11,
    leader: "Im_Not_Wise",
  },
  {
    tag: "Bro",
    name: "BROacademy",
    rank: 4,
    power: 11_008_825_088,
    members: 96,
    level: 11,
    leader: "FarmZ",
  },
  {
    tag: "XXs",
    name: "OGBarbattor",
    rank: 13,
    power: 344_567_290,
    members: 1,
    level: 3,
    leader: "Lord707867999332",
  },
  {
    tag: "FYR",
    name: "LandingZone",
    rank: null,
    power: null,
    members: 11,
    level: null,
    leader: null,
  },
];

/** Canonical unity quotes of Kingdom 1330 (displayed verbatim on every locale). */
export const UNITY_QUOTES = [
  "Divided by Alliances, United by Kingdom 1330.",
  "A single speedup spent on weekday ego is a fortress lost on KvK day.",
  "One Kingdom, One Heart, One Frontline.",
] as const;

/** Compact helpers shared by the UI. */
export function formatPower(power: number, lang: string): string {
  if (power >= 1_000_000_000) {
    return `${(power / 1_000_000_000).toLocaleString(lang, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}B`;
  }
  if (power >= 1_000_000) {
    return `${(power / 1_000_000).toLocaleString(lang, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}M`;
  }
  return power.toLocaleString(lang);
}

export function shortPower(power: number, lang: string): string {
  if (power >= 1_000_000_000) {
    return `${(power / 1_000_000_000).toLocaleString(lang, {
      maximumFractionDigits: 1,
    })}B`;
  }
  if (power >= 1_000_000) {
    return `${(power / 1_000_000).toLocaleString(lang, {
      maximumFractionDigits: 0,
    })}M`;
  }
  return power.toLocaleString(lang);
}
