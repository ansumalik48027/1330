"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Motion utilities                                                    */
/* ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useCountUp(target: number, start: boolean, duration = 1500) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const isInt = Number.isInteger(target);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const next = target * (1 - Math.pow(1 - p, 3));
      setVal(isInt ? Math.round(next) : Math.round(next * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return val;
}

/* ------------------------------------------------------------------ */
/* Ambient embers                                                      */
/* ------------------------------------------------------------------ */

const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 5.31 + (i % 7) * 1.7) % 100,
  size: 2 + (i % 3),
  dur: 8 + ((i * 7) % 9),
  delay: -((i * 1.73) % 14),
  drift: ((i % 5) - 2) * 14,
}));

export function Embers({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ornament + section heading                                          */
/* ------------------------------------------------------------------ */

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-600/70" />
      <svg width="16" height="16" viewBox="0 0 18 18" className="text-gold-500">
        <path
          d="M9 1 L17 9 L9 17 L1 9 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="9" cy="9" r="1.7" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-600/70" />
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="kicker">{kicker}</p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-wide text-bone-100 sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={180}>
          <p className="mt-5 leading-relaxed text-mist-400">{lead}</p>
        </Reveal>
      ) : null}
      <Reveal delay={240}>
        <Ornament className={`mt-7 ${center ? "max-w-xs mx-auto" : "max-w-[220px]"}`} />
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom icon set (hand-drawn strokes, 24×24)                         */
/* ------------------------------------------------------------------ */

export type IconProps = { className?: string; size?: number };

function Svg({
  children,
  className = "",
  size = 24,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconCrown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 8 7 11l5-6.5L17 11l3.5-3-1.2 9H4.7Z" />
    <path d="M5 20.5h14" />
  </Svg>
);

export const IconSword = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.5 17.5 4 7V4h3l10.5 10.5" />
    <path d="m13 19 5-5" />
    <path d="m16 16 4 4" />
    <path d="m19 21 2.5-2.5" />
  </Svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 4.5 5.8v5.4c0 4.6 3.2 7.6 7.5 9.3 4.3-1.7 7.5-4.7 7.5-9.3V5.8Z" />
    <path d="M12 7v9" />
    <path d="M8.5 10.5h7" />
  </Svg>
);

export const IconCrest = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.5 4.5 5.3v6c0 4.8 3.3 7.9 7.5 9.6 4.2-1.7 7.5-4.8 7.5-9.6v-6Z" />
    <path d="M8.5 13.5 7 9l2.3 2 2.7-4 2.7 4 2.3-2-1.5 4.5Z" />
    <path d="M8.5 16h7" />
  </Svg>
);

export const IconMithril = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 4.5h8l2 5H6Z" />
    <path d="M3.5 20h8l2-5.5h-8Z" />
    <path d="M12.5 20h8l2-5.5h-8Z" />
  </Svg>
);

export const IconSpeed = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3h10" />
    <path d="M7 21h10" />
    <path d="M8 3c0 5 3.5 4.5 4 9 .5-4.5 4-4 4-9" />
    <path d="M8 21c0-5 3.5-4.5 4-9 .5 4.5 4 4 4 9" />
  </Svg>
);

export const IconTroops = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3v18" />
    <path d="M6 4h12l-3 4 3 4H6" />
    <path d="M4 21h4" />
  </Svg>
);

export const IconGem = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 3h8l4 5-8 13L4 8Z" />
    <path d="M4 8h16" />
    <path d="M12 8 8 3" />
    <path d="m12 8 4-5" />
    <path d="M12 8v13" />
  </Svg>
);

export const IconWarn = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 2.5 20h19Z" />
    <path d="M12 9.5V14" />
    <path d="M12 17.2v.2" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
  </Svg>
);

export const IconCross = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6" />
    <path d="m15 9-6 6" />
  </Svg>
);

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.8 2.6 4 5.7 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.7-4-9s1.2-6.4 4-9Z" />
  </Svg>
);

export const IconChevron = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const IconSeal = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h9l4 4v14H6Z" />
    <path d="M15 3v4h4" />
    <circle cx="12" cy="14" r="2.4" />
    <path d="m10.8 15.9-1.3 3.6 2.5-1 2.5 1-1.3-3.6" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="1.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <path d="M12 14.5v2" />
  </Svg>
);

export const IconBolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 2 4.5 13.5H11L9.5 22 19 10.5h-6.5Z" />
  </Svg>
);

export const IconHarvest = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22V8" />
    <path d="M12 11c-3.2-.4-4.6-2-4.8-5.2 3.2.4 4.6 2 4.8 5.2Z" />
    <path d="M12 11c3.2-.4 4.6-2 4.8-5.2-3.2.4-4.6 2-4.8 5.2Z" />
    <path d="M12 16c-3.2-.4-4.6-2-4.8-5.2 3.2.4 4.6 2 4.8 5.2Z" />
    <path d="M12 16c3.2-.4 4.6-2 4.8-5.2-3.2.4-4.6 2-4.8 5.2Z" />
    <path d="M12 6.5c-.8-1.8-.4-3.6 1-5 .8 1.8.4 3.6-1 5Z" />
  </Svg>
);
