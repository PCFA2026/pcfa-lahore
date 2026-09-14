"use client";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { ApprovedMember } from "@/lib/types";

export default function MembersTab() {
  const { t } = useLang();
  const [members, setMembers] = useState<ApprovedMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", country: "", city: "", organization: "", designation: "" });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      setMembers(data.members || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function updateField(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function addMember(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setResult(null);
    try {
      const res = await fetch("/api/admin/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setResult({ ok: true, msg: t.admin.memberAdded }); setForm({ full_name: "", email: "", phone: "", country: "", city: "", organization: "", designation: "" }); setShowForm(false); load(); }
      else { setResult({ ok: false, msg: t.admin.memberAddError }); }
    } catch { setResult({ ok: false, msg: t.admin.memberAddError }); }
    finally { setBusy(false); }
  }

  if (loading) return <p className="text-brand-slate">{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-brand-blue">{t.admin.members}</h2>
          <span className="bg-brand-blue/10 text-brand-blue text-sm font-semibold px-3 py-1 rounded-full">{members.length}</span>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="text-sm font-semibold bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors">{t.admin.addMemberTitle}</button>
      </div>

      {showForm && (
        <form onSubmit={addMember} className="bg-brand-light border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.fullName} <span className="text-brand-red">*</span></label><input required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.email} <span className="text-brand-red">*</span></label><input required type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.phone}</label><input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.country}</label><input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.country} onChange={(e) => updateField("country", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.city}</label><input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.city} onChange={(e) => updateField("city", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.organization}</label><input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.organization} onChange={(e) => updateField("organization", e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-brand-slate mb-1">{t.membership.form.designation}</label><input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" value={form.designation} onChange={(e) => updateField("designation", e.target.value)} /></div>
          </div>
          {result && <p className={`text-sm font-medium ${result.ok ? "text-brand-green" : "text-brand-red"}`}>{result.msg}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={busy} className="bg-brand-blue text-white font-semibold px-5 py-2 rounded-lg hover:bg-brand-blue-dark disabled:opacity-60 transition-colors">{t.admin.addMemberTitle}</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-brand-slate font-medium px-4 py-2 hover:text-brand-red transition-colors">{t.admin.close}</button>
          </div>
        </form>
      )}
      {members.length === 0 ? (<p className="text-brand-slate">{t.admin.noMembers}</p>) : (
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-brand-slate border-b border-slate-200"><th className="py-3 pr-4">{t.membership.form.fullName}</th><th className="py-3 pr-4">{t.membership.form.email}</th><th className="py-3 pr-4">{t.membership.form.organization}</th><th className="py-3 pr-4">{t.admin.date}</th></tr></thead><tbody>{members.map((m) => (<tr key={m.id} className="border-b border-slate-100"><td className="py-3 pr-4 font-medium text-brand-blue">{m.full_name}</td><td className="py-3 pr-4 text-brand-slate">{m.email}</td><td className="py-3 pr-4 text-brand-slate">{m.organization || "-"}</td><td className="py-3 pr-4 text-brand-slate">{new Date(m.approved_at).toLocaleDateString()}</td></tr>))}</tbody></table></div>
      )}
    </div>
  );
}
