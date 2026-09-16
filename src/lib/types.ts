export type ApplicationStatus = "pending" | "approved" | "rejected";
export type ApplicationType = "honorary" | "alumni";

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
  application_type: ApplicationType;
  father_husband_name: string | null;
  residential_address: string | null;
  office_address: string | null;
  chinese_institution_city: string | null;
  qualification: string | null;
  qualification_year: string | null;
  honorary_membership: boolean | null;
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
  application_type: ApplicationType;
  father_husband_name: string | null;
  residential_address: string | null;
  office_address: string | null;
  chinese_institution_city: string | null;
  qualification: string | null;
  qualification_year: string | null;
  honorary_membership: boolean | null;
  approved_at: string;
}
