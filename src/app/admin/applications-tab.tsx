"use client";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { MembershipApplication } from "@/lib/types";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

export default function ApplicationsTab() {
  const { t } = useLang();
  const [apps, setApps] = useState<MembershipApplication[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApps(data.applications || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function act(id: string, action: "approve" | "reject") {
    const response = await fetch(`/api/admin/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
    if (response.ok) {
      setNotice(action === "approve" ? t.admin.applicationApproved : t.admin.applicationRejected);
      window.setTimeout(() => setNotice(""), 3200);
      load();
    }
  }

  if (loading) return <LoadingSkeleton />;
  if (apps.length === 0) return <EmptyState message={t.admin.noApplications} />;

  return (
    <div className="space-y-4">
      {notice && <div role="status" className="rounded-lg border border-brand-green/20 bg-brand-green/10 px-4 py-3 text-sm font-medium text-brand-green">{notice}</div>}
      {apps.map((a) => (
        <div key={a.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
          <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-left hover:bg-brand-light transition-colors">
            <div className="font-medium text-brand-blue">{a.full_name}</div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-full">
                {a.application_type === "alumni" ? "Alumni" : "Honorary"}
              </span>
              <span className="text-brand-slate text-sm">{a.email} &middot; {new Date(a.created_at).toLocaleDateString()}</span>
              <StatusBadge status={a.status} />
            </div>
          </button>
          {expanded === a.id && (
            <div className="px-4 py-4 bg-brand-light/60 border-t border-slate-200">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {field(t.membership.form.phone, a.phone)}
                {field(t.membership.form.country, a.country)}
                {field(t.membership.form.city, a.city)}
                {field(t.membership.form.organization, a.organization)}
                {field(t.membership.form.designation, a.designation)}
                {field(t.membership.form.education, a.education)}
                {field("Residential Address", a.residential_address)}
                {field("Office Address", a.office_address)}
                {field("Father / Husband Name", a.father_husband_name)}
                {field("Chinese Institution and City", a.chinese_institution_city)}
                {field("Degree / Diploma / Certification", a.qualification)}
                {field("Year of Qualification", a.qualification_year)}
              </dl>
              {a.reason && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-brand-slate uppercase tracking-wide">{t.membership.form.reason}</span>
                  <p className="text-brand-slate text-sm mt-1 leading-relaxed">{a.reason}</p>
                </div>
              )}
              {a.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => act(a.id, "approve")} className="text-sm font-semibold bg-brand-green text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">{t.admin.approve}</button>
                  <button onClick={() => act(a.id, "reject")} className="text-sm font-semibold bg-brand-red text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">{t.admin.reject}</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return <div className="space-y-4" aria-label="Loading"><div className="h-16 animate-pulse rounded-xl bg-slate-200" /><div className="h-16 animate-pulse rounded-xl bg-slate-200" /><div className="h-16 animate-pulse rounded-xl bg-slate-200" /></div>;
}

function EmptyState({ message }: { message: string }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-brand-light px-6 py-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">&#128196;</div><p className="mt-4 text-brand-slate">{message}</p></div>;
}

function field(label: string, value: string | null | undefined) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold text-brand-slate uppercase tracking-wide">{label}</dt>
      <dd className="text-brand-slate mt-0.5">{value}</dd>
    </div>
  );
}
