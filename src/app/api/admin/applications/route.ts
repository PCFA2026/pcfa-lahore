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
    .from("membership_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
  return NextResponse.json({ applications: data });
}
