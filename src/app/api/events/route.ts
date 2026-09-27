import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

export async function GET() {
  if (!supabaseService) return NextResponse.json({ events: [] });
  const { data, error } = await supabaseService
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("event_date", { ascending: true, nullsFirst: false });
  if (error) return NextResponse.json({ error: "Unable to load events" }, { status: 500 });
  return NextResponse.json({ events: data || [] });
}
