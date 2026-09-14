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

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApps(data.applications || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function act(id: string, action: "approve" | "reject") {
    await fetch(`/api/admin/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
    load();
  }

  if (loading) return <p className="text-brand-slate">{t.common.loading}</p>;
  if (apps.length === 0) return <p className="text-brand-slate">{t.admin.noApplications}</p>;

  return (
    <div className="space-y-4">
      {apps.map((a) => (
        <div key={a.id} className="border border-slate-200 rounded-lg overflow-hidden">
          <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-left hover:bg-brand-light transition-colors">
            <div className="font-medium text-brand-blue">{a.full_name}</div>
            <div className="flex items-center gap-3">
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

function field(label: string, value: string | null | undefined) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold text-brand-slate uppercase tracking-wide">{label}</dt>
      <dd className="text-brand-slate mt-0.5">{value}</dd>
    </div>
  );
}
