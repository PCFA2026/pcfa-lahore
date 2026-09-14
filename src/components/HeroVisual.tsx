"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  label: string;
  sublabel?: string;
}

export default function HeroVisual({ src, alt, label, sublabel }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-full h-full bg-white relative">
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
          <div className="relative flex -space-x-2">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-brand-blue/30 bg-white flex items-center justify-center text-brand-blue font-bold text-lg">
              PK
            </span>
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-brand-red/30 bg-white flex items-center justify-center text-brand-red font-bold text-lg">
              CN
            </span>
          </div>
          <p className="relative mt-5 text-brand-blue font-semibold text-base">
            {label}
          </p>
          {sublabel && (
            <p className="relative mt-1 text-brand-slate text-sm">{sublabel}</p>
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
