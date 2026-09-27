export interface FoundingMember {
  name: string;
  role: string;
  photo?: string;
  photoOrientation?: "portrait" | "landscape" | "square";
}

/** Founding-member information supplied in "PCFA founding members.docx". */
const foundingMembersSource: FoundingMember[] = [
  { name: "Prof. Dr. Khalid Manzoor Butt", role: "Dean, Faculty of Humanities and Social Sciences / Faculty of Languages and Literature, University of Central Punjab, Lahore.", photo: "/photos/Founding Members/Prof. Dr. Khalid Manzoor Butt.jpeg", photoOrientation: "square" },
  { name: "Ms. Khadija Amer", role: "Group Director, Punjab Colleges & UCP.", photo: "/photos/Founding Members/Ms. Khadija Amer.jpeg", photoOrientation: "square" },
  { name: "Mr. Kamran Lashari", role: "Former Chief Secretary Sindh, Chairman CDA Islamabad, and DG, Walled City Lahore Authority.", photo: "/photos/Founding Members/Mr. Kamran Lashari.jpeg", photoOrientation: "square" },
  { name: "Dr. Kiran Khurshid", role: "Secretary, Food Security & Consumer Protection, Government of the Punjab, Lahore.", photo: "/photos/Founding Members/Dr. Kiran Khurshid.jpeg", photoOrientation: "square" },
  { name: "Dr. Hassan A. Shah", role: "Former Vice Chancellor, GC University Lahore; currently Dean of Sciences, FCCU.", photo: "/photos/Founding Members/Dr. Hassan A. Shah.jpeg", photoOrientation: "square" },
  { name: "Mr. Hamza Tariq Sufi", role: "Director, Sufi Group of Industries.", photo: "/photos/Founding Members/Mr. Hamza Tariq Sufi.jpeg", photoOrientation: "square" },
  { name: "Mr. Asad Sultan Gondal", role: "Owner & Director, IMC Hospital, Defence, Lahore Cantt.", photo: "/photos/Founding Members/Mr. Asad Sultan Gondal.jpeg", photoOrientation: "square" },
  { name: "Mr. Rizwan Akram Sherwani", role: "Former DG, Excise and Taxation Department, Government of the Punjab.", photo: "/photos/Founding Members/Mr. Rizwan Akram Sherwani.jpeg", photoOrientation: "square" },
  { name: "Dr. Muhammad Asim Farooqi", role: "Former MS, Punjab Dental College and Hospital, Lahore.", photo: "/photos/Founding Members/Dr. Muhammad Asim Farooqi.png", photoOrientation: "square" },
  { name: "Mr. Naveed Saeed", role: "Former CEO of Warid Telecom; Head Pakistan Telecom; and Head of Commercial Advocacy, Bill and Melinda Gates, Pakistan.", photo: "/photos/Founding Members/Mr. Naveed Saeed.jpeg", photoOrientation: "square" },
  { name: "Mr. Sarmad Nadeem", role: "Head, UBL Insurers; Member, Committee of Management, Gymkhana Club.", photo: "/photos/Founding Members/Mr. Sarmad Nadeem.jpeg", photoOrientation: "square" },
  { name: "Dr. Farzana Riaz", role: "Poetess, Urdu Department, GC University Lahore.", photo: "/photos/Founding Members/Dr. Farzana Riaz.jpeg", photoOrientation: "square" },
  { name: "Ms. Tabita Victor", role: "Political Science Department, Kinnaird College for Women, Lahore.", photo: "/photos/Founding Members/Ms. Tabita Victor.jpeg", photoOrientation: "square" },
  { name: "Dr. Khushbu Khalid", role: "Computer Science Department, Garrison University, DHA.", photo: "/photos/Founding Members/Dr. Khushbu Khalid.jpeg", photoOrientation: "square" },
  { name: "Mr. Wu Minghual-tim", role: "Chinese national; Director Public Relations, OPPO Pakistan.", photo: "/photos/Founding Members/Mr. Wu Minghui-tim.jpeg", photoOrientation: "square" },
  { name: "Ms. Chen Meifen", role: "Chinese national; teacher residing in Lahore.", photo: "/photos/Founding Members/Ms. Chen Meifen.png", photoOrientation: "square" },
  { name: "Ms. HO, Yuk Bing Barbara", role: "Chinese national; Vice Principal, Chinese International Academy, Lahore.", photo: "/photos/Founding Members/Ms. HO, Yuk Bing Barbara.jpeg", photoOrientation: "square" },
  { name: "Mr. Muhammad Mauz A. Jabal", role: "Xiaomi's Head of Legal and Government Relations.", photo: "/photos/Founding Members/Mr. Muhammad Mauz A. Jabal.jpeg", photoOrientation: "square" },
];

export const foundingMembers = foundingMembersSource;
