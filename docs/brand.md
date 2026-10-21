# Logo and brand

The mark is a Sundarbans mangrove leaf with a plus cut out of it, standing on stilt roots over the river. The wordmark is "Top Doctors / KHULNA" in Plus Jakarta Sans, outlined to paths. It stays in English on Bangla pages too, because it's the name and not copy to translate.

## Source of truth

- `src/lib/brand.ts` holds all the geometry and colours. The header logo (`src/components/Logo.tsx`), the share cards (`src/lib/og.tsx`) and the static files are all built from it.
- After changing it, run `npm run brand` and commit the outputs: `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` and everything in `public/brand/`.
- The site colours in `src/app/globals.css` (`--brand`, `--brand-strong`, `--accent`) match `brandColors` in `brand.ts`. Change both together.

## Files in `public/brand/`

| File | Use |
| --- | --- |
| `logo.svg` / `logo.png` | Full logo on light backgrounds |
| `logo-dark.svg` / `logo-dark.png` | Full logo on dark backgrounds |
| `mark.svg` / `mark.png` | The symbol alone, for tight spaces |
| `profile.svg` / `profile.png` | Square avatar for Facebook, WhatsApp Business and Google Business Profile |
| `icon-*.png` | Web app manifest icons |

## Rules

- **Clear space:** keep at least the height of "KHULNA" empty around the logo.
- **Minimum size:** the full logo should be at least 120 px wide. Below about 32 px, use the leaf-only icon (`src/app/icon.svg`). The roots don't survive at that size.
- **Don't** recolour the plus red or put it on white as a red cross. The Red Cross and Red Crescent emblems are legally protected in Bangladesh.
- **Don't** stretch, rotate or re-typeset the wordmark. Use the files.

## Share images

- Doctor and specialty pages each generate their own card (`opengraph-image.tsx` in those route folders). Their metadata passes `ownCard: true` so `pageMeta` doesn't override it.
- Blog posts keep their illustrated covers.
- Every other page uses `/og-image.png`.
- Cards are English on both language trees, because the image renderer can't shape Bangla conjuncts.
