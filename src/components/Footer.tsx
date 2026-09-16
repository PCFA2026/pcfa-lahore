"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";

const LOGO_SRC = "/images/pcfa-logo.png";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-sm px-2 py-1.5 shadow-sm shrink-0">
                <Image
                  src={LOGO_SRC}
                  alt="Crossed flags of Pakistan and China"
              width={619}
              height={432}
              sizes="72px"
                  className="h-9 w-auto"
                />
              </div>
              <div className="leading-tight min-w-0">
                <div className="font-bold text-white text-sm">
                  Pakistan-China Friendship Association
                </div>
                <div className="text-xs text-white/70 tracking-wide mt-0.5">
                  PCFA, Lahore
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {t.footer.aboutText}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t.footer.estNote}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/#home" className="hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/#faculty" className="hover:text-white transition-colors">{t.nav.leadership}</Link></li>
              <li><Link href="/#membership" className="hover:text-white transition-colors">{t.nav.membership}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3">{t.footer.membership}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/#membership" className="hover:text-white transition-colors">{t.nav.membership}</Link></li>
              <li><Link href="/#membership" className="hover:text-white transition-colors">{t.footer.membershipInfo}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3">{t.footer.contact}</h3>
            <p className="text-sm text-white/80">{t.footer.location}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/50">{t.footer.emailLabel}</p>
            <a
              href="mailto:pcfa2026@gmail.com"
              className="mt-1 inline-block text-sm font-medium text-white/90 hover:text-white hover:underline underline-offset-4 break-all transition-colors"
            >
              pcfa2026@gmail.com
            </a>
            <p className="mt-3 text-sm text-white/70">{t.footer.established}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/70">
          <p>&copy; {new Date().getFullYear()} Pakistan-China Friendship Association (PCFA), Lahore. {t.footer.rights}</p>
          <p className="sm:text-center">{t.footer.langNote}</p>
        </div>
      </div>
    </footer>
  );
}
