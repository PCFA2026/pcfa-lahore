"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const LOGO_SRC = "/images/pcfa-logo.png";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/leadership", label: t.nav.leadership },
    { href: "/membership", label: t.nav.membership },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/60">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-15">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <Image
            src={LOGO_SRC}
            alt="Crossed flags of Pakistan and China"
            width={619}
            height={432}
            priority
            className="h-8 w-auto sm:h-10"
          />
          <div className="hidden sm:block leading-tight min-w-0">
            <div className="font-bold text-brand-blue text-[13px] lg:text-sm whitespace-nowrap">
              Pakistan-China Friendship Association
            </div>
            <div className="text-[10px] sm:text-xs text-brand-slate tracking-wide">
              PCFA, Lahore
            </div>
          </div>
          <div className="sm:hidden leading-tight">
            <div className="font-bold text-brand-blue text-sm">PCFA</div>
            <div className="text-[10px] text-brand-slate tracking-wide">Lahore</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(l.href) ? "text-brand-blue bg-brand-light font-semibold" : "text-brand-slate hover:text-brand-blue hover:bg-brand-light/70"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="text-sm font-semibold border border-slate-300 rounded-md px-3 py-1.5 hover:border-brand-red hover:text-brand-red hover:bg-brand-light/50 transition-colors"
            aria-label="Toggle language"
          >
            {t.common.language}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-brand-slate hover:bg-brand-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium ${isActive(l.href) ? "text-brand-blue bg-brand-light font-semibold" : "text-brand-slate hover:bg-brand-light"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
