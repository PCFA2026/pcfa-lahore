import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server-auth";

/**
 * Returns the authenticated admin's email, or 401.
 * The admin email allow-list (ADMIN_EMAILS) is evaluated
 * server-side only and is never exposed to the browser.
 */
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ email: admin });
}
