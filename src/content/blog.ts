import type { IconName, Tone } from "@/components/AppIcon";
import type { DoctorQuery } from "@/lib/doctor-groups";
import whichSpecialist from "@/content/posts/which-specialist-should-i-see";
import firstAppointment from "@/content/posts/preparing-for-your-first-appointment";
import dengue from "@/content/posts/dengue-warning-signs";
import bloodPressure from "@/content/posts/living-with-high-blood-pressure";
import emergency from "@/content/posts/when-to-go-to-emergency";
import bookSerial from "@/content/posts/how-to-book-a-serial";
import kidney from "@/content/posts/kidney-doctor-khulna";
import stroke from "@/content/posts/stroke-treatment-khulna";
import diabetes from "@/content/posts/diabetes-doctor-khulna";
import childFever from "@/content/posts/child-fever-when-to-see-doctor";
import pregnancy from "@/content/posts/pregnancy-checkup-schedule";
import backPain from "@/content/posts/back-pain-which-doctor";
import indiaVisa from "@/content/posts/india-medical-visa-from-khulna";
import asthma from "@/content/posts/winter-asthma-care";
import jaundice from "@/content/posts/jaundice-liver-doctor-khulna";
import thyroid from "@/content/posts/thyroid-doctor-khulna";
import blood from "@/content/posts/blood-bank-khulna";
import cataract from "@/content/posts/cataract-surgery-khulna";
import skin from "@/content/posts/skin-allergy-doctor-khulna";
import { dayListPosts, doctorListPosts, hospitalListPosts } from "@/content/doctor-lists";
import { priceListPosts } from "@/content/price-lists";

// Every image carries alt text, so the type makes it impossible to add one without.
export type Image = { src: string; alt: string };
/** `doctors` renders a group of Doctors as cards; `table` renders a simple table (e.g. test prices). */
export type Block = { h?: string; p?: string; ul?: string[]; img?: Image; doctors?: DoctorQuery; table?: { head: string[]; rows: string[][] } };
export type Faq = { q: string; a: string };

/** Every blog illustration is drawn at this size (16:9); share images are PNG renders of the cover at 1200×630. */
export const IMAGE_SIZE = { width: 1200, height: 675 } as const;
/** The PNG render of a Post's cover, for social previews (they ignore SVG). Posts may share a cover, so it is keyed by the cover file. */
export const shareImage = (post: { bn: { cover: Image } }) => `/blog/og/${post.bn.cover.src.split("/").pop()!.replace(/\.svg$/, "")}.png`;

export type PostCopy = {
  title: string;
  excerpt: string;
  /** Two or three sentences that answer the search query directly; shown first and quoted by AI search. */
  answer: string;
  body: Block[];
  faq: [Faq, ...Faq[]];
  cover: Image;
};

/** Every Post is published in both Bangla and English. */
export type Post = {
  slug: string;
  date: string;
  updated?: string;
  icon: IconName;
  tone: Tone;
  related: string[]; // specialty slugs
  /** Doctor slug of the Medical Reviewer, once one has agreed to review Posts. */
  reviewer?: string;
  bn: PostCopy;
  en: PostCopy;
};

/** Health guides, newest first. */
export const guides: Post[] = [
  whichSpecialist, firstAppointment, dengue, bloodPressure, emergency, bookSerial,
  kidney, stroke, diabetes, childFever, pregnancy, backPain, indiaVisa, asthma, jaundice, thyroid, blood, cataract, skin,
].sort((a, b) => b.date.localeCompare(a.date));

/** Every Post: Health Guides, Doctor Lists (by Specialty, Hospital and day) and test prices. */
export const posts: Post[] = [...guides, ...doctorListPosts, ...hospitalListPosts, ...dayListPosts, ...priceListPosts];
export { dayListPosts, doctorListPosts, hospitalListPosts, priceListPosts };

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));

/** Reading time at ~200 words a minute, counting every visible block. */
export function readingMinutes(c: PostCopy) {
  const text = [c.answer, ...c.body.flatMap((b) => [b.h, b.p, ...(b.ul ?? [])]), ...c.faq.flatMap((f) => [f.q, f.a])].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
