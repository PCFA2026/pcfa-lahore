import type { ApprovedMember, MembershipApplication } from "./types";

/**
 * Enables an in-memory development-only backend when
 * NEXT_PUBLIC_LOCAL_TEST_MODE=true is set in .env.local.
 * It is deliberately disabled in production, even if the flag is present.
 */
export function isLocalTestMode() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true"
  );
}

type LocalTestStore = {
  applications: MembershipApplication[];
  members: ApprovedMember[];
  newsletterSends: { subject: string; message: string; recipientCount: number; createdAt: string }[];
};

const globalStore = globalThis as typeof globalThis & {
  __pcfaLocalTestStore?: LocalTestStore;
};

function store(): LocalTestStore {
  if (!globalStore.__pcfaLocalTestStore) {
    globalStore.__pcfaLocalTestStore = {
      applications: [],
      members: [],
      newsletterSends: [],
    };
  }
  return globalStore.__pcfaLocalTestStore;
}

function value(body: Record<string, string>, key: string): string | null {
  return body[key]?.trim() || null;
}

export function addLocalApplication(body: Record<string, string>, status: MembershipApplication["status"] = "pending") {
  const application: MembershipApplication = {
    id: crypto.randomUUID(),
    full_name: value(body, "full_name") || "",
    email: (value(body, "email") || "").toLowerCase(),
    phone: value(body, "phone"),
    country: value(body, "country"),
    city: value(body, "city"),
    organization: value(body, "organization"),
    designation: value(body, "designation"),
    education: value(body, "education"),
    reason: value(body, "reason"),
    application_type: body.application_type === "alumni" ? "alumni" : "honorary",
    father_husband_name: value(body, "father_husband_name"),
    residential_address: value(body, "residential_address"),
    office_address: value(body, "office_address"),
    chinese_institution_city: value(body, "chinese_institution_city"),
    qualification: value(body, "qualification"),
    qualification_year: value(body, "qualification_year"),
    honorary_membership: body.honorary_membership === "yes" || body.honorary_membership === "true",
    status,
    created_at: new Date().toISOString(),
  };
  store().applications.unshift(application);
  return application;
}

export function localApplications() {
  return store().applications;
}

export function updateLocalApplication(id: string, action: "approve" | "reject") {
  const application = store().applications.find((item) => item.id === id);
  if (!application) return null;

  application.status = action === "approve" ? "approved" : "rejected";
  if (action === "approve" && !store().members.some((member) => member.email === application.email)) {
    store().members.unshift({
      id: crypto.randomUUID(),
      full_name: application.full_name,
      email: application.email,
      phone: application.phone,
      country: application.country,
      city: application.city,
      organization: application.organization,
      designation: application.designation,
      education: application.education,
      reason: application.reason,
      application_type: application.application_type,
      father_husband_name: application.father_husband_name,
      residential_address: application.residential_address,
      office_address: application.office_address,
      chinese_institution_city: application.chinese_institution_city,
      qualification: application.qualification,
      qualification_year: application.qualification_year,
      honorary_membership: application.honorary_membership,
      approved_at: new Date().toISOString(),
    });
  }
  return application;
}

export function localMembers() {
  return store().members;
}

export function addLocalMember(body: Record<string, string>) {
  const member: ApprovedMember = {
    id: crypto.randomUUID(),
    full_name: value(body, "full_name") || "",
    email: (value(body, "email") || "").toLowerCase(),
    phone: value(body, "phone"),
    country: value(body, "country"),
    city: value(body, "city"),
    organization: value(body, "organization"),
    designation: value(body, "designation"),
    education: value(body, "education"),
    reason: value(body, "reason"),
    application_type: body.application_type === "alumni" ? "alumni" : "honorary",
    father_husband_name: value(body, "father_husband_name"),
    residential_address: value(body, "residential_address"),
    office_address: value(body, "office_address"),
    chinese_institution_city: value(body, "chinese_institution_city"),
    qualification: value(body, "qualification"),
    qualification_year: value(body, "qualification_year"),
    honorary_membership: body.honorary_membership === "yes" || body.honorary_membership === "true",
    approved_at: new Date().toISOString(),
  };
  store().members.unshift(member);
  return member;
}

export function updateLocalMember(id: string, changes: Partial<Omit<ApprovedMember, "id" | "approved_at">>) {
  const member = store().members.find((item) => item.id === id);
  if (!member) return null;
  Object.assign(member, changes);
  return member;
}

export function removeLocalMember(id: string) {
  const members = store().members;
  const index = members.findIndex((item) => item.id === id);
  if (index === -1) return false;
  members.splice(index, 1);
  return true;
}

export function recordLocalNewsletter(subject: string, message: string) {
  const recipientCount = store().members.length;
  store().newsletterSends.unshift({ subject, message, recipientCount, createdAt: new Date().toISOString() });
  return recipientCount;
}

export const LOCAL_TEST_ADMIN_EMAIL = "local-admin@pcfa.test";
