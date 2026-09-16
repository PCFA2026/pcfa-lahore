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
    name: "Dr. Khalid Manzoor Butt",
    titleKey: "president",
    extraKey: "dean",
    photo: "/photos/president new photo.jpeg",
  },
  {
    name: "Ms. HO (Zainab)",
    titleKey: "seniorVP",
    photo: "/photos/Ms HO (Zainab).jpeg",
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
    name: "Ms. Khadija Amer",
    titleKey: "member",
    photo: "/images/khadija-amer-placeholder.png",
    // Uses the supplied neutral placeholder image in both member lists.
  },
];
