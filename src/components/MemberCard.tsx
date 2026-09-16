"use client";

import Image from "next/image";
import { useState } from "react";
import type { Leader } from "@/lib/leadership";
import type { Dict } from "@/lib/dictionary";

interface Props {
  leader: Leader;
  t: Dict["leadership"];
  featured?: boolean;
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

export default function MemberCard({ leader, t, featured = false }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = t[leader.titleKey as keyof Dict["leadership"]];
  const extra = leader.extraKey
    ? t[leader.extraKey as keyof Dict["leadership"]]
    : undefined;

  const hasPhoto = leader.photo && !imgError;

  return (
    <div className={`group h-full rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${featured ? "bg-brand-blue text-white p-7 sm:p-9 lg:grid lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-10 lg:items-center text-center lg:text-left" : "bg-white border border-slate-200 p-7 flex flex-col items-center text-center hover:border-brand-red/30"}`}>
      <div className={`relative shrink-0 ${featured ? "w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0 mb-7 lg:mb-0" : "w-52 h-52 sm:w-60 sm:h-60 mb-7"}`}>
        {hasPhoto ? (
          <div className={`relative w-full h-full overflow-hidden ring-4 transition-all duration-200 ${featured ? "rounded-xl ring-white/20" : "rounded-full ring-brand-light group-hover:ring-brand-red/40"}`}>
            <Image
              src={leader.photo!}
              alt={leader.name}
              fill
              sizes={featured ? "(min-width: 768px) 320px, 80vw" : "(min-width: 1024px) 240px, (min-width: 640px) 240px, 208px"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className={`w-full h-full flex items-center justify-center ring-4 transition-all duration-200 ${featured ? "rounded-xl bg-white/10 ring-white/20" : "rounded-full bg-brand-blue ring-brand-light group-hover:ring-brand-red/40"}`}>
            <span className={`${featured ? "text-4xl" : "text-3xl"} font-bold text-white tracking-wide`}>
              {initials(leader.name)}
            </span>
          </div>
        )}
      </div>

      <div>
        {featured && <p className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3">PCFA Lahore</p>}
        <h3 className={`${featured ? "text-2xl sm:text-3xl text-white" : "text-lg text-brand-blue"} font-bold leading-snug`}>
          {leader.name}
        </h3>
        <p className={`${featured ? "text-white/85" : "text-brand-red"} font-medium text-sm mt-2`}>{title}</p>
        {extra && (
          <p className={`${featured ? "text-white/65" : "text-brand-slate"} text-sm mt-2 leading-relaxed`}>{extra}</p>
        )}
      </div>
    </div>
  );
}
