import { doctorsIndex } from "@/routes";

const r = doctorsIndex("en");
export const metadata = r.metadata;
export default r.Page;
