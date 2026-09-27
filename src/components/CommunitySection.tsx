"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/lib/i18n";

type DirectoryMember = {
  full_name: string;
  application_type: "honorary" | "alumni";
};

export default function CommunitySection() {
  const { t } = useLang();
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [active, setActive] = useState<"honorary" | "alumni">("honorary");

  useEffect(() => {
    fetch("/api/members")
      .then((response) => response.ok ? response.json() : { members: [] })
      .then((data) => setMembers(Array.isArray(data.members) ? data.members : []))
      .catch(() => setMembers([]));
  }, []);

  const grouped = useMemo(() => ({
    honorary: members.filter((member) => member.application_type === "honorary"),
    alumni: members.filter((member) => member.application_type === "alumni"),
  }), [members]);
  const visible = grouped[active];

  return (
    <section id="community" className="scroll-mt-16 bg-brand-light py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={t.community.eyebrow} title={t.community.title} center />
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-brand-slate">
            {t.community.intro}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="mx-auto flex max-w-md rounded-xl border border-slate-200 bg-white p-1 shadow-sm" role="tablist" aria-label={t.community.directoryLabel}>
            <DirectoryTab active={active === "honorary"} count={grouped.honorary.length} label={t.community.members} onClick={() => setActive("honorary")} />
            <DirectoryTab active={active === "alumni"} count={grouped.alumni.length} label={t.community.alumni} onClick={() => setActive("alumni")} />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, index) => (
            <Reveal key={`${member.full_name}-${index}`} delay={(index % 3) * 70}>
              <article className="group flex h-full min-h-36 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-md">
                <div>
                  <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-blue ring-2 ring-brand-blue/10 transition-all duration-200 group-hover:ring-brand-red/35">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                      <circle cx="12" cy="8" r="3.25" />
                      <path d="M5.5 20c.7-3.35 3.1-5.1 6.5-5.1s5.8 1.75 6.5 5.1" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="mx-auto mb-3 block h-1 w-8 rounded-full bg-brand-red transition-all duration-200 group-hover:w-12" />
                  <h3 className="font-bold leading-snug text-brand-blue">{member.full_name}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="mt-8 text-center text-brand-slate">{active === "alumni" ? t.community.emptyAlumni : t.community.emptyMembers}</p>
        )}
      </div>
    </section>
  );
}

function DirectoryTab({ active, count, label, onClick }: { active: boolean; count: number; label: string; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${active ? "bg-brand-blue text-white" : "text-brand-slate hover:bg-brand-light"}`}>
      {label} <span className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-brand-blue/10 text-brand-blue"}`}>{count}</span>
    </button>
  );
}
