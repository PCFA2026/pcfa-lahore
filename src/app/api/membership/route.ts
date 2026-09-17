import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { sendApprovalEmail } from "@/lib/emails";
import { addLocalApplication, isLocalTestMode, updateLocalApplication } from "@/lib/local-test-store";

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
    const application = addLocalApplication(body, "approved");
    updateLocalApplication(application.id, "approve");
    return NextResponse.json({ ok: true, localTest: true });
  }

  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const { data: existing } = await supabaseService
    .from("approved_members")
    .select("id")
    .eq("email", email)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: "This email is already registered as a PCFA member." }, { status: 409 });
  }

  const member = {
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
  };

  const { error: memberError } = await supabaseService.from("approved_members").insert(member);

  if (memberError) {
    console.error("Supabase member insert error:", memberError);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }

  // Keep an approved audit record of the form submission. Membership is already
  // active even if this non-essential audit insert later fails.
  const { error: applicationError } = await supabaseService
    .from("membership_applications")
    .insert({ ...member, status: "approved" });
  if (applicationError) console.error("Supabase application audit insert error:", applicationError);

  // Membership is automatic; send the welcome message without blocking signup.
  try {
    await sendApprovalEmail(email, full_name);
  } catch (e) {
    console.error("Welcome email failed:", e);
  }

  return NextResponse.json({ ok: true });
}
