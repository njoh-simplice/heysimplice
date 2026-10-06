/**
 * Writes dist/sitemap.xml from the live route list + every blog post, so
 * publishing a post never needs a manual sitemap edit. Runs right after
 * scripts/prerender.mjs in the build (see package.json), and reads the post
 * list from the same SSR bundle the prerenderer uses.
 */
process.env.NODE_ENV ??= "production";

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const { SITE_URL, CONTACT_EMAIL, getAllPosts } = await import(
  pathToFileURL(serverEntry).href
);

/** Static pages, with the changefreq/priority the hand-written sitemap used. */
const STATIC_ENTRIES = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/legal-mentions", changefreq: "yearly", priority: "0.2" },
];

const loc = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

function urlBlock({ path, changefreq, priority, lastmod }) {
  return [
    "  <url>",
    `    <loc>${loc(path)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const postEntries = getAllPosts().map((post) => ({
  path: `/blog/${post.slug}`,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: post.date,
}));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [...STATIC_ENTRIES, ...postEntries].map(urlBlock).join("\n") +
  `\n</urlset>\n`;

const out = join(root, "dist", "sitemap.xml");
await writeFile(out, xml, "utf8");
console.log(
  `sitemap ${STATIC_ENTRIES.length} static + ${postEntries.length} posts -> ${out.slice(root.length + 1)}`,
);

// public/robots.txt and public/llms.txt are copied verbatim into dist/ and
// carry __SITE_URL__ / __CONTACT_EMAIL__ placeholders; fill them from
// src/constants/site.ts (via the SSR bundle) so the domain lives in one file.
// Fail the build if a placeholder survives, rather than shipping it.
for (const name of ["robots.txt", "llms.txt"]) {
  const file = join(root, "dist", name);
  const text = (await readFile(file, "utf8"))
    .replaceAll("__SITE_URL__", SITE_URL)
    .replaceAll("__CONTACT_EMAIL__", CONTACT_EMAIL);
  if (/__[A-Z_]+__/.test(text)) {
    throw new Error(`Unreplaced placeholder left in dist/${name}`);
  }
  await writeFile(file, text, "utf8");
}
console.log(`filled site constants -> dist/robots.txt, dist/llms.txt`);
