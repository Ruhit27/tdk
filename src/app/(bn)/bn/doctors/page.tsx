import { doctorsIndex } from "@/routes";

const r = doctorsIndex("bn");
export const metadata = r.metadata;
export default r.Page;
