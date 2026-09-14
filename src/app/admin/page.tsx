"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { adminSignIn, adminSignOut, verifyAdminSession } from "@/lib/admin";
import AdminDashboard from "./dashboard";

export default function AdminPage() {
  const { t } = useLang();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    verifyAdminSession().then((adminEmail) => {
      setAuthed(!!adminEmail);
      setChecking(false);
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setLoginError("");
    try {
      const { error } = await adminSignIn(email, password);
      if (error) { setLoginError(t.admin.invalid); }
      else {
        // Confirm the session is an allowed admin, verified server-side.
        const adminEmail = await verifyAdminSession();
        if (adminEmail) { setAuthed(true); }
        else { setLoginError(t.admin.invalid); await adminSignOut(); }
      }
    } catch { setLoginError(t.admin.invalid); }
    finally { setBusy(false); }
  }

  async function handleLogout() {
    await adminSignOut();
    setAuthed(false);
  }

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-brand-slate">
        {t.common.loading}
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center px-4 py-10 sm:py-16 bg-brand-light">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-sm p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-sm bg-brand-blue flex items-center justify-center text-white font-bold mb-3">PC</div>
            <h1 className="text-xl font-bold text-brand-blue">{t.admin.loginTitle}</h1>
            <p className="text-sm text-brand-slate mt-1">{t.admin.loginSubtitle}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-slate mb-1">{t.admin.email}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-slate mb-1">{t.admin.password}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-sm border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            {loginError && <p className="text-brand-red text-sm">{loginError}</p>}
            <button type="submit" disabled={busy} className="w-full bg-brand-blue text-white font-bold py-2.5 rounded-sm hover:bg-brand-blue-dark disabled:opacity-60 transition-colors">
              {busy ? t.admin.signingIn : t.admin.signIn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
