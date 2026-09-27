"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { EventItem } from "@/lib/types";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function EventsSection({ limit, showViewAll = false }: { limit?: number; showViewAll?: boolean }) {
  const { lang, t } = useLang();
  const [events, setEvents] = useState<EventItem[]>([]);
  useEffect(() => { fetch("/api/events").then((res) => res.ok ? res.json() : { events: [] }).then((data) => setEvents(data.events || [])).catch(() => setEvents([])); }, []);
  const visible = events.filter((event) => !event.event_date || new Date(`${event.event_date}T00:00:00`) >= new Date(new Date().toDateString())).slice(0, limit);
  return <section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><Reveal><SectionHeading eyebrow={t.events.eyebrow} title={t.events.title} center /><p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-brand-slate">{t.events.intro}</p></Reveal>{visible.length ? <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map((event, index) => <Reveal key={event.id} delay={(index % 3) * 80}><article className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">{event.cover_image_url && <div className="relative aspect-[16/9]"><Image src={event.cover_image_url} alt={event.title} fill sizes="(min-width: 1024px) 360px, 90vw" className="object-cover" /></div>}<div className="p-6"><p className="text-sm font-semibold text-brand-red">{event.event_date ? new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", { dateStyle: "long" }).format(new Date(`${event.event_date}T00:00:00`)) : ""}</p><h3 className="mt-2 text-xl font-bold text-brand-blue">{lang === "zh" && event.title_zh ? event.title_zh : event.title}</h3>{event.location && <p className="mt-3 text-sm font-medium text-brand-slate">{t.events.location}: {event.location}</p>}<p className="mt-4 leading-relaxed text-brand-slate">{lang === "zh" && event.description_zh ? event.description_zh : event.description}</p></div></article></Reveal>)}</div> : <p className="mt-12 text-center text-brand-slate">{t.events.noEvents}</p>}{showViewAll && <div className="mt-10 text-center"><Link href="/events" className="inline-flex rounded-lg bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-blue-dark">{t.events.viewAll}</Link></div>}</div></section>;
}
