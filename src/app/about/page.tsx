"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div>
      <section className="bg-brand-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-brand-red font-semibold tracking-widest uppercase text-sm mb-3">
            {t.about.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{t.about.title}</h1>
          <p className="mt-4 text-white/85 text-lg max-w-2xl leading-relaxed">{t.about.introText}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="border-l-4 border-brand-red bg-brand-light p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-blue mb-3">{t.about.natureTitle}</h2>
            <p className="text-brand-slate leading-relaxed">{t.about.natureText}</p>
          </div>
          <div className="border-l-4 border-brand-blue bg-brand-light p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-blue mb-3">{t.about.purposeTitle}</h2>
            <p className="text-brand-slate leading-relaxed">{t.about.purposeText}</p>
          </div>
        </div>

        <div className="bg-brand-blue text-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4">{t.about.visionTitle}</h2>
          <p className="text-white/85 text-lg leading-relaxed">{t.about.visionText}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-blue mb-4">{t.about.objectivesTitle}</h2>
          <ul className="space-y-3">
            {t.about.objectives.map((obj, i) => (
              <li key={i} className="flex gap-3 text-brand-slate leading-relaxed">
                <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-red shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-blue mb-3">{t.about.activitiesTitle}</h2>
          <p className="text-brand-slate text-lg leading-relaxed mb-8">{t.about.activitiesText}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.about.activities.map((a, i) => (
              <div key={i} className="border-t-2 border-brand-red bg-white pt-4">
                <h3 className="font-bold text-brand-blue">{a.title}</h3>
                <p className="mt-2 text-brand-slate text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-light border-l-4 border-brand-red p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-blue mb-3">{t.about.collaborationTitle}</h2>
          <p className="text-brand-slate leading-relaxed">{t.about.collaborationText}</p>
        </div>

        <div className="bg-brand-blue text-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">{t.about.alumniTitle}</h2>
          <p className="text-white/85 text-lg leading-relaxed">{t.about.alumniText}</p>
        </div>

        <div className="border-l-4 border-brand-red bg-brand-light p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-blue mb-3">{t.about.membershipTitle}</h2>
          <p className="text-brand-slate leading-relaxed">{t.about.membershipText}</p>
        </div>
      </section>

      <section className="bg-brand-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">{t.about.ctaTitle}</h2>
          <p className="mt-4 text-white/85 text-base sm:text-lg max-w-2xl mx-auto">{t.about.ctaText}</p>
          <Link href="/membership" className="mt-8 inline-block bg-brand-red text-white font-bold px-9 py-3.5 rounded-sm hover:bg-brand-red-dark transition-colors">
            {t.about.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
