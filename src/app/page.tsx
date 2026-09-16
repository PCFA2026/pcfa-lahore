"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import AboutSection from "@/components/AboutSection";
import FoundingMembersSection from "@/components/FoundingMembersSection";
import HeroVisual from "@/components/HeroVisual";
import LeadershipSection from "@/components/LeadershipSection";
import MembershipForm from "@/components/MembershipForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div>
      <section id="home" className="scroll-mt-16 relative isolate overflow-hidden bg-brand-blue text-white">
        <Image
          src="/images/pcfa-first-event.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-brand-blue/45" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div>
              <h1 className="hero-entrance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: "100ms" }}>{t.home.heroTitle}</h1>
              <p className="hero-entrance mt-5 text-sm font-medium text-white/85 sm:text-base" style={{ animationDelay: "200ms" }}>{t.home.heroSubtitle}</p>
              <p className="hero-entrance mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ animationDelay: "300ms" }}>{t.home.heroIntro}</p>
              <div className="hero-entrance mt-8 flex flex-wrap gap-3.5" style={{ animationDelay: "400ms" }}>
                <Link href="/#membership" className="inline-flex rounded-lg bg-brand-red px-7 py-3 font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-brand-red-dark hover:shadow-lg">
                  {t.home.heroCta}
                </Link>
                <Link href="/#about" className="inline-flex rounded-lg border-2 border-white/60 px-7 py-3 font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-white/[0.08] hover:shadow-lg">
                  {t.home.heroCtaSecondary}
                </Link>
              </div>
            </div>
            <div className="hero-entrance mt-10 max-w-xl rounded-xl border border-white/20 bg-brand-blue/55 p-3 shadow-lg backdrop-blur-sm" style={{ animationDelay: "550ms" }}>
              <p className="px-1 pb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 sm:text-xs">
                {t.home.diplomaticEyebrow}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <figure className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/50 sm:h-20 sm:w-20">
                    <HeroVisual src="/images/Xi Jinping new.jpeg" alt={t.home.xiCaption} label="Xi Jinping" />
                  </div>
                  <figcaption className="text-xs font-medium leading-snug text-white/90">{t.home.xiCaption}</figcaption>
                </figure>
                <figure className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/50 sm:h-20 sm:w-20">
                    <HeroVisual src="/images/Muhammad Shehbaz Sharif.jpeg" alt={t.home.shehbazCaption} label="Muhammad Shehbaz Sharif" />
                  </div>
                  <figcaption className="text-xs font-medium leading-snug text-white/90">{t.home.shehbazCaption}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Reveal><SectionHeading eyebrow={t.home.eventEyebrow} title={t.home.eventTitle} center /></Reveal>
        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal delay={100} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <figure>
            <div className="aspect-[3/2] w-full">
              <HeroVisual src="/images/pcfa-first-event.jpg" alt={t.home.eventTitle} label={t.home.eventEyebrow} sublabel={t.home.eventTitle} />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm font-medium text-brand-blue">
              {t.home.eventTitle}
            </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={180} className="space-y-5">
            <p className="text-brand-slate text-lg leading-relaxed">{t.home.eventText}</p>
            <p className="text-brand-slate text-lg leading-relaxed">{t.home.eventText2}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[0.7fr_1.3fr] gap-10 sm:gap-14 items-center">
          <Reveal delay={100} className="md:order-2 group max-w-sm mx-auto w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <figure>
            <div className="aspect-[3/4] w-full">
              <HeroVisual
                src="/images/Sun Yan, the Consul General of the People's Republic of China in Lahore.jpeg"
                alt={t.home.consulTitle}
                label={t.home.consulEyebrow}
                sublabel={t.home.consulRole}
              />
            </div>
            </figure>
          </Reveal>
          <Reveal delay={180} className="md:order-1">
            <p className="text-brand-red font-semibold tracking-widest uppercase text-sm">{t.home.consulEyebrow}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-brand-blue">{t.home.consulTitle}</h2>
            <p className="mt-3 font-semibold text-brand-slate">{t.home.consulRole}</p>
            <p className="mt-5 text-brand-slate text-lg leading-relaxed">{t.home.consulText}</p>
          </Reveal>
        </div>
      </section>

      <AboutSection />
      <LeadershipSection />
      <FoundingMembersSection />
      <MembershipForm />
    </div>
  );
}
