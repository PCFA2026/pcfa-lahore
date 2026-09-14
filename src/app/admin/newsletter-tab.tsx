"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function NewsletterTab() {
  const { t } = useLang();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setResult(null);
    try {
      const res = await fetch("/api/admin/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, message }) });
      if (res.ok) { setResult({ ok: true, msg: t.admin.newsletterSuccess }); setSubject(""); setMessage(""); }
      else { setResult({ ok: false, msg: t.admin.newsletterError }); }
    } catch { setResult({ ok: false, msg: t.admin.newsletterError }); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={send} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-brand-slate mb-1.5">{t.admin.newsletterSubject}</label>
        <input required className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-slate mb-1.5">{t.admin.newsletterMessage}</label>
        <textarea required rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {result && <p className={`text-sm font-medium ${result.ok ? "text-brand-green" : "text-brand-red"}`}>{result.msg}</p>}
      <button type="submit" disabled={busy} className="bg-brand-blue text-white font-bold px-6 py-2.5 rounded-lg hover:bg-brand-blue-dark disabled:opacity-60 transition-colors">
        {busy ? t.admin.sending : t.admin.sendNewsletter}
      </button>
    </form>
  );
}
