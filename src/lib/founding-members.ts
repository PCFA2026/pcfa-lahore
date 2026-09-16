export interface FoundingMember {
  name: string;
  role: string;
  photo?: string;
  photoOrientation?: "portrait" | "landscape" | "square";
}

/** Founding-member information supplied in "PCFA founding members.docx". */
const foundingMembersSource: FoundingMember[] = [
  { name: "Prof. Dr. Khalid Manzoor Butt", role: "Dean, Faculty of Humanities and Social Sciences / Faculty of Languages and Literature, University of Central Punjab, Lahore.", photo: "/photos/founding new/Prof. Dr. Khalid Manzoor Butt,.jpeg", photoOrientation: "square" },
  { name: "Mr. Kamran Lashari", role: "Former Chief Secretary Sindh, Chairman CDA Islamabad, and DG, Walled City Lahore Authority.", photo: "/photos/founding new/Kamran Lashari.png", photoOrientation: "square" },
  { name: "Dr. Kiran Khurshid", role: "Secretary, Food Security & Consumer Protection, Government of the Punjab, Lahore.", photo: "/photos/founding new/Dr. Kiran Khurshid,.png", photoOrientation: "square" },
  { name: "Dr. Hassan A. Shah", role: "Former Vice Chancellor, GC University Lahore; currently Dean of Sciences, FCCU.", photo: "/photos/founding new/Dr. Hassan A. Shah,.png", photoOrientation: "square" },
  { name: "Mr. Hamza Tariq Sufi", role: "Director, Sufi Group of Industries.", photo: "/photos/founding new/Mr. Hamza Tariq Sufi,.png", photoOrientation: "square" },
  { name: "Mr. Asad Sultan Gondal", role: "Owner & Director, IMC Hospital, Defence, Lahore Cantt.", photo: "/photos/founding new/Mr. Asad Sultan Gondal,.png", photoOrientation: "square" },
  { name: "Mr. Rizwan Akram Sherwani", role: "Former DG, Excise and Taxation Department, Government of the Punjab.", photo: "/photos/founding new/Rizwan Akram Sherwani,.png", photoOrientation: "landscape" },
  { name: "Dr. Muhammad Asim Farooqi", role: "Former MS, Punjab Dental College and Hospital, Lahore.", photo: "/photos/founding new/Dr. Muhammad Asim Farooqi,.png", photoOrientation: "portrait" },
  { name: "Mr. Naveed Saeed", role: "Former CEO of Warid Telecom; Head Pakistan Telecom; and Head of Commercial Advocacy, Bill and Melinda Gates, Pakistan.", photo: "/photos/founding new/Mr. Naveed Saeed,.png", photoOrientation: "portrait" },
  { name: "Mr. Sarmad Nadeem", role: "Head, UBL Insurers; Member, Committee of Management, Gymkhana Club.", photo: "/photos/founding new/Mr. Sarmad Nadeem,.png", photoOrientation: "square" },
  { name: "Dr. Farzana Riaz", role: "Poetess, Urdu Department, GC University Lahore.", photo: "/photos/founding new/Dr. Farzana Riaz (poetess).png", photoOrientation: "square" },
  { name: "Ms. Tabita Victor", role: "Political Science Department, Kinnaird College for Women, Lahore.", photo: "/photos/founding new/Ms. Tabita Victor,.png", photoOrientation: "portrait" },
  { name: "Dr. Khushbu Khalid", role: "Computer Science Department, Garrison University, DHA.", photo: "/photos/founding new/Dr. Khushbu Khalid,.png", photoOrientation: "portrait" },
  { name: "Mr. Wu Minghual-tim", role: "Chinese national; Director Public Relations, OPPO Pakistan.", photo: "/photos/founding new/Mr. Wu Minghual-tim, (Chinese National),.png", photoOrientation: "square" },
  { name: "Ms. Chen Meifen", role: "Chinese national; teacher residing in Lahore.", photo: "/photos/founding new/Ms. Chen Meifen, (Chinese National),.png", photoOrientation: "square" },
  { name: "Ms. HO, Yuk Bing Barbara", role: "Chinese national; Vice Principal, Chinese International Academy, Lahore.", photo: "/photos/founding new/Ms HO, Yuk Bing Barbara, (Chinese National),.png", photoOrientation: "square" },
  { name: "Mr. Muhammad Mauz A. Jabal", role: "Xiaomi’s Head of Legal and Government Relations.", photo: "/photos/founding new/Mr. Muhammad Mauz A. Jabal.png", photoOrientation: "landscape" },
  { name: "Ms. Khadija Amer", role: "Group Director, Punjab Colleges & UCP.", photo: "/images/khadija-amer-placeholder.png", photoOrientation: "square" },
];

export const foundingMembers = foundingMembersSource;
