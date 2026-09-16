import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { requireAdmin } from "@/lib/server-auth";
import { sendNewsletter } from "@/lib/emails";
import { isLocalTestMode, recordLocalNewsletter } from "@/lib/local-test-store";

export async function POST(req: Request) {
  let body: { subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();
  if (!subject || !message) {
    return NextResponse.json(
      { error: "Subject and message are required" },
      { status: 400 }
    );
  }

  if (isLocalTestMode()) {
    const recipientCount = recordLocalNewsletter(subject, message);
    if (recipientCount === 0) {
      return NextResponse.json({ error: "No members to send to" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, recipientCount, localTest: true });
  }

  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get all approved member emails
  const { data: members, error: fetchErr } = await supabaseService
    .from("approved_members")
    .select("email");

  if (fetchErr) {
    console.error(fetchErr);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }

  const emails = (members || []).map((m) => m.email).filter(Boolean);
  if (emails.length === 0) {
    return NextResponse.json({ error: "No members to send to" }, { status: 400 });
  }

  // Send newsletter (Resend supports up to 50 `to` addresses per call).
  // The Resend SDK returns errors in the response object instead of throwing,
  // so each batch result is checked explicitly: a failed batch must NOT be
  // reported as a successful newsletter.
  try {
    for (let i = 0; i < emails.length; i += 50) {
      const result = await sendNewsletter(emails.slice(i, i + 50), subject, message);
      if (result && result.error) {
        throw new Error(
          `Newsletter batch ${Math.floor(i / 50) + 1} failed: ${result.error.message || "unknown Resend error"}`
        );
      }
    }
  } catch (e) {
    console.error("Newsletter send failed:", e);
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 });
  }

  // Log the send
  await supabaseService.from("newsletter_sends").insert({
    subject,
    message,
    recipient_count: emails.length,
  });

  return NextResponse.json({ ok: true, recipientCount: emails.length });
}
