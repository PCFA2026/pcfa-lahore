export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface MembershipApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  organization: string | null;
  designation: string | null;
  education: string | null;
  reason: string | null;
  status: ApplicationStatus;
  created_at: string;
}

export interface ApprovedMember {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  organization: string | null;
  designation: string | null;
  education: string | null;
  reason: string | null;
  approved_at: string;
}
