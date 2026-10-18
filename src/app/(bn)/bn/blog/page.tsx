import { blogIndex } from "@/routes";

const r = blogIndex("bn");
export const metadata = r.metadata;
export default r.Page;
