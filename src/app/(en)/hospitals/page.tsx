import { facilityPage } from "@/routes";

const r = facilityPage("en", "hospital", "/hospitals");
export const metadata = r.metadata;
export default r.Page;
