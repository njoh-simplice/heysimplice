/**
 * The site's public identity: one place to change the domain or the contact
 * address. Everything else derives from these — components and page meta
 * import them, vite.config.ts substitutes them into index.html (__SITE_URL__,
 * __CONTACT_EMAIL__), and scripts/generate-sitemap.mjs substitutes them into
 * the static public/ files it finalizes (robots.txt, llms.txt).
 *
 * Plain values only, no DOM or React: this file is also imported by
 * vite.config.ts under Node.
 */
export const SITE_URL = "https://heysimplice.com";
export const SITE_HOST = new URL(SITE_URL).host;
export const CONTACT_EMAIL = "contact@heysimplice.com";
