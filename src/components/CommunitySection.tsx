"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type DirectoryMember = {
  full_name: string;
  designation: string | null;
  application_type: "honorary" | "alumni";
};

export default function CommunitySection() {
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
          <SectionHeading eyebrow="Our Growing Network" title="PCFA Community" center />
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-brand-slate">
            Meet the people strengthening Pakistan-China friendship through PCFA Lahore.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="mx-auto flex max-w-md rounded-xl border border-slate-200 bg-white p-1 shadow-sm" role="tablist" aria-label="Community directory">
            <DirectoryTab active={active === "honorary"} count={grouped.honorary.length} label="Members" onClick={() => setActive("honorary")} />
            <DirectoryTab active={active === "alumni"} count={grouped.alumni.length} label="Alumni" onClick={() => setActive("alumni")} />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, index) => (
            <Reveal key={`${member.full_name}-${index}`} delay={(index % 3) * 70}>
              <article className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-brand-blue">{member.full_name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{member.designation || "PCFA Member"}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="mt-8 text-center text-brand-slate">The {active === "alumni" ? "alumni" : "member"} directory will appear here as the community grows.</p>
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
