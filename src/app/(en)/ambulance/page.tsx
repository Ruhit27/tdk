import { servicePage } from "@/routes";

const r = servicePage("en", "ambulance");
export const metadata = r.metadata;
export default r.Page;
