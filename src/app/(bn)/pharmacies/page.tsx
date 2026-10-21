import { facilityPage } from "@/routes";

const r = facilityPage("bn", "pharmacy", "/pharmacies");
export const metadata = r.metadata;
export default r.Page;
