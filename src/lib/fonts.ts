import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Kalpurush ships one regular weight; declaring only 400 lets the browser embolden headings.
export const kalpurush = localFont({ src: "../fonts/Kalpurush.woff2", weight: "400", variable: "--font-kalpurush", display: "swap" });
