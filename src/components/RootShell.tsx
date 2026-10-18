import { hind, inter } from "@/lib/fonts";
import type { Lang } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingBar } from "@/components/BookingBar";
import "@/app/globals.css";

// Runs before paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} ${hind.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header lang={lang} />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <Footer lang={lang} />
        <BookingBar lang={lang} />
      </body>
    </html>
  );
}
