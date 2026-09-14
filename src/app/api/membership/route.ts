import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { sendApplicationConfirmation } from "@/lib/emails";

export async function POST(req: Request) {
  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const full_name = (body.full_name || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (!full_name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const { error } = await supabaseService.from("membership_applications").insert({
    full_name,
    email,
    phone: (body.phone || "").trim() || null,
    country: (body.country || "").trim() || null,
    city: (body.city || "").trim() || null,
    organization: (body.organization || "").trim() || null,
    designation: (body.designation || "").trim() || null,
    education: (body.education || "").trim() || null,
    reason: (body.reason || "").trim() || null,
    status: "pending",
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }

  // Send confirmation email (non-blocking for the response)
  try {
    await sendApplicationConfirmation(email, full_name);
  } catch (e) {
    console.error("Confirmation email failed:", e);
  }

  return NextResponse.json({ ok: true });
}
