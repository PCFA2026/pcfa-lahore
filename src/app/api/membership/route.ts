import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { sendApplicationConfirmation } from "@/lib/emails";
import { addLocalApplication, isLocalTestMode } from "@/lib/local-test-store";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const full_name = (body.full_name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const application_type = body.application_type === "alumni" ? "alumni" : "honorary";
  const residential_address = (body.residential_address || "").trim();
  const father_husband_name = (body.father_husband_name || "").trim();

  if (!full_name || !email || !residential_address || (application_type === "honorary" && !father_husband_name)) {
    return NextResponse.json(
      { error: "Please complete all required fields" },
      { status: 400 }
    );
  }

  if (isLocalTestMode()) {
    addLocalApplication(body);
    return NextResponse.json({ ok: true, localTest: true });
  }

  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
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
    application_type,
    father_husband_name: father_husband_name || null,
    residential_address,
    office_address: (body.office_address || "").trim() || null,
    chinese_institution_city: (body.chinese_institution_city || "").trim() || null,
    qualification: (body.qualification || "").trim() || null,
    qualification_year: (body.qualification_year || "").trim() || null,
    honorary_membership: body.honorary_membership === "yes",
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
