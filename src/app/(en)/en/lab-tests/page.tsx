import { servicePage } from "@/routes";

const r = servicePage("en", "lab-tests");
export const metadata = r.metadata;
export default r.Page;
