// Generates web-optimised WebP copies of gallery photos and logos.
// Usage: node scripts/optimize-images.mjs          (new photos only + manifest + logos)
//        node scripts/optimize-images.mjs --force  (re-encode every photo)
//        node scripts/optimize-images.mjs emblem   (logo + icons only)
//
// Writes lib/gallery-manifest.json (every web photo + its size) which the gallery slider reads.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const jobs = [
  { src: 'public/assets/gallery/people', out: 'public/assets/gallery/web', width: 2000, quality: 74 },
  { src: 'public/assets/logos', out: 'public/assets/logos/web', width: 600, quality: 90, png: true },
];

const slug = (name) =>
  name
    .replace(/\.[^.]+$/, '')
    .replace(/TASA Conf_Day(\d) \((\d+) of \d+\)/, 'conf-day$1-$2')
    .replace(/WhatsApp Image .* at (\d+)\.(\d+)\.(\d+)/, 'tasa-$1$2$3')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Homepage hero: crop the bottom 16% to remove the photographer's watermark behind the headline.
async function heroCrop() {
  const src = path.join(root, 'public/assets/gallery/people/TASA Conf_Day1 (22 of 93).jpg');
  const meta = await sharp(src).metadata();
  await sharp(src)
    .rotate()
    .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.84) })
    .resize({ width: 2400 })
    .webp({ quality: 74 })
    .toFile(path.join(root, 'public/assets/gallery/web/conf-day1-22-hero.webp'));
  console.log('hero crop -> public/assets/gallery/web/conf-day1-22-hero.webp');
}

// TASA emblem: crop to the artwork, turn the solid black backdrop transparent,
// and emit the site logo + favicon / apple touch icon.
async function emblem() {
  const src = path.join(root, 'public/assets/logos/main-logo.v1.png');
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = Infinity, y0 = Infinity, x1 = 0, y1 = 0;
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    // Fade near-black pixels to transparent with a soft ramp (no halos on light backgrounds)
    if (max < 60) data[i + 3] = Math.round(data[i + 3] * (max < 25 ? 0 : (max - 25) / 35));
    if (data[i + 3] > 60) {
      const p = i / 4, x = p % info.width, y = Math.floor(p / info.width);
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  const pad = 40;
  const cleaned = await sharp(data, { raw: info })
    .extract({ left: x0 - pad, top: y0 - pad, width: x1 - x0 + pad * 2, height: y1 - y0 + pad * 2 })
    .png()
    .toBuffer();
  await sharp(cleaned).resize(1024).png({ compressionLevel: 9 }).toFile(path.join(root, 'public/assets/logos/web/tasa-emblem.png'));
  await sharp(cleaned).resize(512).png({ compressionLevel: 9 }).toFile(path.join(root, 'app/icon.png'));
  const apple = await sharp(cleaned).resize(150).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: '#f6f4ef' } })
    .composite([{ input: apple, left: 15, top: 15 }])
    .png()
    .toFile(path.join(root, 'app/apple-icon.png'));
  console.log('emblem -> public/assets/logos/web/tasa-emblem.png, app/icon.png, app/apple-icon.png');
}

const only = process.argv[2];
const force = process.argv.includes('--force');
const exists = (f) => access(f).then(() => true, () => false);

// Manifest of every conference photo, in day / photo order, for the gallery slider.
async function manifest() {
  const dir = path.join(root, 'public/assets/gallery/web');
  const files = (await readdir(dir)).filter((f) => /^conf-day\d-\d+\.webp$/.test(f));
  const key = (f) => f.match(/day(\d)-(\d+)/).slice(1).map(Number);
  files.sort((a, b) => { const [da, na] = key(a), [db, nb] = key(b); return da - db || na - nb; });
  const items = [];
  for (const f of files) {
    const { width, height } = await sharp(path.join(dir, f)).metadata();
    const [day, n] = key(f);
    items.push({ src: `/assets/gallery/web/${f}`, w: width, h: height, day, n });
  }
  await writeFile(path.join(root, 'lib/gallery-manifest.json'), JSON.stringify(items, null, 1) + '\n');
  console.log(`manifest -> lib/gallery-manifest.json (${items.length} photos)`);
}
if (only === 'emblem') {
  await emblem();
  process.exit(0);
}

for (const job of jobs) {
  const srcDir = path.join(root, job.src);
  const outDir = path.join(root, job.out);
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('main-logo'));
  for (const f of files) {
    const base = slug(f);
    const img = sharp(path.join(srcDir, f)).rotate().resize({ width: job.width, withoutEnlargement: true });
    const target = path.join(outDir, `${base}.${job.png ? 'png' : 'webp'}`);
    if (!force && (await exists(target))) continue; // incremental: skip already-converted files
    if (job.png) await img.png({ compressionLevel: 9 }).toFile(target);
    else await img.webp({ quality: job.quality }).toFile(target);
    console.log(`${f} -> ${path.relative(root, target)}`);
  }
}
await heroCrop();
await emblem();
await manifest();
