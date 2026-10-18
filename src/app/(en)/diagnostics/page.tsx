import { facilityPage } from "@/routes";

const r = facilityPage("en", "diagnostic", "/diagnostics");
export const metadata = r.metadata;
export default r.Page;
