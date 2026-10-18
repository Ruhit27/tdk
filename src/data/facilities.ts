export type FacilityKind = "hospital" | "diagnostic" | "blood-bank" | "pharmacy";

export type Facility = {
  kind: FacilityKind;
  en: string;
  bn: string;
  addressEn: string;
  addressBn: string;
  phones: string[];
  logo?: string;
  // Hospitals where patients booked through the Booking Line get a discount.
  discount?: boolean;
  link?: string;
};

export const facilities: Facility[] = [
  {
    kind: "hospital",
    en: "Islami Bank Hospital",
    bn: "ইসলামী ব্যাংক হাসপাতাল",
    addressEn: "42 Khan Jahan Ali Road (Santidham Mor), Khulna",
    addressBn: "৪২, খান জাহান আলী রোড (শান্তিধাম মোড়), খুলনা",
    phones: ["041-810742", "01712-068684"],
    logo: "/logos/ibh.png",
    discount: true,
  },
  {
    kind: "hospital",
    en: "Khulna City Medical College Hospital",
    bn: "খুলনা সিটি মেডিকেল কলেজ হাসপাতাল",
    addressEn: "25-26 KDA Avenue (Moilapota Mor), Khulna",
    addressBn: "২৫-২৬, কেডিএ এভিনিউ (ময়লাপোতা মোড়), খুলনা",
    phones: ["041-722407", "01999-077077", "01999-099099", "01989-995021"],
    logo: "/logos/kcmch.png",
    discount: true,
  },
  {
    kind: "hospital",
    en: "Gazi Medical College and Hospital",
    bn: "গাজী মেডিকেল কলেজ ও হাসপাতাল",
    addressEn: "A.19-21 Mojid Sarani, Sonadanga, Khulna",
    addressBn: "এ.১৯-২১, মজিদ সরণি, সোনাডাঙ্গা, খুলনা",
    phones: ["041-812608", "01404-100100", "01407-031046", "01778-455951"],
    logo: "/logos/gazi.png",
    discount: true,
  },
  {
    kind: "diagnostic",
    en: "Top Choice Diagnostic Centre",
    bn: "টপ চয়েস ডায়াগনস্টিক সেন্টার",
    addressEn: "37 Shamsur Rahman Road, Khulna",
    addressBn: "৩৭, শামসুর রহমান রোড, খুলনা",
    phones: ["041-725597", "01787-128075", "01954-799260"],
    logo: "/logos/tcdc.png",
    discount: true,
  },
  {
    kind: "blood-bank",
    en: "Sandhani Blood Donors Club",
    bn: "সন্ধানী ব্লাড ডোনার্স ক্লাব",
    addressEn: "Room 24, Pathology Department, General Hospital, Hospital Road, Khulna",
    addressBn: "রুম ২৪, প্যাথলজি বিভাগ, জেনারেল হাসপাতাল, হাসপাতাল রোড, খুলনা",
    phones: ["01911-836894", "01885-455592"],
    logo: "/logos/sandhani.png",
  },
  {
    kind: "blood-bank",
    en: "Badhan, Khulna University Unit",
    bn: "বাঁধন, খুলনা বিশ্ববিদ্যালয় ইউনিট",
    addressEn: "Khulna University, Khulna",
    addressBn: "খুলনা বিশ্ববিদ্যালয়, খুলনা",
    phones: ["01534-982674"],
    logo: "/logos/badhan.png",
  },
  {
    kind: "blood-bank",
    en: "Khulna Blood Bank",
    bn: "খুলনা ব্লাড ব্যাংক",
    addressEn: "Shamsur Rahman Road, Khulna",
    addressBn: "শামসুর রহমান রোড, খুলনা",
    phones: ["041-762006"],
    logo: "/logos/kln-blood-bank.jpg",
  },
  {
    kind: "pharmacy",
    en: "Chayonika Pharmacy",
    bn: "চয়নিকা ফার্মেসি",
    addressEn: "47 Tootpara Central Road, Khulna",
    addressBn: "৪৭, টুটপাড়া সেন্ট্রাল রোড, খুলনা",
    phones: ["041-730231", "01911-701008"],
    logo: "/logos/chayonika.png",
  },
  {
    kind: "pharmacy",
    en: "Lazz Pharma Ltd.",
    bn: "লাজ ফার্মা লিঃ",
    addressEn: "305 Khan Jahan Ali Road, Khulna",
    addressBn: "৩০৫, খান জাহান আলী রোড, খুলনা",
    phones: ["01707-070157"],
    logo: "/logos/lazz.png",
  },
  {
    kind: "pharmacy",
    en: "Khulna Online Pharmacy",
    bn: "খুলনা অনলাইন ফার্মেসি",
    addressEn: "Khulna (home delivery)",
    addressBn: "খুলনা (হোম ডেলিভারি)",
    phones: ["01939-717272"],
    logo: "/logos/kop.png",
    link: "https://fb.com/khulnaonlinepharmacy",
  },
];

// Public emergency lines shown in the footer.
export const emergencyLines = [
  { en: "Khulna Medical College Hospital", bn: "খুলনা মেডিকেল কলেজ হাসপাতাল", phones: ["041-761535", "01716-280708"] },
  { en: "General Hospital, Khulna", bn: "জেনারেল হাসপাতাল, খুলনা", phones: ["041-721128", "01730-324797"] },
  { en: "Abu Naser Specialised Hospital", bn: "আবু নাসের বিশেষায়িত হাসপাতাল", phones: ["041-760390", "01716-169834"] },
];
