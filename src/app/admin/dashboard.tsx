"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import ApplicationsTab from "./applications-tab";
import MembersTab from "./members-tab";
import NewsletterTab from "./newsletter-tab";

type Tab = "applications" | "members" | "newsletter";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("applications");

  const tabs: { key: Tab; label: string }[] = [
    { key: "applications", label: t.admin.applications },
    { key: "members", label: t.admin.members },
    { key: "newsletter", label: t.admin.newsletter },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue">{t.admin.loginSubtitle}</h1>
          <div className="mt-2 h-0.5 w-12 bg-brand-red" />
        </div>
        <button
          onClick={onLogout}
          className="self-start text-sm font-medium text-brand-slate border border-slate-300 rounded-sm px-4 py-2 hover:border-brand-red hover:text-brand-red transition-colors"
        >
          {t.admin.signOut}
        </button>
      </div>

      <div className="flex gap-1 border-b border-slate-200 mb-8 overflow-x-auto">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
              tab === tb.key
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-brand-slate hover:text-brand-blue"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "applications" && <ApplicationsTab />}
      {tab === "members" && <MembersTab />}
      {tab === "newsletter" && <NewsletterTab />}
    </div>
  );
}
