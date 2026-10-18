import type { IconName, Tone } from "@/components/AppIcon";
import type { Lang } from "@/lib/site";

export type ServicePage = {
  icon: IconName;
  tone: Tone;
  title: string;
  lead: string;
  points: string[];
  steps: string[];
  note?: string;
  waTopic: string;
};

type Key = "ambulance" | "lab-tests" | "india-treatment";

export const servicePages: Record<Key, Record<Lang, ServicePage>> = {
  ambulance: {
    en: {
      icon: "ambulance",
      tone: "rose",
      title: "24/7 Ambulance Service",
      lead: "One call gets an ambulance moving — day or night, inside Khulna or to any district in Bangladesh.",
      points: [
        "AC and non-AC ambulances",
        "ICU / life-support ambulance with oxygen and a trained attendant",
        "Freezer ambulance for carrying a deceased family member home",
        "Hospital-to-hospital transfers, including to Dhaka",
        "Transparent fare quoted before the trip starts",
      ],
      steps: ["Call or WhatsApp the Booking Line", "Tell us the pickup address, destination and the patient's condition", "We confirm the vehicle, fare and arrival time", "The ambulance arrives — pay after the trip"],
      note: "In a life-threatening emergency, go to the nearest hospital emergency department immediately. Emergency numbers are listed at the bottom of every page.",
      waTopic: "Ambulance",
    },
    bn: {
      icon: "ambulance",
      tone: "rose",
      title: "২৪/৭ অ্যাম্বুলেন্স সেবা",
      lead: "একটি কলেই অ্যাম্বুলেন্স রওনা — দিন হোক বা রাত, খুলনা শহরে বা বাংলাদেশের যেকোনো জেলায়।",
      points: [
        "এসি ও নন-এসি অ্যাম্বুলেন্স",
        "অক্সিজেন ও প্রশিক্ষিত সহকারীসহ আইসিইউ / লাইফ সাপোর্ট অ্যাম্বুলেন্স",
        "মৃতদেহ বাড়ি পৌঁছাতে ফ্রিজার অ্যাম্বুলেন্স",
        "এক হাসপাতাল থেকে অন্য হাসপাতালে স্থানান্তর, ঢাকাসহ",
        "যাত্রার আগেই স্বচ্ছ ভাড়া জানিয়ে দেওয়া হয়",
      ],
      steps: ["বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করুন", "রোগীর ঠিকানা, গন্তব্য ও অবস্থা জানান", "আমরা গাড়ি, ভাড়া ও পৌঁছানোর সময় নিশ্চিত করব", "অ্যাম্বুলেন্স পৌঁছাবে — যাত্রা শেষে ভাড়া পরিশোধ করুন"],
      note: "জীবন-সংকটাপন্ন অবস্থায় দেরি না করে নিকটস্থ হাসপাতালের জরুরি বিভাগে যান। জরুরি নম্বরগুলো প্রতিটি পেজের নিচে দেওয়া আছে।",
      waTopic: "অ্যাম্বুলেন্স",
    },
  },
  "lab-tests": {
    en: {
      icon: "test-tubes",
      tone: "amber",
      title: "25% Off Lab Tests",
      lead: "Book your pathology and imaging tests through us and save 25% at our partner diagnostic centres in Khulna.",
      points: [
        "25% discount on pathology tests (blood, urine, hormone, culture and more)",
        "Discounts on X-ray, ultrasound, ECG and other imaging",
        "Help reading your prescription and choosing the right centre",
        "Reports can be shown to your doctor free of charge",
      ],
      steps: ["Send a photo of your prescription on WhatsApp, or call us", "We tell you the total cost after discount", "Visit the centre with your serial — no extra queue", "Collect your report and book a follow-up with your doctor"],
      waTopic: "Lab test discount",
    },
    bn: {
      icon: "test-tubes",
      tone: "amber",
      title: "ল্যাব টেস্টে ২৫% ছাড়",
      lead: "আমাদের মাধ্যমে প্যাথলজি ও ইমেজিং টেস্ট বুক করুন, খুলনার পার্টনার ডায়াগনস্টিক সেন্টারে সাশ্রয় করুন ২৫%।",
      points: [
        "প্যাথলজি টেস্টে ২৫% ছাড় (রক্ত, প্রস্রাব, হরমোন, কালচার ইত্যাদি)",
        "এক্স-রে, আল্ট্রাসনোগ্রাম, ইসিজিসহ অন্যান্য ইমেজিংয়ে ছাড়",
        "প্রেসক্রিপশন বুঝতে ও সঠিক সেন্টার বাছাইয়ে সাহায্য",
        "রিপোর্ট ডাক্তারকে দেখানো ফ্রি",
      ],
      steps: ["প্রেসক্রিপশনের ছবি হোয়াটসঅ্যাপে পাঠান অথবা কল করুন", "ছাড়ের পর মোট খরচ আমরা জানিয়ে দেব", "সিরিয়াল নিয়ে সেন্টারে যান — বাড়তি লাইন নেই", "রিপোর্ট নিয়ে ডাক্তারের ফলো-আপ সিরিয়াল নিন"],
      waTopic: "ল্যাব টেস্টে ছাড়",
    },
  },
  "india-treatment": {
    en: {
      icon: "plane",
      tone: "violet",
      title: "Treatment in India",
      lead: "Planning treatment in Kolkata, Chennai, Vellore or elsewhere in India? We help you prepare so the trip goes smoothly.",
      points: [
        "Choosing a hospital and specialist that fits the condition and budget",
        "Sending your reports in advance for a cost estimate",
        "Booking appointments before you travel",
        "Medical visa paperwork and invitation letter guidance",
        "Practical advice on travel, stay and currency",
      ],
      steps: ["Share your diagnosis and recent reports with us", "We suggest suitable hospitals and get an estimate", "We help with the visa file and appointment", "Travel with a clear plan — and call us if anything changes"],
      note: "We are a facilitation service. Final medical decisions are made by the treating doctors.",
      waTopic: "Treatment in India",
    },
    bn: {
      icon: "plane",
      tone: "violet",
      title: "ভারতে চিকিৎসা সহায়তা",
      lead: "কলকাতা, চেন্নাই, ভেলোর বা ভারতের অন্য কোথাও চিকিৎসার পরিকল্পনা করছেন? যাত্রা যেন ঝামেলাহীন হয়, সেজন্য প্রস্তুতিতে আমরা সাহায্য করি।",
      points: [
        "রোগ ও বাজেট অনুযায়ী হাসপাতাল ও বিশেষজ্ঞ বাছাই",
        "খরচের ধারণা পেতে আগেই রিপোর্ট পাঠানো",
        "যাওয়ার আগেই অ্যাপয়েন্টমেন্ট বুকিং",
        "মেডিকেল ভিসার কাগজপত্র ও ইনভাইটেশন লেটার বিষয়ে সহায়তা",
        "যাতায়াত, থাকা ও মুদ্রা বিষয়ে প্রয়োজনীয় পরামর্শ",
      ],
      steps: ["রোগ নির্ণয় ও সাম্প্রতিক রিপোর্ট আমাদের পাঠান", "আমরা উপযুক্ত হাসপাতাল ও খরচের ধারণা জানাব", "ভিসা ফাইল ও অ্যাপয়েন্টমেন্টে সাহায্য করব", "পরিষ্কার পরিকল্পনা নিয়ে রওনা দিন — কোনো পরিবর্তন হলে আমাদের জানান"],
      note: "আমরা একটি সহায়তা সেবা। চূড়ান্ত চিকিৎসা সিদ্ধান্ত চিকিৎসকরাই নেন।",
      waTopic: "ভারতে চিকিৎসা",
    },
  },
};

export const aboutPage: Record<Lang, { title: string; body: string[]; values: { title: string; body: string }[] }> = {
  en: {
    title: "About Top Doctors Khulna",
    body: [
      "Finding the right specialist in Khulna usually means asking around, calling several chambers and still not knowing which day the doctor sits. We built Top Doctors Khulna to fix that.",
      "Every doctor in our directory has a page with their qualifications, the problems they treat, their chambers, visiting hours and consultation fees. When you've found the right doctor, one call or WhatsApp message to our Booking Line is enough — we take your serial and confirm the time.",
      "Beyond appointments, the same number gets you discounted lab tests, hospital admission support, a 24/7 ambulance and help planning treatment in India.",
    ],
    values: [
      { title: "Free for patients", body: "Browsing the directory and booking a serial costs you nothing extra." },
      { title: "One number for everything", body: "Doctor, lab, hospital or ambulance — you only need to remember one Booking Line." },
      { title: "Honest information", body: "Schedules change. We show what was last published and always ask you to confirm before visiting." },
    ],
  },
  bn: {
    title: "টপ ডক্টরস খুলনা সম্পর্কে",
    body: [
      "খুলনায় সঠিক বিশেষজ্ঞ ডাক্তার খুঁজতে সাধারণত অনেককে জিজ্ঞেস করতে হয়, কয়েকটি চেম্বারে ফোন করতে হয় — তবুও জানা যায় না ডাক্তার কোন দিন বসেন। এই সমস্যার সমাধানেই টপ ডক্টরস খুলনা।",
      "আমাদের ডিরেক্টরির প্রত্যেক ডাক্তারের আলাদা পেজে আছে যোগ্যতা, যেসব রোগের চিকিৎসা করেন, চেম্বার, রোগী দেখার সময় ও ফি। সঠিক ডাক্তার পেয়ে গেলে আমাদের বুকিং লাইনে একটি কল বা হোয়াটসঅ্যাপ মেসেজই যথেষ্ট — আমরা সিরিয়াল নিয়ে সময় নিশ্চিত করে দিই।",
      "শুধু সিরিয়াল নয়, একই নম্বরে পাবেন ছাড়ে ল্যাব টেস্ট, হাসপাতালে ভর্তি সহায়তা, ২৪ ঘণ্টা অ্যাম্বুলেন্স এবং ভারতে চিকিৎসার পরিকল্পনায় সাহায্য।",
    ],
    values: [
      { title: "রোগীর জন্য ফ্রি", body: "ডিরেক্টরি দেখা ও সিরিয়াল নেওয়ায় আপনার কোনো বাড়তি খরচ নেই।" },
      { title: "সবকিছু এক নম্বরে", body: "ডাক্তার, ল্যাব, হাসপাতাল বা অ্যাম্বুলেন্স — মনে রাখতে হবে শুধু একটি বুকিং লাইন।" },
      { title: "সঠিক তথ্য", body: "সময়সূচি বদলায়। আমরা সর্বশেষ প্রকাশিত তথ্য দেখাই এবং যাওয়ার আগে ফোনে নিশ্চিত হতে বলি।" },
    ],
  },
};

export const contactPage: Record<Lang, { title: string; body: string; hours: string; hoursValue: string; area: string; areaValue: string }> = {
  en: {
    title: "Contact us",
    body: "Call or WhatsApp for appointments, lab tests, hospital admission, ambulance or treatment in India. We usually reply within minutes.",
    hours: "Booking hours",
    hoursValue: "Every day, 8:00 AM – 11:00 PM (ambulance 24/7)",
    area: "Service area",
    areaValue: "Khulna city and surrounding districts",
  },
  bn: {
    title: "যোগাযোগ",
    body: "সিরিয়াল, ল্যাব টেস্ট, হাসপাতালে ভর্তি, অ্যাম্বুলেন্স বা ভারতে চিকিৎসার জন্য কল বা হোয়াটসঅ্যাপ করুন। সাধারণত কয়েক মিনিটের মধ্যেই উত্তর দিই।",
    hours: "বুকিংয়ের সময়",
    hoursValue: "প্রতিদিন সকাল ৮টা – রাত ১১টা (অ্যাম্বুলেন্স ২৪ ঘণ্টা)",
    area: "সেবা এলাকা",
    areaValue: "খুলনা শহর ও আশপাশের জেলা",
  },
};
