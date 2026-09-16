"use client";

import { useLang } from "@/lib/i18n";
import { leaders } from "@/lib/leadership";
import MemberCard from "./MemberCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function LeadershipSection() {
  const { t } = useLang();
  const [president, ...committeeMembers] = leaders;

  return (
    <section id="faculty" className="scroll-mt-16 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t.leadership.eyebrow} title={t.leadership.title} center />
          <p className="mt-5 max-w-2xl mx-auto text-center text-brand-slate text-lg leading-relaxed">
            {t.leadership.subtitle}
          </p>
        </Reveal>
        {president && (
          <Reveal delay={100} className="mt-14 max-w-4xl mx-auto">
            <MemberCard leader={president} t={t.leadership} featured />
          </Reveal>
        )}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {committeeMembers.map((leader, index) => (
            <Reveal key={leader.name} delay={(index % 3) * 80}>
              <MemberCard leader={leader} t={t.leadership} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
