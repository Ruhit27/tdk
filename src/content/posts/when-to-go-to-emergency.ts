import type { Post } from "@/content/blog";

const post: Post = {
  slug: "when-to-go-to-emergency",
  date: "2026-08-28",
  icon: "siren",
  tone: "red",
  related: ["cardiology", "neurology", "medicine"],
  en: {
    title: "Chamber or emergency? Signs you shouldn't wait for a serial",
    excerpt: "Some symptoms can't wait for the doctor's next chamber day. Know when to go straight to hospital.",
    answer: "Don't wait for a chamber serial if there is chest pain lasting more than a few minutes, signs of stroke (face drooping, one-sided weakness, slurred speech), severe breathlessness, a long seizure, heavy bleeding, or a limp, drowsy child. Go to the nearest hospital emergency department or call an ambulance.",
    cover: { src: "/blog/when-to-go-to-emergency.svg", alt: "An ambulance arriving at a hospital emergency department in Khulna" },
    body: [
      { p: "Booking a specialist's serial is right for most problems. But some symptoms need emergency care within minutes or hours. If you notice any of these, go to the nearest hospital emergency department or call an ambulance." },
      { h: "Possible heart attack", ul: ["Chest pain or pressure lasting more than a few minutes", "Pain spreading to the arm, jaw, neck or back", "Sweating, breathlessness, nausea or fainting with chest discomfort"] },
      { img: { src: "/blog/when-to-go-to-emergency-2.svg", alt: "The four stroke warning signs: a drooping face, a weak arm, slurred speech and no time to lose" } },
      { h: "Possible stroke — think FAST", ul: ["Face drooping on one side", "Arm or leg weakness on one side", "Speech slurred or confused", "Time to go to hospital — every minute matters"] },
      { h: "Other emergencies", ul: ["Severe difficulty breathing, or lips turning blue", "Seizure lasting more than 5 minutes, or not waking after a seizure", "Heavy bleeding that won't stop", "Severe injury, burns, or a suspected broken bone with deformity", "Sudden severe headache — the worst of your life", "Heavy bleeding, severe pain or fits during pregnancy", "A baby or child who is limp, very drowsy or not feeding"] },
      { h: "Save these numbers", p: "Emergency numbers for Khulna Medical College Hospital, General Hospital and Abu Naser Specialised Hospital are at the bottom of every page. For an ambulance any time, call our Booking Line." },
    ],
    faq: [
      { q: "Which hospitals in Khulna have a 24-hour emergency department?", a: "Khulna Medical College Hospital, General Hospital Khulna and Abu Naser Specialised Hospital, among others. Their emergency numbers are at the bottom of every page." },
      { q: "How do I get an ambulance in Khulna at night?", a: "Call or WhatsApp our Booking Line any time — we arrange AC, non-AC and ICU ambulances 24/7." },
      { q: "What does FAST mean for stroke?", a: "Face drooping, Arm weakness, Speech difficulty — Time to go to hospital. Every minute counts." },
    ],
  },
  bn: {
    title: "চেম্বার নাকি জরুরি বিভাগ? যে লক্ষণে সিরিয়ালের অপেক্ষা নয়",
    excerpt: "কিছু উপসর্গ ডাক্তারের পরের চেম্বার দিনের জন্য অপেক্ষা করতে পারে না। কখন সরাসরি হাসপাতালে যাবেন, জেনে নিন।",
    answer: "কয়েক মিনিটের বেশি বুকে ব্যথা, স্ট্রোকের লক্ষণ (মুখ বেঁকে যাওয়া, এক পাশ দুর্বল, কথা জড়ানো), তীব্র শ্বাসকষ্ট, দীর্ঘ খিঁচুনি, রক্তপাত না থামা, বা শিশু নিস্তেজ হয়ে গেলে চেম্বারের সিরিয়ালের অপেক্ষা করবেন না। নিকটস্থ হাসপাতালের জরুরি বিভাগে যান বা অ্যাম্বুলেন্স ডাকুন।",
    cover: { src: "/blog/when-to-go-to-emergency.svg", alt: "খুলনার হাসপাতালের জরুরি বিভাগের সামনে পৌঁছানো অ্যাম্বুলেন্স" },
    body: [
      { p: "বেশিরভাগ সমস্যায় বিশেষজ্ঞের সিরিয়াল নেওয়াই ঠিক। কিন্তু কিছু উপসর্গে কয়েক মিনিট বা ঘণ্টার মধ্যে জরুরি চিকিৎসা দরকার। নিচের কোনোটি দেখলে নিকটস্থ হাসপাতালের জরুরি বিভাগে যান বা অ্যাম্বুলেন্স ডাকুন।" },
      { h: "হার্ট অ্যাটাকের সম্ভাবনা", ul: ["কয়েক মিনিটের বেশি সময় ধরে বুকে ব্যথা বা চাপ", "ব্যথা হাত, চোয়াল, ঘাড় বা পিঠে ছড়িয়ে পড়া", "বুকে অস্বস্তির সাথে ঘাম, শ্বাসকষ্ট, বমিভাব বা অজ্ঞান হওয়া"] },
      { img: { src: "/blog/when-to-go-to-emergency-2.svg", alt: "স্ট্রোকের চারটি বিপদচিহ্ন: মুখ বেঁকে যাওয়া, হাত দুর্বল, কথা জড়িয়ে যাওয়া ও সময় নষ্ট না করা" } },
      { h: "স্ট্রোকের সম্ভাবনা — মনে রাখুন", ul: ["মুখের এক পাশ বেঁকে যাওয়া", "এক পাশের হাত বা পা দুর্বল হয়ে যাওয়া", "কথা জড়িয়ে যাওয়া বা এলোমেলো হওয়া", "দেরি না করে হাসপাতালে — প্রতিটি মিনিট গুরুত্বপূর্ণ"] },
      { h: "অন্যান্য জরুরি অবস্থা", ul: ["তীব্র শ্বাসকষ্ট, বা ঠোঁট নীল হয়ে যাওয়া", "৫ মিনিটের বেশি খিঁচুনি, বা খিঁচুনির পর জ্ঞান না ফেরা", "রক্তপাত যা থামছে না", "গুরুতর আঘাত, পোড়া, বা হাড় ভেঙে বেঁকে যাওয়া", "হঠাৎ জীবনের সবচেয়ে তীব্র মাথাব্যথা", "গর্ভাবস্থায় অতিরিক্ত রক্তপাত, তীব্র ব্যথা বা খিঁচুনি", "শিশু নিস্তেজ, অতিরিক্ত ঘুমঘুম বা খেতে না পারা"] },
      { h: "নম্বরগুলো সংরক্ষণ করুন", p: "খুলনা মেডিকেল কলেজ হাসপাতাল, জেনারেল হাসপাতাল ও আবু নাসের বিশেষায়িত হাসপাতালের জরুরি নম্বর প্রতিটি পেজের নিচে আছে। যেকোনো সময় অ্যাম্বুলেন্সের জন্য আমাদের বুকিং লাইনে কল করুন।" },
    ],
    faq: [
      { q: "খুলনায় কোন হাসপাতালে ২৪ ঘণ্টা জরুরি বিভাগ আছে?", a: "খুলনা মেডিকেল কলেজ হাসপাতাল, জেনারেল হাসপাতাল খুলনা ও আবু নাসের বিশেষায়িত হাসপাতালসহ কয়েকটি হাসপাতালে। জরুরি নম্বরগুলো প্রতিটি পেজের নিচে আছে।" },
      { q: "রাতে খুলনায় অ্যাম্বুলেন্স পাব কীভাবে?", a: "যেকোনো সময় আমাদের বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করুন — ২৪ ঘণ্টা এসি, নন-এসি ও আইসিইউ অ্যাম্বুলেন্সের ব্যবস্থা করি।" },
      { q: "স্ট্রোক বুঝতে কোন লক্ষণগুলো মনে রাখব?", a: "মুখ এক পাশে বেঁকে যাওয়া, এক হাত বা পা দুর্বল হওয়া, কথা জড়িয়ে যাওয়া — যেকোনোটি দেখলে দেরি না করে হাসপাতালে যান।" },
    ],
  },
};

export default post;
