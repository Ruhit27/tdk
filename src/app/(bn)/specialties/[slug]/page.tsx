import { specialtyPage } from "@/routes";

const r = specialtyPage("bn");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
