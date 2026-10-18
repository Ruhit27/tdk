import { designationPage } from "@/routes";

const r = designationPage("bn");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
