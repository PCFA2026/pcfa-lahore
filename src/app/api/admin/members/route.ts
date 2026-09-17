import { NextResponse } from "next/server";
import { addLocalMember, isLocalTestMode, localMembers, removeLocalMember, updateLocalMember } from "@/lib/local-test-store";
import { requireAdmin } from "@/lib/server-auth";
import { supabaseService } from "@/lib/supabase";

function cleanMember(body: Record<string, unknown>) {
  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  return {
    full_name: text("full_name"),
    email: text("email").toLowerCase(),
    phone: text("phone") || null,
    country: text("country") || null,
    city: text("city") || null,
    organization: text("organization") || null,
    designation: text("designation") || null,
    education: text("education") || null,
    reason: text("reason") || null,
    application_type: text("application_type") === "alumni" ? ("alumni" as const) : ("honorary" as const),
    father_husband_name: text("father_husband_name") || null,
    residential_address: text("residential_address") || null,
    office_address: text("office_address") || null,
    chinese_institution_city: text("chinese_institution_city") || null,
    qualification: text("qualification") || null,
    qualification_year: text("qualification_year") || null,
    honorary_membership: body.honorary_membership === true || body.honorary_membership === "yes",
  };
}

async function authorized() {
  return Boolean(supabaseService && await requireAdmin());
}

export async function GET() {
  if (isLocalTestMode()) return NextResponse.json({ members: localMembers(), localTest: true });
  if (!supabaseService) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseService
    .from("approved_members")
    .select("*")
    .order("approved_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  return NextResponse.json({ members: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const member = cleanMember(body);
  if (!member.full_name || !member.email) return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  if (isLocalTestMode()) {
    const data = addLocalMember(Object.fromEntries(Object.entries(member).map(([key, value]) => [key, value === null ? "" : String(value)])));
    return NextResponse.json({ member: data, localTest: true });
  }
  if (!supabaseService) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseService.from("approved_members").insert(member).select().single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A member with this email already exists" : "Failed to add member" }, { status: 400 });
  return NextResponse.json({ member: data });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!body || !id) return NextResponse.json({ error: "Member id is required" }, { status: 400 });
  const member = cleanMember(body);
  if (!member.full_name || !member.email) return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  if (isLocalTestMode()) {
    const updated = updateLocalMember(id, member);
    return updated ? NextResponse.json({ member: updated, localTest: true }) : NextResponse.json({ error: "Member not found" }, { status: 404 });
  }
  if (!supabaseService) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseService.from("approved_members").update(member).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A member with this email already exists" : "Failed to update member" }, { status: 400 });
  return NextResponse.json({ member: data });
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null) as { id?: string } | null;
  const id = body?.id || "";
  if (!id) return NextResponse.json({ error: "Member id is required" }, { status: 400 });
  if (isLocalTestMode()) return removeLocalMember(id) ? NextResponse.json({ ok: true, localTest: true }) : NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (!supabaseService) return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabaseService.from("approved_members").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Failed to remove member" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
