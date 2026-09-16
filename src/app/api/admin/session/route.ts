import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server-auth";
import { isLocalTestMode, LOCAL_TEST_ADMIN_EMAIL } from "@/lib/local-test-store";

/**
 * Returns the authenticated admin's email, or 401.
 * The admin email allow-list (ADMIN_EMAILS) is evaluated
 * server-side only and is never exposed to the browser.
 */
export async function GET() {
  if (isLocalTestMode()) {
    return NextResponse.json({ email: LOCAL_TEST_ADMIN_EMAIL, localTest: true });
  }

  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ email: admin });
}
