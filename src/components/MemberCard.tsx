"use client";

import Image from "next/image";
import { useState } from "react";
import type { Leader } from "@/lib/leadership";
import type { Dict } from "@/lib/dictionary";

interface Props {
  leader: Leader;
  t: Dict["leadership"];
}

function initials(name: string) {
  const honorifics = ["dr", "mr", "ms", "mrs", "prof"];
  const letters = name
    .split(" ")
    .map((w) => w.replace(/[.,]/g, ""))
    .filter((w) => w && !honorifics.includes(w.toLowerCase()));
  const first = letters[0]?.[0] ?? "";
  const last = letters.length > 1 ? letters[letters.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function MemberCard({ leader, t }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = t[leader.titleKey as keyof Dict["leadership"]];
  const extra = leader.extraKey
    ? t[leader.extraKey as keyof Dict["leadership"]]
    : undefined;

  const hasPhoto = leader.photo && !imgError;

  return (
    <div className="group bg-white border border-slate-200 rounded-sm p-6 h-full flex flex-col items-center text-center hover:border-brand-red/30 hover:shadow-sm transition-all duration-200">
      <div className="relative w-[100px] h-[100px] mb-5 shrink-0">
        {hasPhoto ? (
          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-brand-light group-hover:ring-brand-red/40 transition-all duration-200">
            <Image
              src={leader.photo!}
              alt={leader.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-brand-blue flex items-center justify-center ring-4 ring-brand-light group-hover:ring-brand-red/40 transition-all duration-200">
            <span className="text-2xl font-bold text-white tracking-wide">
              {initials(leader.name)}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-bold text-brand-blue text-base leading-snug">
        {leader.name}
      </h3>
      <p className="text-brand-red font-medium text-sm mt-1">{title}</p>
      {extra && (
        <p className="text-brand-slate text-xs mt-1 leading-relaxed">{extra}</p>
      )}
    </div>
  );
}
