import { doctorPage } from "@/routes";

const r = doctorPage("bn");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
