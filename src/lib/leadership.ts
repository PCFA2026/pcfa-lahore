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
 * The PCFA Executive Committee, ordered from senior office bearers to
 * committee members.
 */
export const leaders: Leader[] = [
  {
    name: "Prof. Dr. Khalid Manzoor Butt",
    titleKey: "president",
    photo: "/photos/president new photo.jpeg",
  },
  {
    name: "Ms. HO, Yuk Bing Barbara (Zainab)",
    titleKey: "seniorVP",
    extraKey: "chineseNational",
    photo: "/photos/Ms HO (Zainab).jpeg",
  },
  {
    name: "Ms. Khadija Amer",
    titleKey: "vicePresident",
    photo: "/images/khadija-amer-placeholder.png",
  },
  {
    name: "Dr. Kiran Khurshid",
    titleKey: "vicePresident",
    photo: "/photos/founding new/Dr. Kiran Khurshid,.png",
  },
  {
    name: "Mr. Asad Sultan Gondal",
    titleKey: "secretaryGeneral",
    photo: "/photos/Mr Asad Gonda.jpeg",
  },
  {
    name: "Mr. Hamza Tariq Sufi",
    titleKey: "jointSecretary",
    photo: "/photos/Mr Hamza Sufi.jpeg",
  },
  {
    name: "Mr. Rizwan Akram Sherwani",
    titleKey: "memberEC",
    photo: "/photos/Mr Rizwan Sherwani.jpeg",
  },
  {
    name: "Ms. Chen Meifen",
    titleKey: "memberEC",
    extraKey: "chineseNational",
    photo: "/photos/Ms Chen Meifen .jpeg",
  },
  {
    name: "Mr. Naveed Saeed",
    titleKey: "memberEC",
    photo: "/photos/Mr Naveed Saeed .jpeg",
  },
  {
    name: "Dr. Farzana Riaz",
    titleKey: "memberEC",
    photo: "/photos/Dr Farzana Riaz.jpeg",
  },
];
