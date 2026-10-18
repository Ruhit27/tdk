import { designationPage } from "@/routes";

const r = designationPage("en");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
