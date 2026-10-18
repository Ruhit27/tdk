import { specialtiesIndex } from "@/routes";

const r = specialtiesIndex("en");
export const metadata = r.metadata;
export default r.Page;
