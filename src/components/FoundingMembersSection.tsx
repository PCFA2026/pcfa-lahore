"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { foundingMembers } from "@/lib/founding-members";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function FoundingMembersSection() {
  const { t } = useLang();

  return (
    <section id="founding-members" className="scroll-mt-16 bg-brand-light py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t.founders.eyebrow} title={t.founders.title} center />
          <p className="-mt-4 max-w-2xl mx-auto text-center text-brand-slate text-lg leading-relaxed">
            {t.founders.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {foundingMembers.map((member, index) => (
            <Reveal key={member.name} delay={(index % 3) * 80} className="h-full">
            <article className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-light">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-brand-blue/20 bg-brand-light text-brand-blue shadow-sm">
                      <span className="text-xl font-bold tracking-[0.18em]">PCFA</span>
                    </div>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
                      {t.founders.photoUnavailable}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <span className="text-brand-red text-xs font-bold tracking-widest pt-1">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-bold text-brand-blue text-lg leading-snug">{member.name}</h3>
                  <p className="mt-2 text-brand-slate text-sm leading-relaxed">{member.role}</p>
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
