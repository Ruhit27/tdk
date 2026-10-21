import { doctorOg } from "@/lib/og";

const r = doctorOg();
export { size, contentType } from "@/lib/og";
export const alt = r.alt;
export const generateStaticParams = r.generateStaticParams;
export default r.Image;
