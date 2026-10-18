import { facilityPage } from "@/routes";

const r = facilityPage("en", "pharmacy", "/pharmacies");
export const metadata = r.metadata;
export default r.Page;
