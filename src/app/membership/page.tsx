"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  organization: string;
  designation: string;
  education: string;
  reason: string;
}

const empty: FormState = {
  full_name: "", email: "", phone: "", country: "", city: "",
  organization: "", designation: "", education: "", reason: "",
};

export default function MembershipPage() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-brand-blue">{t.membership.successTitle}</h1>
        <p className="mt-4 text-brand-slate text-lg leading-relaxed">{t.membership.successText}</p>
        <Link href="/" className="inline-block mt-8 bg-brand-blue text-white font-bold px-7 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors">
          {t.membership.backHome}
        </Link>
      </div>
    );
  }

  const f = t.membership.form;
  const field = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent";
  const label = "block text-sm font-medium text-brand-slate mb-1.5";

  return (
    <div>
      <section className="bg-brand-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-brand-red font-semibold tracking-widest uppercase text-sm mb-3">{t.membership.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold">{t.membership.title}</h1>
          <p className="mt-4 text-white/85 text-lg max-w-2xl">{t.membership.subtitle}</p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className={label}>{f.fullName} <span className="text-brand-red">*</span></label>
            <input required className={field} value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={label}>{f.email} <span className="text-brand-red">*</span></label>
              <input required type="email" className={field} value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className={label}>{f.phone}</label>
              <input type="tel" className={field} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={label}>{f.country}</label>
              <input className={field} value={form.country} onChange={(e) => update("country", e.target.value)} />
            </div>
            <div>
              <label className={label}>{f.city}</label>
              <input className={field} value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={label}>{f.organization}</label>
              <input className={field} value={form.organization} onChange={(e) => update("organization", e.target.value)} />
            </div>
            <div>
              <label className={label}>{f.designation}</label>
              <input className={field} value={form.designation} onChange={(e) => update("designation", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={label}>{f.education}</label>
            <input className={field} value={form.education} onChange={(e) => update("education", e.target.value)} />
          </div>
          <div>
            <label className={label}>{f.reason}</label>
            <textarea rows={4} className={field} value={form.reason} onChange={(e) => update("reason", e.target.value)} />
          </div>
          {error && <p className="text-brand-red text-sm font-medium">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark disabled:opacity-60 transition-colors">
            {submitting ? f.submitting : f.submit}
          </button>
        </form>
      </section>
    </div>
  );
}
