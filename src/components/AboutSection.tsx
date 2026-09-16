"use client";

import { useLang } from "@/lib/i18n";
import { foundingMembers } from "@/lib/founding-members";
import Reveal from "./Reveal";

function FocusIcon({ index }: { index: number }) {
  const paths = [
    <path key="people" d="M5 19a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    <path key="book" d="M5 4.5A3.5 3.5 0 0 1 8.5 1H20v18H8.5A3.5 3.5 0 0 0 5 22.5v-18ZM5 4.5V23H20" />,
    <path key="partnership" d="m8 12 3 3 5-6M4 5h16v14H4z" />,
    <path key="exchange" d="M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3 3m-3-3 3-3" />,
  ];

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden="true">{paths[index % paths.length]}</svg>;
}

export default function AboutSection() {
  const { t } = useLang();
  const stats = [
    { value: t.about.statsYear, label: t.about.statsEstablished },
    { value: String(foundingMembers.length), label: t.about.statsFounders },
    { value: String(t.about.activities.length), label: t.about.statsProgrammes },
  ];

  return (
    <section id="about" className="scroll-mt-16 bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-semibold text-xs sm:text-sm tracking-widest uppercase">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-brand-blue">
            {t.about.title}
          </h2>
          <div className="mt-5 h-0.5 w-12 bg-brand-red mx-auto" />
          <p className="mt-7 text-brand-slate text-lg sm:text-xl leading-relaxed">
            {t.about.introText}
          </p>
        </header>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-12 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`px-3 py-5 text-center sm:px-6 ${index > 0 ? "border-l border-slate-200" : ""}`}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-slate sm:text-xs">{stat.label}</dt>
                <dd className="mt-1.5 text-2xl font-bold text-brand-blue sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <Reveal delay={80}>
          <article className="h-full rounded-xl bg-brand-light p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-9">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.associationLabel}</p>
            <h3 className="mt-3 text-2xl font-bold text-brand-blue">{t.about.natureTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.about.natureText}</p>
          </article>
          </Reveal>
          <Reveal delay={160}>
          <article className="h-full rounded-xl border border-slate-200 p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-9">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.countriesLabel}</p>
            <h3 className="mt-3 text-2xl font-bold text-brand-blue">{t.about.purposeTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.about.purposeText}</p>
          </article>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-8 overflow-hidden rounded-xl shadow-sm">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] bg-brand-blue text-white">
          <div className="p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/15">
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase">{t.about.directionLabel}</p>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold">{t.about.visionTitle}</h3>
          </div>
          <div className="p-7 sm:p-10 flex items-center">
            <p className="text-white/85 text-lg leading-relaxed">{t.about.visionText}</p>
          </div>
        </div>
        </Reveal>

        <div className="mt-24 grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.focusLabel}</p>
            <h3 className="mt-3 text-3xl font-bold text-brand-blue">{t.about.objectivesTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">
              {t.about.activitiesText}
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {t.about.objectives.map((objective, index) => (
              <li key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red"><FocusIcon index={index} /></span>
                  <div>
                    <span className="text-brand-red font-bold text-xs tracking-wider">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-1 text-brand-slate leading-relaxed">{objective}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 pt-20 border-t border-slate-200">
          <div className="max-w-2xl">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.programmesLabel}</p>
            <h3 className="mt-3 text-3xl font-bold text-brand-blue">{t.about.activitiesTitle}</h3>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
            {t.about.activities.map((activity, index) => (
              <article key={index} className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue"><FocusIcon index={index} /></div>
                <h4 className="mt-5 font-bold text-brand-blue">{activity.title}</h4>
                <p className="mt-3 text-brand-slate text-sm leading-relaxed">{activity.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-8">
          <article className="rounded-xl border-l-4 border-brand-red bg-brand-light p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-9">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.togetherLabel}</p>
            <h3 className="mt-3 text-2xl font-bold text-brand-blue">{t.about.collaborationTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.about.collaborationText}</p>
          </article>
          <article className="rounded-xl border-l-4 border-brand-blue p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-9">
            <p className="text-brand-red text-xs font-bold tracking-widest uppercase">{t.about.networkLabel}</p>
            <h3 className="mt-3 text-2xl font-bold text-brand-blue">{t.about.alumniTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.about.alumniText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
