require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const pool = require("./pool");

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const IMAGES_DIR = path.join(__dirname, "..", "public", "images", "products");
const REQUEST_DELAY_MS = 300;

const CATEGORY_FALLBACK_QUERY = {
  "Engine Parts": "car engine",
  "Suspension & Brakes": "car suspension brake",
  "Body Kits & Aero": "car body kit spoiler",
  "Wheels & Tires": "sports car wheel",
  "Interior & Audio": "car interior racing seat",
  "Exhaust Systems": "car exhaust system",
  "Intake & Forced Induction": "turbocharger engine intake",
  "Drivetrain & Transmission": "car transmission gearbox",
  "Electrical & Lighting": "car dashboard gauge",
  "Fuel System & Cooling": "car radiator engine",
};

function buildSearchQuery(name, brand) {
  let words = name.split(/\s+/);
  if (brand) {
    words = words.filter((w) => w.toLowerCase() !== brand.toLowerCase());
  }
  words = words.filter((w) => !/\d/.test(w));
  const query = words.join(" ").trim();
  return query;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_API_KEY } });
  if (!res.ok) {
    throw new Error(`Pexels API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.photos?.[0]?.src?.large ?? null;
}

async function downloadAndConvert(imageUrl, destPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await sharp(buffer).resize(800, 600, { fit: "cover" }).webp({ quality: 80 }).toFile(destPath);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!PEXELS_API_KEY) {
    console.error("Missing PEXELS_API_KEY in .env. Get a free key at https://www.pexels.com/api/");
    process.exit(1);
  }

  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const { rows: items } = await pool.query(`
    SELECT items.name AS name, items.image_url AS image_url,
           categories.name AS category, brands.name AS brand
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN brands ON items.brand_id = brands.id
    ORDER BY items.id;
  `);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of items) {
    const destPath = path.join(__dirname, "..", "public", item.image_url.replace(/^\//, ""));

    if (await fileExists(destPath)) {
      skipped++;
      continue;
    }

    const primaryQuery = buildSearchQuery(item.name, item.brand) || item.category;
    const fallbackQuery = CATEGORY_FALLBACK_QUERY[item.category] || item.category;

    try {
      let imageUrl = await searchPexels(primaryQuery);
      await sleep(REQUEST_DELAY_MS);

      if (!imageUrl) {
        imageUrl = await searchPexels(fallbackQuery);
        await sleep(REQUEST_DELAY_MS);
      }

      if (!imageUrl) {
        console.warn(`No image found for "${item.name}" (query: "${primaryQuery}")`);
        failed++;
        continue;
      }

      await downloadAndConvert(imageUrl, destPath);
      downloaded++;
      console.log(`[${downloaded + skipped + failed}/${items.length}] Saved ${path.basename(destPath)} (query: "${primaryQuery}")`);
    } catch (error) {
      console.error(`Failed for "${item.name}": ${error.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Downloaded: ${downloaded}, Skipped (already existed): ${skipped}, Failed: ${failed}`);
  await pool.end();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
