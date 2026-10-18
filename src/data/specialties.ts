import type { IconName, Tone } from "@/components/AppIcon";

export type Specialty = {
  slug: string;
  en: string;
  enPerson: string;
  bn: string;
  bnPerson: string;
  icon: IconName;
  // Colour shared by specialties in the same body-system group.
  tone: Tone;
  group: "medicine" | "surgery";
};

// Order mirrors how patients browse: common medicine fields first, surgical fields after.
export const specialties: Specialty[] = [
  { slug: "medicine", en: "Medicine", enPerson: "Medicine Specialist", bn: "মেডিসিন", bnPerson: "মেডিসিন বিশেষজ্ঞ", icon: "pill", tone: "teal", group: "medicine" },
  { slug: "cardiology", en: "Cardiology", enPerson: "Cardiologist", bn: "হৃদরোগ", bnPerson: "হৃদরোগ বিশেষজ্ঞ", icon: "heart-pulse", tone: "rose", group: "medicine" },
  { slug: "paediatric-cardiology", en: "Paediatric Cardiology", enPerson: "Paediatric Cardiologist", bn: "শিশু হৃদরোগ", bnPerson: "শিশু হৃদরোগ বিশেষজ্ঞ", icon: "heart", tone: "rose", group: "medicine" },
  { slug: "eye", en: "Eye", enPerson: "Eye Specialist", bn: "চক্ষু", bnPerson: "চক্ষু বিশেষজ্ঞ", icon: "eye", tone: "blue", group: "medicine" },
  { slug: "gastrology", en: "Gastroenterology", enPerson: "Gastroenterologist", bn: "গ্যাস্ট্রোএন্টারোলজি", bnPerson: "পরিপাকতন্ত্র বিশেষজ্ঞ", icon: "activity", tone: "orange", group: "medicine" },
  { slug: "gynecology", en: "Gynecology & Obstetrics", enPerson: "Gynecologist", bn: "গাইনি ও প্রসূতি", bnPerson: "গাইনি বিশেষজ্ঞ", icon: "hand-heart", tone: "pink", group: "medicine" },
  { slug: "neurology", en: "Neuro Medicine", enPerson: "Neurologist", bn: "নিউরো মেডিসিন", bnPerson: "স্নায়ুরোগ বিশেষজ্ঞ", icon: "brain", tone: "violet", group: "medicine" },
  { slug: "ent", en: "ENT", enPerson: "ENT Specialist", bn: "নাক-কান-গলা", bnPerson: "নাক-কান-গলা বিশেষজ্ঞ", icon: "ear", tone: "cyan", group: "medicine" },
  { slug: "child", en: "Child Health", enPerson: "Child Specialist", bn: "শিশু রোগ", bnPerson: "শিশু বিশেষজ্ঞ", icon: "baby", tone: "yellow", group: "medicine" },
  { slug: "urology", en: "Urology", enPerson: "Urologist", bn: "ইউরোলজি", bnPerson: "কিডনি ও মূত্রনালী বিশেষজ্ঞ", icon: "droplets", tone: "indigo", group: "medicine" },
  { slug: "hepatology", en: "Hepatology", enPerson: "Liver Specialist", bn: "লিভার", bnPerson: "লিভার বিশেষজ্ঞ", icon: "flask", tone: "orange", group: "medicine" },
  { slug: "chest", en: "Chest & Respiratory", enPerson: "Chest Specialist", bn: "বক্ষব্যাধি", bnPerson: "বক্ষব্যাধি বিশেষজ্ঞ", icon: "wind", tone: "sky", group: "medicine" },
  { slug: "hormone", en: "Endocrinology", enPerson: "Hormone Specialist", bn: "হরমোন", bnPerson: "হরমোন বিশেষজ্ঞ", icon: "test-tubes", tone: "emerald", group: "medicine" },
  { slug: "diabetology", en: "Diabetology", enPerson: "Diabetologist", bn: "ডায়াবেটিস", bnPerson: "ডায়াবেটিস বিশেষজ্ঞ", icon: "droplet", tone: "emerald", group: "medicine" },
  { slug: "nephrology", en: "Nephrology", enPerson: "Nephrologist", bn: "কিডনি রোগ", bnPerson: "কিডনি বিশেষজ্ঞ", icon: "droplets", tone: "indigo", group: "medicine" },
  { slug: "oncology", en: "Oncology", enPerson: "Oncologist", bn: "ক্যান্সার", bnPerson: "ক্যান্সার বিশেষজ্ঞ", icon: "ribbon", tone: "red", group: "medicine" },
  { slug: "orthopedics", en: "Orthopedics", enPerson: "Orthopedics Specialist", bn: "অর্থোপেডিক্স", bnPerson: "হাড় ও জোড়া বিশেষজ্ঞ", icon: "bone", tone: "amber", group: "medicine" },
  { slug: "psychology", en: "Psychiatry", enPerson: "Psychiatrist", bn: "মানসিক রোগ", bnPerson: "মানসিক রোগ বিশেষজ্ঞ", icon: "brain-circuit", tone: "purple", group: "medicine" },
  { slug: "rheumatology", en: "Rheumatology", enPerson: "Rheumatologist", bn: "বাতরোগ", bnPerson: "বাতরোগ বিশেষজ্ঞ", icon: "bone-fracture", tone: "amber", group: "medicine" },
  { slug: "dermatology", en: "Skin & Dermatology", enPerson: "Dermatologist", bn: "চর্ম ও যৌন", bnPerson: "চর্ম ও যৌন রোগ বিশেষজ্ঞ", icon: "sparkles", tone: "fuchsia", group: "medicine" },
  { slug: "physiotherapy", en: "Physiotherapy", enPerson: "Physiotherapist", bn: "ফিজিওথেরাপি", bnPerson: "ফিজিওথেরাপিস্ট", icon: "dumbbell", tone: "green", group: "medicine" },
  { slug: "physical-medicine", en: "Physical Medicine", enPerson: "Physical Medicine Specialist", bn: "ফিজিক্যাল মেডিসিন", bnPerson: "ফিজিক্যাল মেডিসিন বিশেষজ্ঞ", icon: "accessibility", tone: "green", group: "medicine" },
  { slug: "food-nutrition", en: "Food & Nutrition", enPerson: "Nutrition Specialist", bn: "খাদ্য ও পুষ্টি", bnPerson: "পুষ্টিবিদ", icon: "apple", tone: "lime", group: "medicine" },
  { slug: "general-physicians", en: "General Physician", enPerson: "General Physician", bn: "সাধারণ চিকিৎসক", bnPerson: "সাধারণ চিকিৎসক", icon: "stethoscope", tone: "teal", group: "medicine" },
  { slug: "general-surgeon", en: "General Surgery", enPerson: "General Surgeon", bn: "জেনারেল সার্জারি", bnPerson: "জেনারেল সার্জন", icon: "scissors", tone: "teal", group: "surgery" },
  { slug: "breast-surgeon", en: "Breast & Colorectal Surgery", enPerson: "Breast Surgeon", bn: "স্তন ও কোলোরেক্টাল সার্জারি", bnPerson: "স্তন সার্জন", icon: "ribbon", tone: "pink", group: "surgery" },
  { slug: "laparoscopy-surgeon", en: "Laparoscopic Surgery", enPerson: "Laparoscopy Surgeon", bn: "ল্যাপারোস্কোপিক সার্জারি", bnPerson: "ল্যাপারোস্কোপিক সার্জন", icon: "microscope", tone: "orange", group: "surgery" },
  { slug: "neuro-surgeon", en: "Neurosurgery", enPerson: "Neuro Surgeon", bn: "নিউরো সার্জারি", bnPerson: "নিউরো সার্জন", icon: "brain", tone: "violet", group: "surgery" },
  { slug: "orthopedic-surgeon", en: "Orthopedic Surgery", enPerson: "Orthopedic Surgeon", bn: "অর্থোপেডিক সার্জারি", bnPerson: "অর্থোপেডিক সার্জন", icon: "bone-fracture", tone: "amber", group: "surgery" },
  { slug: "dental", en: "Oral & Dental Surgery", enPerson: "Dental Surgeon", bn: "দন্ত চিকিৎসা", bnPerson: "দন্ত বিশেষজ্ঞ", icon: "smile", tone: "cyan", group: "surgery" },
  { slug: "cosmetic-surgeon", en: "Plastic & Cosmetic Surgery", enPerson: "Plastic Surgeon", bn: "প্লাস্টিক ও কসমেটিক সার্জারি", bnPerson: "প্লাস্টিক সার্জন", icon: "sparkles", tone: "fuchsia", group: "surgery" },
  { slug: "cardiac-surgeon", en: "Cardiac & Vascular Surgery", enPerson: "Cardiac Surgeon", bn: "হৃদযন্ত্র ও রক্তনালী সার্জারি", bnPerson: "কার্ডিয়াক সার্জন", icon: "scan-heart", tone: "rose", group: "surgery" },
  { slug: "child-surgeon", en: "Paediatric Surgery", enPerson: "Child Surgeon", bn: "শিশু সার্জারি", bnPerson: "শিশু সার্জন", icon: "bandage", tone: "yellow", group: "surgery" },
  { slug: "head-neck-surgeon", en: "Head & Neck Surgery", enPerson: "Head & Neck Surgeon", bn: "হেড-নেক সার্জারি", bnPerson: "হেড-নেক সার্জন", icon: "syringe", tone: "cyan", group: "surgery" },
  { slug: "phaco-surgeon", en: "Cataract / Phaco Surgery", enPerson: "Phaco Surgeon", bn: "ছানি / ফ্যাকো সার্জারি", bnPerson: "ফ্যাকো সার্জন", icon: "scan-eye", tone: "blue", group: "surgery" },
];

export const specialtyBySlug = new Map(specialties.map((s) => [s.slug, s]));
