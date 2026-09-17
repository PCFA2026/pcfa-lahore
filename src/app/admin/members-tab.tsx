"use client";

import { useCallback, useEffect, useState } from "react";
import type { ApprovedMember } from "@/lib/types";

type MemberForm = Record<
  "full_name" | "email" | "phone" | "country" | "city" | "organization" | "designation" | "education" | "reason" | "application_type" | "father_husband_name" | "residential_address" | "office_address" | "chinese_institution_city" | "qualification" | "qualification_year" | "honorary_membership",
  string
>;

const emptyForm: MemberForm = {
  full_name: "", email: "", phone: "", country: "", city: "", organization: "", designation: "", education: "", reason: "",
  application_type: "honorary", father_husband_name: "", residential_address: "", office_address: "", chinese_institution_city: "", qualification: "", qualification_year: "", honorary_membership: "yes",
};

const fields: { key: keyof MemberForm; label: string; type?: "textarea" | "email" }[] = [
  { key: "full_name", label: "Full name" }, { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone" }, { key: "designation", label: "Profession / designation" },
  { key: "organization", label: "Organisation" }, { key: "office_address", label: "Office address", type: "textarea" },
  { key: "residential_address", label: "Residential address", type: "textarea" }, { key: "city", label: "City" },
  { key: "country", label: "Country" }, { key: "father_husband_name", label: "Father / husband name" },
  { key: "chinese_institution_city", label: "Chinese institution and city" }, { key: "qualification", label: "Degree / diploma / certification" },
  { key: "qualification_year", label: "Qualification year" }, { key: "education", label: "Education" },
  { key: "reason", label: "Notes / reason", type: "textarea" },
];

function toForm(member: ApprovedMember): MemberForm {
  const form = { ...emptyForm };
  (Object.keys(form) as (keyof MemberForm)[]).forEach((key) => {
    if (key === "honorary_membership") form[key] = member.honorary_membership ? "yes" : "no";
    else form[key] = String(member[key as keyof ApprovedMember] ?? "");
  });
  return form;
}

export default function MembersTab() {
  const [members, setMembers] = useState<ApprovedMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/members", { cache: "no-store" });
      const data = await res.json();
      setMembers(data.members || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function change(key: keyof MemberForm, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  function beginAdd() { setEditingId(null); setForm(emptyForm); setShowForm(true); setNotice(null); }
  function beginEdit(member: ApprovedMember) { setEditingId(member.id); setForm(toForm(member)); setShowForm(true); setNotice(null); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function closeForm() { setShowForm(false); setEditingId(null); setForm(emptyForm); }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setNotice(null);
    try {
      const res = await fetch("/api/admin/members", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save the member");
      setNotice({ ok: true, text: editingId ? "Member updated." : "Member added." });
      closeForm();
      await load();
    } catch (error) { setNotice({ ok: false, text: error instanceof Error ? error.message : "Could not save the member" }); }
    finally { setBusy(false); }
  }

  async function remove(member: ApprovedMember) {
    if (!window.confirm(`Remove ${member.full_name} from the member directory? This does not delete the historical form record.`)) return;
    setNotice(null);
    const res = await fetch("/api/admin/members", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: member.id }) });
    if (res.ok) { setNotice({ ok: true, text: "Member removed." }); await load(); }
    else setNotice({ ok: false, text: "Could not remove the member." });
  }

  function download(type: "honorary" | "alumni") {
    const rows = members.filter((member) => member.application_type === type);
    const columns: (keyof ApprovedMember)[] = ["full_name", "email", "phone", "designation", "organization", "office_address", "residential_address", "country", "city", "father_husband_name", "chinese_institution_city", "qualification", "qualification_year", "education", "reason", "approved_at"];
    const label = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [columns.join(","), ...rows.map((member) => columns.map((column) => label(member[column])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `pcfa-${type}-members.csv`; link.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <div className="h-64 animate-pulse rounded-xl bg-slate-100" aria-label="Loading members" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div><h2 className="text-lg font-bold text-brand-blue">Member Directory</h2><p className="mt-1 text-sm text-brand-slate">{members.length} active member{members.length === 1 ? "" : "s"}. Full details are visible only here.</p></div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => download("honorary")} className="rounded-lg border border-brand-blue px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-light">Download Members (Excel)</button>
          <button onClick={() => download("alumni")} className="rounded-lg border border-brand-blue px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-light">Download Alumni (Excel)</button>
          <button onClick={beginAdd} className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark">Add member</button>
        </div>
      </div>

      {notice && <p role="status" className={`rounded-lg px-4 py-3 text-sm font-medium ${notice.ok ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"}`}>{notice.text}</p>}

      {showForm && (
        <form onSubmit={save} className="rounded-xl border border-slate-200 bg-brand-light p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4"><h3 className="text-lg font-bold text-brand-blue">{editingId ? "Edit member" : "Add member"}</h3><button type="button" onClick={closeForm} className="text-sm font-medium text-brand-slate hover:text-brand-red">Close</button></div>
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <Select label="Directory" value={form.application_type} onChange={(value) => change("application_type", value)} options={[{ value: "honorary", label: "Member" }, { value: "alumni", label: "Alumni" }]} />
            <Select label="Membership declaration" value={form.honorary_membership} onChange={(value) => change("honorary_membership", value)} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => <Input key={field.key} label={field.label} required={field.key === "full_name" || field.key === "email"} type={field.type} value={form[field.key]} onChange={(value) => change(field.key, value)} />)}
          </div>
          <div className="mt-6 flex gap-3"><button disabled={busy} className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{busy ? "Saving..." : editingId ? "Save changes" : "Add member"}</button><button type="button" onClick={closeForm} className="rounded-lg px-4 py-2 text-sm font-semibold text-brand-slate hover:text-brand-red">Cancel</button></div>
        </form>
      )}

      {members.length === 0 ? <EmptyState /> : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b border-slate-200 bg-brand-light text-left text-brand-slate"><th className="p-3">Name</th><th className="p-3">Directory</th><th className="p-3">Designation</th><th className="p-3">Email</th><th className="p-3">Joined</th><th className="p-3">Actions</th></tr></thead><tbody>{members.map((member) => <tr key={member.id} className="border-b border-slate-100 last:border-0"><td className="p-3 font-semibold text-brand-blue">{member.full_name}</td><td className="p-3"><span className="rounded-full bg-brand-blue/10 px-2 py-1 text-xs font-semibold text-brand-blue">{member.application_type === "alumni" ? "Alumni" : "Member"}</span></td><td className="p-3 text-brand-slate">{member.designation || "-"}</td><td className="p-3 text-brand-slate">{member.email}</td><td className="p-3 text-brand-slate">{new Date(member.approved_at).toLocaleDateString()}</td><td className="p-3"><div className="flex gap-2"><button onClick={() => beginEdit(member)} className="font-semibold text-brand-blue hover:underline">View / Edit</button><button onClick={() => remove(member)} className="font-semibold text-brand-red hover:underline">Remove</button></div></td></tr>)}</tbody></table></div>
      )}
    </div>
  );
}

function Input({ label, required, type, value, onChange }: { label: string; required: boolean; type?: "textarea" | "email"; value: string; onChange: (value: string) => void }) {
  const className = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue";
  return <label className="block text-sm font-medium text-brand-slate">{label}{required && <span className="ml-1 text-brand-red">*</span>}{type === "textarea" ? <textarea rows={2} className={className} value={value} onChange={(event) => onChange(event.target.value)} /> : <input required={required} type={type} className={className} value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return <label className="block text-sm font-medium text-brand-slate">{label}<select className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

function EmptyState() { return <div className="rounded-xl border border-dashed border-slate-300 bg-brand-light px-6 py-12 text-center text-brand-slate">No members have been added yet.</div>; }
