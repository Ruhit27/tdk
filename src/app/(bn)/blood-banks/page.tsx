import { facilityPage } from "@/routes";

const r = facilityPage("bn", "blood-bank", "/blood-banks");
export const metadata = r.metadata;
export default r.Page;
