"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import AboutSection from "@/components/AboutSection";
import FoundingMembersSection from "@/components/FoundingMembersSection";
import HeroVisual from "@/components/HeroVisual";
import LeadershipSection from "@/components/LeadershipSection";
import MembershipForm from "@/components/MembershipForm";
import EventsSection from "@/components/EventsSection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div>
      <section id="home" className="scroll-mt-16 relative overflow-hidden bg-brand-blue text-white">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />
        <div className="relative md:min-h-[34rem]">
          <div className="relative z-10 bg-brand-blue px-4 py-20 sm:px-6 sm:py-24 md:min-h-[34rem] md:w-[60%] md:px-8 md:py-28 lg:px-[max(2rem,calc((100vw-72rem)/2))] md:pr-24 md:[clip-path:polygon(0_0,90%_0,100%_100%,0_100%)]">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <p className="hero-entrance mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-red sm:text-base" style={{ animationDelay: "50ms" }}>
                {t.home.slogan}
              </p>
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
          </div>
          <div className="relative h-52 w-full sm:h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[50%]">
            <Image
              src="/photos/main flag home.jpeg"
              alt=""
              fill
              preload
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[25%_center] md:object-[30%_center]"
            />
            <div className="absolute right-3 top-3 hidden rounded-lg border border-brand-red/60 bg-brand-blue/85 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:block sm:right-5 sm:top-5 sm:px-5 sm:py-3">
              <p className="whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.1em] text-white sm:text-base sm:tracking-[0.12em]">{t.home.slogan}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow={t.home.honors.eyebrow} title={t.home.honors.title} center />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { image: "/images/Xi Jinping new.jpeg", person: t.home.honors.xi },
              { image: "/images/Muhammad Shehbaz Sharif.jpeg", person: t.home.honors.shehbaz },
              { image: "/images/Sun Yan, the Consul General of the People's Republic of China in Lahore.jpeg", person: t.home.honors.sunYan },
            ].map(({ image, person }, index) => (
              <Reveal key={person.name} delay={index * 90}>
                <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="aspect-[4/5] w-full">
                    <HeroVisual src={image} alt={person.name} label={person.name} />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-brand-blue">{person.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-brand-red">{person.role}</p>
                    <p className="mt-1 text-sm text-brand-slate">{person.country}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-brand-slate">{t.home.consulText}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Reveal><SectionHeading eyebrow={t.home.eventEyebrow} title={t.home.eventTitle} center /></Reveal>
        <div className="mt-12 grid lg:grid-cols-[1.45fr_0.75fr] gap-10 lg:gap-14 items-center">
          <Reveal delay={100} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <figure>
            <div className="aspect-video w-full">
              <HeroVisual src="/photos/innaugral meetring.jpeg" alt={t.home.eventTitle} label={t.home.eventEyebrow} sublabel={t.home.eventTitle} fit="contain" />
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

      <AboutSection />
      <EventsSection limit={3} showViewAll />
      <FoundingMembersSection />
      <LeadershipSection />
      <MembershipForm />
      <section className="bg-brand-blue px-4 py-16 text-center text-white sm:py-20">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-red">{t.home.communityEyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t.home.communityTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{t.home.communityText}</p>
          <Link href="/community" className="mt-7 inline-flex rounded-lg bg-white px-6 py-3 font-bold text-brand-blue transition-colors hover:bg-brand-light">{t.home.communityButton}</Link>
        </Reveal>
      </section>
    </div>
  );
}
