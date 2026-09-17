import { NextResponse } from "next/server";
import { isLocalTestMode, localMembers } from "@/lib/local-test-store";
import { supabaseService } from "@/lib/supabase";

/** Public directory: only name, designation, and member type are exposed. */
export async function GET() {
  if (isLocalTestMode()) {
    const members = localMembers().map(({ full_name, designation, application_type }) => ({ full_name, designation, application_type }));
    return NextResponse.json({ members });
  }

  if (!supabaseService) return NextResponse.json({ members: [] });

  const { data, error } = await supabaseService
    .from("approved_members")
    .select("full_name, designation, application_type")
    .order("full_name", { ascending: true });

  if (error) {
    console.error("Public member directory error:", error);
    return NextResponse.json({ members: [] }, { status: 500 });
  }
  return NextResponse.json({ members: data || [] });
}
