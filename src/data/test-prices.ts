// Lab test prices at diagnostic centres in Khulna. Each LabTest with at least one price becomes a "test price" Post.
// Only enter prices confirmed with the centre, and update `checked` whenever you re-confirm them.
export type TestPrice = { centre: string; centreBn: string; price: number };

export type LabTest = {
  slug: string; // e.g. "mri-brain" → /blog/mri-brain-price-in-khulna
  en: string; // "MRI of the brain"
  bn: string; // "ব্রেইনের এমআরআই"
  aboutEn: string; // one sentence: what the test is for
  aboutBn: string;
  /** ISO date the prices were last confirmed. */
  checked: string;
  prices: TestPrice[];
  related: string[]; // specialty slugs that usually order this test
};

export const labTests: LabTest[] = [
  // Example of the shape (not real prices — do not uncomment as-is):
  // {
  //   slug: "mri-brain", en: "MRI of the brain", bn: "ব্রেইনের এমআরআই",
  //   aboutEn: "Detailed scan of the brain, used for stroke, headache, fits and tumours.",
  //   aboutBn: "মস্তিষ্কের বিস্তারিত স্ক্যান — স্ট্রোক, মাথাব্যথা, খিঁচুনি ও টিউমার দেখতে ব্যবহার হয়।",
  //   checked: "2026-10-18", related: ["neurology"],
  //   prices: [{ centre: "Top Choice Diagnostic Center", centreBn: "টপ চয়েস ডায়াগনস্টিক সেন্টার", price: 0 }],
  // },
];
