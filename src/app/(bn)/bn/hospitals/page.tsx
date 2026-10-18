import { facilityPage } from "@/routes";

const r = facilityPage("bn", "hospital", "/hospitals");
export const metadata = r.metadata;
export default r.Page;
