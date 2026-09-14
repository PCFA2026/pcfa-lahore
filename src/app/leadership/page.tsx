"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import MemberCard from "@/components/MemberCard";
import { leaders } from "@/lib/leadership";

export default function LeadershipPage() {
  const { t } = useLang();

  return (
    <div>
      <section className="bg-brand-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-brand-red font-semibold tracking-widest uppercase text-sm mb-3">
            {t.leadership.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{t.leadership.title}</h1>
          <p className="mt-4 text-white/85 text-lg max-w-2xl">{t.leadership.subtitle}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {leaders.map((leader) => (
            <MemberCard key={leader.name} leader={leader} t={t.leadership} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-brand-light border-l-4 border-brand-red p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-blue mb-3">{t.about.membershipTitle}</h2>
          <p className="text-brand-slate leading-relaxed">{t.about.membershipText}</p>
          <Link href="/membership" className="mt-6 inline-flex bg-brand-red text-white font-bold px-7 py-3 rounded-sm hover:bg-brand-red-dark transition-colors">
            {t.about.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
