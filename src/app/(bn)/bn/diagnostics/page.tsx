import { facilityPage } from "@/routes";

const r = facilityPage("bn", "diagnostic", "/diagnostics");
export const metadata = r.metadata;
export default r.Page;
