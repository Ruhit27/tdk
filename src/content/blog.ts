import type { IconName, Tone } from "@/components/AppIcon";
export type Block = { h?: string; p?: string; ul?: string[] };
export type Post = {
  slug: string;
  date: string;
  minutes: number;
  icon: IconName;
  tone: Tone;
  related: string[]; // specialty slugs
  en: { title: string; excerpt: string; body: Block[] };
  bn: { title: string; excerpt: string; body: Block[] };
};

export const posts: Post[] = [
  {
    slug: "which-specialist-should-i-see",
    date: "2026-10-01",
    minutes: 5,
    icon: "compass",
    tone: "teal",
    related: ["medicine", "cardiology", "gastrology", "neurology", "orthopedics", "dermatology"],
    en: {
      title: "Which specialist should I see? A symptom-by-symptom guide",
      excerpt: "Not sure whether you need a cardiologist, a medicine specialist or a gastroenterologist? Start here.",
      body: [
        { p: "Seeing the right specialist first saves time, money and repeat tests. If you're unsure, a medicine specialist is always a safe starting point — they can examine you and refer you on. For common problems, this guide points you in the right direction." },
        { h: "Heart and chest", ul: ["Chest pain on exertion, palpitations, breathlessness when walking → Cardiologist", "Long-standing cough, wheezing, asthma, TB follow-up → Chest specialist", "A child with a heart murmur or a hole in the heart → Paediatric cardiologist"] },
        { h: "Stomach, liver and kidneys", ul: ["Acidity, gas, ulcers, repeated loose motion or constipation → Gastroenterologist", "Jaundice, hepatitis B or C, fatty liver → Hepatologist (liver specialist)", "Swelling of the legs, high creatinine, kidney disease from diabetes → Nephrologist", "Kidney stones, burning urine, prostate problems → Urologist"] },
        { h: "Brain, nerves and mind", ul: ["Headache, migraine, stroke, fits, numbness → Neurologist", "Low mood, anxiety, sleeplessness, addiction → Psychiatrist", "Disc prolapse or tumour needing an operation → Neurosurgeon"] },
        { h: "Bones, joints and muscles", ul: ["Fractures, back and knee pain, sports injury → Orthopedic specialist", "Joint pain with swelling and morning stiffness → Rheumatologist", "Rehabilitation after stroke or injury → Physical medicine specialist or physiotherapist"] },
        { h: "Hormones and diabetes", ul: ["High blood sugar, diabetes control → Diabetologist", "Thyroid problems, weight gain, hormone imbalance → Endocrinologist (hormone specialist)"] },
        { h: "Women and children", ul: ["Pregnancy care, irregular periods, infertility → Gynecologist", "Fever, cough or growth concerns in a child → Child specialist", "A child needing an operation → Paediatric surgeon"] },
        { h: "Still not sure?", p: "Call or WhatsApp our Booking Line and describe the problem. We'll suggest the right specialty and book a doctor who sits on a day that suits you." },
      ],
    },
    bn: {
      title: "কোন বিশেষজ্ঞ ডাক্তার দেখাবেন? উপসর্গ অনুযায়ী গাইড",
      excerpt: "হৃদরোগ বিশেষজ্ঞ, মেডিসিন নাকি গ্যাস্ট্রো — কাকে দেখাবেন বুঝতে পারছেন না? এখান থেকে শুরু করুন।",
      body: [
        { p: "শুরুতেই সঠিক বিশেষজ্ঞ দেখালে সময়, টাকা ও বারবার টেস্টের ঝামেলা বাঁচে। নিশ্চিত না হলে মেডিসিন বিশেষজ্ঞ দিয়ে শুরু করা সবসময় নিরাপদ — তিনি পরীক্ষা করে প্রয়োজনে অন্য বিশেষজ্ঞের কাছে পাঠাবেন। সাধারণ সমস্যাগুলোর জন্য এই গাইড আপনাকে সঠিক দিক দেখাবে।" },
        { h: "হৃদযন্ত্র ও বুক", ul: ["পরিশ্রমে বুকে ব্যথা, বুক ধড়ফড়, হাঁটলে শ্বাসকষ্ট → হৃদরোগ বিশেষজ্ঞ", "দীর্ঘদিনের কাশি, শ্বাসে শোঁ শোঁ শব্দ, হাঁপানি, যক্ষ্মার ফলো-আপ → বক্ষব্যাধি বিশেষজ্ঞ", "শিশুর হৃদপিণ্ডে ছিদ্র বা মারমার → শিশু হৃদরোগ বিশেষজ্ঞ"] },
        { h: "পেট, লিভার ও কিডনি", ul: ["এসিডিটি, গ্যাস, আলসার, বারবার পাতলা পায়খানা বা কোষ্ঠকাঠিন্য → গ্যাস্ট্রোএন্টারোলজিস্ট", "জন্ডিস, হেপাটাইটিস বি বা সি, ফ্যাটি লিভার → লিভার বিশেষজ্ঞ", "পা ফোলা, ক্রিয়েটিনিন বেশি, ডায়াবেটিসজনিত কিডনি রোগ → কিডনি বিশেষজ্ঞ (নেফ্রোলজিস্ট)", "কিডনিতে পাথর, প্রস্রাবে জ্বালাপোড়া, প্রোস্টেটের সমস্যা → ইউরোলজিস্ট"] },
        { h: "মস্তিষ্ক, স্নায়ু ও মন", ul: ["মাথাব্যথা, মাইগ্রেন, স্ট্রোক, খিঁচুনি, অবশ ভাব → নিউরোলজিস্ট", "মন খারাপ, দুশ্চিন্তা, ঘুম না হওয়া, মাদকাসক্তি → মানসিক রোগ বিশেষজ্ঞ", "ডিস্ক প্রল্যাপ্স বা টিউমারের অপারেশন → নিউরো সার্জন"] },
        { h: "হাড়, জোড়া ও মাংসপেশি", ul: ["হাড় ভাঙা, কোমর ও হাঁটু ব্যথা, খেলাধুলার আঘাত → অর্থোপেডিক বিশেষজ্ঞ", "জোড়া ফোলা ও সকালে শক্ত হয়ে থাকা → বাতরোগ বিশেষজ্ঞ (রিউমাটোলজিস্ট)", "স্ট্রোক বা আঘাতের পর পুনর্বাসন → ফিজিক্যাল মেডিসিন বিশেষজ্ঞ বা ফিজিওথেরাপিস্ট"] },
        { h: "হরমোন ও ডায়াবেটিস", ul: ["রক্তে সুগার বেশি, ডায়াবেটিস নিয়ন্ত্রণ → ডায়াবেটিস বিশেষজ্ঞ", "থাইরয়েড, ওজন বেড়ে যাওয়া, হরমোনের ভারসাম্যহীনতা → হরমোন বিশেষজ্ঞ"] },
        { h: "নারী ও শিশু", ul: ["গর্ভকালীন সেবা, অনিয়মিত মাসিক, বন্ধ্যাত্ব → গাইনি বিশেষজ্ঞ", "শিশুর জ্বর, কাশি বা বৃদ্ধি নিয়ে চিন্তা → শিশু বিশেষজ্ঞ", "শিশুর অপারেশন প্রয়োজন → শিশু সার্জন"] },
        { h: "এখনও নিশ্চিত নন?", p: "আমাদের বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করে সমস্যাটি বলুন। আমরা সঠিক বিভাগ জানিয়ে আপনার সুবিধামতো দিনে বসেন এমন ডাক্তারের সিরিয়াল নিয়ে দেব।" },
      ],
    },
  },
  {
    slug: "preparing-for-your-first-appointment",
    date: "2026-09-24",
    minutes: 4,
    icon: "clipboard",
    tone: "sky",
    related: ["medicine"],
    en: {
      title: "What to bring to your first doctor's appointment",
      excerpt: "A five-minute checklist that helps the doctor help you — and saves you a second visit.",
      body: [
        { p: "Chamber visits in Khulna are often short and busy. Coming prepared means the doctor can focus on your problem instead of piecing together your history." },
        { h: "Bring these with you", ul: ["All previous prescriptions, in date order", "Recent test reports, X-rays and scan films or CDs", "The medicines you take now — or clear photos of the packets", "Your serial number and the chamber's phone number", "A family member if you're elderly, unwell or nervous"] },
        { h: "Write down before you go", ul: ["When the problem started and how it has changed", "What makes it better or worse", "Any allergies to medicines", "Long-term conditions: diabetes, blood pressure, asthma, kidney disease", "If you might be pregnant"] },
        { h: "During the visit", ul: ["Start with your main concern in one or two sentences", "Ask what the diagnosis is and what each test is for", "Ask how and when to take each medicine, and for how long", "Ask when you should come back — and what warning signs mean you should come sooner"] },
        { h: "After the visit", p: "Many doctors don't charge for showing reports within a set period. If tests are ordered, book them through us for a 25% discount, then call us to book the report-showing serial." },
      ],
    },
    bn: {
      title: "প্রথমবার ডাক্তার দেখাতে কী কী নিয়ে যাবেন",
      excerpt: "পাঁচ মিনিটের একটি চেকলিস্ট — ডাক্তারকে সঠিকভাবে বুঝতে সাহায্য করে, আর দ্বিতীয়বার যাওয়ার ঝামেলা কমায়।",
      body: [
        { p: "খুলনার চেম্বারগুলোতে সাধারণত ভিড় থাকে, সময়ও কম। প্রস্তুতি নিয়ে গেলে ডাক্তার আপনার আগের ইতিহাস খোঁজার বদলে মূল সমস্যায় মনোযোগ দিতে পারেন।" },
        { h: "সাথে নিয়ে যান", ul: ["আগের সব প্রেসক্রিপশন, তারিখ অনুযায়ী সাজিয়ে", "সাম্প্রতিক টেস্ট রিপোর্ট, এক্স-রে ও স্ক্যানের ফিল্ম বা সিডি", "বর্তমানে যেসব ওষুধ খাচ্ছেন — অথবা প্যাকেটের পরিষ্কার ছবি", "সিরিয়াল নম্বর ও চেম্বারের ফোন নম্বর", "বয়স্ক, অসুস্থ বা নার্ভাস হলে পরিবারের একজন সদস্য"] },
        { h: "যাওয়ার আগে লিখে রাখুন", ul: ["সমস্যা কবে শুরু হয়েছে এবং কীভাবে বদলেছে", "কিসে কমে বা বাড়ে", "কোনো ওষুধে অ্যালার্জি আছে কি না", "দীর্ঘমেয়াদি রোগ: ডায়াবেটিস, উচ্চ রক্তচাপ, হাঁপানি, কিডনি রোগ", "গর্ভবতী হওয়ার সম্ভাবনা আছে কি না"] },
        { h: "ডাক্তার দেখানোর সময়", ul: ["এক-দুই বাক্যে মূল সমস্যাটি দিয়ে শুরু করুন", "রোগটি কী এবং প্রতিটি টেস্ট কেন — জিজ্ঞেস করুন", "প্রতিটি ওষুধ কীভাবে, কখন ও কতদিন খাবেন জেনে নিন", "কবে আবার আসবেন — এবং কোন লক্ষণ দেখলে আগেই আসবেন, জেনে নিন"] },
        { h: "ডাক্তার দেখানোর পর", p: "অনেক ডাক্তার নির্দিষ্ট সময়ের মধ্যে রিপোর্ট দেখাতে ফি নেন না। টেস্ট দিলে আমাদের মাধ্যমে বুক করে ২৫% ছাড় নিন, তারপর রিপোর্ট দেখানোর সিরিয়ালের জন্য আমাদের কল করুন।" },
      ],
    },
  },
  {
    slug: "dengue-warning-signs",
    date: "2026-09-15",
    minutes: 5,
    icon: "thermometer",
    tone: "orange",
    related: ["medicine", "child"],
    en: {
      title: "Dengue: warning signs you should never ignore",
      excerpt: "Most dengue gets better at home — but a few signs mean you must go to hospital the same day.",
      body: [
        { p: "Dengue cases rise in Khulna every monsoon and autumn. Most people recover with rest and fluids, but the dangerous phase often begins just as the fever comes down — usually between day 3 and day 7. Knowing the warning signs saves lives." },
        { h: "Common symptoms", ul: ["Sudden high fever", "Severe headache and pain behind the eyes", "Body, joint and muscle aches", "Nausea, loss of appetite", "Skin rash"] },
        { h: "Go to hospital immediately if you notice", ul: ["Severe or continuous stomach pain", "Repeated vomiting, or unable to keep fluids down", "Bleeding from gums or nose, blood in vomit, black stool", "Very little urine for 6 hours or more", "Cold, clammy hands and feet, extreme weakness or restlessness", "Difficulty breathing", "In children: unusual sleepiness or irritability"] },
        { h: "Caring for dengue at home", ul: ["Drink plenty of fluids — water, ORS, soup, coconut water, fruit juice", "Take paracetamol for fever, as advised by a doctor", "Do NOT take aspirin, ibuprofen or other painkillers — they increase bleeding risk", "Get a CBC (platelet count) as your doctor advises, and follow up"] },
        { h: "Prevention", ul: ["Empty standing water around your home every 3 days — flower tubs, tyres, AC trays", "Use a mosquito net, including during the day", "Wear long sleeves and use repellent, especially early morning and evening"] },
        { p: "This article is for awareness, not diagnosis. If you suspect dengue, see a doctor. We can book a medicine or child specialist and arrange a discounted CBC." },
      ],
    },
    bn: {
      title: "ডেঙ্গু: যে লক্ষণগুলো কখনো অবহেলা করবেন না",
      excerpt: "বেশিরভাগ ডেঙ্গু বাসায় ভালো হয়ে যায় — কিন্তু কিছু লক্ষণ দেখলে সেদিনই হাসপাতালে যেতে হবে।",
      body: [
        { p: "প্রতি বর্ষা ও শরতে খুলনায় ডেঙ্গু বাড়ে। বেশিরভাগ রোগী বিশ্রাম ও তরল খাবারে সেরে ওঠেন, কিন্তু বিপজ্জনক পর্যায় শুরু হয় প্রায়ই জ্বর কমার সময় — সাধারণত তৃতীয় থেকে সপ্তম দিনে। সতর্ক সংকেতগুলো জানা থাকলে জীবন বাঁচে।" },
        { h: "সাধারণ লক্ষণ", ul: ["হঠাৎ তীব্র জ্বর", "প্রচণ্ড মাথাব্যথা ও চোখের পেছনে ব্যথা", "শরীর, জোড়া ও মাংসপেশিতে ব্যথা", "বমিভাব, ক্ষুধামন্দা", "ত্বকে র‍্যাশ"] },
        { h: "এগুলো দেখলে দেরি না করে হাসপাতালে যান", ul: ["পেটে তীব্র বা একটানা ব্যথা", "বারবার বমি, বা পানি খেলেও বমি হয়ে যাওয়া", "দাঁতের মাড়ি বা নাক দিয়ে রক্ত, বমিতে রক্ত, কালো পায়খানা", "৬ ঘণ্টা বা তার বেশি সময় খুব কম প্রস্রাব", "হাত-পা ঠান্ডা ও ঘামে ভেজা, অতিরিক্ত দুর্বলতা বা অস্থিরতা", "শ্বাসকষ্ট", "শিশুদের ক্ষেত্রে: অস্বাভাবিক ঘুমঘুম ভাব বা খিটখিটে মেজাজ"] },
        { h: "বাসায় ডেঙ্গুর যত্ন", ul: ["প্রচুর তরল পান করুন — পানি, ওরস্যালাইন, স্যুপ, ডাবের পানি, ফলের রস", "ডাক্তারের পরামর্শমতো জ্বরের জন্য প্যারাসিটামল খান", "অ্যাসপিরিন, আইবুপ্রোফেন বা অন্য ব্যথানাশক খাবেন না — রক্তক্ষরণের ঝুঁকি বাড়ায়", "ডাক্তারের পরামর্শমতো সিবিসি (প্লাটিলেট) পরীক্ষা করুন ও ফলো-আপে থাকুন"] },
        { h: "প্রতিরোধ", ul: ["প্রতি ৩ দিনে বাড়ির আশপাশের জমা পানি ফেলে দিন — ফুলের টব, টায়ার, এসির ট্রে", "দিনেও মশারি ব্যবহার করুন", "লম্বা হাতার জামা পরুন ও মশা তাড়ানোর ক্রিম ব্যবহার করুন, বিশেষ করে ভোরে ও সন্ধ্যায়"] },
        { p: "এই লেখা সচেতনতার জন্য, রোগ নির্ণয়ের জন্য নয়। ডেঙ্গু সন্দেহ হলে ডাক্তার দেখান। আমরা মেডিসিন বা শিশু বিশেষজ্ঞের সিরিয়াল ও ছাড়ে সিবিসি টেস্টের ব্যবস্থা করে দিতে পারি।" },
      ],
    },
  },
  {
    slug: "living-with-high-blood-pressure",
    date: "2026-09-05",
    minutes: 5,
    icon: "heart-pulse",
    tone: "rose",
    related: ["cardiology", "medicine", "nephrology"],
    en: {
      title: "Living with high blood pressure: simple habits that work",
      excerpt: "High blood pressure rarely causes symptoms — until it causes a stroke or heart attack. Here's how to keep it in check.",
      body: [
        { p: "High blood pressure (hypertension) is one of the most common long-term conditions in Bangladesh, and many people don't know they have it. Left untreated it damages the heart, brain, kidneys and eyes. The good news: daily habits and regular follow-up make a big difference." },
        { h: "Know your numbers", ul: ["Below 120/80 is ideal", "130/80 or higher on repeated readings needs a doctor's review", "180/120 or higher, especially with chest pain, severe headache, weakness or blurred vision, is an emergency"] },
        { h: "Habits that lower blood pressure", ul: ["Cut down on salt — skip extra salt at the table, limit chanachur, chips, pickles and processed food", "Walk briskly for 30 minutes on most days", "Eat more vegetables, fruit, lentils and fish", "Keep a healthy weight — even 3–5 kg weight loss helps", "Stop smoking and avoid jorda / betel leaf with tobacco", "Sleep 7–8 hours and manage stress"] },
        { h: "About medicines", ul: ["Take them every day at the same time, even when you feel well", "Don't stop or change the dose without asking your doctor", "Check your blood pressure at home and bring the record to each visit"] },
        { h: "Get checked regularly", p: "If you have high blood pressure, ask your doctor about yearly checks of kidney function, blood sugar, cholesterol and an ECG. We can book a cardiologist or medicine specialist and arrange discounted tests." },
      ],
    },
    bn: {
      title: "উচ্চ রক্তচাপ নিয়ে ভালো থাকার সহজ অভ্যাস",
      excerpt: "উচ্চ রক্তচাপে সাধারণত কোনো লক্ষণ থাকে না — যতক্ষণ না স্ট্রোক বা হার্ট অ্যাটাক হয়। কীভাবে নিয়ন্ত্রণে রাখবেন জেনে নিন।",
      body: [
        { p: "উচ্চ রক্তচাপ বাংলাদেশে সবচেয়ে প্রচলিত দীর্ঘমেয়াদি রোগগুলোর একটি, অথচ অনেকেই জানেন না তাদের এটি আছে। চিকিৎসা না করালে এটি হৃদযন্ত্র, মস্তিষ্ক, কিডনি ও চোখের ক্ষতি করে। সুখবর হলো — প্রতিদিনের অভ্যাস ও নিয়মিত ফলো-আপে বড় পরিবর্তন আসে।" },
        { h: "আপনার রিডিং জানুন", ul: ["১২০/৮০ এর নিচে আদর্শ", "বারবার মাপে ১৩০/৮০ বা বেশি হলে ডাক্তার দেখান", "১৮০/১২০ বা বেশি — বিশেষ করে বুকে ব্যথা, তীব্র মাথাব্যথা, দুর্বলতা বা ঝাপসা দেখলে — এটি জরুরি অবস্থা"] },
        { h: "রক্তচাপ কমানোর অভ্যাস", ul: ["লবণ কমান — খাবারে আলাদা লবণ নয়, চানাচুর, চিপস, আচার ও প্রক্রিয়াজাত খাবার কম খান", "সপ্তাহের বেশিরভাগ দিন ৩০ মিনিট দ্রুত হাঁটুন", "বেশি করে শাকসবজি, ফল, ডাল ও মাছ খান", "স্বাস্থ্যকর ওজন রাখুন — ৩-৫ কেজি কমালেও উপকার", "ধূমপান ছাড়ুন, জর্দা-তামাকসহ পান এড়িয়ে চলুন", "৭-৮ ঘণ্টা ঘুমান ও দুশ্চিন্তা কমান"] },
        { h: "ওষুধ বিষয়ে", ul: ["ভালো লাগলেও প্রতিদিন একই সময়ে ওষুধ খান", "ডাক্তারের পরামর্শ ছাড়া ওষুধ বন্ধ বা ডোজ বদলাবেন না", "বাসায় রক্তচাপ মেপে লিখে রাখুন এবং প্রতিবার ডাক্তারকে দেখান"] },
        { h: "নিয়মিত পরীক্ষা করুন", p: "উচ্চ রক্তচাপ থাকলে প্রতি বছর কিডনির কার্যকারিতা, রক্তে সুগার, কোলেস্টেরল ও ইসিজি পরীক্ষার বিষয়ে ডাক্তারকে জিজ্ঞেস করুন। আমরা হৃদরোগ বা মেডিসিন বিশেষজ্ঞের সিরিয়াল ও ছাড়ে টেস্টের ব্যবস্থা করে দিতে পারি।" },
      ],
    },
  },
  {
    slug: "when-to-go-to-emergency",
    date: "2026-08-28",
    minutes: 4,
    icon: "siren",
    tone: "red",
    related: ["cardiology", "neurology", "medicine"],
    en: {
      title: "Chamber or emergency? Signs you shouldn't wait for a serial",
      excerpt: "Some symptoms can't wait for the doctor's next chamber day. Know when to go straight to hospital.",
      body: [
        { p: "Booking a specialist's serial is right for most problems. But some symptoms need emergency care within minutes or hours. If you notice any of these, go to the nearest hospital emergency department or call an ambulance." },
        { h: "Possible heart attack", ul: ["Chest pain or pressure lasting more than a few minutes", "Pain spreading to the arm, jaw, neck or back", "Sweating, breathlessness, nausea or fainting with chest discomfort"] },
        { h: "Possible stroke — think FAST", ul: ["Face drooping on one side", "Arm or leg weakness on one side", "Speech slurred or confused", "Time to go to hospital — every minute matters"] },
        { h: "Other emergencies", ul: ["Severe difficulty breathing, or lips turning blue", "Seizure lasting more than 5 minutes, or not waking after a seizure", "Heavy bleeding that won't stop", "Severe injury, burns, or a suspected broken bone with deformity", "Sudden severe headache — the worst of your life", "Heavy bleeding, severe pain or fits during pregnancy", "A baby or child who is limp, very drowsy or not feeding"] },
        { h: "Save these numbers", p: "Emergency numbers for Khulna Medical College Hospital, General Hospital and Abu Naser Specialised Hospital are at the bottom of every page. For an ambulance any time, call our Booking Line." },
      ],
    },
    bn: {
      title: "চেম্বার নাকি জরুরি বিভাগ? যে লক্ষণে সিরিয়ালের অপেক্ষা নয়",
      excerpt: "কিছু উপসর্গ ডাক্তারের পরের চেম্বার দিনের জন্য অপেক্ষা করতে পারে না। কখন সরাসরি হাসপাতালে যাবেন, জেনে নিন।",
      body: [
        { p: "বেশিরভাগ সমস্যায় বিশেষজ্ঞের সিরিয়াল নেওয়াই ঠিক। কিন্তু কিছু উপসর্গে কয়েক মিনিট বা ঘণ্টার মধ্যে জরুরি চিকিৎসা দরকার। নিচের কোনোটি দেখলে নিকটস্থ হাসপাতালের জরুরি বিভাগে যান বা অ্যাম্বুলেন্স ডাকুন।" },
        { h: "হার্ট অ্যাটাকের সম্ভাবনা", ul: ["কয়েক মিনিটের বেশি সময় ধরে বুকে ব্যথা বা চাপ", "ব্যথা হাত, চোয়াল, ঘাড় বা পিঠে ছড়িয়ে পড়া", "বুকে অস্বস্তির সাথে ঘাম, শ্বাসকষ্ট, বমিভাব বা অজ্ঞান হওয়া"] },
        { h: "স্ট্রোকের সম্ভাবনা — মনে রাখুন", ul: ["মুখের এক পাশ বেঁকে যাওয়া", "এক পাশের হাত বা পা দুর্বল হয়ে যাওয়া", "কথা জড়িয়ে যাওয়া বা এলোমেলো হওয়া", "দেরি না করে হাসপাতালে — প্রতিটি মিনিট গুরুত্বপূর্ণ"] },
        { h: "অন্যান্য জরুরি অবস্থা", ul: ["তীব্র শ্বাসকষ্ট, বা ঠোঁট নীল হয়ে যাওয়া", "৫ মিনিটের বেশি খিঁচুনি, বা খিঁচুনির পর জ্ঞান না ফেরা", "রক্তপাত যা থামছে না", "গুরুতর আঘাত, পোড়া, বা হাড় ভেঙে বেঁকে যাওয়া", "হঠাৎ জীবনের সবচেয়ে তীব্র মাথাব্যথা", "গর্ভাবস্থায় অতিরিক্ত রক্তপাত, তীব্র ব্যথা বা খিঁচুনি", "শিশু নিস্তেজ, অতিরিক্ত ঘুমঘুম বা খেতে না পারা"] },
        { h: "নম্বরগুলো সংরক্ষণ করুন", p: "খুলনা মেডিকেল কলেজ হাসপাতাল, জেনারেল হাসপাতাল ও আবু নাসের বিশেষায়িত হাসপাতালের জরুরি নম্বর প্রতিটি পেজের নিচে আছে। যেকোনো সময় অ্যাম্বুলেন্সের জন্য আমাদের বুকিং লাইনে কল করুন।" },
      ],
    },
  },
  {
    slug: "how-to-book-a-serial",
    date: "2026-08-20",
    minutes: 3,
    icon: "stethoscope",
    tone: "indigo",
    related: [],
    en: {
      title: "How to book a doctor's serial through Top Doctors Khulna",
      excerpt: "Find the doctor, check the day, and send one message. Here's the whole process.",
      body: [
        { h: "1. Find your doctor", p: "Search by the doctor's name, specialty or even a symptom like \"chest pain\". You can also browse by specialty or designation, or filter all doctors by the day you're free and your budget." },
        { h: "2. Check the chamber and schedule", p: "Each doctor's page shows their chambers, the days and hours they sit, and the consultation fees for new and returning patients." },
        { h: "3. Call or WhatsApp us", p: "Tap Call or WhatsApp on the doctor's page. The WhatsApp message is pre-filled with the doctor's name and chamber — just add the patient's name and the day you want." },
        { h: "4. Get your serial", p: "We contact the chamber, book your serial and send you the confirmed time. If the doctor isn't sitting that day, we'll suggest the nearest available day or another specialist." },
        { h: "5. Visit and follow up", p: "Arrive a little early with your previous prescriptions and reports. If tests are ordered, we can book them at a 25% discount and arrange your report-showing visit." },
      ],
    },
    bn: {
      title: "টপ ডক্টরস খুলনার মাধ্যমে কীভাবে সিরিয়াল নেবেন",
      excerpt: "ডাক্তার খুঁজুন, দিন দেখুন, একটি মেসেজ পাঠান। পুরো প্রক্রিয়াটি এখানে।",
      body: [
        { h: "১. ডাক্তার খুঁজুন", p: "ডাক্তারের নাম, বিভাগ বা \"বুকে ব্যথা\"-র মতো উপসর্গ লিখে খুঁজুন। বিভাগ বা পদবি অনুযায়ীও দেখতে পারেন, অথবা আপনার সুবিধার দিন ও বাজেট অনুযায়ী ফিল্টার করুন।" },
        { h: "২. চেম্বার ও সময়সূচি দেখুন", p: "প্রত্যেক ডাক্তারের পেজে আছে চেম্বার, কোন দিন কখন বসেন, এবং নতুন ও পুরাতন রোগীর ফি।" },
        { h: "৩. কল বা হোয়াটসঅ্যাপ করুন", p: "ডাক্তারের পেজে কল বা হোয়াটসঅ্যাপ বাটনে চাপুন। হোয়াটসঅ্যাপ মেসেজে ডাক্তারের নাম ও চেম্বার আগে থেকেই লেখা থাকবে — শুধু রোগীর নাম ও কোন দিন চান যোগ করুন।" },
        { h: "৪. সিরিয়াল নিশ্চিত করুন", p: "আমরা চেম্বারে যোগাযোগ করে সিরিয়াল নিয়ে আপনাকে নিশ্চিত সময় জানিয়ে দেব। সেদিন ডাক্তার না বসলে কাছাকাছি দিন বা অন্য বিশেষজ্ঞের পরামর্শ দেব।" },
        { h: "৫. ডাক্তার দেখান ও ফলো-আপ", p: "আগের প্রেসক্রিপশন ও রিপোর্ট নিয়ে একটু আগে পৌঁছান। টেস্ট দিলে আমরা ২৫% ছাড়ে বুক করে রিপোর্ট দেখানোর সিরিয়ালও করে দিতে পারি।" },
      ],
    },
  },
];

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));
