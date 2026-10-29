"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { usePlayer } from "@/i18n/PlayerContext";
import {
  IconCheck,
  IconChevron,
  IconSeal,
  IconWarn,
  Reveal,
  SectionHead,
} from "./ui";

export function FaqSection() {
  const { t } = useLang();
  const { player } = usePlayer();
  const [openIdx, setOpenIdx] = useState(0);

  const [form, setForm] = useState({ name: "", alliance: "", question: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  // Prefill the doubt form from the signed-in player identity
  useEffect(() => {
    if (player) {
      setForm((f) => ({
        ...f,
        name: f.name || player.name,
        alliance: f.alliance || player.alliance,
      }));
    }
  }, [player]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      playerName: form.name.trim(),
      alliance: form.alliance.trim(),
      question: form.question.trim(),
    };
    if (!payload.playerName || !payload.question) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setStatus("ok");
      setForm({ name: "", alliance: "", question: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      id="faq"
      className="relative border-y border-slatec-600/40 bg-obsidian-900/50 py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[420px] w-[560px] bg-gold-500/[0.05] blur-[110px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead kicker={t.faq.kicker} title={t.faq.title} lead={t.faq.lead} />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* FAQ accordion */}
          <div className="space-y-3">
            {t.faq.items.map((f, i) => {
              const open = openIdx === i;
              return (
                <Reveal key={f.q} delay={i * 70}>
                  <div
                    className={`border transition-colors duration-300 ${
                      open
                        ? "border-gold-600/60 bg-obsidian-800/80"
                        : "border-slatec-600/50 bg-obsidian-800/40 hover:border-slatec-500"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-btn-${i}`}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        onClick={() => setOpenIdx(open ? -1 : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-bone-100 transition-colors hover:text-gold-300"
                      >
                        <span>{f.q}</span>
                        <IconChevron
                          size={16}
                          className={`shrink-0 text-gold-500 transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className={`acc-panel ${open ? "open" : ""}`}
                    >
                      <div>
                        <p className="px-5 pb-5 text-sm leading-relaxed text-mist-400">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* doubt submission form */}
          <Reveal delay={140}>
            <form
              onSubmit={handleSubmit}
              className="corners card-dark p-6 sm:p-8 lg:sticky lg:top-28"
            >
              <h3 className="font-display text-2xl font-bold tracking-wide text-gold-300">
                {t.faq.formTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">
                {t.faq.formLead}
              </p>

              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="d-name"
                    className="font-display mb-2 block text-[11px] font-bold tracking-[0.22em] text-mist-300 uppercase"
                  >
                    {t.faq.name} <span className="text-gold-500">*</span>
                  </label>
                  <input
                    id="d-name"
                    name="playerName"
                    type="text"
                    required
                    maxLength={80}
                    autoComplete="off"
                    placeholder={t.faq.namePh}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="d-alliance"
                    className="font-display mb-2 block text-[11px] font-bold tracking-[0.22em] text-mist-300 uppercase"
                  >
                    {t.faq.alliance}
                  </label>
                  <input
                    id="d-alliance"
                    name="alliance"
                    type="text"
                    maxLength={80}
                    autoComplete="off"
                    placeholder={t.faq.alliancePh}
                    value={form.alliance}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, alliance: e.target.value }))
                    }
                    className="field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="d-question"
                    className="font-display mb-2 block text-[11px] font-bold tracking-[0.22em] text-mist-300 uppercase"
                  >
                    {t.faq.question} <span className="text-gold-500">*</span>
                  </label>
                  <textarea
                    id="d-question"
                    name="question"
                    required
                    rows={4}
                    maxLength={800}
                    placeholder={t.faq.questionPh}
                    value={form.question}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, question: e.target.value }))
                    }
                    className="field resize-y"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold mt-7 w-full justify-center"
              >
                <IconSeal size={15} />
                {status === "sending" ? t.faq.sending : t.faq.submit}
              </button>

              <p aria-live="polite" role="status" className="mt-4 min-h-6 text-sm">
                {status === "ok" && (
                  <span className="inline-flex items-center gap-2 text-gold-300">
                    <IconCheck size={15} className="shrink-0" />
                    {t.faq.success}
                  </span>
                )}
                {status === "err" && (
                  <span className="inline-flex items-center gap-2 text-blood-400">
                    <IconWarn size={15} className="shrink-0" />
                    {t.faq.error}
                  </span>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
