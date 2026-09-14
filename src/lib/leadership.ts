export interface Leader {
  name: string;
  /** Key into the "leadership" translation block. */
  titleKey: string;
  /** Optional secondary line (also a translation key). */
  extraKey?: string;
  /** Path under /public; omit for a text-only card. */
  photo?: string;
}

/**
 * The 9 members of the PCFA Executive Committee / Faculty.
 * Order follows office: President, Secretary General, Joint Secretary,
 * then the Executive Committee / members.
 */
export const leaders: Leader[] = [
  {
    name: "Dr. Khalid Manzoor Butt",
    titleKey: "president",
    extraKey: "dean",
    photo: "/photos/Dr Khalid Manzoor Butt.jpeg",
  },
  {
    name: "Mr. Asad Gondal",
    titleKey: "secretaryGeneral",
    extraKey: "ownerDirector",
    photo: "/photos/Mr Asad Gonda.jpeg",
  },
  {
    name: "Mr. Hamza Sufi",
    titleKey: "jointSecretary",
    extraKey: "director",
    photo: "/photos/Mr Hamza Sufi.jpeg",
  },
  {
    name: "Mr. Rizwan Sherwani",
    titleKey: "memberEC",
    extraKey: "formerDG",
    photo: "/photos/Mr Rizwan Sherwani.jpeg",
  },
  {
    name: "Ms. Chen Meifen",
    titleKey: "memberEC",
    photo: "/photos/Ms Chen Meifen .jpeg",
  },
  {
    name: "Dr. Farzana Riaz",
    titleKey: "memberEC",
    extraKey: "gcuLahore",
    photo: "/photos/Dr Farzana Riaz.jpeg",
  },
  {
    name: "Mr. Naveed Saeed",
    titleKey: "memberEC",
    photo: "/photos/Mr Naveed Saeed .jpeg",
  },
  {
    name: "Ms. HO (Zainab)",
    titleKey: "seniorVP",
    photo: "/photos/Ms HO (Zainab).jpeg",
  },
  {
    name: "Ms. Khatiqa Amir",
    titleKey: "member",
    // No photo available — show a clean text-only card. Do NOT use a fake image.
  },
];
