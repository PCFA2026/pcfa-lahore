"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import HeroVisual from "@/components/HeroVisual";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-blue text-white">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-18 sm:py-24 lg:py-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center">
            <div>
              <p className="inline-block bg-brand-red/15 text-white text-[11px] sm:text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-sm border border-brand-red/40 mb-5">
                {t.home.heroEyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                {t.home.heroTitle}
              </h1>
              <p className="mt-4 text-white/85 text-sm sm:text-base font-medium">
                {t.home.heroSubtitle}
              </p>
              <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
                {t.home.heroIntro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link href="/membership" className="inline-flex bg-brand-red text-white font-bold px-7 py-3 rounded-sm hover:bg-brand-red-dark transition-colors">
                  {t.home.heroCta}
                </Link>
                <Link href="/about" className="inline-flex border-2 border-white/60 text-white font-bold px-7 py-3 rounded-sm hover:bg-white/[0.08] transition-colors">
                  {t.home.heroCtaSecondary}
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-sm overflow-hidden border border-white/60 shadow-xl bg-white">
                <div className="aspect-[3/2] w-full">
                  <HeroVisual src="/images/pcfa-first-event.jpg" alt={t.home.heroImageCaption} label={t.home.heroEyebrow} sublabel={t.home.heroSubtitle} />
                </div>
                <p className="bg-white text-brand-blue text-xs sm:text-sm font-medium text-center px-4 py-3 border-t border-slate-200">
                  {t.home.heroImageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading eyebrow={t.home.eventEyebrow} title={t.home.eventTitle} center />
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-brand-slate text-lg leading-relaxed">{t.home.eventText}</p>
          <p className="text-brand-slate text-lg leading-relaxed">{t.home.eventText2}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading eyebrow={t.home.heroEyebrow} title={t.home.introTitle} />
            <p className="text-brand-slate text-lg leading-relaxed">{t.home.introText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-brand-light border border-slate-200 rounded-sm px-5 py-3">
                <p className="text-xs font-semibold text-brand-slate uppercase tracking-widest">Established</p>
                <p className="mt-1 text-brand-blue font-semibold">{t.footer.established}</p>
              </div>
              <div className="bg-brand-light border border-slate-200 rounded-sm px-5 py-3">
                <p className="text-xs font-semibold text-brand-slate uppercase tracking-widest">Based in</p>
                <p className="mt-1 text-brand-blue font-semibold">{t.footer.location}</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-light border-l-4 border-brand-red p-6 sm:p-8">
            <h3 className="text-xl font-bold text-brand-blue mb-3">{t.home.visionTitle}</h3>
            <p className="text-brand-slate leading-relaxed">{t.home.visionText}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.home.peopleTitle} center />
          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
            {[t.home.peopleFocus, t.home.peopleMission, t.home.peopleScope].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm p-6">
                <div className="w-9 h-9 rounded-sm bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-base mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-brand-blue mb-2">{item.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-brand-slate text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {t.home.peopleText}
          </p>
        </div>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.home.pillarsTitle} center />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.pillars.map((p, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm p-6 hover:border-brand-red/40 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-sm bg-brand-red/10 text-brand-red font-bold flex items-center justify-center text-base">{i + 1}</div>
                <h3 className="mt-4 font-bold text-brand-blue">{p.title}</h3>
                <p className="mt-2 text-brand-slate text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.home.objectivesTitle} center />
          <div className="mt-14 grid md:grid-cols-2 gap-x-10 gap-y-6">
            {t.home.objectives.map((obj, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm p-5 flex gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-red shrink-0" />
                <p className="text-brand-slate leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <SectionHeading title={t.home.activitiesTitle} center />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.home.activities.map((a, i) => (
            <div key={i} className="border-t-2 border-brand-red bg-white pt-5">
              <h3 className="font-bold text-brand-blue">{a.title}</h3>
              <p className="mt-2 text-brand-slate text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 bg-brand-blue text-white rounded-sm p-8 sm:p-10 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold">{t.home.liaisonTitle}</h3>
            <p className="mt-3 text-white/85 leading-relaxed">{t.home.liaisonText}</p>
          </div>
          <div className="hidden md:flex justify-center">
            <span className="text-6xl font-extrabold text-white/20 select-none" aria-hidden>
              中巴
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="bg-brand-light border-l-4 border-brand-red p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-brand-blue">{t.home.alumniTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.home.alumniText}</p>
          </div>
          <div className="bg-brand-light border-l-4 border-brand-blue p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-brand-blue">{t.home.membershipTitle}</h3>
            <p className="mt-4 text-brand-slate leading-relaxed">{t.home.membershipText}</p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <SectionHeading eyebrow={t.home.heroEyebrow} title={t.home.ctaTitle} center />
          <p className="text-brand-slate text-lg leading-relaxed max-w-2xl mx-auto">{t.home.ctaText}</p>
          <Link href="/membership" className="mt-6 inline-flex bg-brand-red text-white font-bold px-7 py-3 rounded-sm hover:bg-brand-red-dark transition-colors">
            {t.home.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
