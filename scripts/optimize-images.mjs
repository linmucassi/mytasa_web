// Generates web-optimised WebP copies of gallery photos and logos.
// Usage: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
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

for (const job of jobs) {
  const srcDir = path.join(root, job.src);
  const outDir = path.join(root, job.out);
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const f of files) {
    const base = slug(f);
    const img = sharp(path.join(srcDir, f)).rotate().resize({ width: job.width, withoutEnlargement: true });
    const target = path.join(outDir, `${base}.${job.png ? 'png' : 'webp'}`);
    if (job.png) await img.png({ compressionLevel: 9 }).toFile(target);
    else await img.webp({ quality: job.quality }).toFile(target);
    console.log(`${f} -> ${path.relative(root, target)}`);
  }
}
