import type { Post } from "@/content/blog";

const post: Post = {
  slug: "which-specialist-should-i-see",
  date: "2026-10-01",
  icon: "compass",
  tone: "teal",
  related: ["medicine", "cardiology", "gastrology", "neurology", "orthopedics", "dermatology"],
  en: {
    title: "Which specialist should I see? A symptom-by-symptom guide",
    excerpt: "Not sure whether you need a cardiologist, a medicine specialist or a gastroenterologist? Start here.",
    answer: "If you're not sure which specialist to see in Khulna, start with a medicine specialist — they can examine you and refer you on. For a clear problem, match the symptom: chest pain → cardiologist, acidity or ulcers → gastroenterologist, headache or stroke → neurologist, joint or back pain → orthopedic specialist.",
    cover: { src: "/blog/which-specialist-should-i-see.svg", alt: "A patient at a signpost choosing between heart, stomach, brain and bone specialists" },
    body: [
      { p: "Seeing the right specialist first saves time, money and repeat tests. If you're unsure, a medicine specialist is always a safe starting point — they can examine you and refer you on. For common problems, this guide points you in the right direction." },
      { h: "Heart and chest", ul: ["Chest pain on exertion, palpitations, breathlessness when walking → Cardiologist", "Long-standing cough, wheezing, asthma, TB follow-up → Chest specialist", "A child with a heart murmur or a hole in the heart → Paediatric cardiologist"] },
      { h: "Stomach, liver and kidneys", ul: ["Acidity, gas, ulcers, repeated loose motion or constipation → Gastroenterologist", "Jaundice, hepatitis B or C, fatty liver → Hepatologist (liver specialist)", "Swelling of the legs, high creatinine, kidney disease from diabetes → Nephrologist", "Kidney stones, burning urine, prostate problems → Urologist"] },
      { h: "Brain, nerves and mind", ul: ["Headache, migraine, stroke, fits, numbness → Neurologist", "Low mood, anxiety, sleeplessness, addiction → Psychiatrist", "Disc prolapse or tumour needing an operation → Neurosurgeon"] },
      { img: { src: "/blog/which-specialist-should-i-see-2.svg", alt: "A doctor pointing to a body chart that links symptoms to the right specialist" } },
      { h: "Bones, joints and muscles", ul: ["Fractures, back and knee pain, sports injury → Orthopedic specialist", "Joint pain with swelling and morning stiffness → Rheumatologist", "Rehabilitation after stroke or injury → Physical medicine specialist or physiotherapist"] },
      { h: "Hormones and diabetes", ul: ["High blood sugar, diabetes control → Diabetologist", "Thyroid problems, weight gain, hormone imbalance → Endocrinologist (hormone specialist)"] },
      { h: "Women and children", ul: ["Pregnancy care, irregular periods, infertility → Gynecologist", "Fever, cough or growth concerns in a child → Child specialist", "A child needing an operation → Paediatric surgeon"] },
      { h: "Still not sure?", p: "Call or WhatsApp our Booking Line and describe the problem. We'll suggest the right specialty and book a doctor who sits on a day that suits you." },
    ],
    faq: [
      { q: "Which doctor should I see first if I don't know what's wrong?", a: "A medicine specialist. They treat most common illnesses and refer you to the right specialist if needed." },
      { q: "Who treats kidney stones — a nephrologist or a urologist?", a: "A urologist. Nephrologists treat kidney disease such as rising creatinine; urologists treat stones, prostate and urinary problems." },
      { q: "Can Top Doctors Khulna tell me which specialist I need?", a: "Yes. Call or WhatsApp the Booking Line, describe the problem, and we'll suggest the specialty and book a doctor whose schedule suits you." },
    ],
  },
  bn: {
    title: "কোন বিশেষজ্ঞ ডাক্তার দেখাবেন? উপসর্গ অনুযায়ী গাইড",
    excerpt: "হৃদরোগ বিশেষজ্ঞ, মেডিসিন নাকি গ্যাস্ট্রো — কাকে দেখাবেন বুঝতে পারছেন না? এখান থেকে শুরু করুন।",
    answer: "কোন বিশেষজ্ঞ দেখাবেন বুঝতে না পারলে খুলনায় প্রথমে একজন মেডিসিন বিশেষজ্ঞ দেখান — তিনি পরীক্ষা করে সঠিক বিশেষজ্ঞের কাছে পাঠাবেন। সমস্যা পরিষ্কার হলে উপসর্গ মিলিয়ে নিন: বুকে ব্যথা → হৃদরোগ বিশেষজ্ঞ, গ্যাস্ট্রিক বা আলসার → গ্যাস্ট্রোএন্টারোলজিস্ট, মাথাব্যথা বা স্ট্রোক → নিউরোলজিস্ট, জয়েন্ট বা কোমর ব্যথা → অর্থোপেডিক বিশেষজ্ঞ।",
    cover: { src: "/blog/which-specialist-should-i-see.svg", alt: "সাইনপোস্টের সামনে রোগী — হৃদরোগ, পেট, মস্তিষ্ক ও হাড়ের মধ্যে কোন বিশেষজ্ঞ ডাক্তার দেখাবেন বেছে নিচ্ছেন" },
    body: [
      { p: "শুরুতেই সঠিক বিশেষজ্ঞ দেখালে সময়, টাকা ও বারবার টেস্টের ঝামেলা বাঁচে। নিশ্চিত না হলে মেডিসিন বিশেষজ্ঞ দিয়ে শুরু করা সবসময় নিরাপদ — তিনি পরীক্ষা করে প্রয়োজনে অন্য বিশেষজ্ঞের কাছে পাঠাবেন। সাধারণ সমস্যাগুলোর জন্য এই গাইড আপনাকে সঠিক দিক দেখাবে।" },
      { h: "হৃদযন্ত্র ও বুক", ul: ["পরিশ্রমে বুকে ব্যথা, বুক ধড়ফড়, হাঁটলে শ্বাসকষ্ট → হৃদরোগ বিশেষজ্ঞ", "দীর্ঘদিনের কাশি, শ্বাসে শোঁ শোঁ শব্দ, হাঁপানি, যক্ষ্মার ফলো-আপ → বক্ষব্যাধি বিশেষজ্ঞ", "শিশুর হৃদপিণ্ডে ছিদ্র বা মারমার → শিশু হৃদরোগ বিশেষজ্ঞ"] },
      { h: "পেট, লিভার ও কিডনি", ul: ["এসিডিটি, গ্যাস, আলসার, বারবার পাতলা পায়খানা বা কোষ্ঠকাঠিন্য → গ্যাস্ট্রোএন্টারোলজিস্ট", "জন্ডিস, হেপাটাইটিস বি বা সি, ফ্যাটি লিভার → লিভার বিশেষজ্ঞ", "পা ফোলা, ক্রিয়েটিনিন বেশি, ডায়াবেটিসজনিত কিডনি রোগ → কিডনি বিশেষজ্ঞ (নেফ্রোলজিস্ট)", "কিডনিতে পাথর, প্রস্রাবে জ্বালাপোড়া, প্রোস্টেটের সমস্যা → ইউরোলজিস্ট"] },
      { h: "মস্তিষ্ক, স্নায়ু ও মন", ul: ["মাথাব্যথা, মাইগ্রেন, স্ট্রোক, খিঁচুনি, অবশ ভাব → নিউরোলজিস্ট", "মন খারাপ, দুশ্চিন্তা, ঘুম না হওয়া, মাদকাসক্তি → মানসিক রোগ বিশেষজ্ঞ", "ডিস্ক প্রল্যাপ্স বা টিউমারের অপারেশন → নিউরো সার্জন"] },
      { img: { src: "/blog/which-specialist-should-i-see-2.svg", alt: "ডাক্তার শরীরের চার্টে উপসর্গ অনুযায়ী কোন অঙ্গের বিশেষজ্ঞ দেখাতে হবে তা দেখাচ্ছেন" } },
      { h: "হাড়, জোড়া ও মাংসপেশি", ul: ["হাড় ভাঙা, কোমর ও হাঁটু ব্যথা, খেলাধুলার আঘাত → অর্থোপেডিক বিশেষজ্ঞ", "জোড়া ফোলা ও সকালে শক্ত হয়ে থাকা → বাতরোগ বিশেষজ্ঞ (রিউমাটোলজিস্ট)", "স্ট্রোক বা আঘাতের পর পুনর্বাসন → ফিজিক্যাল মেডিসিন বিশেষজ্ঞ বা ফিজিওথেরাপিস্ট"] },
      { h: "হরমোন ও ডায়াবেটিস", ul: ["রক্তে সুগার বেশি, ডায়াবেটিস নিয়ন্ত্রণ → ডায়াবেটিস বিশেষজ্ঞ", "থাইরয়েড, ওজন বেড়ে যাওয়া, হরমোনের ভারসাম্যহীনতা → হরমোন বিশেষজ্ঞ"] },
      { h: "নারী ও শিশু", ul: ["গর্ভকালীন সেবা, অনিয়মিত মাসিক, বন্ধ্যাত্ব → গাইনি বিশেষজ্ঞ", "শিশুর জ্বর, কাশি বা বৃদ্ধি নিয়ে চিন্তা → শিশু বিশেষজ্ঞ", "শিশুর অপারেশন প্রয়োজন → শিশু সার্জন"] },
      { h: "এখনও নিশ্চিত নন?", p: "আমাদের বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করে সমস্যাটি বলুন। আমরা সঠিক বিভাগ জানিয়ে আপনার সুবিধামতো দিনে বসেন এমন ডাক্তারের সিরিয়াল নিয়ে দেব।" },
    ],
    faq: [
      { q: "কী সমস্যা বুঝতে না পারলে প্রথমে কোন ডাক্তার দেখাব?", a: "মেডিসিন বিশেষজ্ঞ। তিনি বেশিরভাগ সাধারণ রোগের চিকিৎসা করেন এবং প্রয়োজনে সঠিক বিশেষজ্ঞের কাছে রেফার করেন।" },
      { q: "কিডনিতে পাথর হলে নেফ্রোলজিস্ট নাকি ইউরোলজিস্ট দেখাব?", a: "ইউরোলজিস্ট। নেফ্রোলজিস্ট কিডনির রোগ (যেমন ক্রিয়েটিনিন বাড়া) দেখেন; পাথর, প্রোস্টেট ও প্রস্রাবের সমস্যা দেখেন ইউরোলজিস্ট।" },
      { q: "টপ ডক্টরস খুলনা কি বলে দিতে পারে কোন বিশেষজ্ঞ দরকার?", a: "হ্যাঁ। বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করে সমস্যাটি বলুন — আমরা বিভাগ বলে দেব এবং আপনার সুবিধার দিনে বসেন এমন ডাক্তারের সিরিয়াল নিয়ে দেব।" },
    ],
  },
};

export default post;
