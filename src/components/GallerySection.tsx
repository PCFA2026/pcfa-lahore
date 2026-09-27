"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { GalleryPost } from "@/lib/types";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function GallerySection() {
  const { lang, t } = useLang();
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [selection, setSelection] = useState<{ post: GalleryPost; index: number } | null>(null);
  useEffect(() => { fetch("/api/gallery").then((res) => res.ok ? res.json() : { posts: [] }).then((data) => setPosts(data.posts || [])).catch(() => setPosts([])); }, []);
  const image = selection?.post.images[selection.index];
  const move = (direction: number) => selection && setSelection({ ...selection, index: (selection.index + direction + selection.post.images.length) % selection.post.images.length });
  return <section className="bg-brand-light py-20 sm:py-24"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><Reveal><SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} center /><p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-brand-slate">{t.gallery.intro}</p></Reveal>{posts.length ? <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post, index) => post.images[0] && <Reveal key={post.id} delay={(index % 3) * 80}><button type="button" onClick={() => setSelection({ post, index: 0 })} className="group w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-md"><div className="relative aspect-[4/3]"><Image src={post.images[0].image_url} alt={post.images[0].alt_text || post.title} fill sizes="(min-width: 1024px) 360px, 90vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /></div><div className="p-5"><h3 className="font-bold text-brand-blue">{lang === "zh" && post.title_zh ? post.title_zh : post.title}</h3>{post.description && <p className="mt-2 line-clamp-2 text-sm text-brand-slate">{lang === "zh" && post.description_zh ? post.description_zh : post.description}</p>}</div></button></Reveal>)}</div> : <p className="mt-12 text-center text-brand-slate">{t.gallery.noPosts}</p>}</div>{selection && image && <div role="dialog" aria-modal="true" aria-label={t.gallery.title} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4"><button aria-label={t.gallery.close} onClick={() => setSelection(null)} className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">×</button><button aria-label={t.gallery.previous} onClick={() => move(-1)} className="absolute left-3 rounded-full bg-white/15 px-4 py-3 text-white sm:left-8">‹</button><div className="relative h-[78vh] w-full max-w-5xl"><Image src={image.image_url} alt={image.alt_text || selection.post.title} fill sizes="100vw" className="object-contain" /></div><button aria-label={t.gallery.next} onClick={() => move(1)} className="absolute right-3 rounded-full bg-white/15 px-4 py-3 text-white sm:right-8">›</button></div>}</section>;
}
