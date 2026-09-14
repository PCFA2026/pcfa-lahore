import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { requireAdmin } from "@/lib/server-auth";

export async function GET() {
  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseService
    .from("approved_members")
    .select("*")
    .order("approved_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
  return NextResponse.json({ members: data });
}

export async function POST(req: Request) {
  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const full_name = (body.full_name || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (!full_name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const { error } = await supabaseService.from("approved_members").insert({
    full_name,
    email,
    phone: (body.phone || "").trim() || null,
    country: (body.country || "").trim() || null,
    city: (body.city || "").trim() || null,
    organization: (body.organization || "").trim() || null,
    designation: (body.designation || "").trim() || null,
    education: (body.education || "").trim() || null,
    reason: (body.reason || "").trim() || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
