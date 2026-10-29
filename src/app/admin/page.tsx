"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLang } from "@/i18n/LanguageContext";
import {
  IconArrowRight,
  IconCrest,
  IconLock,
} from "@/components/ui";

type Doubt = {
  id: number;
  playerName: string;
  alliance: string;
  question: string;
  status: "open" | "answered";
  answer: string | null;
  createdAt: string;
};

/* ------------------------------------------------------------------ */
/* Password gate (war council password, verified server-side)          */
/* ------------------------------------------------------------------ */

function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const { t } = useLang();
  const [pw, setPw] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "err">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("checking");
    try {
      const r = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        onUnlock();
        return;
      }
    } catch {
      /* network error — fall through to error state */
    }
    setState("err");
    setPw("");
  };

  return (
    <div className="mx-auto mt-14 max-w-md">
      <form onSubmit={submit} className="corners card-dark p-7 text-center sm:p-9">
        <span className="pulse-ring mx-auto grid h-16 w-16 rotate-45 place-items-center border border-gold-600/70 bg-obsidian-900 text-gold-400">
          <IconLock size={24} className="-rotate-45" />
        </span>
        <h1 className="font-display mt-7 text-2xl font-black tracking-wide text-bone-100">
          {t.admin.gateTitle}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-mist-400">
          {t.admin.gateSub}
        </p>
        <label
          htmlFor="admin-pw"
          className="font-display mt-6 block text-left text-[10px] font-bold tracking-[0.22em] text-mist-300 uppercase"
        >
          {t.admin.password}
        </label>
        <input
          id="admin-pw"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          autoFocus
          required
          maxLength={32}
          placeholder={t.admin.passwordPh}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="field mt-2 text-center tracking-[0.5em]"
        />
        <button
          type="submit"
          disabled={state === "checking"}
          className="btn-gold mt-6 w-full justify-center disabled:cursor-wait"
        >
          <IconCrest size={15} />
          {t.admin.unlock}
        </button>
        <p aria-live="polite" role="status" className="mt-4 min-h-5 text-sm">
          {state === "err" ? (
            <span className="text-blood-400">{t.admin.wrongPass}</span>
          ) : null}
        </p>
      </form>
      <a
        href="/"
        className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-mist-400 uppercase transition-colors hover:text-gold-300"
      >
        <IconArrowRight
          size={14}
          className="rotate-180 text-gold-500 transition-transform duration-300 group-hover:-translate-x-1"
        />
        {t.admin.back}
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Review board rows                                                   */
/* ------------------------------------------------------------------ */

function DoubtRow({
  d,
  onPatch,
  onDelete,
}: {
  d: Doubt;
  onPatch: (id: number, p: Partial<Doubt>) => void;
  onDelete: (id: number) => void;
}) {
  const { t, lang } = useLang();
  const [draft, setDraft] = useState(d.answer ?? "");
  const [busy, setBusy] = useState(false);
  const answered = d.status === "answered";

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const saveAnswer = () =>
    run(async () => {
      const r = await fetch(`/api/doubts/${d.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: draft, status: "answered" }),
      });
      if (r.ok) {
        onPatch(d.id, { answer: draft.trim() || null, status: "answered" });
      }
    });

  const toggle = () =>
    run(async () => {
      const status: "open" | "answered" = answered ? "open" : "answered";
      const r = await fetch(`/api/doubts/${d.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (r.ok) onPatch(d.id, { status });
    });

  const del = () =>
    run(async () => {
      const r = await fetch(`/api/doubts/${d.id}`, { method: "DELETE" });
      if (r.ok) onDelete(d.id);
    });

  let dateStr = "";
  try {
    dateStr = new Date(d.createdAt).toLocaleString(lang, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    dateStr = d.createdAt;
  }

  return (
    <article
      className={`corners border bg-obsidian-800/60 p-5 transition-colors sm:p-6 ${
        answered ? "border-slatec-600/60" : "border-gold-700/50"
      }`}
    >
      <header className="flex flex-wrap items-center gap-3">
        <span
          className={`pill ${
            answered
              ? "border-mist-500/60 text-mist-400"
              : "border-ember-500/70 text-ember-500"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rotate-45 ${
              answered ? "bg-mist-400" : "bg-ember-500"
            }`}
          />
          {answered ? t.admin.answered : t.admin.open}
        </span>
        <span className="text-xs text-mist-500">
          {t.admin.thDate}: {dateStr}
        </span>
        <span className="font-display ml-auto text-xs font-bold tracking-widest text-mist-500">
          #{d.id}
        </span>
      </header>

      <p className="mt-4 leading-relaxed text-bone-100">{d.question}</p>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-mist-500">
          {t.admin.thPlayer}:{" "}
          <strong className="font-semibold text-bone-100">{d.playerName}</strong>
        </span>
        {d.alliance ? (
          <span className="text-mist-500">
            {t.admin.thAlliance}:{" "}
            <strong className="font-semibold text-bone-100">{d.alliance}</strong>
          </span>
        ) : null}
      </div>

      {d.answer ? (
        <div className="mt-4 border-l-2 border-gold-500 bg-gold-500/[0.05] px-4 py-3">
          <span className="font-display block text-[10px] font-bold tracking-[0.24em] text-gold-400 uppercase">
            {t.admin.answered}
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-mist-300">
            {d.answer}
          </p>
        </div>
      ) : null}

      <div className="mt-5 border-t border-slatec-600/40 pt-4">
        <label htmlFor={`answer-${d.id}`} className="sr-only">
          {t.admin.answerPlaceholder}
        </label>
        <textarea
          id={`answer-${d.id}`}
          rows={2}
          className="field resize-y text-sm"
          placeholder={t.admin.answerPlaceholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={saveAnswer}
            disabled={busy}
            className="btn-gold !px-4 !py-2 !text-[0.66rem] disabled:cursor-wait"
          >
            {t.admin.saveAnswer}
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={busy}
            className="btn-ghost !px-4 !py-2 !text-[0.66rem] disabled:cursor-wait"
          >
            {answered ? t.admin.reopen : t.admin.mark}
          </button>
          <button
            type="button"
            onClick={del}
            disabled={busy}
            className="ml-auto inline-flex items-center gap-1.5 border border-blood-500/60 px-3.5 py-2 font-display text-[0.66rem] font-bold tracking-[0.14em] text-blood-400 uppercase transition-colors hover:bg-blood-500/10 disabled:cursor-wait disabled:opacity-50"
          >
            {t.admin.delete}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const { t } = useLang();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [items, setItems] = useState<Doubt[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth")
      .then((r) => r.json())
      .then((j) => {
        if (active) setAuthed(Boolean(j.admin));
      })
      .catch(() => {
        if (active) setAuthed(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const r = await fetch("/api/doubts", { cache: "no-store" });
      const j = (await r.json()) as { data?: Doubt[] };
      setItems(Array.isArray(j.data) ? j.data : []);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    if (authed) void load();
  }, [authed, load]);

  const endSession = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch {
      /* ignore */
    }
    setAuthed(false);
    setItems(null);
  };

  const updateItem = (id: number, p: Partial<Doubt>) =>
    setItems((prev) =>
      prev ? prev.map((it) => (it.id === id ? { ...it, ...p } : it)) : prev,
    );
  const removeItem = (id: number) =>
    setItems((prev) => (prev ? prev.filter((it) => it.id !== id) : prev));

  return (
    <>
      <a href="#admin-main" className="sr-skip">
        {t.a11y.skip}
      </a>
      <Header />
      <main
        id="admin-main"
        className="min-h-screen pb-24 pt-28 lg:pt-32"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {authed === null ? (
            <div className="corners mx-auto mt-14 max-w-md border border-slatec-600/50 bg-obsidian-800/50 p-10 text-center">
              <span
                aria-hidden="true"
                className="pulse-ring mx-auto block h-4 w-4 rotate-45 border border-gold-500"
              />
              <p className="mt-4 text-sm tracking-wider text-mist-400">
                {t.admin.loading}
              </p>
            </div>
          ) : null}

          {authed === false ? (
            <AdminGate onUnlock={() => setAuthed(true)} />
          ) : null}

          {authed === true ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href="/"
                  className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-mist-400 uppercase transition-colors hover:text-gold-300"
                >
                  <IconArrowRight
                    size={14}
                    className="rotate-180 text-gold-500 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  {t.admin.back}
                </a>
                <button
                  type="button"
                  onClick={endSession}
                  className="inline-flex items-center gap-2 border border-slatec-600 px-3.5 py-2 text-[11px] font-bold tracking-[0.18em] text-mist-400 uppercase transition-colors hover:border-blood-500/70 hover:text-blood-400"
                >
                  <IconLock size={13} />
                  {t.admin.endSession}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="kicker">Kingdom 1330 · War Council</p>
                  <h1 className="font-display mt-3 text-3xl font-black tracking-wide text-bone-100 sm:text-4xl">
                    {t.admin.title}
                  </h1>
                  <p className="mt-3 max-w-xl leading-relaxed text-mist-400">
                    {t.admin.lead}
                  </p>
                </div>
                {items ? (
                  <span className="pill border-gold-600/70 bg-gold-500/[0.07] text-gold-300">
                    {items.length} {t.admin.countLabel}
                  </span>
                ) : null}
              </div>

              <div className="gold-rule mt-8 h-px" aria-hidden="true" />

              <div className="mt-8 space-y-4">
                {items === null && !loadError ? (
                  <div className="corners border border-slatec-600/50 bg-obsidian-800/50 p-10 text-center">
                    <span
                      aria-hidden="true"
                      className="pulse-ring mx-auto block h-4 w-4 rotate-45 border border-gold-500"
                    />
                    <p className="mt-4 text-sm tracking-wider text-mist-400">
                      {t.admin.loading}
                    </p>
                  </div>
                ) : null}

                {loadError ? (
                  <div className="corners border border-blood-500/50 bg-blood-500/[0.05] p-8 text-center">
                    <p className="text-sm text-blood-400">{t.faq.error}</p>
                    <button type="button" onClick={load} className="btn-ghost mt-5">
                      ↻
                    </button>
                  </div>
                ) : null}

                {items && items.length === 0 ? (
                  <div className="corners border border-slatec-600/50 bg-obsidian-800/50 p-12 text-center">
                    <IconCrest size={40} className="mx-auto text-gold-700" />
                    <p className="mt-4 text-sm tracking-wider text-mist-400">
                      {t.admin.empty}
                    </p>
                  </div>
                ) : null}

                {items?.map((d) => (
                  <DoubtRow
                    key={d.id}
                    d={d}
                    onPatch={updateItem}
                    onDelete={removeItem}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
