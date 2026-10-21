import { specialtyPage } from "@/routes";

const r = specialtyPage("en");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
