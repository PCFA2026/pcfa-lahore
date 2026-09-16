import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { requireAdmin } from "@/lib/server-auth";
import { sendApprovalEmail } from "@/lib/emails";
import { isLocalTestMode, updateLocalApplication } from "@/lib/local-test-store";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: { action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const action = body.action;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  if (isLocalTestMode()) {
    const updated = updateLocalApplication(id, action);
    if (!updated) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    return NextResponse.json({ ok: true, status: updated.status, localTest: true });
  }

  if (!supabaseService) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = action === "approve" ? "approved" : "rejected";

  // Update status
  const { data: updated, error: updateErr } = await supabaseService
    .from("membership_applications")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (updateErr || !updated) {
    console.error(updateErr);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  // On approval: copy to approved_members + send welcome email.
  // Skip if the applicant is already an approved member (repeated approval
  // must not create duplicate members or send duplicate welcome emails).
  if (action === "approve") {
    const { data: existing } = await supabaseService
      .from("approved_members")
      .select("id")
      .eq("email", updated.email)
      .limit(1);

    if (!existing || existing.length === 0) {
      const { error: insertErr } = await supabaseService.from("approved_members").insert({
        full_name: updated.full_name,
        email: updated.email,
        phone: updated.phone,
        country: updated.country,
        city: updated.city,
        organization: updated.organization,
        designation: updated.designation,
        education: updated.education,
        reason: updated.reason,
        application_type: updated.application_type,
        father_husband_name: updated.father_husband_name,
        residential_address: updated.residential_address,
        office_address: updated.office_address,
        chinese_institution_city: updated.chinese_institution_city,
        qualification: updated.qualification,
        qualification_year: updated.qualification_year,
        honorary_membership: updated.honorary_membership,
      });

      if (insertErr) {
        console.error("Failed to create member:", insertErr);
        return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
      }

      try {
        await sendApprovalEmail(updated.email, updated.full_name);
      } catch (e) {
        console.error("Approval email failed:", e);
      }
    }
  }

  return NextResponse.json({ ok: true, status });
}
