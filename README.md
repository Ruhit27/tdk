# Top Doctors Khulna

Bilingual (English / বাংলা) directory of specialist doctors in Khulna. Next.js 16, fully static, deploys to Vercel with no configuration.

```bash
npm install
npm run dev     # http://localhost:3000  (Bangla at /bn)
npm run build   # pre-renders every page
```

## Where things live

| What | File |
| --- | --- |
| Booking Line phone / WhatsApp, site URL | `src/lib/site.ts` |
| Doctors (fees, chambers, schedules, featured flag, photo) | `src/data/doctors.json` |
| Specialties (names, icons, Bangla) | `src/data/specialties.ts` |
| Hospitals, diagnostics, blood banks, pharmacies, emergency numbers | `src/data/facilities.ts` |
| Bangla translations of names / diseases / places | `src/data/bn/*.json` |
| UI text in both languages | `src/lib/dictionary.ts` |
| Service pages, About, Contact text | `src/content/pages.ts` |
| Blog posts | `src/content/blog.ts` |

To add a doctor, append an entry to `doctors.json` and drop a square photo at `public/photos/<slug>.webp` (or set `"photo": null` for an initials avatar). Any new name word or disease needs a Bangla entry in `src/data/bn/`, otherwise it shows in English on `/bn` pages.
