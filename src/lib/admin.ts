import { supabaseBrowser } from "./supabase";

/** Emails allowed to access the admin panel. Configured in env. */
export function isAdminEmail(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS || "";
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export async function adminSignIn(email: string, password: string) {
  if (!supabaseBrowser) {
    return { error: { message: "Auth not configured" }, data: null };
  }
  return supabaseBrowser.auth.signInWithPassword({ email, password });
}

export async function adminSignOut() {
  if (!supabaseBrowser) return { error: null };
  return supabaseBrowser.auth.signOut();
}

/**
 * Verify the current browser session belongs to an allowed admin.
 * The check runs server-side (ADMIN_EMAILS is not available in the
 * browser bundle), using the same requireAdmin() logic as the
 * other /api/admin routes. Returns the admin email or null.
 */
export async function verifyAdminSession(): Promise<string | null> {
  try {
    const res = await fetch("/api/admin/session", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.email === "string" ? data.email : null;
  } catch {
    return null;
  }
}


