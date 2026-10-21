// Rasterises the logo in src/lib/brand.ts into the app icons and the downloadable kit in public/brand.
// Run with `npm run brand` after changing the logo; the outputs are committed.
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { badgeSvg, brandColors, lockupSvg, markSvg } from "../src/lib/brand.ts";

// SVGs without width/height render at their viewBox size at 72 dpi; scale density to hit `width` exactly.
const png = (svg: string, width: number, height = width) => {
  const viewBoxWidth = Number(svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+)/)![1]);
  return sharp(Buffer.from(svg), { density: (72 * width) / viewBoxWidth }).resize(width, height).png().toBuffer();
};

/** A .ico holding PNG images, which all current browsers accept. */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size % 256, e);
    header.writeUInt8(size % 256, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((x) => x.data)]);
}

const out = "public/brand";
await mkdir(out, { recursive: true });

const small = badgeSvg({ full: false });
const files: [string, string | Promise<Buffer>][] = [
  // Picked up by Next's app-icon file conventions.
  ["src/app/icon.svg", small],
  ["src/app/apple-icon.png", png(badgeSvg({ rounded: false }), 180)],
  // Referenced from src/app/manifest.ts.
  [`${out}/icon-192.png`, png(badgeSvg(), 192)],
  [`${out}/icon-512.png`, png(badgeSvg(), 512)],
  [`${out}/icon-maskable-512.png`, png(badgeSvg({ rounded: false, inset: 0.8 }), 512)],
  // Kit for print and social profiles.
  [`${out}/logo.svg`, lockupSvg(brandColors.light)],
  [`${out}/logo-dark.svg`, lockupSvg(brandColors.dark)],
  [`${out}/mark.svg`, markSvg(brandColors.light)],
  [`${out}/mark-dark.svg`, markSvg(brandColors.dark)],
  [`${out}/profile.svg`, badgeSvg({ rounded: false, inset: 0.85 })],
  [`${out}/logo.png`, png(lockupSvg(brandColors.light), 1320, 272)],
  [`${out}/logo-dark.png`, png(lockupSvg(brandColors.dark), 1320, 272)],
  [`${out}/mark.png`, png(markSvg(brandColors.light), 1024)],
  [`${out}/profile.png`, png(badgeSvg({ rounded: false, inset: 0.85 }), 1024)],
];
for (const [path, data] of files) await writeFile(path, await data);

const favicon = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(small, size) })));
await writeFile("src/app/favicon.ico", ico(favicon));
console.log(`wrote ${files.length + 1} files`);
