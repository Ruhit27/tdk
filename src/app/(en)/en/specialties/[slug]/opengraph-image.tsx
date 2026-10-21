import { specialtyOg } from "@/lib/og";

const r = specialtyOg();
export { size, contentType } from "@/lib/og";
export const alt = r.alt;
export const generateStaticParams = r.generateStaticParams;
export default r.Image;
