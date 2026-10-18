import type { Post } from "@/content/blog";

const post: Post = {
  slug: "dengue-warning-signs",
  date: "2026-09-15",
  icon: "thermometer",
  tone: "orange",
  related: ["medicine", "child"],
  en: {
    title: "Dengue: warning signs you should never ignore",
    excerpt: "Most dengue gets better at home — but a few signs mean you must go to hospital the same day.",
    answer: "Most dengue gets better at home with rest, fluids and paracetamol. Go to hospital the same day if there is severe stomach pain, repeated vomiting, bleeding from gums or nose, black stools, extreme tiredness or restlessness — these warning signs often appear just as the fever comes down.",
    cover: { src: "/blog/dengue-warning-signs.svg", alt: "An Aedes mosquito with striped legs over a tub of standing water, the mosquito that spreads dengue" },
    body: [
      { p: "Dengue cases rise in Khulna every monsoon and autumn. Most people recover with rest and fluids, but the dangerous phase often begins just as the fever comes down — usually between day 3 and day 7. Knowing the warning signs saves lives." },
      { h: "Common symptoms", ul: ["Sudden high fever", "Severe headache and pain behind the eyes", "Body, joint and muscle aches", "Nausea, loss of appetite", "Skin rash"] },
      { h: "Go to hospital immediately if you notice", ul: ["Severe or continuous stomach pain", "Repeated vomiting, or unable to keep fluids down", "Bleeding from gums or nose, blood in vomit, black stool", "Very little urine for 6 hours or more", "Cold, clammy hands and feet, extreme weakness or restlessness", "Difficulty breathing", "In children: unusual sleepiness or irritability"] },
      { img: { src: "/blog/dengue-warning-signs-2.svg", alt: "A family sleeping safely under a mosquito net to prevent dengue" } },
      { h: "Caring for dengue at home", ul: ["Drink plenty of fluids — water, ORS, soup, coconut water, fruit juice", "Take paracetamol for fever, as advised by a doctor", "Do NOT take aspirin, ibuprofen or other painkillers — they increase bleeding risk", "Get a CBC (platelet count) as your doctor advises, and follow up"] },
      { h: "Prevention", ul: ["Empty standing water around your home every 3 days — flower tubs, tyres, AC trays", "Use a mosquito net, including during the day", "Wear long sleeves and use repellent, especially early morning and evening"] },
      { p: "This article is for awareness, not diagnosis. If you suspect dengue, see a doctor. We can book a medicine or child specialist and arrange a discounted CBC." },
    ],
    faq: [
      { q: "Which test confirms dengue?", a: "In the first days of fever, an NS1 antigen test; a CBC is used to follow the platelet count. Your doctor decides which you need." },
      { q: "Can I take painkillers for dengue?", a: "Only paracetamol, as advised by a doctor. Avoid aspirin, ibuprofen and other NSAIDs — they raise the risk of bleeding." },
      { q: "Which doctor should I see for dengue in Khulna?", a: "A medicine specialist for adults and a child specialist for children. Go straight to a hospital emergency department if warning signs appear." },
    ],
  },
  bn: {
    title: "ডেঙ্গু: যে লক্ষণগুলো কখনো অবহেলা করবেন না",
    excerpt: "বেশিরভাগ ডেঙ্গু বাসায় ভালো হয়ে যায় — কিন্তু কিছু লক্ষণ দেখলে সেদিনই হাসপাতালে যেতে হবে।",
    answer: "বেশিরভাগ ডেঙ্গু বিশ্রাম, প্রচুর তরল ও প্যারাসিটামলে বাসায় ভালো হয়ে যায়। তবে পেটে তীব্র ব্যথা, বারবার বমি, দাঁতের মাড়ি বা নাক দিয়ে রক্ত, কালো পায়খানা, অতিরিক্ত দুর্বলতা বা অস্থিরতা দেখলে সেদিনই হাসপাতালে যান — জ্বর কমার সময়ই এই লক্ষণগুলো বেশি দেখা দেয়।",
    cover: { src: "/blog/dengue-warning-signs.svg", alt: "জমে থাকা পানির পাত্রের ওপর ডোরাকাটা পায়ের এডিস মশা — ডেঙ্গু ছড়ায় যে মশা" },
    body: [
      { p: "প্রতি বর্ষা ও শরতে খুলনায় ডেঙ্গু বাড়ে। বেশিরভাগ রোগী বিশ্রাম ও তরল খাবারে সেরে ওঠেন, কিন্তু বিপজ্জনক পর্যায় শুরু হয় প্রায়ই জ্বর কমার সময় — সাধারণত তৃতীয় থেকে সপ্তম দিনে। সতর্ক সংকেতগুলো জানা থাকলে জীবন বাঁচে।" },
      { h: "সাধারণ লক্ষণ", ul: ["হঠাৎ তীব্র জ্বর", "প্রচণ্ড মাথাব্যথা ও চোখের পেছনে ব্যথা", "শরীর, জোড়া ও মাংসপেশিতে ব্যথা", "বমিভাব, ক্ষুধামন্দা", "ত্বকে র‍্যাশ"] },
      { h: "এগুলো দেখলে দেরি না করে হাসপাতালে যান", ul: ["পেটে তীব্র বা একটানা ব্যথা", "বারবার বমি, বা পানি খেলেও বমি হয়ে যাওয়া", "দাঁতের মাড়ি বা নাক দিয়ে রক্ত, বমিতে রক্ত, কালো পায়খানা", "৬ ঘণ্টা বা তার বেশি সময় খুব কম প্রস্রাব", "হাত-পা ঠান্ডা ও ঘামে ভেজা, অতিরিক্ত দুর্বলতা বা অস্থিরতা", "শ্বাসকষ্ট", "শিশুদের ক্ষেত্রে: অস্বাভাবিক ঘুমঘুম ভাব বা খিটখিটে মেজাজ"] },
      { img: { src: "/blog/dengue-warning-signs-2.svg", alt: "ডেঙ্গু প্রতিরোধে মশারির নিচে নিরাপদে ঘুমাচ্ছে একটি পরিবার" } },
      { h: "বাসায় ডেঙ্গুর যত্ন", ul: ["প্রচুর তরল পান করুন — পানি, ওরস্যালাইন, স্যুপ, ডাবের পানি, ফলের রস", "ডাক্তারের পরামর্শমতো জ্বরের জন্য প্যারাসিটামল খান", "অ্যাসপিরিন, আইবুপ্রোফেন বা অন্য ব্যথানাশক খাবেন না — রক্তক্ষরণের ঝুঁকি বাড়ায়", "ডাক্তারের পরামর্শমতো সিবিসি (প্লাটিলেট) পরীক্ষা করুন ও ফলো-আপে থাকুন"] },
      { h: "প্রতিরোধ", ul: ["প্রতি ৩ দিনে বাড়ির আশপাশের জমা পানি ফেলে দিন — ফুলের টব, টায়ার, এসির ট্রে", "দিনেও মশারি ব্যবহার করুন", "লম্বা হাতার জামা পরুন ও মশা তাড়ানোর ক্রিম ব্যবহার করুন, বিশেষ করে ভোরে ও সন্ধ্যায়"] },
      { p: "এই লেখা সচেতনতার জন্য, রোগ নির্ণয়ের জন্য নয়। ডেঙ্গু সন্দেহ হলে ডাক্তার দেখান। আমরা মেডিসিন বা শিশু বিশেষজ্ঞের সিরিয়াল ও ছাড়ে সিবিসি টেস্টের ব্যবস্থা করে দিতে পারি।" },
    ],
    faq: [
      { q: "ডেঙ্গু নিশ্চিত হতে কোন টেস্ট করতে হয়?", a: "জ্বরের প্রথম কয়েক দিনে NS1 অ্যান্টিজেন টেস্ট; প্লাটিলেট দেখতে CBC করা হয়। কোনটি লাগবে ডাক্তার ঠিক করবেন।" },
      { q: "ডেঙ্গুতে কি ব্যথার ওষুধ খাওয়া যায়?", a: "শুধু ডাক্তারের পরামর্শে প্যারাসিটামল। অ্যাসপিরিন, আইবুপ্রোফেন বা অন্য ব্যথানাশক খাবেন না — এতে রক্তক্ষরণের ঝুঁকি বাড়ে।" },
      { q: "খুলনায় ডেঙ্গু হলে কোন ডাক্তার দেখাব?", a: "বড়দের জন্য মেডিসিন বিশেষজ্ঞ, শিশুদের জন্য শিশু বিশেষজ্ঞ। বিপদচিহ্ন দেখা দিলে সরাসরি হাসপাতালের জরুরি বিভাগে যান।" },
    ],
  },
};

export default post;
