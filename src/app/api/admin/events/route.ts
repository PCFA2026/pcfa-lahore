import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server-auth";
import { supabaseService } from "@/lib/supabase";

function clean(body: Record<string, unknown>) {
  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const date = text("event_date");
  return {
    title: text("title"), title_zh: text("title_zh") || null,
    description: text("description") || null, description_zh: text("description_zh") || null,
    event_date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null,
    location: text("location") || null, cover_image_url: text("cover_image_url") || null,
    status: text("status") === "published" ? "published" : "draft",
    updated_at: new Date().toISOString(),
  };
}
async function authorized() { return Boolean(supabaseService && await requireAdmin()); }

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("events").select("*").order("event_date", { ascending: false, nullsFirst: false });
  if (error) return NextResponse.json({ error: "Unable to load events" }, { status: 500 });
  return NextResponse.json({ events: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const event = clean(body);
  if (!event.title) return NextResponse.json({ error: "An English title is required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("events").insert(event).select().single();
  if (error) return NextResponse.json({ error: "Unable to create event" }, { status: 400 });
  return NextResponse.json({ event: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!body || !id) return NextResponse.json({ error: "Event id is required" }, { status: 400 });
  const event = clean(body);
  if (!event.title) return NextResponse.json({ error: "An English title is required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("events").update(event).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: "Unable to update event" }, { status: 400 });
  return NextResponse.json({ event: data });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Event id is required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { error } = await supabaseService!.from("events").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: "Unable to delete event" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
