"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const LOGO_SRC = "/images/pcfa-logo.png";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const links = [
    { href: "/#home", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#faculty", label: t.nav.leadership },
    { href: "/events", label: t.nav.events },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/#membership", label: t.nav.membership },
    { href: "/community", label: t.nav.community },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "faculty", "membership"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-200 ${scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"}`}>
        <Link href="/#home" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <Image
            src={LOGO_SRC}
            alt="Crossed flags of Pakistan and China"
            width={619}
            height={432}
            sizes="(min-width: 640px) 64px, 51px"
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

        <div className="hidden xl:flex items-center gap-0.5">
          {links.map((l) => {
            const section = l.href.startsWith("/#") ? l.href.slice(2) : "";
            const active = section ? pathname === "/" && activeSection === section : pathname === l.href;
            return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => section && setActiveSection(section)}
              className={`relative rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${active ? "text-brand-blue" : "text-brand-slate hover:bg-brand-light/70 hover:text-brand-blue"}`}
            >
              {l.label}
              <span className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-brand-red transition-all duration-200 ${active ? "w-5" : "w-0"}`} />
            </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="whitespace-nowrap rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:border-brand-red hover:bg-brand-light/50 hover:text-brand-red sm:px-3 sm:text-sm"
            aria-label="Toggle language"
          >
            {t.common.language}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-brand-slate transition-colors hover:bg-brand-light xl:hidden"
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

      <div className={`grid transition-[grid-template-rows] duration-300 xl:hidden ${open ? "grid-rows-[1fr] border-t border-slate-200" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden bg-white">
          <div className={`px-4 flex flex-col gap-1 transition-all duration-300 ${open ? "py-3 opacity-100" : "py-0 opacity-0"}`}>
            {links.map((l) => {
              const section = l.href.startsWith("/#") ? l.href.slice(2) : "";
              const active = section ? pathname === "/" && activeSection === section : pathname === l.href;
              return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => { setOpen(false); if (section) setActiveSection(section); }}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-brand-light text-brand-blue" : "text-brand-slate hover:bg-brand-light hover:text-brand-blue"}`}
              >
                {l.label}
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
