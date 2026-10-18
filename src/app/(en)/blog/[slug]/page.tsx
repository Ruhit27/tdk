import { blogPost } from "@/routes";

const r = blogPost("en");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
