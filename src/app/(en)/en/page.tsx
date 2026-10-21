import { home } from "@/routes";

const r = home("en");
export const metadata = r.metadata;
export default r.Page;
