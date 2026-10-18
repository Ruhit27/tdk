# Blog plan

Goal: bring people searching for care in Khulna to a Doctor or Service and get them to call the Booking Line. Every Post is published in both Bangla and English. Every Post has a short answer at the top, short sections, an FAQ, alt text on every image, and a keyword slug in English letters.

There are two kinds of Post:
- **Health Guides:** the 19 hand-written posts below.
- **Doctor Lists:** one generated post per Specialty, built by `src/content/doctor-lists.ts` from `doctors.json`.

**About the Doctor Lists:**
- **URLs and titles:** each lives at `/blog/best-<specialty>-in-khulna`. The title uses the real doctor count, e.g. "9 Best Cardiologists in Khulna (2026)".
- **Order:** doctors are listed by seniority and never numbered, and the post explains the order.
- **Specialty pages:** these link to their list and no longer use "Best" in their titles.
- **Covers:** drawn by the same illustration style with the Specialty's icon, at `public/blog/<slug>.svg` and `public/blog/og/<slug>.png`. A new Specialty needs a cover drawn before it builds.

**Hospital lists and the Friday list** are generated the same way:
- **Hospitals:** `src/lib/doctor-groups.ts` lists the 7 hospitals with 5 or more doctors in Khulna (Top Choice, Khulna City Medical College, Islami Bank, Doctors Point, Labaid, Garib Nawaz, Gazi). It matches every spelling of each name in `doctors.json` and counts only Khulna chambers.
- **What each card shows:** that hospital's days, or Friday's hours.
- **Phone numbers:** a hospital's own phone appears only where `facilities.ts` holds it. Every post says the Booking Line is our number, not the hospital's.

**Test-price posts:**
- **Status:** built, but nothing is published yet. Add confirmed prices to `src/data/test-prices.ts` and a post per test appears at `/blog/<test>-price-in-khulna`, with a price table and FAQ.
- **Cover:** all price posts share `public/blog/test-prices.svg`.
- **Rule:** never enter estimated prices.

## Published (19)

| Slug | Type | Languages |
| --- | --- | --- |
| which-specialist-should-i-see | Disease → specialist | bn, en |
| preparing-for-your-first-appointment | How to | bn, en |
| dengue-warning-signs | Seasonal | bn, en |
| living-with-high-blood-pressure | Disease → specialist | bn, en |
| when-to-go-to-emergency | Local reference | bn, en |
| how-to-book-a-serial | How to take a serial | bn, en |
| kidney-doctor-khulna | Disease → specialist | bn, en |
| stroke-treatment-khulna | Disease → specialist | bn, en |
| diabetes-doctor-khulna | Disease → specialist | bn, en |
| child-fever-when-to-see-doctor | Disease → specialist | bn, en |
| pregnancy-checkup-schedule | Disease → specialist | bn, en |
| back-pain-which-doctor | Disease → specialist | bn, en |
| india-medical-visa-from-khulna | India treatment | bn, en |
| winter-asthma-care | Seasonal | bn, en |
| jaundice-liver-doctor-khulna | Disease → specialist | bn, en |
| thyroid-doctor-khulna | Disease → specialist | bn, en |
| blood-bank-khulna | Local reference | bn, en |
| cataract-surgery-khulna | Disease → specialist | bn, en |
| skin-allergy-doctor-khulna | Disease → specialist | bn, en |

## Next batch

Disease → specialist
- chest-pain-which-doctor: heart, gastric, or muscle?
- headache-migraine-doctor-khulna
- gastric-ulcer-doctor-khulna
- piles-fistula-treatment-khulna
- infertility-doctor-khulna
- kidney-stone-treatment-khulna (urology, deeper than the kidney post)
- ent-tonsil-sinus-doctor-khulna
- depression-anxiety-psychiatrist-khulna
- cancer-specialist-khulna (oncology: first steps after a diagnosis)
- knee-pain-arthritis-khulna

Seasonal
- monsoon-diarrhoea-cholera-care
- ramadan-diabetes-fasting
- heatwave-heatstroke-signs

India treatment
- kolkata-vs-vellore-vs-chennai: which hospital city fits which treatment
- india-treatment-checklist: reports and documents to carry

Local reference
- night-pharmacy-khulna
- ambulance-service-khulna
- government-vs-private-hospital-khulna

**Needs data from you before writing:** test prices in Khulna (MRI, CT, echo, ultrasound, CBC, HbA1c, thyroid). These search terms have the least competition. They need real current prices from partner diagnostic centres. Don't guess prices.

## Pages, not Posts (decided: lists live on permanent pages)


## Images (done for all 19 Posts)

Every Post has a cover and one inline illustration, with alt text in each language. The code requires `cover`, so a Post can't be published without one.
- Files: `public/blog/<slug>.svg` (cover) and `public/blog/<slug>-2.svg` (inline).
- Size: 1200×675, hand-drawn flat SVG, no text inside the image.
- Style: matches the homepage illustration (`src/components/HeroArt.tsx`). Palette: teal-to-cream sky, flag green #006a4e, flag red #f42a41, deep teal #1f7f78, ink #24524d. People are simple rounded figures in Bangladeshi dress.
- Share image: `public/blog/og/<slug>.png` at 1200×630, a PNG render of the cover. Facebook and WhatsApp don't show SVG previews.

## Open items

- **Medical Reviewer:** none yet. Set `reviewer: "<doctor-slug>"` once a Doctor agrees, and it appears on the Post and in its structured data.
