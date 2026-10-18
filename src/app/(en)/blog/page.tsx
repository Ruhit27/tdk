import { blogIndex } from "@/routes";

const r = blogIndex("en");
export const metadata = r.metadata;
export default r.Page;
